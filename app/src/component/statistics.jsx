import { useState, useEffect } from "react";
import { View, Text, Image, Button } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./statistics.css";
import { EVENT_AUDIO_ENDEND } from "../event/audio";

const NeedAuth = ({ onUserChange }) => {
  const onClick = () => {
    wx.getUserProfile({
      lang: "zh_CN",
      desc: "获取头像及昵称",
      success: (res) => {
        onUserChange && onUserChange(res.userInfo);
      },
    });
  };

  return (
    <View className="flex flex-col w-full">
      <View className="mb-2">
        <Text className="text-xl font-medium text-black">
          👋🏻 登录后可同步收听记录和时长。
        </Text>
      </View>
      <View>
        <Button
          className="auth-btn text-black text-base px-6 py-2"
          onClick={onClick}
        >
          点击获取用户信息
        </Button>
      </View>
    </View>
  );
};

const STORAGE_USER_KEY_V1 = "user:v1";

// TIPS： dont use data for state field~
const Statistics = () => {
  const [info, setInfo] = useState({ count: 100, duration: 600 });
  const [user, setUser] = useState(() => {
    const res = Taro.getStorageSync(STORAGE_USER_KEY_V1);
    return res ? res : undefined;
  });

  const loadUserStatistics = () => {
    // TODO
    // setData();
  };

  const onUserChange = (u) => {
    Taro.setStorageSync(STORAGE_USER_KEY_V1, u);
    setUser(u);
  };

  useEffect(() => {
    if (user) {
      loadUserStatistics();
    }
  }, [user]);

  // 订阅 audio 事件
  useEffect(() => {
    const listener = (event) => {
      const { audio } = event;
      // 防止引用失效问题
      setInfo((val) => {
        const duration = val.duration + (audio.duration ? audio.duration : 0);
        return { count: val.count + 1, duration: duration };
      });
    };
    Taro.eventCenter.on(EVENT_AUDIO_ENDEND, listener);
    return () => {
      Taro.eventCenter.off(EVENT_AUDIO_ENDEND, listener);
    };
  }, []);

  return (
    <View
      className={
        "statistics rounded p-4 flex shadow-xl " +
        (user ? "items-center" : "need-auth")
      }
    >
      {!user && <NeedAuth onUserChange={onUserChange} />}
      {user && info && (
        <>
          <View className="mr-2">
            <Text className="text-xl font-medium text-white">
              👋🏻 你收听了 {info.count} 个句子 🕒 时长 {info.duration / 60}{" "}
              分钟。
            </Text>
          </View>
          <View className="flex flex-col">
            <Image className="rounded-md w-16 h-16" src={user.avatarUrl} />
          </View>
        </>
      )}
    </View>
  );
};

export default Statistics;

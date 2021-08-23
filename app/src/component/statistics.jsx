import { useState, useEffect } from "react";
import { View, Text, Image, Button } from "@tarojs/components";
import "./statistics.css";

const NeedAuth = ({ onUserChange }) => {
  const onClick = () => {
    console.log("on click");
    wx.getUserProfile({
      lang: "zh_CN",
      desc: "获取头像及昵称",
      success: (res) => {
        console.log(res);
        onUserChange(res.userInfo);
      },
    });
  };

  return (
    <View className="flex flex-col">
      <View className="mb-2">
        <Text className="text-xl font-medium text-black">
          👋🏻 登录后可同步您的收听记录和时长。
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

const Statistics = () => {
  const [data, setData] = useState({ days: 0, audios: 0, senconds: 0 });
  const [user, setUser] = useState(undefined);

  const loadUserStatistics = () => {
    // TODO
    setData();
  };

  const onUserChange = (u) => {
    setUser(u);
  };

  useEffect(() => {}, []);

  useEffect(() => {
    if (user) {
      loadUserStatistics();
    }
  }, [user]);

  return (
    <View
      className={
        "statistics rounded p-4 flex shadow-xl " +
        (user ? "items-center" : "need-auth")
      }
    >
      {!user && <NeedAuth onUserChange={onUserChange} />}
      {user && (
        <>
          <View className="mr-2">
            <Text className="text-xl font-medium text-white">
              👋🏻 过去的 180 天里你收听了 1000 个句子 🕒 时长 90 分钟。
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

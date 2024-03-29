import React, { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { random } from "../../service/random";
import Button from "../../component/button";
import NavBar from "../../component/nav";
import qLoop from "./qloop";
import cloudbase from "../../cloudbase";
import { useUpdateEffect } from "ahooks";
import Statistics from "../../component/statistics";
import { EVENT_AUDIO_ENDEND } from "../../event/audio";

const INIT_LOADING_MESSAGE = "加载音频中";
const SKIP_AUDIO_TOAST_MESSAGE = "已跳过当前音频";
const LOOPLOOP_COVER_IMAGE_URL =
  "cloud://default-5gswefsf8440cf4a.6465-default-5gswefsf8440cf4a-1306659255/logo.png";

const Index = () => {
  // 初始化 loading
  const [initLoading, setInitLoading] = useState(true);
  // 当前播放的音频
  const [loop, setLoop] = useState(undefined);
  // 循环队列
  const [q, setQ] = useState(undefined);
  // 当前音频的文字
  const [text, setText] = useState(undefined);
  // 当前定时器
  const [timer, setTimer] = useState(undefined);

  const onClickNext = () => {
    // 清除定时器
    if (timer) {
      clearTimeout(timer);
      setTimer(undefined);
    }

    // 清理文本
    if (text) {
      setText(undefined);
    }

    Taro.showToast({
      title: SKIP_AUDIO_TOAST_MESSAGE,
      icon: "success",
      duration: 1500,
    });
    // 播放新音频
    randomAndSetQ();
  };

  // 播放音频
  const play = () => {
    const task = q.shift();
    const { audio } = task;
    const src = cloudbase.auidoSrc(audio.path);

    // 音频管理
    const bgm = Taro.getBackgroundAudioManager();
    // 设置 src 后会自动播放
    // 微信开发者工具有 BUG 不用关心
    bgm.src = src;
    bgm.currentTime = 0;
    bgm.title = audio.text;
    bgm.singer = "循环英语";
    bgm.epname = "RANDOM";
    bgm.coverImgUrl = LOOPLOOP_COVER_IMAGE_URL;

    // 音频生命周期钩子
    bgm.onEnded(() => {
      onEnded(task);
    });
    // 仅 IOS生效
    bgm.onNext(onNext);

    // 展示文本
    setText(audio.text);
  };

  // 当音频播完成
  const onEnded = (task) => {
    // 广播 event
    Taro.eventCenter.trigger(EVENT_AUDIO_ENDEND, task);
    // 延迟播放下一条，并设置定时器
    let t = null;
    if (q.isEmpty()) {
      t = setTimeout(randomAndSetQ, 2000);
    } else {
      t = setTimeout(play, 1500);
    }
    setTimer(t);
  };

  // 下一首
  const onNext = () => {
    onClickNext();
  };

  // 随机音频并设置队列
  const randomAndSetQ = () => {
    random(loop).then((res) => {
      setLoop(res);
      setQ(qLoop(res));
      setInitLoading(false);
    });
  };

  // 显示加载中
  useEffect(() => {
    Taro.showLoading({
      title: INIT_LOADING_MESSAGE,
    });
  }, []);

  // 监听首次调用并关闭 loading
  useEffect(() => {
    // 小程序转发支持
    Taro.showShareMenu({
      withShareTicket: true,
    });
    setInitLoading(true);
    // 随机音频并设置队列
    randomAndSetQ();
  }, []);

  // 清除 laoding
  useEffect(() => {
    if (!initLoading) {
      Taro.hideLoading();
    }
  }, [initLoading]);

  // 监听队列
  useUpdateEffect(() => {
    play();
  }, [q]);

  return (
    <View className="root">
      <NavBar />
      <View className="mt-10 px-4 flex flex-col">
        <Text
          user-select
          className="text-white text-3xl font-medium dynamic-text"
        >
          {text}
        </Text>
      </View>

      <View className="absolute bottom-20 px-4 mb-10 px-4 w-full">
        <Statistics />
      </View>

      <View className="absolute bottom-0 px-4 mb-10 flex w-full">
        <Button onClick={onClickNext} disabled={initLoading}>
          下一个
        </Button>
      </View>
    </View>
  );
};

export default Index;

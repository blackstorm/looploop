import React, { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Icon } from "@tarojs/components";
import { random } from "../../service/random";
import Button from "../../component/button";
import NavBar from "../../component/nav";
import qLoop from "./qloop";
import cloudbase from "../../cloudbase";
import { useUpdateEffect } from "ahooks";

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

  const onClickSkip = () => {
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
    const src = cloudbase.auidoSrc(task.path);

    // 音频管理
    const bgm = Taro.getBackgroundAudioManager();
    bgm.title = task.text;
    bgm.singer = "循环英语";
    bgm.epname = "RANDOM";
    bgm.coverImgUrl = LOOPLOOP_COVER_IMAGE_URL;
    bgm.src = src;

    bgm.onCanplay(() => {
      bgm.play();
    });

    bgm.onEnded(onEnded);
    // 仅 IOS生效
    bgm.onNext(onNext);


    // 展示文本
    setText(task.text);
    // 更新 audioContext
  };

  // 当音频播放停止
  const onEnded = () => {
    if (q.isEmpty()) {
      // randomAndSetQ();
    } else {
      setTimer(setTimeout(play, 750));
    }
  };

  // 下一首
  const onNext = () => {
    onClickSkip();
  };

  // 随机音频并设置队列
  const randomAndSetQ = () => {
    setInitLoading(true);
    random(loop).then((res) => {
      setLoop(res);
      setQ(qLoop(res));
      setInitLoading(false);
    });
  };

  // 监听首次调用并关闭 loading
  useEffect(() => {
    // 小程序转发支持
    Taro.showShareMenu({
      withShareTicket: true
    })
    randomAndSetQ();
  }, []);

  // 首次进入加载 loading
  useEffect(() => {
    Taro.showLoading({
      title: INIT_LOADING_MESSAGE,
    });
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
      <View className="mt-20 px-4 flex flex-col">
        <Text selectable className="text-white text-3xl font-medium">
          {text}
        </Text>
      </View>

      {!initLoading && (
        <View className="absolute bottom-0 px-4 mb-10 flex w-full">
          <Button onClick={onClickSkip}>跳过</Button>
        </View>
      )}
    </View>
  );
};

export default Index;

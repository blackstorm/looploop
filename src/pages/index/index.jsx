import React, { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { random } from "../../service/random";
import Button from "../../component/button";
import NavBar from "../../component/nav";
import qLoop from "./qloop";
import cloudbase from "../../cloudbase";

const INIT_LOADING_MESSAGE = "加载音频中";

const Index = () => {
  // 初始化 loading
  const [initLoading, setInitLoading] = useState(true);
  // 当前播放的音频
  const [loop, setLoop] = useState(undefined);
  // 循环队列
  const [q, setQ] = useState(undefined);
  // 当前音频的文字
  const [text, setText] = useState(undefined);

  // 播放音频
  const play = () => {
    const task = q.shift();
    const src = cloudbase.auidoSrc(task.path);


    // 创建新的上下文儿
    const ctx = Taro.createInnerAudioContext({ useWebAudioImplement: true })
    ctx.src = src;
    ctx.onCanplay(() => {
      ctx.play()
    });
    // console.log("play", task, q.length());

    // 2.监听音频停止
    ctx.onEnded(onEnded);

    // 展示文本
    setText(task.text);
  };

  // 当音频播放停止
  const onEnded = () => {
    if (q.isEmpty()) {
      randomAndSetQ();
    } else {
      play();
    }
  };

  const randomAndSetQ = () => {
    const res = random(loop);

    // 创建一个队列用于循环播放
    setQ(qLoop(res));
    setLoop(res);
  };

  // 监听首次调用并关闭 loading
  useEffect(() => {
    randomAndSetQ();
    setInitLoading(false);
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
  useEffect(() => {
    if (q) {
      play();
    }
  }, [q]);

  return (
    <View className="root">
      <NavBar />
      <View className="mt-20 px-4 flex flex-col">
        <Text selectable className="text-primary-color text-3xl">
          {text}
        </Text>
      </View>

      {!initLoading && (
        <View className="absolute bottom-0 px-4 mb-10 flex w-full">
          <Button>跳过</Button>
        </View>
      )}
    </View>
  );
};

export default Index;

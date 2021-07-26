import React from "react";
import Taro from "@tarojs/taro";
import { View, Text, Image, Button } from "@tarojs/components";
import Logo from "../../assert/image/logo.png";
import { NavBar } from "taro-navigationbar-v3";

const createInnerAudioContext = (src) => {
  const ctx = Taro.createInnerAudioContext({ useWebAudioImplement: true });
  if (src) ctx.src = src;
  return ctx;
};

const buildAudioSrc = (path) => {
  return `https://6465-default-5gswefsf8440cf4a-1306659255.tcb.qcloud.la${path}`;
};

const Index = () => {
  const [initLoading, setInitLoading] = React.useState(true);
  const [innerAudioContext, setInnerAudioContext] = React.useState(
    createInnerAudioContext()
  );

  const [queue, setQueue] = React.useState([]);
  const [text, setText] = React.useState(undefined);

  const play = () => {
    setText(undefined);
    innerAudioContext.play();
  };

  React.useEffect(() => {
    if (initLoading) {
      Taro.showLoading({
        title: "加载中",
      });
    } else {
      Taro.hideLoading();
    }
  }, [initLoading]);

  React.useEffect(() => {
    const db = Taro.cloud.database();
    db.collection("audios")
      .orderBy("sequence", "asc")
      .get()
      .then((res) => {
        setQueue([
          {
            audio: res.data[0].english,
            loop: 3,
            timeout: 1000,
          },
          {
            audio: res.data[0].chinese,
          },
        ]);
        setInitLoading(false);
      });
  }, []);

  const firstPlay = (it) => {
    innerAudioContext.src = buildAudioSrc(it.audio.audio_path);
    innerAudioContext.onCanplay(() => {
      play();
      innerAudioContext.offCanplay();
    });
  };

  React.useEffect(() => {
    if (queue.length > 0) {
      let i = 0;
      let it = queue[i];

      firstPlay(it);

      innerAudioContext.onEnded(() => {
        setText(it.audio.text);
        if (it.loop && --it.loop > 0) {
          if (it.timeout) {
            setTimeout(play, it.timeout);
          } else {
            play();
          }
        } else {
          if (++i < queue.length) {
            it = queue[i];
            firstPlay(it);
          } else {
            console.log("load next");
          }
        }
      });
    }
  }, [queue]);

  return (
    <View className="root">
      <NavBar
        background="#243d5b"
        color="#dc4225"
        renderLeft={
          <View className="flex items-center ml-4">
            <Image src={Logo} className="inline-block w-5 h-5 mr-2" />
            <Text className="inline-block h-5 flex items-center text-primary-color text-xl">
              循环英语
            </Text>
          </View>
        }
      />
      <View className="mt-20 px-4 flex flex-col">
        <Text selectable className="text-primary-color text-3xl">
          {text}
        </Text>
      </View>

      <View className="absolute bottom-0 px-4 mb-10 flex w-full">
        <Button className="bg-primary h-12 w-full text-white rounded-2xl flex justify-center items-center shadow-lg text-base">
          播放
        </Button>
      </View>
    </View>
  );
};

export default Index;

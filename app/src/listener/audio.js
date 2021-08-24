import { EVENT_AUDIO_ENDEND } from "../event/audio";
import Taro from "@tarojs/taro";

const createAudioEventListener = () => {
  const handler = (events) => {
    console.log("TODO: save to databse");
  };

  const listen = () => {
    Taro.eventCenter.on(EVENT_AUDIO_ENDEND, handler);
  };

  const unListen = () => {
    Taro.eventCenter.off(EVENT_AUDIO_ENDEND, handler);
  };

  return {
    listen,
    unListen,
  };
};

export default createAudioEventListener();

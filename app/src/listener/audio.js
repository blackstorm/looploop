import { EVENT_AUDIO_ENDEND } from "../event/audio";
import Taro from "@tarojs/taro";
import { record } from "../service/userPlayRecords";

const createAudioEventListener = () => {
  const handler = (event) => {
    record(event);
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

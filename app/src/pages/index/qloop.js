import { createQueue } from "../../util/queue";
import { EN, ZH } from "../../lang";

// 英文三遍，中文一遍
const qLoop = (audio) => {
  const tasks = [];
  const en = {
    id: audio.id,
    audio: audio.en,
    lang: EN,
  };
  const zh = {
    id: audio.id,
    audio: audio.zh,
    lang: ZH,
  };
  tasks.push(en);
  tasks.push(en);
  tasks.push(en);
  tasks.push(zh);
  return createQueue(tasks);
};

export default qLoop;

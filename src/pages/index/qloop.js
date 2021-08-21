import { createQueue } from "../../util/queue";

// 英文三遍，中文一遍
const qLoop = (audio) => {
  const tasks = []
  tasks.push(audio.en)
  tasks.push(audio.en)
  tasks.push(audio.zh)
  return createQueue(tasks);
}

export default qLoop;
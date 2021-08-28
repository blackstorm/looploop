import { isChinese } from "../lang";

const record = ({ id, audio, lang }) => {
  const db = wx.cloud.database();
  db.collection("user_play_records").add({
    data: {
      audio_id: id,
      lang: lang,
      duration: audio.duration,
      create_time: new Date(),
    },
  });
};

const statistics = () => {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection("user_play_records")
      .get()
      .then((res) => {
        console.log("get user play records", res);
        // 查询记录
        const _ = db.command;
        const audioIds = res.data.map((it) => it.audio_id);
        db.collection("audios")
          .where({
            id: _.in(audioIds),
          })
          .get()
          .then((res2) => {
            // 统计时长
            const result = res2.data.reduce((r, it) => {
              r[it.id] = it;
              return r;
            }, {});
            let totalDuration = 0;
            res.data.forEach((element) => {
              const langaudio = isChinese(element.lang)
                ? result[element.audio_id].chinese
                : result[element.audio_id].english;
              totalDuration += langaudio.duration;
            });
            resolve({
              counts: audioIds ? audioIds.length : 0,
              duration: totalDuration,
            });
          });
      });
  });
};

export { record, statistics };

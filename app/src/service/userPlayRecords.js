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
    const $ = db.command.aggregate
    db.collection("user_play_records").aggregate()
    .group({
      _id: null, 
      counts: $.sum(1),
      duration: $.sum("$duration")
    }).end().then(res => {
      resolve(res.list[0])
    })
  });
};

export { record, statistics };

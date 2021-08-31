const express = require("express");
const cors = require("cors");
var multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const tcb = require("@cloudbase/node-sdk");
// 腾讯云 API KEYS
const SECRET_ID = "AKIDLVP2OTHoCJ9i01d4E9pFPJxLTKuDF0Uh";
const SECRET_KEY = "xd2A1buxlKdgTzFFzTheMo21kDPKyNWP";
const CLOUDBASE_ENV_ID = "default-5gswefsf8440cf4a";
const tcbApp = tcb.init({
  secretId: SECRET_ID,
  secretKey: SECRET_KEY,
  env: CLOUDBASE_ENV_ID,
});

const app = express();
const port = 4000;

app.use(
  cors({
    origin: "*",
  })
);

app.post("/api/v1", upload.any(), async (req, resp) => {
  // console.log("form data", req.body, req.files);
  const db = tcbApp.database();
  const audiosCollection = db.collection("audios");

  // 获取最后一个 audio
  const lastAudio = await audiosCollection
    .aggregate()
    .sort({
      id: -1,
    })
    .limit(1)
    .end();
  const last = lastAudio.data[0];

  const id = last.id + 1;
  const enFile = getFile(req.files, "en_file");
  const zhFile = getFile(req.files, "zh_file");
  const en_audio_path = `/${id}/en/${enFile.originalname}`;
  const zh_audio_path = `/${id}/zh/${zhFile.originalname}`;

  // 保存到数据库
  audiosCollection.add({
    english: {
      audio_path: en_audio_path,
      text: req.body.en_text,
      duration: parseFloat(req.body.en_duration),
    },
    chinese: {
      audio_path: zh_audio_path,
      text: req.body.en_text,
      duration: parseFloat(req.body.zh_duration),
    },
    id: id,
  });
  console.log("保存到数据库成功", id, Date.now());

  // 保存到存储
  await Promise.all([
    tcbApp.uploadFile({
      cloudPath: en_audio_path.substring(1),
      fileContent: enFile.buffer,
    }),
    tcbApp.uploadFile({
      cloudPath: zh_audio_path.substring(1),
      fileContent: zhFile.buffer,
    }),
  ]);
  console.log("保存到存储成功", id, Date.now());

  resp.send(lastAudio);
});

const getFile = (files, name) => {
  for (let i = 0; i < files.length; i++) {
    if (files[i].fieldname === name) {
      return files[i];
    }
  }
};

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

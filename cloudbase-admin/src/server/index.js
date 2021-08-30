const express = require("express");
const cors = require("cors");
var multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const CloudBase = require("@cloudbase/manager-node");

const database = require("./database");

const CLOUDBASE_ENV_ID = "default-5gswefsf8440cf4a";

// 腾讯云 API KEYS
const SECRET_ID = "AKIDLVP2OTHoCJ9i01d4E9pFPJxLTKuDF0Uh";
const SECRET_KEY = "xd2A1buxlKdgTzFFzTheMo21kDPKyNWP";

const manager = new CloudBase({
  secretId: SECRET_ID,
  secretKey: SECRET_KEY,
  envId: CLOUDBASE_ENV_ID,
});

const app = express();
const port = 4000;

app.use(
  cors({
    origin: "*",
  })
);

app.post("/api/v1", upload.any(), async (req, res) => {
  console.log("form data", req.files, req.body);
  const result = await database.getLastAudio(manager);
  res.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

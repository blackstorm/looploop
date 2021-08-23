import "windi.css";
import "./app.css";
import React from "react";
import Taro from "@tarojs/taro";

const App = (props) => {
  // 检查并更新版本
  const checkAndUpdate = () => {
    const updateManager = Taro.getUpdateManager();
    updateManager.onUpdateReady(() => {
      Taro.showModal({
        title: "更新提示",
        content: "新版本已经准备好，是否重启应用？",
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        },
      });
    });
  };

  const setupCloudbaseEnv = () => {
    if (process.env.TARO_ENV === "weapp") {
      Taro.cloud.init({
        env: "default-5gswefsf8440cf4a",
      });
    }
  }

  React.useEffect(() => {
    // 更新 APP
    checkAndUpdate();
    // 设置 cloudbase 环境
    setupCloudbaseEnv();
  }, []);

  return props.children;
};

export default App;

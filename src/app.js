import "windi.css";
import "./app.css";
import React from "react";
import Taro from "@tarojs/taro";

const App = (props) => {
  
  React.useEffect(() => {
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init({
        env: 'default-5gswefsf8440cf4a',
      })
    }
  }, []);

  return props.children;
};

export default App;

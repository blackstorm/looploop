import { useEffect } from "react";
import { View, Text, Image } from "@tarojs/components";
import "./statistics.css";
import Taro from "@tarojs/taro";

const INIT_DATA = { days: -1, audios: -1, senconds: -1 };

const Statistics = () => {
  const [data, setData] = useState(INIT_DATA);
  const [user, setUser] = useState(undefined);

  const loadUserStatistics = () => {
    // TODO
    setData();
  };

  useEffect(() => {
    const cloud = Taro.Cloud;
    const auth = cloud.auth();

    if (auth) {
      setUser(auth.currentUser);
    } else {
      auth.onLoginStateChanged((state) => {
        if (state) {
          setUser(sate.user);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (user) {
      loadUserStatistics();
    }
  }, [user]);

  return (
    <View className="statistics rounded-sm p-4 flex flex-col items-center justify-center shadow-lg">
      {!user && <Text className="text-black text-medium">加载中...</Text>}
      {user && (
        <>
          <View>
            <Text lassName="text-black font-medium text-lg">
              👋🏻过去的 {data.days} 天里，你收听了 {data.audios} 个句子，时长 {data.senconds / 60} 分钟。
            </Text>
          </View>
          <View className="flex flex-col">
            <Image src="https://6465-default-5gswefsf8440cf4a-1306659255.tcb.qcloud.la/logo.png" />
            <Text className="font-medium text-black text-lg">浩子</Text>
          </View>
        </>
      )}
    </View>
  );
};

export default Statistics;

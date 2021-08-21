import Logo from "../assert/image/logo.png";
import { NavBar as TNavBar } from "taro-navigationbar-v3";
import { View, Text, Image } from "@tarojs/components";

const NavBar = () => {
  return (
    <TNavBar
      background="#e94c3d"
      renderLeft={
        <View className="flex items-center ml-4">
          <Image src={Logo} className="inline-block w-5 h-5 mr-2" />
          <Text className="inline-block h-5 text text-white flex items-center text-xl">
            循环英语
          </Text>
        </View>
      }
    />
  );
};

export default NavBar;

import { Button as TBUtton } from "@tarojs/components";

const Button = (props) => {
  return (
    <TBUtton
      {...props}
      className="bg-primary h-12 w-full text-white rounded-2xl flex justify-center items-center shadow-lg text-base"
    ></TBUtton>
  );
};

export default Button;

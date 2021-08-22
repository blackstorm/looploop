import { Button as TBUtton } from "@tarojs/components";

const Button = (props) => {
  return (
    <TBUtton
      {...props}
      className="btn-bg-color btn-text-color border border-gray-200 h-12 w-full rounded-2xl flex justify-center items-center shadow-lg text-base"
    ></TBUtton>
  );
};

export default Button;

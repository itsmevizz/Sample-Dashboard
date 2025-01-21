"use client";

import SmallSpinner from "./progress/small-spinner";
interface ButtonProps {
  children: React.ReactNode;
  active?: boolean;
  type?: "filled" | "outlined" | "disabled" | "nill";
  action?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  active = false,
  type = "nill",
  action = "button",
  className = "",
  onClick = () => {},
  loading = false,
  disabled = false,
}) => {
  const buttonClassesMap = {
    filled: "bg-primary-main text-white border-0 font-geist-semibold text-base",
    disabled:
      "bg-[#D9D9D9] text-[#000000] border-0 font-geist-medium text-base text-white ",
    outlined:
      "font-geist-semibold text-base text-black bg-white hover:bg-primary-main border border-primary-main hover:border-secondary",
    nill: "",
  };

  const buttonClasses = `p-[15px] transition duration-300 ease-in-out w-full ${
    buttonClassesMap[disabled ? "disabled" : type] || ""
  }`;

  return (
    <button
      type={action}
      onClick={onClick}
      disabled={loading || disabled}
      className={`rounded-[50px] flex justify-center items-center min-w-max ${buttonClasses} ${className}  
        ${disabled ? "" : "hover:scale-105 hover:text-white"}`}
    >
      <span className="flex items-center gap-1">
        {loading ? <span>Please Wait</span> : children}
        {loading ? <SmallSpinner className="w-[22px] h-[22px]" /> : null}
      </span>
    </button>
  );
};

export default Button;

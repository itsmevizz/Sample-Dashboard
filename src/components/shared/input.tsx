"use client";

import { ChangeEvent } from "react";

interface InputFieldProps {
  type: string;
  value: string | number | undefined;
  name: string;
  placeholder: string;
  error?: string;
  className?: string;
  label?: string;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  value = "",
  name,
  placeholder = "",
  error,
  className = "",
  label,
  disabled = false,
  onChange,
}) => {
  return (
    <div>
      {label && (
        <label htmlFor={name} className="text-base font-geist-regular mb-2">
          {label}
        </label>
      )}{" "}
      <input
        id={name}
        type={type}
        name={name}
        onChange={onChange}
        value={value || ""}
        placeholder={placeholder}
        disabled={disabled || false}
        className={`rounded-[10px]  text-[16px] border h-[50px] w-full max-h-[100px] font-geist-regular focus:border-primary-main
                 outline-none text-darkgrey text-bodyRB p-2  
                 ${error ? ` border-danger ${className}` : `border-[#00000033]`}
                 ${className}
                 `}
      />
      {error && (
        <p className="text-danger  text-[12px] ml-2 mt-0.5 max-w-fit">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;

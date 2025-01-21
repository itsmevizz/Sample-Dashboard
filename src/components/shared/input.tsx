"use client";

import { ChangeEvent, FocusEvent } from "react";

interface InputFieldProps {
  type: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string | number | undefined;
  name: string;
  placeholder: string;
  error?: string;
  className?: string;
  title?: string;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  readOnly?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  onChange,
  value,
  name,
  placeholder,
  error,
  className,
  title,
  onBlur,
  disabled,
  readOnly,
}) => {
  return (
    <div>
      {title && <p className="text-base  text-text-light mb-2">{title}</p>}
      <input
        readOnly={readOnly}
        type={type}
        name={name}
        onChange={onChange}
        value={value || ""}
        placeholder={placeholder}
        disabled={disabled || false}
        className={`rounded-[10px]  text-[16px] border h-[50px] w-full max-h-[100px] font-geist-medium focus:border-primary-light
                 outline-none text-darkgrey text-bodyRB p-2  
                 ${error ? ` border-danger ${className}` : `border-[#00000033]`}
                 ${className}
                 `}
        onBlur={onBlur}
      />
      {error && (
        <p className="text-danger  text-[12px] ml-2 mt-0.5 max-w-fit h-0">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;

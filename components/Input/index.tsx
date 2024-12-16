import React from "react";
import { FieldError } from "react-hook-form";

type InputProps = {
  label: string;
  type?: string;
  register: any;
  name: string;
  defaultValue?: string;
  error?: FieldError;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const Input = ({
  label,
  type = "text",
  register,
  name,
  defaultValue,
  error,
  inputProps,
}: InputProps) => {
  return (
    <div className="flex w-full flex-col gap-2 md:w-1/4">
      <label htmlFor="" className="text-xs text-gray-400">
        {label}
      </label>
      <input
        type={type}
        {...register(name)}
        className="w-full rounded-md border p-2 text-sm outline-none"
        defaultValue={defaultValue}
        {...inputProps}
      />
      {error?.message && (
        <span className="text-xs text-red-500">
          {error?.message.toString()}
        </span>
      )}
    </div>
  );
};

export default Input;

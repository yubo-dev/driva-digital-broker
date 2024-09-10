import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import Input from "../atoms/Input";

interface InputFieldProps {
  label: string;
  error?: string;
  register: UseFormRegisterReturn;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  register,
  type,
}) => <Input label={label} register={register} error={error} type={type} />;

export default InputField;

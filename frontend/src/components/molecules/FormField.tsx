import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import Input from "../atoms/Input";

interface FormFieldProps {
  label: string;
  error?: string;
  register: UseFormRegisterReturn;
  type?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  register,
  type,
}) => <Input label={label} register={register} error={error} type={type} />;

export default FormField;

import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import Select from "../atoms/Select";

interface SelectFieldProps {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
  register: UseFormRegisterReturn;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  error,
  options,
  register,
}) => {
  return (
    <Select label={label} options={options} register={register} error={error} />
  );
};

export default SelectField;

import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface SelectProps {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
  register: UseFormRegisterReturn;
  defaultValue?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  error,
  options,
  register,
  defaultValue = "",
}) => (
  <div className="input-wrapper">
    <label>{label}</label>
    <select {...register} defaultValue={defaultValue}>
      <option value="" disabled>
        Select {label}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <p className="error">{error}</p>}
  </div>
);

export default Select;

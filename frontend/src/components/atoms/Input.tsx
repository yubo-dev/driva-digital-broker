import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  label: string;
  error?: string;
  type?: string;
  register: UseFormRegisterReturn;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  register,
  type = "text",
}) => {
  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur(); // Removes focus to stop the wheel scroll
  };

  return (
    <div className="input-wrapper">
      <label>{label}</label>
      <input type={type} {...register} onWheel={handleWheel} />
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Input;

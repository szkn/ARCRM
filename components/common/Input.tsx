import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({ label, required = false, ...props }) => {
  return (
    <div className="flex flex-col mb-4">
      <label className="mb-1 text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        className="input-field p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      />
    </div>
  );
};

export default Input;
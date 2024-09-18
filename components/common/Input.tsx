import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <div className="flex flex-col mb-4">
      <label className="mb-1 text-sm font-medium">{label}</label>
      <input
        className="input-field p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
        {...props}
      />
    </div>
  );
};

export default Input;
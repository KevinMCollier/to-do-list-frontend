// @ts-expect-error config issues between React and Typescript for testing
import React from 'react';
import { FC, ChangeEventHandler } from 'react';

interface InputFieldProps {
  type: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  className?: string;
}

const InputField: FC<InputFieldProps> = ({ type, name, placeholder, value, onChange, className = '' }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 ${className}`}
    />
  );
};

export default InputField;

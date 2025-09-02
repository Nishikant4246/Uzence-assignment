import React, { useState } from "react";

interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: string;
  showClearButton?: boolean;
  showPasswordToggle?: boolean;
  loading?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = 'outlined',
  size = 'md',
  type = 'text',
  showClearButton = false,
  showPasswordToggle = false,
  loading = false,
}) => {
  const [inputValue, setInputValue] = useState(value || "");
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange && onChange(e);
  };

  const handleClear = () => {
    setInputValue("");
    onChange && onChange({ target: { value: "" } } as any);
  };

  const togglePassword = () => setPasswordVisible(!isPasswordVisible);

  const baseClasses = "block w-full rounded-md focus:outline-none transition";
  // sizes
  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  };

  const variantClasses = {
    filled: "bg-gray-100 border border-gray-300",
    outlined: "bg-white border border-gray-400",
    ghost: "bg-transparent border-b border-gray-300",
  };

  const stateClasses = invalid
    ? "border-red-500 focus:border-red-500"
    : "focus:border-blue-500";

  return (
    <div className="w-full">
      {label && <label className="block mb-1 font-medium">{label}</label>}
      <div className="relative">
        <input
          type={showPasswordToggle && isPasswordVisible ? "text" : type}
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${stateClasses} ${
            disabled ? "bg-gray-200 cursor-not-allowed" : ""
          } ${loading ? "opacity-70 cursor-wait" : ""}`}
        />
        {loading && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 animate-spin text-gray-900">
            ⏳
          </div>
        )}
        {!loading && showClearButton && inputValue && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        )}
      
        {!loading && showPasswordToggle && type === "password" && (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {isPasswordVisible ? "🙈" : "👁️"}
          </button>
        )}
      </div>
      {helperText && !invalid && <p className="text-gray-500 mt-1 text-sm">{helperText}</p>}
      {invalid && errorMessage && <p className="text-red-500 mt-1 text-sm">{errorMessage}</p>}
    </div>
  );
};

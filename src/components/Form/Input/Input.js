import React from "react";
import "./Input.scss";

const Input = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  autoComplete,
  error,
  title,
}) => {
  return (
    <div className="group">
      <label> {title} </label>
      <input
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        name={name}
        value={value}
        onChange={onChange}
      />
      <div className="error">
        <span>{error.length > 0 && error}</span>
      </div>
    </div>
  );
};

export default Input;

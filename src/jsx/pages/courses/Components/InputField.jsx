import React from 'react';

const InputField = ({ label, id, placeholder, value, onChange, disabled, type = "text", required }) => {
  return (
    <div className="form-group">
      {/* Conditionally apply 'disabled-label' class */}
      <label
        className={`form-label ${disabled ? 'disabled-label' : ''}`} 
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled} // Ensure input can still be disabled separately if needed
        required={required}
      />
    </div>
  );
};

export default InputField;

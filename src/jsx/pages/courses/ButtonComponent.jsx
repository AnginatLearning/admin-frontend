
import React from 'react';

const ButtonComponent = ({ label, onClick, type = "button", className = "btn btn-primary" }) => {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default ButtonComponent;

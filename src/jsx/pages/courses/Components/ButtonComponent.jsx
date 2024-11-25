import React from 'react';

const ButtonComponent = ({ label, onClick, type = "button", className = "btn btn-primary", icon: Icon }) => {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
    >
      {Icon && <Icon size={20} className="me-2" />} {/* Render the icon if provided */}
      {label}
    </button>
  );
};

export default ButtonComponent;

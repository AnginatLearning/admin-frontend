import React, { useState } from 'react';

const Schedule = () => {
  // State to track whether the item is selected
  const [isSelected, setIsSelected] = useState(false);

  // Toggle the selection state
  const handleSelect = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div onClick={handleSelect}>
      <div
        style={{
          width: "160px",
          height: "65px",
          lineHeight: "1.5rem",
          padding: "8px 12px",
          backgroundColor: isSelected ? "#6A73FA" : "transparent", 
          borderRadius: "8px",
          color: isSelected ? "white" : "#6A73FA", 
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "center",
          border: isSelected ? "none" : "1px solid #6A73FA", 
          cursor: "pointer",
          transition: "all 0.3s ease", 
        }}
      
      >
        <div >
          <p style={{ fontSize: "14px", marginBottom: "0px", marginTop: "0px" }}>Nov 6, 2024</p>
          <p style={{ fontSize: "14px", marginBottom: "0px", marginTop: "0px" }}>02:00 PM - 10:00 PM</p>
        </div>
       
      </div>
    </div>
  );
}

export default Schedule;

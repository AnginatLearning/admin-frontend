import React from 'react'
import { PiBoxArrowUpFill } from 'react-icons/pi'

const Uploadfile = ({ text = "Upload your file here" ,padding = "80px 100px"  }) => {
    const handleFileChange = (e) => {
        console.log('File uploaded:', e.target.files[0]);
    };

  return (
    <div>
          <div style={{ marginTop: "20px" }}>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    border: "2px dashed #ccc",
                                                    padding: padding,
                                                    borderRadius: "8px",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => document.getElementById("Course_Photo").click()}
                                            >
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: "10px",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "center",
                                                        }}
                                                    >
                                                        <PiBoxArrowUpFill size={60} />
                                                    </div>
                                                    <div>
                                                        <p
                                                            style={{
                                                                margin: 0,
                                                                fontSize: "20px",
                                                                color: "#666",
                                                                textAlign:"center"
                                                            }}
                                                        >
                                                            Drag & Drop or{" "}
                                                            <span
                                                                style={{
                                                                    color: "#007bff",
                                                                    textDecoration: "underline",
                                                                }}
                                                            >
                                                                Click to Upload
                                                            </span>
                                                        </p>
                                                        <input
                                                            id="Course_Photo"
                                                            type="file"
                                                            className="file"
                                                            onChange={handleFileChange}
                                                            required
                                                            style={{ display: "none" }}
                                                        />
                                                    </div>
                                                    <p style={{ marginTop: "10px", fontSize: "14px", color: "#555" }}>{text}</p>
                                                </div>
                                            </div>
                                        </div>
    </div>
  )
}

export default Uploadfile

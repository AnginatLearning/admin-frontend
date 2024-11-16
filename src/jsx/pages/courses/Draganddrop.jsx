import React, { useState } from 'react';
import PageTitle from '../../layouts/PageTitle';
import { PiBoxArrowUpFill } from "react-icons/pi";
import ButtonComponent from './ButtonComponent';

const Upload = () => {
    const [showUploadSection, setShowUploadSection] = useState(false);

    const handleButtonClick = () => {
        setShowUploadSection(true); // Show the upload section
    };

    const handleCancel = () => {
        setShowUploadSection(false); // Hide the upload section
        console.log('Form canceled');
    };

    const handleFileChange = (e) => {
        console.log('File uploaded:', e.target.files[0]);
    };

    return (
        <>
            <PageTitle activeMenu={"FAQs"} motherMenu={"Courses"} />
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <form action="#" method="post">
                                {/* Top Buttons */}
                                <div className="row">
                                    <div
                                        className="col-lg-6"
                                        style={{ marginBottom: '10px' }}
                                    >
                                        <ButtonComponent
                                            label="CSV File"
                                            type="button"
                                            className="btn btn-primary w-100 me-1"
                                            onClick={handleButtonClick} // Show the upload section
                                        />
                                    </div>
                                    <div
                                        className="col-lg-6"
                                        style={{ marginBottom: '10px' }}
                                    >
                                        <ButtonComponent
                                            label="Certificate"
                                            type="button"
                                            className="btn btn-primary w-100"
                                            onClick={handleButtonClick} // Show the upload section
                                        />
                                    </div>
                                </div>

                                {/* Upload Section */}
                                {showUploadSection && (
                                    <>
                                        <div style={{ marginTop: "20px" }}>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    border: "2px dashed #ccc",
                                                    padding: "80px 100px",
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
                                                </div>
                                            </div>
                                        </div>

                                        {/* Submit and Cancel Buttons */}
                                        <div
                                            style={{ marginTop: "20px" }}
                                            className="col-lg-12 col-md-12 col-sm-12"
                                        >
                                            <ButtonComponent
                                                label="Submit"
                                                type="submit"
                                                className="btn btn-primary me-1"
                                            />
                                            <ButtonComponent
                                                label="Cancel"
                                                type="button"
                                                className="btn btn-danger light"
                                                onClick={handleCancel} // Hide the upload section
                                            />
                                        </div>
                                    </>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Upload;

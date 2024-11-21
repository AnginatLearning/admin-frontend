import React, { useState } from 'react';
import PageTitle from '../../layouts/PageTitle';
import { PiBoxArrowUpFill } from "react-icons/pi";
import ButtonComponent from './Components/ButtonComponent';
import Uploadfile from './Components/Uploadfile';

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
                                        <Uploadfile />

                                        {/* Submit and Cancel Buttons */}
                                        <div style={{ display: "flex", gap: "10px", marginTop: "30px", marginBottom: "80px" }} className="col-lg-12 col-md-12 col-sm-12">
                                            <ButtonComponent
                                                label="Submit"
                                                type="submit"
                                                className="btn btn-primary me-1 All-btn"
                                            />
                                            <ButtonComponent
                                                label="Cancel"
                                                type="button"
                                                className="btn btn-danger light All-btn"
                                                onClick={handleCancel}
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

import React, { useState } from "react";
import {
  AlignRight,
  Cloud,
  CloudCheck,
  UploadSimple,
} from "@phosphor-icons/react";
import Swal from "sweetalert2";
import api from "../../../services/AxiosInstance";
import ButtonComponent from "./Components/ButtonComponent";
import UploadingFile from "./Components/UploadingFile";

const CsvUploadButton = ({ courseId, setPriceChange, priceChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setSelectedFile(file);
  };
  const handleConfirm = async () => {
    if (!selectedFile) {
      Swal.fire("Error", "Please select a file to upload.", "error");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    const fileBlob = new Blob([selectedFile], { type: "text/csv" });
    formData.append("file", fileBlob, selectedFile.name);

    try {
      const response = await api.post(
        `course/courses/${courseId}/pricing/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure the right content type
          },
        }
      );
      setPriceChange(!priceChange)
      Swal.fire("Success", "File uploaded successfully.", "success");
      console.log(response.data);
    } catch (error) {
      Swal.fire("Error", "Failed to upload the file.", "error");
      console.error(error);
    } finally {
      setIsUploading(false);
      setSelectedFile(null);
      toggleModal();
    }
  };

  return (
    <div>
      {/* Upload Button */}
      <button
        className="btn btn-primary d-flex align-items-center py-2 gap-2"
        onClick={toggleModal}
      >
        <UploadSimple size={20} />
        Upload CSV File
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div>
          {/* Modal Backdrop */}
          <div
            className="modal-backdrop fade show"
            style={{
              zIndex: 1040, // Below modal
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent backdrop
            }}
            onClick={toggleModal}
          ></div>

          {/* Modal Content */}
          <div
            className="modal fade show"
            style={{
              display: "block",
              zIndex: 1050,
            }}
            tabIndex="-1"
            role="dialog"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content rounded-5 shadow-lg">
                {/* Modal Header */}
                <div className="modal-header d-flex ">
                  <div className="d-flex align-items-center  gap-3 ">
                    <div className="border border-2 rounded-5 p-2">
                      <CloudCheck className="text-black" size={30} />
                    </div>
                    <div className="d-flex row align-items-center mt-2">
                      <p className="modal-title d-flex align-items-center fs-3 font-w500">
                        Upload Files
                      </p>
                      <p className="fs-5">
                        Select and upload the files of your choice
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn-close mb-5 fs-5 "
                    aria-label="Close"
                    onClick={toggleModal}
                  ></button>
                </div>

                {/* Modal Body */}
                <div className="modal-body  text-center">
                  <a
                    style={{
                      height: "40px",
                      marginLeft: "auto",
                    }}
                    href="/mycsv.csv"
                    download={"sampleprice.csv"}
                    className="btn btn-outline-primary w-50 fs-6 mb-3 d-flex align-items-center justify-content-center gap-2"
                  >
                    <UploadSimple size={20} />
                    Download Sample CSV File
                  </a>
                  <div
                    className="border  border-3  rounded p-3 position-relative mx-2 my-2 py-5 px-5"
                    style={{
                      minHeight: "150px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <input
                      type="file"
                      accept=".csv"
                      className="form-control position-absolute opacity-0 rounded p-3"
                      onChange={handleFileChange}
                      style={{
                        inset: 0,
                        cursor: "pointer",
                        minHeight: "270px",
                      }}
                      disabled={isUploading}
                    />
                    <UploadSimple size={40} className="mb-2 text-muted" />
                    <p className="mb-0 text-muted text-black fs-4 font-w400">
                      Choose a CSV file or drag & drop it here
                    </p>

                    <p>
                      You can upload CSV file to add course price according to
                      currencies at once
                    </p>

                    <p className="border py-2 border-2 pointer px-4 text-muted fs-4 rounded">
                      {" "}
                      Browse File{" "}
                    </p>
                  </div>
                  {selectedFile && (
                    <UploadingFile
                      selectedFile={selectedFile}
                      setSelectedFile={setSelectedFile}
                    />
                  )}
                </div>

                {/* Modal Footer */}
                <div className="modal-footer">
                  <ButtonComponent
                    label={" Cancel"}
                    type="button"
                    className="btn btn-secondary py-2"
                    onClick={toggleModal}
                    disabled={isUploading}
                  ></ButtonComponent>
                  <ButtonComponent
                    label={isUploading ? "Uploading..." : "Confirm"}
                    type="button"
                    className="btn btn-primary py-2"
                    onClick={handleConfirm}
                    disabled={!selectedFile || isUploading}
                  ></ButtonComponent>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CsvUploadButton;

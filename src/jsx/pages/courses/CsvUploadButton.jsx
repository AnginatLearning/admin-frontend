import React, { useState } from "react";
import Swal from "sweetalert2"; // For success/error messages
import api from "../../../services/AxiosInstance";
import { Spinner, SpinnerBall, UploadSimple } from "@phosphor-icons/react";
import ButtonComponent from "./Components/ButtonComponent";

const CsvUploadButton = ({ courseId }) => {
  const [isUploading, setIsUploading] = useState(false); // To track upload status

  const handleFileChange = async (event) => {
    const input = event.target;
    const selectedFile = input.files[0];
    if (!selectedFile) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await api.post(
        `course/courses/${courseId}/pricing/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Swal.fire({
        title: "Success!",
        text: "File uploaded successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });

      console.log("Upload response:", response.data);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response.data.error,
        icon: "error",
        confirmButtonText: "OK",
      });

      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
      input.value = ""; // Reset the input value to ensure onChange fires again
    }
  };

  return (
    <div>
      {/* Hidden file input */}
      <input
        type="file"
        accept=".csv"
        id="fileInput"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      {/* Upload Button */}
      <ButtonComponent
        label={isUploading ? "Uploading..." : "Upload Price CSV File"}
        type="button"
        className={`btn btn-primary me-1 Download-filebtn ${
          isUploading ? "disabled" : ""
        }`}
        icon={isUploading? Spinner : UploadSimple}
        onClick={() => document.getElementById("fileInput").click()}
      />
      {/* Animation during upload */}
      {/* {isUploading && (
        <div className="uploading-animation">
          <span className="spinner-border spinner-border-sm" role="status" />
          <span className="ms-2">Uploading...</span>
        </div>
      )} */}
    </div>
  );
};

export default CsvUploadButton;

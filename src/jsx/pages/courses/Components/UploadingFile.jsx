import React from "react";
import { ProgressBar } from "react-bootstrap";

export default function UploadingFile({ selectedFile, setSelectedFile }) {
  console.log(selectedFile);
  return (
    <div
      style={{
        backgroundColor: "rgba(173, 216, 230, 0.5)",
      }}
      className="rounded-3 mx-4 px-4 pt-2 pb-3"
    >
      <div className="d-flex align-items-center ">
        <div>
          <div className="d-flex align-items-center gap-4">
            <img
              src="/csv.png"
              alt=""
              style={{
                height: "35px",
              }}
            />
            <div className="text-start">
              {" "}
              {/* Added text-start class here */}
              <div className="fs-4 text-black">{selectedFile.name}</div>
              <div>{parseInt(selectedFile.size / 1024)} KB</div>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="btn-close mb-5 fs-5 "
          aria-label="Close"
          onClick={() => {
            setSelectedFile(null);
          }}
        ></button>
      </div>
    </div>
  );
}

import React, { Fragment, useEffect, useReducer, useState } from "react";
import { Button, Dropdown, Modal, Tab, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import LightGallery from "lightgallery/react";
// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

//** Import Image */
//** Import Image */

import profile02 from "../../../assets/images/profile/2.jpg";
import profile03 from "../../../assets/images/profile/3.jpg";
import profile04 from "../../../assets/images/profile/4.jpg";
import profile from "../../../assets/images/profile/profile.png";

import PageTitle from "../../layouts/PageTitle";
import api from "../../../services/AxiosInstance";
import Swal from "sweetalert2";
import { sendLocalStorageData } from "../../../services/AuthService";

const galleryBlog = [
  { image: profile03 },
  { image: profile04 },
  { image: profile02 },
  { image: profile04 },
  { image: profile03 },
  { image: profile02 },
];

const initialState = false;

const AppProfile = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [institute, setInstitute] = useState(null);
  const [images, setImages] = useState({
    profileUrl: "",
    coverUrl: "",
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("InstitutionDetails"));

    setInstitute(data);
    setImages({
      profileUrl: data.profileUrl,
      coverUrl: data.coverUrl,
    });
  }, []);
  useEffect(() => {
    const storedEmail = localStorage.getItem("institutionEmail");

    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    const storedName = localStorage.getItem("institutionName");

    if (storedName) {
      setName(storedName);
    }
  }, []);
  const onInit = () => {
    //console.log('lightGallery has been initialized');
  };
  // const options = {
  //  	settings: {
  // 		overlayColor: "#000000",
  //  	},
  // };

  const [changePassModal, setChangePassModal] = useState(false);
  const [editEmailModal, setEditEmailModal] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false); // To track if OTP has been sent
  const [otp,setOtp] = useState("")
  const [pass, setPass] = useState({
    currentPass: "",
    newPass: "",
    confirmPass: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null); // For previewing the image
  const [selectedFile, setSelectedFile] = useState(null); // For storing the selected file
  const [uploadImageModal, setUploadImageModal] = useState(false);

  // Function to handle email submission
  const handleEmailSubmit = async () => {
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email fields are not empty
    if (newEmail === "") {
      console.error("Email fields cannot be empty.");
      setError("email field cannot be empty");
      return;
    }

    // Check if the current email is a valid email
    if (!emailRegex.test(newEmail)) {
      console.error("email is not valid.");
      setError("Email is not a valid email address.");
      return;
    }
    // Logic for sending OTP here (you can call your API to send the OTP)
    try {
      const response = await api.post(`otp/generate`, {
        receiverId: newEmail,
        otpType: "email",
      });
      setOtpSent(true); // Set OTP sent state to true
    } catch (error) {
      Swal.fire({
        title: "Failure!",
        text: "Failed to change email",
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  };

  const handleOtpSubmit = async () => {
    try {
      // Attempt to verify OTP
      const response = await api.post("otp/verify", {
        otpType: "email",
        receiverId: newEmail,
        otp:otp
      });
      
      if (response.data.status === "success") {
        setOtpSent(true);

        // Proceed with updating email
        const update = await api.post(
          `institute/update-details/${institute._id}`,
          {
            email: newEmail,
          }
        );

        if (update.data.status === "success") {
          localStorage.setItem(
            "InstitutionDetails",
            JSON.stringify(update.data.data.institute)
          );
          localStorage.setItem(
            "institutionEmail",
            update.data.data.institute.email
          );
          await sendLocalStorageData()

          // Show success notification
          Swal.fire({
            title: "Success!",
            text: "Email changed successfully",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            setEmail(update.data.data.institute.email);
          });

          // Close the modal and set email verification state
          setEditEmailModal(false);

          setOtpSent(false); // Reset OTP sent state
        } else {
          // Handle failed email update
          setError("Email update failed. Please try again.");
        }
      } else {
        // Handle OTP verification failure
        setError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      // Handle unexpected errors
      console.error("Error during OTP submission or email update:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  // Toggle show password state
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleDropdownSelect = (eventKey) => {
    // Perform actions based on the selected item
    if (eventKey === "forgot-password") {
      setChangePassModal(true);
    }
  };

  const handlePassChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from the event
    setPass((prevPass) => ({
      ...prevPass, // Spread the existing state
      [name]: value, // Update the field dynamically based on the `name`
    }));
    setError("");
  };

  const submitUploadImage = async () => {
    if (!selectedFile) {
      setError("Please select a image first");
      console.error("No file selected!");
      return; // Don't proceed if no file is selected
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("type", "profile");

 
    try {
      const response = await api.post(
        `institute/upload/${institute._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure proper headers for file upload
          },
        }
      );



      if (response.status === 200) {
        localStorage.setItem(
          "InstitutionDetails",
          JSON.stringify(response.data.institute)
        );
        await sendLocalStorageData()
        setUploadImageModal(false);
        setImages({
          profileUrl: response.data.institute.profileUrl,
        });
        Swal.fire({
          title: "Success!",
          text: "Profile Image successfully",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          setImages({
            profileUrl: response.data.institute.profileUrl,
          });
        });

        setImagePreview(null);
        setSelectedFile(null);
        setError("");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Error in uploading profile.",
        icon: "error",
        confirmButtonText: "OK",
      });
      setError("");
      console.error("Error creating course:", error);
      setUploadImageModal(false);
    }
  };

  const submitChangeEmail = async () => {
    try {
      const update = await api.post(
        `institute/update-details/${institute._id}`,
        {
          email: newEmail,
        }
      );

      if (update.data.status === "success") {
        localStorage.setItem(
          "InstitutionDetails",
          JSON.stringify(update.data.data.institute)
        );

        localStorage.setItem(
          "institutionEmail",
          update.data.data.institute.email
        );
        await sendLocalStorageData()

        Swal.fire({
          title: "Success!",
          text: "Email change successfully",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          setEmail(update.data.data.institute.email);
        });
        setEditEmailModal(false);
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to change email.",
        icon: "error",
        confirmButtonText: "OK",
      });

      console.error("Error creating course:", error);
      setChangePassModal(false);
    }

  };

  const submitChangePass = async () => {


    if (pass.newPass !== pass.confirmPass) {
      setError("Passwords do not match");
    }

    try {
      const response = await api.post(
        "/auth/update-password",
        {
          email,
          currentPassword: pass.currentPass,
          newPassword: pass.newPass,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success") {
        Swal.fire({
          title: "Success!",
          text: "Password change successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
      }

      setChangePassModal(false);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to change password.",
        icon: "error",
        confirmButtonText: "OK",
      });

      console.error("Error creating course:", error);
      setChangePassModal(false);
    }
  };

  return (
    <Fragment>
      <PageTitle activeMenu="Profile" motherMenu="App" />
      <div className="row">
        <div className="col-lg-12">
          <div className="profile card card-body px-3 pt-3 pb-0">
            <div className="profile-head">
              <div className="photo-content ">
                <div className="cover-photo rounded"></div>
              </div>
              <div className="profile-info">
                <div
                  className="profile-photo position-relative"
                  style={{
                    width: "120px",
                    height: "100px",
                    borderRadius: "50%", // Ensures a perfectly round container
                    overflow: "hidden", // Hides any overflow from the image
                    position: "relative",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.querySelector(
                      ".hover-overlay"
                    ).style.opacity = "1")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.querySelector(
                      ".hover-overlay"
                    ).style.opacity = "0")
                  }
                  onClick={() => setUploadImageModal(true)}
                >
                  <img
                    src={images.profileUrl || profile}
                    className="img-fluid"
                    alt="profile"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover", // Ensures the image scales and fits well within the circle
                    }}
                  />
                  {/* Hover Overlay */}
                  <div
                    className="hover-overlay position-absolute"
                    style={{
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(0, 0, 0, 0.5)", // Black shade
                      borderRadius: "50%", // Matches the profile photo's round shape
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: "0", // Initially hidden
                      transition: "opacity 0.3s ease-in-out", // Smooth fade-in effect
                      cursor: "pointer",
                    }}
                  >
                    <i
                      className="fa fa-camera text-white"
                      style={{
                        fontSize: "24px", // Camera icon size
                      }}
                    ></i>
                  </div>
                </div>

                <div className="profile-details ">
                  <div className="profile-name px-3 pt-2">
                    <h4 className="text-primary mb-0">{name}</h4>
                    <p>UX / UI Designer</p>
                  </div>
                  <div className="profile-email px-2 pt-2">
                    <h4 className="text-muted mb-0">
                      {email}{" "}
                      <span
                        className="pointer text-primary"
                        role="button"
                        onClick={() => setEditEmailModal(true)}
                        style={{ cursor: "pointer" }}
                      >
                        <i className="fa fa-edit me-2" />
                      </span>
                    </h4>
                    <div>
                      <p>Email</p>
                    </div>
                  </div>
                  <Dropdown
                    className="dropdown ms-auto"
                    onSelect={handleDropdownSelect}
                  >
                    <Dropdown.Toggle
                      variant="primary"
                      className="btn btn-primary light sharp i-false"
                      data-toggle="dropdown"
                      aria-expanded="true"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        //    xmlns:xlink="http://www.w3.org/1999/xlink"
                        width="18px"
                        height="18px"
                        viewBox="0 0 24 24"
                        version="1.1"
                      >
                        <g
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                        >
                          <rect x="0" y="0" width="24" height="24"></rect>
                          <circle fill="#000000" cx="5" cy="12" r="2"></circle>
                          <circle fill="#000000" cx="12" cy="12" r="2"></circle>
                          <circle fill="#000000" cx="19" cy="12" r="2"></circle>
                        </g>
                      </svg>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                      <Dropdown.Item
                        className="dropdown-item"
                        eventKey="forgot-password"
                      >
                        <i className="fa fa-key text-primary me-2" />
                        Change password
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={changePassModal}
        className="modal fade"
        id="replyModal"
        onHide={() => setChangePassModal(false)}
        centered
      >
        <div className="modal-header">
          <h5 className="modal-title">Change Password</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setChangePassModal(false)}
          ></button>
        </div>
        <div className="modal-body">
          <form>
            <div className="mb-3">
              <label htmlFor="currentPass" className="form-label">
                Current Password
              </label>
              <input
                type={showPassword === true ? "text" : "password"} // Switch between text and password
                className="form-control"
                id="currentPassword"
                name="currentPass"
                placeholder="Enter current password"
                onChange={handlePassChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
                New Password
              </label>
              <input
                type={showPassword === true ? "text" : "password"} // Switch between text and password
                className="form-control"
                id="newPassword"
                name="newPass"
                placeholder="Enter New password"
                onChange={handlePassChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type={showPassword === true ? "text" : "password"} // Switch between text and password
                className={`form-control ${error ? "is-invalid" : ""}`}
                id="confirmPassword"
                name="confirmPass"
                placeholder="Confirm new password"
                onChange={handlePassChange}
              />
              {error && <div className="invalid-feedback">{error}</div>}
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="showPassword"
                onChange={toggleShowPassword}
              />
              <label htmlFor="showPassword" className="form-check-label">
                Show Password
              </label>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-danger light"
            onClick={() => setChangePassModal(false)}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={submitChangePass}
          >
            Change Password
          </button>
        </div>
      </Modal>

      <Modal
        show={editEmailModal}
        className="modal fade"
        id="editEmailModal"
        onHide={() => {
          setOtpSent(false)
          setError("")
          setEditEmailModal(false)
        }
        }
          centered
      >
        <div className="modal-header">
          <h5 className="modal-title">Change Email</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setEditEmailModal(false)}
          ></button>
        </div>
        <div className="modal-body">
          <form>
            {/* Email Input */}
            {!otpSent && (
              <div className="mb-3">
                <label htmlFor="newEmail" className="form-label">
                  New Email
                </label>
                <input
                  type="email"
                  className={`form-control ${error ? "is-invalid" : ""}`}
                  id="newEmail"
                  name="newEmail"
                  placeholder="Enter new email"
                  onChange={(e) => {
                    setError("");
                    setNewEmail(e.target.value);
                  }}
                />
                {error && <div className="invalid-feedback">{error}</div>}
              </div>
            )}

            {/* OTP Input */}
            {otpSent && (
              <div className="mb-3">
                <label htmlFor="otp" className="form-label">
                  Enter OTP
                </label>
                <input
                  type="text"
                  className={`form-control ${error ? "is-invalid" : ""}`}
                  id="otp"
                  name="otp"
                  placeholder="Enter OTP"
                  onChange={(e) => {
                    setError("");
                    setOtp(e.target.value);
                  }}
                />
                {error && <div className="invalid-feedback">{error}</div>}
              </div>
            )}
          </form>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-danger light"
            onClick={() => {
              setOtpSent(false)
              setError("")
              setEditEmailModal(false)}}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={!otpSent ? handleEmailSubmit : handleOtpSubmit}
          >
            {!otpSent ? "Send OTP" : "Verify OTP"}
          </button>
        </div>
      </Modal>

      {/* Upload Profile Modal */}
      <Modal
        show={uploadImageModal}
        className="modal fade"
        id="uploadImageModal"
        onHide={() => setUploadImageModal(false)}
        centered
      >
        <div className="modal-header">
          <h5 className="modal-title">Upload Profile Picture</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => {
              setError("");
              setUploadImageModal(false);
            }}
          ></button>
        </div>
        <div className="modal-body">
          <form>
            <div className="mb-3">
              <label htmlFor="uploadImage" className="form-label">
                Choose Image
              </label>
              <input
                type="file"
                className={`form-control ${error ? "is-invalid" : ""}`}
                id="uploadImage"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      setImagePreview(reader.result); // Display the image preview
                    };
                    reader.readAsDataURL(file);
                    setSelectedFile(file); // Save the selected file for submission
                  }
                }}
              />
              {error && <div className="invalid-feedback">{error}</div>}
            </div>
            {imagePreview && (
              <div className="text-center mb-3">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="img-fluid rounded-circle"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    border: "2px solid #ddd",
                  }}
                />
              </div>
            )}
          </form>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-danger light"
            onClick={() => {
              setUploadImageModal(false);
              setImagePreview(null); // Clear the preview on close
            }}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={submitUploadImage}
            disabled={!selectedFile} // Disable the button if no file is selected
          >
            Upload Image
          </button>
        </div>
      </Modal>
    </Fragment>
  );
};

export default AppProfile;

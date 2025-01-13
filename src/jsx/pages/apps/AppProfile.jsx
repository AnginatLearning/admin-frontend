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
  const [pass, setPass] = useState({
    // currentPass: "",
    newPass: "",
    confirmPass: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

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

  const submitChangePass = async () => {
    console.log("passwords :", pass);
    if (pass.newPass !== pass.confirmPass) {
      setError("Passwords do not match");
    }
    try {
      const response = await api.post(
        "/auth/update-password",
        {
          email,
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
                <div className="profile-photo">
                  <img
                    src={profile}
                    className="img-fluid rounded-circle"
                    alt="profile"
                  />
                </div>
                <div className="profile-details">
                  <div className="profile-name px-3 pt-2">
                    <h4 className="text-primary mb-0">{name}</h4>
                    <p>UX / UI Designer</p>
                  </div>
                  <div className="profile-email px-2 pt-2">
                    <h4 className="text-muted mb-0">{email}</h4>
                    <p>Email</p>
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
              <label htmlFor="newPassword" className="form-label">
                New Password
              </label>
              <input
                type={showPassword ? "text" : "password"} // Switch between text and password
                className="form-control"
                id="newPassword"
                name="newPass"
                placeholder="Enter new password"
                onChange={handlePassChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"} // Switch between text and password
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
    </Fragment>
  );
};

export default AppProfile;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { connect, useDispatch } from 'react-redux';
import { loadingToggleAction, signupAction } from '../../../store/actions/AuthActions';
import { useRegistration } from '../../../context/RegistrationContext';
import { sendOtpOnEmail } from "../../../services/api";  // Adjust the import according to your file structure
import axios from "axios";
import { FaSpinner, FaCheckCircle } from "react-icons/fa";

// images
import google from "../../../assets/images/download (1).png";
import facebook from "../../../assets/images/download (2).png";
import login from "../../../assets/images/login-img.png";
import Loginimage from "../../components/chatBox/Loginimage";
import api from "../../../services/AxiosInstance";

function Register(props) {
  const [showPassword, setShowPassword] = useState(false); // Toggle for Password field visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle for Confirm Password field visibility
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [agreeToTerms, setAgreeToTerms] = useState(false);  // New state to track checkbox for agreement
  const [error, setError] = useState('');  // Error message state for form validation
  const [fieldErrors, setFieldErrors] = useState({
    email: '',
    phoneNumber: '',
    username: '',
  });
  const [fieldLoading, setFieldLoading] = useState({
    email: false,
    phoneNumber: false,
    username: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { ownerData, setOwnerData } = useRegistration();

  // Handler to send OTP
  const handleGetOtp = async (e) => {
    e.preventDefault();
    
    // Check if the user has agreed to the terms
    if (!agreeToTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy to proceed.");
      return;
    } else {
      setError(""); // Clear error if checkbox is checked
    }

    if (!ownerData.email) {
      Swal.fire({ icon: 'error', title: 'Oops', text: 'Email is required to send OTP.' });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({ icon: 'error', title: 'Oops', text: 'Passwords do not match.' });
      return;
    }
    
    try {
      setOwnerData({ ...ownerData, password }); 
      await sendOtpOnEmail(ownerData.email);
      Swal.fire({ icon: 'success', title: 'Success', text: 'OTP sent to your email!' });
      navigate('/verify-otp');
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: error.message });
    }
  };

  const handleChange = (e) => {
    setOwnerData({ ...ownerData, [e.target.name]: e.target.value });
  };

  const checkFieldExists = async (field, value) => {
    // Client-side validation
    if (!value) return;

    // Email validation
    if (field === "email") {
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!emailRegex.test(value)) {
        setFieldErrors(prev => ({
          ...prev,
          email: "Invalid email address"
        }));
        return;
      }
    }

    // Phone number validation
    if (field === "phoneNumber") {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(value)) {
        setFieldErrors(prev => ({
          ...prev,
          phoneNumber: "Invalid phone number"
        }));
        return;
      }
    }

    // Username validation
    if (field === "username") {
      // Username: only letters, numbers, underscores, dots, not starting with _ or .
      const usernameRegex = /^(?![_.])[A-Za-z0-9._]+$/;
      if (!usernameRegex.test(value)) {
        setFieldErrors(prev => ({
          ...prev,
          username: "Invalid username"
        }));
        return;
      }
    }

    setFieldLoading(prev => ({ ...prev, [field]: true }));
    setFieldErrors(prev => ({ ...prev, [field]: '' }));
    try {
      const body = { [field]: value };
      const res = await api.post("auth/find-user", body);
      if (res.data.data) {
        setFieldErrors(prev => ({
          ...prev,
          [field]: `This ${field === "phoneNumber"? "phone number" : field} is already registered.`
        }));
      }
    } catch (err) {
      setFieldErrors(prev => ({
        ...prev,
        [field]: err.response?.data?.message || `Error checking ${field}.`
      }));
    } finally {
      setFieldLoading(prev => ({ ...prev, [field]: false }));
    }
  };
 
  const hasAnyError =
  !!error ||
  Object.values(fieldErrors).some((err) => err && err.length > 0);
  
  return (
    <div className="Section">
      <div className='down'>
        <Loginimage />
      </div>

      <div className="upper">
        <div style={{ paddingTop: "80px", paddingBottom: "80px" }} className=" ">
          <div className="card-body">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} className="mb-2">
              <p style={{ fontSize: "28px", fontWeight: "700", color: "black" }}>ANGINAT</p>
              <Link className="text-primary" to="/login"> <p style={{ marginRight: "10px", color: "#889292" }}>Back to home</p></Link>
            </div>
            <h4 style={{ fontSize: "24px", marginTop: "20px", fontWeight: "500" }} className=" mb-4 ">Admin Sign up</h4>
            {props.errorMessage && (
              <div className='text-danger'>
                {props.errorMessage}
              </div>
            )}
            {props.successMessage && (
              <div className='text-danger'>
                {props.successMessage}
              </div>
            )}
            
            <form onSubmit={handleGetOtp}>
              <div className="two-input" style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="Email-section form-group">
                  <label className="form-label">Email</label>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                      type="email"
                      name="email"
                      value={ownerData.email}
                      onChange={handleChange}
                      onBlur={e => checkFieldExists('email', e.target.value)}
                      className="form-control"
                      placeholder="Email"
                      required
                      style={{ flex: 1 }}
                    />
                    {fieldLoading.email ? (
                      <FaSpinner
                        style={{
                          marginLeft: 8,
                          fontSize: 18,
                          color: "#007bff",
                          animation: "spin 0.8s linear infinite"
                        }}
                      />
                    ) : (
                      ownerData.email && !fieldErrors.email && (
                        <FaCheckCircle
                          style={{
                            marginLeft: 8,
                            fontSize: 15,
                            color: "#28a745", // Bootstrap green
                            background: "#e6f9ec",
                            borderRadius: "50%"
                          }}
                        />
                      )
                    )}
                  </div>
                  {fieldErrors.email && (
                    <div className="text-danger" style={{ fontSize: "11px" }}>{fieldErrors.email}</div>
                  )}
                </div>
                <div className="phone-section form-group">
                  <label className="form-label">Phone no.</label>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={ownerData.phoneNumber}
                      onChange={handleChange}
                      onBlur={e => checkFieldExists('phoneNumber', e.target.value)}
                      className="form-control"
                      placeholder="Phone no."
                      required
                      style={{ flex: 1 }}
                    />
                    {fieldLoading.phoneNumber ? (
                      <FaSpinner
                        style={{
                          marginLeft: 8,
                          fontSize: 18,
                          color: "#007bff",
                          animation: "spin 0.8s linear infinite"
                        }}
                      />
                    ) : (
                      ownerData.phoneNumber && !fieldErrors.phoneNumber && (
                        <FaCheckCircle
                          style={{
                            marginLeft: 8,
                            fontSize: 15,
                            color: "#28a745",
                            background: "#e6f9ec",
                            borderRadius: "50%"
                          }}
                        />
                      )
                    )}
                  </div>
                  {fieldErrors.phoneNumber && (
                    <div className="text-danger" style={{ fontSize: "11px" }}>{fieldErrors.phoneNumber}</div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Username</label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="text"
                    name="username"
                    value={ownerData.username}
                    onChange={handleChange}
                    onBlur={e => checkFieldExists('username', e.target.value)}
                    className="form-control"
                    placeholder="Username"
                    required
                    style={{ flex: 1 }}
                  />
                  {fieldLoading.username ? (
                    <FaSpinner
                      style={{
                        marginLeft: 8,
                        fontSize: 18,
                        color: "#007bff",
                        animation: "spin 0.8s linear infinite"
                      }}
                    />
                  ) : (
                    ownerData.username && !fieldErrors.username && (
                      <FaCheckCircle
                        style={{
                          marginLeft: 8,
                          fontSize: 15,
                          color: "#28a745",
                          background: "#e6f9ec",
                          borderRadius: "50%"
                        }}
                      />
                    )
                  )}
                </div>
                {fieldErrors.username && (
                  <div className="text-danger" style={{ fontSize: "11px" }}>{fieldErrors.username}</div>
                )}
              </div>

              <div className="two-input" style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="Password-section mb-4 position-relative">
                  <label className="form-label">Password</label>
                  <input
                    value={password}
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span 
                    className={`show-pass eye ${showPassword ? 'active' : ''}`}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className="fa fa-eye-slash" />
                    <i className="fa fa-eye" />
                  </span>
                </div>

                <div className="conform-Password-section mb-4 position-relative">
                  <label className="form-label">Confirm Password</label>
                  <input
                    value={confirmPassword}
                    className="form-control"
                    placeholder="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <span 
                    className={`show-pass eye ${showConfirmPassword ? 'active' : ''}`}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <i className="fa fa-eye-slash" />
                    <i className="fa fa-eye" />
                  </span>
                </div>
              </div>

              <div>
                <div className="form-check custom-checkbox ms-1">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="basic_checkbox_1"
                    checked={agreeToTerms}
                    onChange={() => setAgreeToTerms(!agreeToTerms)}  // Toggle agreement state
                  />
                  
                    <label className="form-check-label" htmlFor="basic_checkbox_1">
                      I agree to the <span style={{ color: '#f9a19d' }}>Term Of Service</span> and <span style={{ color: '#f9a19d' }}>Privacy Policy.</span>
                    </label>
                  
                  {error && (
                    <div className="text-danger mb-3" style={{ fontSize: "12px" }}>{error}</div>
                  )}
                </div>
              </div>

              <div className="text-center mt-4">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={hasAnyError}
                >
                  Get OTP
                </button>
              </div>
            </form>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "0px", backgroundColor: "#fff5f4", paddingTop: "20px", paddingBottom: "20px", height: "240px" }}>
          <p className="sign-title" style={{ textAlign: "center" }}>Or sign in with</p>
          <div className='google-facebook' style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <div><img className='sign-img' style={{ width: "28px" }} src={google} alt="" /></div>
              <div><p className='sign-text' style={{ marginTop: "15px", color: "black", fontWeight: "500" }} >Sign in using Google</p></div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <div><img className='sign-img' style={{ width: "28px" }} src={facebook} alt="" /></div>
              <div><p className='sign-text' style={{ marginTop: "15px", color: "black", fontWeight: "500" }}>Sign in using Facebook</p></div>
            </div>
          </div>
          <div className="new-account mt-3">
            <p style={{ textAlign: "center" }}>
              Already have an account?{" "}
              <Link className="text-primary" to="/login">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};

 
export default connect(mapStateToProps)(Register);

<style>
{`
@keyframes spin {
  100% { transform: rotate(360deg); }
}
`}
</style>

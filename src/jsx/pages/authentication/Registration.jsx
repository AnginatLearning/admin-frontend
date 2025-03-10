import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { connect, useDispatch } from 'react-redux';
import { loadingToggleAction, signupAction } from '../../../store/actions/AuthActions';
import { useRegistration } from '../../../context/RegistrationContext';
import { sendOtpOnEmail } from "../../../services/api";  // Adjust the import according to your file structure

// images
import google from "../../../assets/images/download (1).png";
import facebook from "../../../assets/images/download (2).png";
import login from "../../../assets/images/login-img.png";
import Loginimage from "../../components/chatBox/Loginimage";

function Register(props) {
  const [showPassword, setShowPassword] = useState(false); // Toggle for Password field visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle for Confirm Password field visibility
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [agreeToTerms, setAgreeToTerms] = useState(false);  // New state to track checkbox for agreement
  const [error, setError] = useState('');  // Error message state for form validation
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
                  <input
                    type="email"
                    name="email"
                    value={ownerData.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="phone-section form-group">
                  <label className="form-label">Phone no.</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={ownerData.phoneNumber}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Phone no."
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  name="username"
                  value={ownerData.username}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Username"
                  required
                />
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
                 <div className="text-danger mb-3">{error}</div>  
                  )}
                </div>
              </div>

              <div className="text-center mt-4">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
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

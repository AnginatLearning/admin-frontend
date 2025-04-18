
import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loadingToggleAction, loginAction } from '../../../store/actions/AuthActions';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 



import google from "../../../assets/images/download (1).png";
import facebook from "../../../assets/images/download (2).png";
import logoFull from "../../../assets/images/logo-full.png";
import Loginimage from '../../components/chatBox/Loginimage';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isChecked, setIsChecked] = useState(false); 
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onLogin(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { email: '', password: '', checkbox: '' };

    if (email === '') {
      errorObj.email = 'Email is Required';
      error = true;
    }
    if (password === '') {
      errorObj.password = 'Password is Required';
      error = true;
    }

   

    setErrors(errorObj);

    if (error) {
      return;
    }

    dispatch(loadingToggleAction(true));
    dispatch(loginAction(email, password, navigate));
  }

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="">
      <div className="">
        <div className="">
          <div className="Section">
          <div className="down">
          <Loginimage />
          </div>
             

            <div className="upper">
              <div style={{ paddingTop: "80px", paddingBottom: "80px", backgroundColor:"white" }} className="signin">
                <div className="card-body">
                  

                  <h4 style={{ fontSize: "24px", marginTop: "20px", fontWeight: "500" }} className="mb-4">
                    Admin Login
                  </h4>
                  {props.errorMessage && (
                    <div className="text-danger p-1 my-2">
                      {props.errorMessage.message}
                    </div>
                  )}
                  {props.successMessage && (
                    <div className="text-danger p-1 my-2">
                      {props.successMessage}
                    </div>
                  )}
                  <form onSubmit={onLogin}>
                    <div className="input">
                      <div className="mb-3">
                        <label className="mb-1">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Type Your Email Address"
                        />
                        {errors.email && <div className="text-danger fs-12">{errors.email}</div>}
                      </div>
                      <div className="mb-3">
                        <label className="mb-1">Password</label>
                        <div className="position-relative">
                          <input
                            type={isPasswordVisible ? "text" : "password"} 
                            className="form-control"
                            value={password}
                            placeholder="Type Your Password"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          {password && (
                            <div
                              onClick={togglePasswordVisibility}
                              style={{ position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)", cursor: "pointer" }}
                            >
                              {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                            </div>
                          )}
                        </div>
                        {errors.password && <div className="text-danger fs-12">{errors.password}</div>}
                      </div>

                      <div>
                        <p className="password" onClick={handleForgotPassword} style={{ cursor: "pointer" }}>
                          Forgot Password?
                        </p>
                      </div>
                    </div>

                    <div className="row d-flex justify-content-between mt-4 mb-2">
                      <div className="mb-3">
                        <div className="form-check custom-checkbox ms-1">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="basic_checkbox_1"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                          />
                          <label className="form-check-label" htmlFor="basic_checkbox_1">
                            Remember my preference
                          </label>
                        </div>
                     
                      </div>
                    </div>

                    <div style={{ marginTop: "20px" }} className="text-center">
                      <button type="submit" className="btn btn-primary btn-block">
                        Login 
                      </button>
                    </div>
                  </form>
                  <div className="new-account mt-3">
                      <p style={{ textAlign: "center" }}>
                        New user? <Link to="/select-one" className="text-primary">Create an Account</Link>
                      </p>
                  </div>
                </div>
              </div>
             
              {/*<div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "0px", backgroundColor: "#fff5f4", paddingTop: "20px", paddingBottom: "20px", height: "240px" }}>
                    <p className="sign-title" style={{ fontSize: "15px", textAlign: "center" }}>
                      Or login with
                    </p>
                    <div className="google-facebook" style={{ display: "flex", justifyContent: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <div><img className="sign-img" style={{ width: "28px" }} src={google} alt="" /></div>
                        <div><p className="sign-text" style={{ marginTop: "15px", color: "black", fontWeight: "500" }}>Sign in using google</p></div>
                      </div>
                      
                    </div> 
                    <div className="new-account mt-3">
                      <p style={{ textAlign: "center" }}>
                        New user? <Link to="/select-one" className="text-primary">Create an Account</Link>
                      </p>
                    </div>
                  </div>*/}
              
            </div>
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

export default connect(mapStateToProps)(Login);

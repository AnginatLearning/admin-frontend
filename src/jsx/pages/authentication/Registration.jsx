import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { connect, useDispatch } from 'react-redux';
import {
  loadingToggleAction,
  signupAction,
} from '../../../store/actions/AuthActions';

// image
import google from "../../../assets/images/download (1).png";
import facebook from "../../../assets/images/download (2).png";
import login from "../../../assets/images/login-img.png";
import logoFull from "../../../assets/images/logo-full.png";

function Register(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  let errorsObj = { email: '', password: '' };
  const [errors, setErrors] = useState(errorsObj);
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate()
  function onSignUp(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (email === '') {
      errorObj.email = 'Email is Required';
      error = true;
      Swal.fire({
        icon: 'error',
        title: 'Oops',
        text: errorObj.email,
      })
    }
    if (password === '') {
      errorObj.password = 'Password isd Require';
      error = true;
      Swal.fire({
        icon: 'error',
        title: 'Oops',
        text: errorObj.password,
      })
    }
    setErrors(errorObj);
    if (error) return;
    dispatch(loadingToggleAction(true));
    dispatch(signupAction(email, password, navigate));
  }

  const handleSelectone = () => {
    navigate('/verify-otp');
};
  return (
    

    <div className="Section">

      <div className='down'>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", flexDirection: "column", gap: "20px" }} className='down-body'>
          <div ><img className='login-img' src={login} alt="" /></div>
          <div><p style={{ fontSize: "28px", color: "black", fontWeight: "500" }}>Welcome To <br />Spring Learns</p></div>
          <p style={{ fontSize: "15px", textAlign: "center" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
        </div>

      </div>

      <div className="upper">
        <div style={{ paddingTop: "80px", paddingBottom: "80px" }} className=" ">
          <div className="card-body">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} className="mb-2">
              <p style={{ fontSize: "28px", fontWeight: "700", color: "black" }}>ANGINAT</p>
              <Link className="text-primary" to="/login"> <p style={{ marginRight: "10px", color: "#889292" }}>Back to home</p>  </Link>
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
            <form onSubmit={onSignUp}>
              <div className="two-input" style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="Email-section form-group">
                  <label className="form-label">Email</label>
                  <input

                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    placeholder="email"
                  />
                  {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>
                <div className="phone-section form-group">
                  <label className="form-label">Phone no.</label>
                  <input

                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    placeholder="Phone no."
                  />

                </div>

              </div>



              <div className="form-group">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="username"
                />
              </div>

              <div className="two-input" style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="Password-section mb-4 position-relative">
                  <label className="form-label">Password</label>
                  <input defaultValue={password} className="form-control" placeholder="password"
                    type={`${showPassword ? "text" : "password"}`}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                  />
                  <span className={`show-pass eye ${showPassword ? 'active' : ''}`}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className="fa fa-eye-slash" />
                    <i className="fa fa-eye" />
                  </span>
                  {errors.password && <div className="text-danger">{errors.password}</div>}
                </div>

                <div className="conform-Password-section mb-4 position-relative">
                  <label className="form-label">Confirm Password</label>
                  <input defaultValue={password} className="form-control" placeholder="password"
                    type={`${showPassword ? "text" : "password"}`}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                  />
                  <span className={`show-pass eye ${showPassword ? 'active' : ''}`}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className="fa fa-eye-slash" />
                    <i className="fa fa-eye" />
                  </span>
                  {errors.password && <div className="text-danger">{errors.password}</div>}
                </div>
              </div>


              <div>
                <div className="form-check custom-checkbox ms-1">
                  <input type="checkbox" className="form-check-input" id="basic_checkbox_1" />
                  <label className="form-check-label" htmlFor="basic_checkbox_1">I agree to the <span style={{ color: '#f9a19d' }}>Term Of Service</span> and <span style={{ color: '#f9a19d' }}>Privacy Policy.</span></label>
                </div>

              </div>

              <div className="text-center mt-4">
                <button
                onClick={handleSelectone}
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
          <p className="sign-title" style={{  textAlign: "center" }}>Or sign in with</p>
          <div className='google-facebook' style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <div><img className='sign-img' style={{ width: "28px" }} src={google} alt="" /></div>
              <div><p className='sign-text' style={{ marginTop: "15px", color: "black", fontWeight: "500" }} >Sign in using google</p></div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <div><img className='sign-img' style={{ width: "28px" }} src={facebook} alt="" /></div>
              <div><p className='sign-text' style={{ marginTop: "15px", color: "black", fontWeight: "500" }}>Sign in using  facebook</p></div>
            </div>
          </div>
          <div className="new-account mt-3">
          <p style={{ textAlign: "center" }} className="">
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
};

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};

export default connect(mapStateToProps)(Register);


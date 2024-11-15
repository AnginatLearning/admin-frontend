import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// images
import login from "../../../assets/images/login-img.png";
import google from "../../../assets/images/download (1).png";
import facebook from "../../../assets/images/download (2).png";
import Loginimage from '../../components/chatBox/Loginimage';
import api from '../../../services/AxiosInstance';

function Forgetpassword(props) {
    
    const [email, setEmail] = useState('');
    let errorsObj = { email: '', password: '' };
    const [errors, setErrors] = useState(errorsObj);
    const [touched, setTouched] = useState(false);
    const [loading, setLoading] = useState(false);  // For handling loading state
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const onLogin = async (e) => {
        e.preventDefault();
        let error = false;
        const errorObj = { ...errorsObj };

        if (email === '') {
            errorObj.email = 'Email is required';
            error = true;
        } else if (!validateEmail(email)) {
            errorObj.email = 'Please enter a valid email address';
            error = true;
        } else {
            errorObj.email = ''; 
        }

        setErrors(errorObj);
        setTouched(true); 
        if (error) {
            return;
        }

        // Make the API call for forgot password using POST method with axios
        try {
            setLoading(true);  // Show loader while waiting for response

            const response = await api.post('auth/forgot-password', {
                email: email,
                otpType: 'email',  // Assuming otpType is email for email-based verification
            });

            if (response.status === 200) {
                // If the API call is successful, navigate to the OTP verification page
                next();
            } else {
                // Handle API error (e.g., user not found or other issues)
                setErrors({ ...errors, email: response.data.message || 'Something went wrong' });
            }
        } catch (err) {
            console.error('Error:', err);
            setErrors({ ...errors, email: 'Failed to connect to the server' });
        } finally {
            setLoading(false);  // Hide loader after response
        }
    };

    const next = () => {
        navigate("/forgotpass-verify-otp", { state: { email } });
    };

    return (
        <div>
            <div className="Section">
                <div className='down'>
                  <Loginimage />
                </div>

                <div className='upper'>
                    <div style={{ paddingTop: "130px", paddingBottom: "210px" }}>
                        <div className="card-body">
                            <div style={{display:'flex',alignItems:"center",justifyContent:"space-between"}} className="mb-2">
                                <p style={{ fontSize: "28px", fontWeight: "700", color: "black" }}>ANGINAT</p>
								<Link className="text-primary" to="/login"> <p style={{ marginRight: "10px", color: "#889292" }}>Back to home</p>  </Link>
                            </div>

                            <h4 style={{ fontSize: "24px", marginTop: "20px", fontWeight: "500" }} className="mb-4">Forgot Password</h4>
                            <form onSubmit={onLogin}>
                                <div className='input'>
                                    <div style={{ marginTop: "20px" }} className="mb-3">
                                        <label className="mb-1">Email</label>
                                        <input type="email" className="form-control"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                if (e.target.value !== '') setTouched(true);
                                            }}
                                            placeholder="Type Your Email Address"
                                        />
                                        {touched && errors.email && <div className="text-danger fs-12">{errors.email}</div>}
                                    </div>
                                </div>
                                <div style={{ marginTop: "20px" }} className="text-center">
                                    <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                                        {loading ? 'Loading...' : 'Next'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className='sign-in' style={{ display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "0px", backgroundColor: "#fff5f4", paddingTop: "20px", paddingBottom: "20px", height: "240px" }}>
                        <p className='sign-title' style={{ fontSize: "15px", textAlign: "center" }}>Or sign in with</p>
                        <div className='google-facebook' style={{ display: "flex", justifyContent: "center" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                <div><img className='sign-img' style={{ width: "28px" }} src={google} alt="" /></div>
                                <div><p className='sign-text' style={{ marginTop: "15px", color: "black", fontWeight: "500" }}>Sign in using Google</p></div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                <div><img className='sign-img' style={{ width: "28px" }} src={facebook} alt="" /></div>
                                <div><p className='sign-text' style={{ marginTop: "15px", color: "black", fontWeight: "500" }}>Sign in using Facebook</p></div>
                            </div>
                        </div>
                        <div className="new-account mt-3">
                            <p style={{ textAlign: "center" }}>New user? <Link to="/page-register" className="text-primary">Create an Account</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Forgetpassword;

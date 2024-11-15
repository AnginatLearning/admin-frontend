import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegistration } from '../../../context/RegistrationContext'; // Import your context
import Swal from 'sweetalert2'; // For alert notifications

// images
import login from "../../../assets/images/login-img.png";
import google from "../../../assets/images/download (1).png";
import facebook from "../../../assets/images/download (2).png";
import { verifyOtpOnEmail } from '../../../services/api';
import axios from 'axios';
import Loginimage from '../../components/chatBox/Loginimage';
import api from '../../../services/AxiosInstance';

function SignUpOTP() {

    const { ownerData, institutionType, institutionData } = useRegistration(); // Access owner data from context
    const [otp, setOtp] = useState(Array(6).fill('')); // State to hold OTP inputs
    const navigate = useNavigate();
    const handleChange = (e, index) => {
        const value = e.target.value;

        if (!/^\d*$/.test(value) || value.length > 1) {
            return; // Ignore non-numeric input and more than one character
        }

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // Only keep the last character

        // Move to the next input if the current input is filled
        if (value.length === 1 && index < 5) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }

        setOtp(newOtp);
    };

    const handleKeyDown = (e, index) => {
        // Handle left/right arrow keys and backspace
        if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
            document.getElementById(`otp-input-${index - 1}`).focus();
        } else if (e.key === 'ArrowLeft' && index > 0) {
            document.getElementById(`otp-input-${index - 1}`).focus();
        } else if (e.key === 'ArrowRight' && index < 5) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpCode = otp.join('');

        // Call API to verify OTP
        try {
            const response = await verifyOtpOnEmail(otpCode,ownerData.email);
            console.log(response)
            // const data = await response;
            if (response.status === "success") {
                // OTP verification successful
                Swal.fire('Success', 'OTP verified successfully!', 'success');

                // Now register the institution
                await registerInstitution();
            } else {
                // Handle failure case
                Swal.fire('Error', 'Invalid OTP. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            Swal.fire('Error', 'Something went wrong. Please try again later.', 'error');
        }
    };

    const registerInstitution = async () => {
        // Prepare payload for registration
        const academyType = institutionType
        const payload = {
            email: ownerData.email,
            phoneNumber: ownerData.phoneNumber,
            username: ownerData.username,
            password: ownerData.password,
            role: "admin",
            status: "active",
            institutionData: {
                name: institutionData.name, // Adjust based on your context
                address: institutionData.address, // Adjust based on your context
                institutionType: academyType, // Correctly map institution type
                email: institutionData.email, // Adjust based on your context
                domainName: institutionData.domainName, // Adjust based on your context
                status: "active",
            }
        };
    
        try {
            console.log(payload)
            const response = await api.post('auth/register', payload);
    
           
            if (response.data.status === "success") {
                Swal.fire('Success', 'Institution registered successfully! Now you may login with the Email and Password', 'success');
               
                navigate('/login')
            } else {
              
                Swal.fire('Error', response.data.message || 'Registration failed. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Error registering institution:', error);
    
            // If error response is available, display specific message
            if (error.response && error.response.data && error.response.data.message) {
                Swal.fire('Error', error.response.data.message, 'error');
            } else {
                // Fallback for any other types of errors
                Swal.fire('Error', 'An unexpected error occurred. Please try again later.', 'error');
            }
        }
    };

    return (
        <div>
            <div className="Section">
                <div className='down'>
                   <Loginimage />
                </div>

                <div className='upper'>
                    <div style={{ paddingTop: "100px", paddingBottom: "80px" }}>
                        <div className="card-body">
                            <div style={{ display: "flex", justifyContent: 'space-between', alignItems: "center" }} className="mb-2">
                                <p style={{ fontSize: "28px", fontWeight: "700", color: "black" }}>ANGINAT</p>
                                <Link className="text-primary" to="/login"> <p style={{ marginRight: "10px", color: "#889292" }}>Back to home</p>  </Link>
                            </div>

                            <h4 style={{ fontSize: "24px", marginTop: "20px", fontWeight: "500" }} className="mb-4">Verify OTP Code</h4>
                            <p>Please enter the 6-digit code we sent to</p>
                            <p><a href="#">{ownerData.email}</a></p>
                            <form onSubmit={handleSubmit}>
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', marginBottom: '20px', width: '70%' }}>
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            id={`otp-input-${index}`}
                                            type="text"
                                            value={digit}
                                            maxLength="1"
                                            onChange={(e) => handleChange(e, index)}
                                            onKeyDown={(e) => handleKeyDown(e, index)} // Added key down event
                                            className='verify-input text-center'
                                        />
                                    ))}
                                </div>
                                <a style={{ textAlign: "center" }}>Didn’t Receive OTP? <span style={{ color: "red" }}>Resend OTP</span></a>
                                <div style={{ marginTop: "20px" }} className="text-center">
                                    <button type="submit" className="btn btn-primary btn-block">Verify</button>
                                </div>
                                <div style={{ marginTop: "20px" }}>
                                    <p style={{ textAlign: "center" }}>OTP will expire in <span style={{ color: "red" }}>09:59s</span> </p>
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

export default SignUpOTP;

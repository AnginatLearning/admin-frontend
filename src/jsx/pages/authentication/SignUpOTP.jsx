import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegistration } from '../../../context/RegistrationContext'; 
import Swal from 'sweetalert2'; 


import login from "../../../assets/images/login-img.png";
import google from "../../../assets/images/download (1).png";
import facebook from "../../../assets/images/download (2).png";
import { verifyOtpOnEmail } from '../../../services/api';
import axios from 'axios';
import Loginimage from '../../components/chatBox/Loginimage';
import api from '../../../services/AxiosInstance';
import { CiEdit } from 'react-icons/ci';

function SignUpOTP() {

    const { ownerData, institutionType, institutionData } = useRegistration();
    const [timer, setTimer] = useState(600);
    const [resending, setResending] = useState(false);
    const [isResendDisabled, setIsResendDisabled] = useState(false);
    const [otp, setOtp] = useState(Array(6).fill(''));
    const navigate = useNavigate();
    const handleChange = (e, index) => {
        const value = e.target.value;

        if (!/^\d*$/.test(value) || value.length > 1) {
            return;
        }

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);


        if (value.length === 1 && index < 5) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }

        setOtp(newOtp);
    };

    const handleKeyDown = (e, index) => {

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


        try {
            const response = await verifyOtpOnEmail(otpCode, ownerData.email);
            console.log(response)

            if (response.status === "success") {

                Swal.fire('Success', 'OTP verified successfully!', 'success');


                await registerInstitution();
            } else {

                Swal.fire('Error', 'Invalid OTP. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            Swal.fire('Error', 'Something went wrong. Please try again later.', 'error');
        }
    };

    const registerInstitution = async () => {

        const academyType = institutionType
        const payload = {
            email: ownerData.email,
            phoneNumber: ownerData.phoneNumber,
            username: ownerData.username,
            password: ownerData.password,
            role: "admin",
            status: "active",
            institutionData: {
                name: institutionData.name,
                address: institutionData.address,
                institutionType: academyType,
                email: institutionData.email,
                domainName: institutionData.domainName,
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


            if (error.response && error.response.data && error.response.data.message) {
                Swal.fire('Error', error.response.data.message, 'error');
            } else {

                Swal.fire('Error', 'An unexpected error occurred. Please try again later.', 'error');
            }
        }
    };
    const editEmail = () => {
        navigate('/register');
    };

    const handleResendOTP = () => {
        if (resending || isResendDisabled) return;

        setResending(true);
        setIsResendDisabled(true); 
        setTimeout(() => {
            Swal.fire({
                title: 'OTP Resent!',
                text: 'A new OTP has been sent to your email.',
                icon: 'success',
                confirmButtonText: 'Okay',
            });
            setTimer(600);
            setResending(false);
        }, 2000);
    };

    useEffect(() => {
        if (timer === 0) {
            setIsResendDisabled(false);
            return;
        }

        const interval = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer === 0) {
                    clearInterval(interval);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
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
                            <div style={{ display: "flex", gap: "5px", marginBottom: "5px" }}>
                                <a style={{ textDecoration: "underline" }} href="#">{ownerData.email}</a>
                                <CiEdit onClick={editEmail} size={18} />
                            </div>

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
                                <a style={{ textAlign: "center" }}>Didn’t Receive OTP? <span
                                    style={{
                                        color: isResendDisabled ? 'gray' : 'red',
                                        cursor: isResendDisabled ? 'not-allowed' : 'pointer',
                                        textDecoration: isResendDisabled ? 'none' : 'underline'
                                    }}
                                    onClick={!isResendDisabled ? handleResendOTP : null}
                                >
                                    {resending ? 'Resending...' : 'Resend OTP'}
                                </span></a>
                                <div style={{ marginTop: "20px" }} className="text-center">
                                    <button type="submit" className="btn btn-primary btn-block">Verify</button>
                                </div>
                                <div style={{ marginTop: "20px" }}>
                                    <p style={{ textAlign: "center" }}>OTP will expire in <span style={{ color: "red" }}>{formatTime(timer)}</span> </p>
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

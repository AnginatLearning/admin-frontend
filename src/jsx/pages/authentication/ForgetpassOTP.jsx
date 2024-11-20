import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { CiEdit } from "react-icons/ci";
import Loginimage from '../../components/chatBox/Loginimage';
import google from "../../../assets/images/download (1).png";
import facebook from "../../../assets/images/download (2).png";
import axios from 'axios';
import api from '../../../services/AxiosInstance';

function SignUpOTP(props) {
    const location = useLocation();
    const { email } = location.state || {};
    const navigate = useNavigate();

    const [otp, setOtp] = useState(Array(6).fill(''));
    const [timer, setTimer] = useState(600);
    const [resending, setResending] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [isResendDisabled, setIsResendDisabled] = useState(false);

    let typingTimeout;

  
    useEffect(() => {
        if (email) {
            sessionStorage.setItem('email', email); 
        }
    }, [email]);

    const handleChange = (e, index) => {
        const value = e.target.value;
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);

        if (value.length === 1 && index < 5) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }

        if (value.length === 0 && index > 0) {
            document.getElementById(`otp-input-${index - 1}`).focus();
        }

        setOtp(newOtp);

        if (typingTimeout) clearTimeout(typingTimeout);

        setIsTyping(true);
        typingTimeout = setTimeout(() => {
            setIsTyping(false);
        }, 500);
    };

    useEffect(() => {
        const allFilled = otp.every(digit => digit !== '');
        if (allFilled && !isTyping) {
            setIsTyping(false);
        }
    }, [otp, isTyping]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpString = otp.join(''); 
        console.log("OTP Submitted: ", otpString);

        try {
            const response = await api.post('auth/otp/verify', {
                otp: otpString,
                otpType: 'email',
                receiverId: email,  
            });

            if (response.status === 200) {
                Swal.fire({
                    title: 'Success!',
                    text: 'OTP verified successfully!',
                    icon: 'success',
                    confirmButtonText: 'Go to Reset Password',
                }).then(() => {
                    navigate('/reset-password', { state: email });
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Invalid OTP, please try again.',
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to verify OTP, please try again.',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
            console.error(error);
        }
    };

    const verify = () => {
        handleSubmit();
    };

    const editEmail = () => {
        navigate('/forgot-password', { state: { email } });
    };

    const handleResendOTP = () => {
        if (resending || isResendDisabled) return;

        setResending(true);
        setIsResendDisabled(true); // Disable "Resend OTP" link
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

    const isOtpComplete = otp.every(digit => digit !== '');

    return (
        <div>
            <div className="Section">
                <div className='down'>
                    <Loginimage />
                </div>

                <div className='upper'>
                    <div style={{ paddingTop: "100px", paddingBottom: "100px" }}>
                        <div className="card-body">
                            <div style={{ display: "flex", justifyContent: 'space-between', alignItems: "center" }} className="mb-2">
                                <p style={{ fontSize: "28px", fontWeight: "700", color: "black" }}>ANGINAT</p>
                                <Link className="text-primary" to="/login">
                                    <p style={{ marginRight: "10px", color: "#889292" }}>Back to home</p>
                                </Link>
                            </div>

                            <h4 style={{ fontSize: "24px", marginTop: "20px", fontWeight: "500" }} className="mb-4">Verify OTP Code</h4>
                            <p>Please enter the 6-digit code we sent to</p>
                            <form onSubmit={handleSubmit}>
                                <div style={{ display: "flex", gap: "5px" }}>
                                    <a style={{ textDecoration: "underline" }} href="#">{email}</a>
                                    <CiEdit onClick={editEmail} size={18} />
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "10px" }}>
                                    <div className='inputs' style={{ display: 'flex', flexDirection: 'row' }}>
                                        {otp.map((digit, index) => (
                                            <input
                                                style={{ textAlign: "center" }}
                                                key={index}
                                                id={`otp-input-${index}`}
                                                type="text"
                                                value={digit}
                                                maxLength="1"
                                                onChange={(e) => handleChange(e, index)}
                                                className='verify-input'
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div style={{ marginTop: "80px" }}>
                                    <div style={{ marginTop: "20px", textAlign: "center" }}>
                                        <p style={{ textAlign: "center" }}>
                                            Didn’t Receive OTP? 
                                            <span 
                                                style={{ 
                                                    color: isResendDisabled ? 'gray' : 'red', 
                                                    cursor: isResendDisabled ? 'not-allowed' : 'pointer',
                                                    textDecoration: isResendDisabled ? 'none' : 'underline'
                                                }} 
                                                onClick={!isResendDisabled ? handleResendOTP : null}
                                            >
                                                {resending ? 'Resending...' : 'Resend OTP'}
                                            </span>
                                        </p>
                                    </div>

                                    <div onClick={verify} style={{ marginTop: "20px" }} className="text-center">
                                        <button 
                                            type="submit" 
                                            className="btn btn-primary btn-block" 
                                            disabled={isTyping}
                                        >
                                            Verify
                                        </button>
                                    </div>

                                    <div style={{ marginTop: "20px" }}>
                                        <p style={{ textAlign: "center" }}>OTP will expire in <span style={{ color: "red" }}>{formatTime(timer)}</span></p>
                                    </div>
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

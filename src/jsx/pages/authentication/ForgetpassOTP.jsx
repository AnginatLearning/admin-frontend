import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// images
import login from "../../../assets/images/login-img.png";
import google from "../../../assets/images/download (1).png";
import facebook from "../../../assets/images/download (2).png";

function  SignUpOTP(props) {
    const [otp, setOtp] = useState(Array(6).fill('')); // State to hold OTP inputs

    const handleChange = (e, index) => {
        const value = e.target.value;
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // Only keep the last character

        // Move to the next input if the current input is filled
        if (value.length === 1 && index < 5) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }

        // Move to the previous input if backspace is pressed
        if (value.length === 0 && index > 0) {
            document.getElementById(`otp-input-${index - 1}`).focus();
        }

        setOtp(newOtp);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit the OTP
        console.log("OTP Submitted: ", otp.join(''));
    };
    const navigate = useNavigate()
    const verify = () => {

        navigate('/reset-password')
    }
 
    return (
        <div>
            <div className="Section">
                <div className='down'>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", flexDirection: "column", gap: "20px" }} className='down-body'>
                        <div><img style={{ width: "400px" }} className='login-img' src={login} alt="" /></div>
                        <div><p style={{ fontSize: "28px", color: "black", fontWeight: "500" }}>Welcome To <br />Spring Learns</p></div>
                        <p style={{ fontSize: "15px", textAlign: "center" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                    </div>
                </div>

                <div className='upper'>
                    <div style={{ paddingTop: "100px", paddingBottom: "100px" }}>
                        <div className="card-body">
                            <div style={{display:"flex",justifyContent:'space-between',alignItems:"center"}} className="mb-2">
                                <p style={{ fontSize: "28px", fontWeight: "700", color: "black" }}>ANGINAT</p>
                                <Link className="text-primary" to="/login"> <p style={{ marginRight: "10px", color: "#889292" }}>Back to home</p>  </Link>
                            </div>

                            <h4 style={{ fontSize: "24px", marginTop: "20px", fontWeight: "500" }} className="mb-4">Verify OTP Code</h4>
                            <p>Please enter the 6-digit code we sent to</p>
                            <form onSubmit={handleSubmit}>
                                <p><a href="http://">kamlesh1223@gmail.com</a></p>
                                <div style={{display:"flex",flexDirection:"column",gap:"20px"}}>

                               
                                <div className='inputs' style={{ display: 'flex', justifyContent: '' ,flexDirection:'row'}}>
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            id={`otp-input-${index}`}
                                            type="text"
                                            value={digit}
                                            maxLength="1"
                                            onChange={(e) => handleChange(e, index)}
                                             className='verify-input'
                                            // style={{ width: "50px", height: "50px", textAlign: "center", fontSize: "24px", margin: "0 5px",borderRadius:"10px" }}
                                        />
                                    ))}
                                </div>

                                
                               

                            
                                
                             </div>
                                

                                <div style={{marginTop:"80px"}}>

                                
                                <div  style={{ marginTop: "20px",textAlign:"center" }}>
                                <a style={{textAlign:"center"}}>Didn’t Receive OTP ? <span  style={{color:"red"}}>Resend OTP</span> </a>
                                </div>
                              
                              
                                <div onClick={verify} style={{ marginTop: "20px" }} className="text-center">
                                    <button type="submit" className="btn btn-primary btn-block">Verify</button>
                                </div>

                                <div style={{marginTop:"20px"}}>
                                    <p style={{textAlign:"center"}}>OTP will expire in <span style={{color:"red"}}>09:59s</span> </p>
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

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// images
import login from "../../../assets/images/login-img.png";
import google from "../../../assets/images/download (1).png";
import facebook from "../../../assets/images/download (2).png";


function Resetpassword(props) {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validatePassword = (password) => {
        const lengthCheck = password.length >= 8;
        const capitalLetterCheck = /[A-Z]/.test(password);
        const validSymbolsCheck = /^[A-Za-z0-9_.]*$/.test(password);
        
        return lengthCheck && capitalLetterCheck && validSymbolsCheck;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validatePassword(newPassword)) {
            setError('Password must be at least 8 characters long, contain at least one capital letter, and only include letters, numbers, underscores (_), or periods (.)');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        setError('');
        // Proceed with password reset logic (e.g., API call)
        console.log("Password reset successfully!");
    };

    return (
        <div>
            <div className="Section">
                <div className='down'>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", flexDirection: "column", gap: "20px" }} className='down-body'>
                        <div><img style={{ width: "400px" }} className='login-img' src={login} alt="" /></div>
                        <div><p style={{ fontSize: "28px", color: "black", fontWeight: "500" }}>Welcome To <br />Spring Learns</p></div>
                        <p style={{ fontSize: "15px", textAlign: "center" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                    </div>
                </div>

                <div className='upper'>
                    <div style={{ paddingTop: "100px", paddingBottom: "180px" }}>
                        <div className="card-body">
                            <div className="mb-2">
                                <p style={{ fontSize: "28px", fontWeight: "700", color: "black" }}>ANGINAT</p>
                            </div>

                            <h4 style={{ fontSize: "24px", marginTop: "20px", fontWeight: "500" }} className="mb-4">Create New Password</h4>
                            <form onSubmit={handleSubmit}>
                                <div className='input'>
                                    <div style={{ marginTop: "20px" }} className="mb-3">
                                        <label className="mb-1">New password</label>
                                        <div style={{ position: 'relative' }}>
                                            <input 
                                                type={showNewPassword ? "text" : "password"} 
                                                className="form-control"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                placeholder="Type Your New Password"
                                            />
                                            <button 
                                                type="button" 
                                                onClick={() => setShowNewPassword(!showNewPassword)} 
                                                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer' }}
                                            >
                                                {showNewPassword ? <i className="fa fa-eye-slash" /> :  <i className="fa fa-eye" />}
                                            </button>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: "10px" }} className="mb-3">
                                        <label className="mb-1">Confirm New password</label>
                                        <div style={{ position: 'relative' }}>
                                            <input 
                                                type={showConfirmPassword ? "text" : "password"} 
                                                className="form-control"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                placeholder="Re-enter Your New Password"
                                            />
                                            <button 
                                                type="button" 
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                                                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer' }}
                                            >
                                                {showConfirmPassword ?  <i className="fa fa-eye-slash" /> :  <i className="fa fa-eye" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                                <div style={{ marginTop: "20px" }} className="text-center">
                                    <button type="submit" className="btn btn-primary btn-block">Next</button>
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

export default Resetpassword;

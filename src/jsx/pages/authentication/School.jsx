import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// images
import login from "../../../assets/images/login-img.png";
import Loginimage from '../../components/chatBox/Loginimage';

function School(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [domain, setDomain] = useState('');
    const [agree, setAgree] = useState(false); // State to track checkbox
    const [checkboxError, setCheckboxError] = useState(''); // State to track checkbox error

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [domainError, setDomainError] = useState('');

    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const validateDomain = (domain) => {
        const domainPattern = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return domainPattern.test(domain);
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        if (!value) {
            setEmailError('School Email is required.');
        } else if (!validateEmail(value)) {
            setEmailError('Please enter a valid email address.');
        } else {
            setEmailError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setNameError('');
        setEmailError('');
        setAddressError('');
        setDomainError('');
        setCheckboxError('');

        let valid = true;

        if (!name) {
            setNameError('School Name is required.');
            valid = false;
        }

        if (!email) {
            setEmailError('School Email is required.');
            valid = false;
        } else if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
            valid = false;
        }

        if (!address) {
            setAddressError('School Address is required.');
            valid = false;
        }

        if (!domain) {
            setDomainError('Institute Domain Name is required.');
            valid = false;
        } else if (!validateDomain(domain)) {
            setDomainError('Please enter a valid domain name (e.g., springlearns.com).');
            valid = false;
        }

        if (!agree) {
            setCheckboxError('You must agree to the Terms of Service and Privacy Policy.');
            valid = false;
        }

        if (valid) {
            await Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Your information has been submitted.',
            });

            navigate("/register");
        }
    };

    return (
        <div>
            <div className="Section">
                <div className='down'>
                    <Loginimage />
                </div>

                <div className='upper'>
                    <div style={{ paddingTop: "100px", paddingBottom: "100px" }}>
                        <div className="card-body">
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} className="mb-2">
                                <p style={{ fontSize: "28px", fontWeight: "700", color: "black" }}>ANGINAT</p>
                                <Link className="text-primary" to="/login"> <p style={{ marginRight: "10px", color: "#889292" }}>Back to home</p>  </Link>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className='input'>
                                    <div className="mb-3">
                                        <label className="form-label">School Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Type Your Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        {nameError && <div className="text-danger fs-12">{nameError}</div>}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">School Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Type Your Email"
                                            value={email}
                                            onChange={handleEmailChange}
                                        />
                                        {emailError && <div className="text-danger fs-12">{emailError}</div>}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">School Address</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Type Your Address"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                        {addressError && <div className="text-danger fs-12">{addressError}</div>}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">School Domain Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="e.g., springlearns.com"
                                            value={domain}
                                            onChange={(e) => setDomain(e.target.value)}
                                        />
                                        {domainError && <div className="text-danger fs-12">{domainError}</div>}
                                        <div className="form-text">Please enter your institute's domain in the correct format (e.g., springlearns.com).</div>
                                    </div>
                                </div>

                                <div style={{ marginTop: "20px" }} className="form-check custom-checkbox ms-1">
                                    <input 
                                        type="checkbox" 
                                        className="form-check-input" 
                                        id="basic_checkbox_1"
                                        checked={agree}
                                        onChange={(e) => setAgree(e.target.checked)} 
                                    />
                                    <label className="form-check-label" htmlFor="basic_checkbox_1">
                                        I agree to the <span style={{ color: '#f9a19d' }}>Term Of Service</span> and <span style={{ color: '#f9a19d' }}>Privacy Policy.</span>
                                    </label>
                                    {checkboxError && <div className="text-danger fs-12">{checkboxError}</div>}
                                </div>

                                <div style={{ marginTop: "20px" }} className="text-center">
                                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default School;

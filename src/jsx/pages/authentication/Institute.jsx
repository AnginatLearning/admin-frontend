import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';


// Images
import login from "../../../assets/images/login-img.png";
import { useRegistration } from '../../../context/RegistrationContext';

function Institute() {
    const {
        institutionData,
        setInstitutionData,
        institutionType,
    } = useRegistration(); // Access global state and setter functions

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [domainError, setDomainError] = useState('');

    const navigate = useNavigate();
    const location = useLocation(); // Access current route location

    // Determine if the current route should display "School" or "Institute"
    const label = location.pathname.includes("school") ? "School" : "Institute";

    // Validation functions
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validateDomain = (domain) => /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(domain);

    // Initialize form data with context values
    useEffect(() => {
        setInstitutionData((prevData) => ({
            ...prevData,
            type: institutionType,
        }));
    }, [institutionType, setInstitutionData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInstitutionData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setNameError('');
        setEmailError('');
        setAddressError('');
        setDomainError('');

        let valid = true;

        // Validations
        if (!institutionData.name) {
            setNameError(`${label} Name is required.`);
            valid = false;
        }
        if (!institutionData.email || !validateEmail(institutionData.email)) {
            setEmailError(!institutionData.email ? `${label} Email is required.` : 'Please enter a valid email address.');
            valid = false;
        }
        if (!institutionData.address) {
            setAddressError(`${label} Address is required.`);
            valid = false;
        }
        if (!institutionData.domainName || !validateDomain(institutionData.domainName)) {
            setDomainError(!institutionData.domainName ? `${label} Domain is required.` : 'Enter a valid domain (e.g., springlearns.com).');
            valid = false;
        }

        // If all validations pass
        if (valid) {
            await Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Your information has been submitted.',
            });
            navigate("/page-register"); // Navigate to the next step
        }
    };

    return (
        <div>
            <div className="Section">
                <div className='down'>
                    <div className='down-body' style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100vh", flexDirection: "column", gap: "20px" }}>
                        <img style={{ width: "400px" }} className='login-img' src={login} alt="" />
                        <p style={{ fontSize: "28px", color: "black", fontWeight: "500" }}>Welcome To <br />Spring Learns</p>
                        <p style={{ fontSize: "15px", textAlign: "center" }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                        </p>
                    </div>
                </div>

                <div className='upper'>
                    <div style={{ paddingTop: "100px", paddingBottom: "100px" }}>
                        <div className="card-body">
                            <div className="mb-2" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <p style={{ fontSize: "28px", fontWeight: "700", color: "black" }}>ANGINAT</p>
                                <Link className="text-primary" to="/login">
                                    <p style={{ marginRight: "10px", color: "#889292" }}>Back to home</p>
                                </Link>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className='input'>
                                    <div className="mb-3">
                                        <label className="form-label">{label} Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name" // Add name for identification
                                            placeholder={`Type Your ${label} Name`}
                                            value={institutionData.name}
                                            onChange={handleChange}
                                        />
                                        {nameError && <div className="text-danger fs-12">{nameError}</div>}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">{label} Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email" // Add name for identification
                                            placeholder={`Type Your ${label} Email`}
                                            value={institutionData.email}
                                            onChange={handleChange}
                                        />
                                        {emailError && <div className="text-danger fs-12">{emailError}</div>}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">{label} Address</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="address" // Add name for identification
                                            placeholder={`Type Your ${label} Address`}
                                            value={institutionData.address}
                                            onChange={handleChange}
                                        />
                                        {addressError && <div className="text-danger fs-12">{addressError}</div>}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">{label} Domain</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="domainName" // Add name for identification
                                            placeholder="e.g., springlearns.com"
                                            value={institutionData.domainName}
                                            onChange={handleChange}
                                        />
                                        {domainError && <div className="text-danger fs-12">{domainError}</div>}
                                    </div>
                                </div>

                                <div className="form-check custom-checkbox ms-1" style={{ marginTop: "20px" }}>
                                    <input type="checkbox" className="form-check-input" id="basic_checkbox_1" />
                                    <label className="form-check-label" htmlFor="basic_checkbox_1">
                                        I agree to the <span style={{ color: '#f9a19d' }}>Term Of Service</span> and <span style={{ color: '#f9a19d' }}>Privacy Policy</span>.
                                    </label>
                                </div>

                                <div className="text-center" style={{ marginTop: "20px" }}>
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

export default Institute;

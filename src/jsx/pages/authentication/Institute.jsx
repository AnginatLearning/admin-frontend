import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

// Images
import login from "../../../assets/images/login-img.png";
import { useRegistration } from '../../../context/RegistrationContext';
import Loginimage from '../../components/chatBox/Loginimage';

function Institute() {
    const {
        institutionData,
        setInstitutionData,
        institutionType,
    } = useRegistration(); 

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [domainError, setDomainError] = useState('');
    const [checkboxError, setCheckboxError] = useState(''); 
    const [isChecked, setIsChecked] = useState(false); 

    const navigate = useNavigate();
    const location = useLocation(); 


    const label = location.pathname.includes("school") ? "School" : "Institute";

  
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validateDomain = (domain) => /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(domain);

   
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

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
        if (e.target.checked) {
            setCheckboxError(''); 
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
        if (!isChecked) {
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
                                            name="name"
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
                                            name="email"
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
                                            name="address"
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
                                            name="domainName"
                                            placeholder="e.g., springlearns.com"
                                            value={institutionData.domainName}
                                            onChange={handleChange}
                                        />
                                        {domainError && <div className="text-danger fs-12">{domainError}</div>}
                                    </div>
                                </div>

                                <div className="form-check custom-checkbox ms-1" style={{ marginTop: "20px" }}>
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="basic_checkbox_1"
                                        checked={isChecked}
                                        onChange={handleCheckboxChange}
                                    />
                                    <label className="form-check-label" htmlFor="basic_checkbox_1">
                                        I agree to the <a href="https://www.anginatlearning.com/terms-and-condition"><span style={{ color: '#f9a19d' }}>Term Of Service</span></a> and <a href="https://www.anginatlearning.com/privacy-policy"><span style={{ color: '#f9a19d' }}>Privacy Policy</span></a>.
                                    </label>
                                    {checkboxError && <div className="text-danger fs-12">{checkboxError}</div>}
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

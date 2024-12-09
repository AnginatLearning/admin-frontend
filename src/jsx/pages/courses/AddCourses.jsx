import React, { useEffect, useState } from 'react';
import { DatePicker } from 'rsuite';
import PageTitle from '../../layouts/PageTitle';
import Select from 'react-select';
import { DownloadSimple } from '@phosphor-icons/react';
import ButtonComponent from '../courses/Components/ButtonComponent';
import InputField from '../courses/Components/InputField';
import Batch from './Components/Batch';
import api from '../../../services/AxiosInstance';
import Swal from 'sweetalert2';

const AddCourses = () => {
  const [imagePreview, setImagePreview] = useState('/Course image.jpg');
  const [thumbnail, setThumbnail] = useState(null);
  const [warningMessage, setWarningMessage] = useState('');

  const [formData, setFormData] = useState({
    courseName: '',
    description: '',
    pricingType: '',
    price:[{
      currency: 'INR',
      offerPrice: '',
      standardPrice: ''
    }],
    languages: [],
  });

  const [batches, setBatches] = useState([]);
  const [instituteDetails, setInstituteDetails] = useState(null);

  useEffect(() => {
    const details = JSON.parse(localStorage.getItem('InstitutionDetails'));
    setInstituteDetails(details);
  }, []);
  console.log(instituteDetails)

  

  const languageOptions = [
    { value: 'English', label: 'English' },
    { value: 'Spanish', label: 'Spanish' },
  ];

  const pricingOptions = [
    { value: 'one-time', label: 'One-time Price' },
    { value: 'batch', label: 'Batch Price' },
  ];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
  
    if (id.startsWith('price[0].')) {
      const field = id.split('.')[1]; // Extract 'offerPrice' or 'standardPrice'
      setFormData((prev) => ({
        ...prev,
        price: prev.price.map((p, index) =>
          index === 0 ? { ...p, [field]: value } : p
        ),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };
  

  const handleSelectChange = (selectedOptions) => {
    setFormData((prev) => ({
      ...prev,
      languages: selectedOptions.map((option) => option.label),
    }));
  };

  const handlePricingTypeChange = (selectedOption) => {
    setFormData((prev) => ({ ...prev, pricingType: selectedOption.value }));
  };

  const addBatch = (batch) => {
    setBatches((prev) => [...prev, batch]);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Check if the file is an image
      if (!file.type.startsWith('image/')) {
        setWarningMessage('Please upload a valid image file.');
        return;
      }

      // Check if the file size is within the limit (500 KB = 500 * 1024 bytes)
      const maxFileSize = 500 * 1024; // 500 KB
      if (file.size > maxFileSize) {
        setWarningMessage('File size exceeds 500 KB. Please upload a smaller image.');
        return;
      }

      // If valid, set the file and preview
      setThumbnail(file);
      setWarningMessage(''); // Clear any existing warning
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result); // Preview the selected image
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview('/Course image.jpg'); // Default image
      setWarningMessage(''); // Clear any existing warning
    }
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (
      !formData.courseName ||
      !formData.description ||
      !formData.pricingType ||
      batches.length === 0
    ) {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill out all course fields and add at least one batch.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }
  
    if (
      formData.pricingType === 'one-time' &&
      (!formData.price[0].offerPrice ||
        !formData.price[0].standardPrice ||
        formData.languages.length === 0)
    ) {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill out all course fields and add at least one batch.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }
  
    // Prepare the payload object
    const payload = {
      institutionCode: instituteDetails.institutionCode,
      institution: instituteDetails._id,
      courseName: formData.courseName,
      description: formData.description,
      pricingType: formData.pricingType,
      price: formData.price, // Use the updated price array
      languages: formData.languages,
      batches: batches.map((batch) => ({
        ...batch,
      })),
      status: 'active',
    };
  
    try {
      // Use FormData for multipart/form-data request
      const formDataToSend = new FormData();
      formDataToSend.append('thumbnail', thumbnail); // Add thumbnail file
      formDataToSend.append('payload', JSON.stringify(payload)); // Add payload as JSON string
  
      // Send the request
      console.log(formDataToSend)
      const response = await api.post('course/courses/create-course', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure the right content type
        },
      });
      Swal.fire({
        title: 'Success!',
        text: 'Course created successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
  
      console.log(response.data);
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to create course.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
  
      console.error('Error creating course:', error);
    }
  };
  
  

  const customStyles = {
    valueContainer: (provided) => ({
      ...provided,
      height:"3.4rem",
   
    }),
  };

  return (
    <>
      <PageTitle activeMenu={"Add Course"} motherMenu={"Courses"} />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div
              style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
              className="card-header"
            >
              <h4 className="card-title">Courses Details</h4>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ButtonComponent
                  label="Download Sample CSV File"
                  type="submit"
                  className="btn btn-primary me-1 Download-filebtn"
                  icon={DownloadSimple}
                />
              </div>
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "30px", marginTop: "-10px", padding: "10px" }}>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <InputField
                      label="Course Name"
                      type='text'
                      id="courseName"
                      placeholder="Enter course name"
                      value={formData.courseName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div style={{ marginBottom: "20px" }} className="col-lg-12 col-md-12 col-sm-12">
                    <label className="form-label" htmlFor="Answer">Course Details</label>
                    <textarea
                      id="description"
                      className="form-control"
                      placeholder="Enter course description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={5}
                    />
                  </div>

                  <div className="col-sm-6">
                    <label className="form-label">Pricing Type</label>
                    <Select
                     
                      className="custom-react-select"
                      options={pricingOptions}
                      onChange={handlePricingTypeChange}
                      placeholder="Select Pricing Type"
                      value={pricingOptions.find((option) => option.value === formData.pricingType)}
                      styles={customStyles}
                    />
                  </div>

                  {formData.pricingType === "one-time" && <div className="col-sm-6">
                    <div style={{ display: "flex", gap: "4px" }}>
                      <div style={{marginTop:"7px"}} className="col-sm-6">
                        <InputField
                        
                          id="price[0].offerPrice"
                           type="number"
                          placeholder="Enter offer price"
                          value={formData.price[0].offerPrice}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div style={{ marginTop: "7px" }} className="col-sm-6">
                        <InputField
                          src={imagePreview}
                          id="price[0].standardPrice"
                           type="number"
                          placeholder="Enter standard price"
                          value={formData.price[0].standardPrice}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>}

                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-label">Select Language</label>
                      <Select
                        styles={customStyles}
                        options={languageOptions}
                        isMulti
                        className="custom-react-select"
                        onChange={handleSelectChange}
                        placeholder="Select Languages"
                        value={formData.languages.map((language) => ({
                          label: language,
                          value: language,
                        }))}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-12">
                    <label className="form-label" htmlFor="Course_Photo">
                      Course Thumbnail
                    </label>
                    <div className="form-group fallback">
                      <input
                        id="Course_Photo"
                        onChange={handleFileChange}
                        type="file"
                        className="file"
                        required
                        style={{ width: "100%" }}
                      />
                      {warningMessage && (
                        <div style={{ color: 'red', marginTop: '10px' }}>
                          {warningMessage}
                        </div>
                      )}
                    </div>
                    <p style={{ fontSize: '14px', color: 'red',marginTop:"-5px" }}>
                      Please ensure the image file is less than 400KB.
                    </p>
                  </div>
                   
               
                  <div className="col-sm-6">
                  <Batch onAddBatch={addBatch} pricingType={formData.pricingType} />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginTop: "30px",
                      marginBottom: "80px",
                    }}
                    className="col-lg-12 col-md-12 col-sm-12"
                  >
                    <ButtonComponent
                      label="Add Course"
                      type="submit"
                      className="btn btn-primary me-1 All-btn"
                    />
                    <ButtonComponent
                      label="Cancel"
                      type="button"
                      className="btn btn-danger light All-btn"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCourses;
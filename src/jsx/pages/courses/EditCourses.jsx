import React, { useEffect, useState } from 'react';
import { DatePicker } from 'rsuite';
import PageTitle from '../../layouts/PageTitle';
import Select from 'react-select';
import InputField from './Components/InputField';
import ButtonComponent from './Components/ButtonComponent';
import Batch from './Components/Batch';
import Rowbutton from './Components/Rowbutton';
import Uploadfile from './Components/Uploadfile';
import { DownloadSimple } from '@phosphor-icons/react';
import Schedule from './Components/Schedule';
import { useParams } from 'react-router-dom';
import api from '../../../services/AxiosInstance';
import Swal from 'sweetalert2';

const EditCourses = () => {
  const [imagePreview, setImagePreview] = useState('/public/Course image.jpg');
  const { id } = useParams();

  const [iconMoved, setIconMoved] = useState(false);
  const [formData, setFormData] = useState({
    courseName: '',
    description: '',
    pricingType: '',
    price: {
      offerPrice: '',
      standardPrice: ''
    },
    languages: [],
  });

  const pricingOptions = [
    { value: 'one-time', label: 'One-time Price' },
    { value: 'batch', label: 'Batch Price' },
  ];

  const languageOptions = [
    { value: 'English', label: 'English' },
    { value: 'Spanish', label: 'Spanish' },
  ];

  const handleInputChange = (e) => {
    const { id, value } = e.target;


    if (id.includes('price')) {
      const priceField = id.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        price: {
          ...prev.price,
          [priceField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handlePricingTypeChange = (selectedOption) => {
    setFormData((prev) => ({ ...prev, pricingType: selectedOption.value }));
  };

  const addBatch = (batch) => {
    setBatches((prev) => [...prev, batch]);
  };

  const customStyles = {
    valueContainer: (provided) => ({
      ...provided,
      height: "3.4rem",
    }),
  };

  const handleSelectChange = (selectedOption, field) => {
    if (field === 'languages') {
      const selectedLanguages = selectedOption.map((option) => option.value);
      setFormData((prev) => ({
        ...prev,
        [field]: selectedLanguages, 
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: selectedOption,
      }));
    }
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      courseThumbnail: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCourse(id);
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const handleCancel = () => {
    console.log('Form canceled');
  };


  const updateCourse = async (courseId) => {
    const courseData = {
      courseName: formData.courseName,
      description: formData.description,
      pricingType: formData.pricingType,
      price: {
        offerPrice: formData.price.offerPrice,
        standardPrice: formData.price.standardPrice,
      },
      languages: formData.languages,
      status: "active",
    };

    try {
      const response = await api.put(`course/courses/${courseId}`, courseData);
      if (response.status === 200) {
        console.log('Course updated successfully');
        Swal.fire({
          title: 'Success!',
          text: 'Course has been updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else {
        console.error('Error updating course:', response);
        Swal.fire({
          title: 'Error!',
          text: 'There was an issue updating the course.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Error updating course:', error);
      Swal.fire({
        title: 'Error!',
        text: 'There was an issue updating the course.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await api.get('course/courses/');
        const course = response.data.data;
        console.log(course);

        const selectedCourse = course.find((course) => course._id === id);
        if (selectedCourse) {
          setFormData({
            courseName: selectedCourse.courseName || '',
            courseCode: selectedCourse.courseCode || '',
            description: selectedCourse.description || '',
            pricingType: selectedCourse.pricingType || '',
            price: {
              offerPrice: selectedCourse.price?.offerPrice || '',
              standardPrice: selectedCourse.price?.standardPrice || '',
            },
            languages: selectedCourse.languages || [],
          });
        }
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    fetchCourseDetails();
  }, [id]);

  return (
    <>
      <PageTitle activeMenu={"Edit Course"} motherMenu={"Courses"} />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
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
              <form action="#" method="post" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-sm-6">
                    <InputField
                      label="Course Name"
                      id="courseName"
                      placeholder="Course Name"
                      value={formData.courseName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-sm-6">
                    <InputField
                      label="Course Code"
                      id="courseCode"
                      placeholder="Course Code"
                      value={formData.courseCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div style={{ marginBottom: "20px" }} className="col-lg-12 col-md-12 col-sm-12">
                    <label className="form-label" htmlFor="description">Course Details</label>
                    <textarea
                      id="description"
                      placeholder="Course Details"
                      className="form-control"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows="5"
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

                  {formData.pricingType === "one-time" && (
                    <div className="col-sm-6">
                      <div style={{ display: "flex", gap: "4px" }}>
                        <div style={{ marginTop: "7px" }} className="col-sm-6">
                          <InputField
                            id="price.offerPrice"
                            type="number"
                            placeholder="Enter offer price"
                            value={formData.price.offerPrice}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div style={{ marginTop: "7px" }} className="col-sm-6">
                          <InputField
                            id="price.standardPrice"
                            type="number"
                            placeholder="Enter standard price"
                            value={formData.price.standardPrice}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-label">Select Language</label>
                      <Select
                        isMulti
                        options={languageOptions}
                        value={formData.languages.map((language) => ({
                          label: language,
                          value: language,
                        }))}
                        onChange={(selectedOption) => handleSelectChange(selectedOption, 'languages')}
                        placeholder="Select Languages"
                        styles={customStyles}
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
                        type="file"
                        className="file"
                        value={formData.courseThumbnail}
                        onChange={handleFileChange}
                        required
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div> 

                  <div style={{ marginBottom: "10px" }} className="col-sm-6">
                    <Batch onAddBatch={addBatch} pricingType={formData.pricingType} />
                  </div>

                  {iconMoved && (
                    <div style={{ marginTop: "20px" }}>
                      <Rowbutton />
                    </div>
                  )}

                  <div style={{ display: "flex", gap: "10px", marginTop: "30px", marginBottom: "80px" }} className="col-lg-12 col-md-12 col-sm-12">
                    <ButtonComponent
                      label="Update"
                      type="submit"
                      className="btn btn-primary me-1 All-btn"
                    />
                    <ButtonComponent
                      label="Cancel"
                      type="button"
                      className="btn btn-danger light All-btn"
                      onClick={handleCancel}
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

export default EditCourses;




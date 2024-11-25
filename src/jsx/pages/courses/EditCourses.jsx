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

const EditCourses = () => {
  const { id } = useParams();
  const [courses, setCourses] = useState(null);
  const [iconMoved, setIconMoved] = useState(false);
  const [formData, setFormData] = useState({
    courseName: '',
    courseCode: '',
    courseDetails: '',
    instructorName: '',
    coursePrice: '',
    standardPrice: '',
    language: '', 
    courseThumbnail: '',
    pricingType: '', 
  });

  const priceOptions = [
    { value: 'one', label: 'One Price' },
    { value: 'batch', label: 'Batch Price' },
  ];

  const languageOptions = [
    { value: 'English', label: 'English' },
    { value: 'Spanish', label: 'Spanish' },
 
  ];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSelectChange = (selectedOption, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: selectedOption,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      courseThumbnail: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleCancel = () => {
    console.log('Form canceled');
  };

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await api.get('course/courses/');
        const course = response.data.data;
        console.log(course)

        const selectedCourse = course.find((course) => course._id === id);
        if (selectedCourse) {
          setFormData({
            courseName: selectedCourse.courseName || '',
            courseCode: selectedCourse.courseCode || '',
            courseDetails: selectedCourse.description || '',
            instructorName: selectedCourse.instructor || '',
            coursePrice: selectedCourse.price?.offerPrice || '',
            standardPrice: selectedCourse.price?.standardPrice || '',
            language: selectedCourse.languages[0] || '', 
            courseThumbnail: selectedCourse.thumbnail || '',
            pricingType: selectedCourse.pricingType || '',
          });
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
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
              <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
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
                    <label className="form-label" htmlFor="Answer">Course Details</label>
                    <textarea
                      id="courseDetails"
                      placeholder="Course Details"
                      className="form-control"
                      value={formData.courseDetails}
                      onChange={handleInputChange}
                      required
                      rows="5"
                    />
                  </div>
                  <div className="col-sm-6">
                    <InputField
                      label="Instructor Name"
                      id="instructorNames"
                      placeholder="Instructor Name"
                      value={formData.instructorName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                 
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-label">Course Price</label>
                      <Select
                        isSearchable={false}
                        options={priceOptions}
                        className="custom-react-select"
                        value={priceOptions.find(option => option.value === formData.pricingType)}
                        onChange={(selectedOption) => handleSelectChange(selectedOption, 'pricingType')}
                      />
                    </div>
                    <div style={{ display: "flex", gap: "4px" }}>
                      <div className="col-sm-6">
                        <InputField
                          id="coursePrice"
                          placeholder="Offer Price"
                          value={formData.coursePrice}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div style={{ marginTop: "0px" }} className="col-sm-6">
                        <InputField
                          id="standardPrice"
                          placeholder="Standard Price"
                          value={formData.standardPrice}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-label">Select Language</label>
                      <Select
                        isSearchable={false}
                        options={languageOptions}
                        className="custom-react-select"
                        value={languageOptions.find(option => option.value === formData.language)}
                        onChange={(selectedOption) => handleSelectChange(selectedOption, 'language')}
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
                        onChange={handleFileChange}
                        required
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: "10px" }} className="col-sm-6">
                    <Batch iconMoved={iconMoved} setIconMoved={setIconMoved} />
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

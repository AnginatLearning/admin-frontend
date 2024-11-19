import React, { useState } from 'react';
import { DatePicker } from 'rsuite';
import PageTitle from '../../layouts/PageTitle';
import Select from 'react-select';
import InputField from './InputField';
import ButtonComponent from './ButtonComponent';
import Batch from './Batch';
import Rowbutton from './Rowbutton';
import { useNavigate } from 'react-router-dom';

const EditCourses = () => {
  const [iconMoved, setIconMoved] = useState(false);
  const [formData, setFormData] = useState({
    courseName: '',
    courseCode: '',
    courseDetails: '',
    instructorNames: '',
    coursePrice: '',
    standardPrice: '', 
    language: '',
    courseThumbnail: '',
  });
  const navigate = useNavigate()
  const handlefaq = ()=>{
    navigate('/Faq-courses')
  }
  const options1 = [
    { value: '1', label: 'English' },
    { value: '2', label: 'French' },
    { value: '3', label: 'Korean' },
    { value: '4', label: 'German' },
  ];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSelectChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      language: selectedOption,
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

  return (
    <>
      <PageTitle activeMenu={"Edit Course"} motherMenu={"Courses"} />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Courses Details</h4>
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
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <InputField
                      label="Course Details"
                      id="courseDetails"
                      type="textarea"
                      placeholder="Course Details"
                      value={formData.courseDetails}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-sm-6">
                    <InputField
                      label="Instructor Names"
                      id="instructorNames"
                      placeholder="Instructor Names"
                      value={formData.instructorNames}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  {/* Course Price Section */}
                  <div className="col-sm-6">
                    <div style={{ display: "flex", gap: "4px" }}>
                      <div className="col-sm-6">
                        <InputField
                          label="Course Price"
                          id="coursePrice"
                          placeholder="Offer Price"
                          value={formData.coursePrice}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div  style={{marginTop:"7px"}} className="col-sm-6">
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
                        options={options1}
                        className="custom-react-select"
                        value={formData.language}
                        onChange={handleSelectChange}
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
                        className="file "
                        onChange={handleFileChange}
                        required
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>

                  <div style={{marginBottom:"10px"}} className="col-sm-6">
                    <Batch iconMoved={iconMoved} setIconMoved={setIconMoved} />
                  </div>

                  {iconMoved && (
                    <div style={{ marginTop: "20px" }}>
                      <Rowbutton />
                    </div>
                  )}

                  
                  <div style={{display:"flex", gap:"10px", marginTop:"30px", marginBottom:"80px"}} className="col-lg-12 col-md-12 col-sm-12">
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

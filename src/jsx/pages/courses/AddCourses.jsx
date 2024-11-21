import React, { useState } from 'react';
import { DatePicker } from 'rsuite';
import PageTitle from '../../layouts/PageTitle';
import Select from 'react-select';
import InputField from './Components/InputField';
import ButtonComponent from './Components/ButtonComponent';
import Batch from './Components/Batch';
import Rowbutton from './Components/Rowbutton';
import Uploadfile from './Components/Uploadfile';
import { DownloadSimple } from '@phosphor-icons/react';

const AddCourses = () => {
  const [formData, setFormData] = useState({
    courseName: '',
    courseCode: '',
    courseDetails: '',
    instructorName: '',
    coursePrice: '',
    standardPrice: '',
    language: '',
    courseThumbnail: '',
  });

  const [iconMoved, setIconMoved] = useState(false);

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
      <PageTitle activeMenu={"Add Course"} motherMenu={"Courses"} />
      <div className="row">
        
        <div className="col-lg-12">
          <div className="card">
            <div style={{display:"flex", flexWrap:"wrap", gap:"10px"}} className="card-header">
              <h4 className="card-title">Courses Details</h4>
              <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                  
                   <div> 
                   <ButtonComponent
                    label="Download Sample CSV File"
                    type="submit"
                    className="btn btn-primary me-1 Download-filebtn"
                    icon={DownloadSimple}
                  />
                   </div>
                    
            </div>
            </div>
            
            <div className="card-body">
              <form action="#" method="post" onSubmit={handleSubmit}>
              <div style={{marginBottom:"30px", marginTop:"-10px", padding:"10px"}}>
               <Uploadfile
                padding="30px 20px"
                text="You can upload CSV file to add multiple course at once" />
              </div> 
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
                  <div style={{marginBottom:"20px"}} className="col-lg-12 col-md-12 col-sm-12">
                   <label className="form-label" htmlFor="Answer">Course Details</label>
                    <textarea  label="Course Details"   id="courseDetails"  placeholder="Course Details" className="form-control" value={formData.courseDetails}
                      onChange={handleInputChange}
                      required rows="5" />
                  
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
                      <div style={{ marginTop: "7px" }} className="col-sm-6">
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

              
                  <div className="col-sm-6">
                    <Batch iconMoved={iconMoved} setIconMoved={setIconMoved} />
                  </div>

                  {iconMoved && (
                    <div style={{ marginTop: "20px" }}>
                      <Rowbutton />
                    </div>
                  )}

                  <div style={{display:"flex", gap:"10px", marginTop:"30px", marginBottom:"80px"}} className="col-lg-12 col-md-12 col-sm-12">
                    <ButtonComponent
                      label="Add Course"
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

export default AddCourses;

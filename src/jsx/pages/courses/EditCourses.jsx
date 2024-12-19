import React, { useEffect, useState } from "react";
import { DatePicker } from "rsuite";
import PageTitle from "../../layouts/PageTitle";
import Select from "react-select";
import InputField from "./Components/InputField";
import ButtonComponent from "./Components/ButtonComponent";
import Batch from "./Components/Batch";
import Rowbutton from "./Components/Rowbutton";
import Uploadfile from "./Components/Uploadfile";
import { DownloadSimple, Pencil, PencilLine, Trash, UploadSimple } from "@phosphor-icons/react";
import Schedule from "./Components/Schedule";
import { useParams } from "react-router-dom";
import api from "../../../services/AxiosInstance";
import Swal from "sweetalert2";
import CsvUploadButton from "./CsvUploadButton";
import PricingTable from "./PricingTable";

const EditCourses = () => {
  const [batches, setBatches] = useState([]);
  const [imagePreview, setImagePreview] = useState("/Course image.jpg");
  const [thumbnail, setThumbnail] = useState(null);
  const [priceChange, setPriceChange] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const { id } = useParams();

  const [iconMoved, setIconMoved] = useState(false);
  const [formData, setFormData] = useState({
    courseName: "",
    courseCode: "",
    description: "",
    pricingType: "",
    price: [
      {
        currency: "INR",
        offerPrice: "",
        standardPrice: "",
      },
    ],
    languages: [],
  });

  const [faqs, setFaqs] = useState([]); // State for FAQs

  const pricingOptions = [
    { value: "one-time", label: "One-time Price" },
    { value: "batch", label: "Batch Price" },
  ];

  const languageOptions = [
    { value: "English", label: "English" },
    { value: "Spanish", label: "Spanish" },
  ];

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id.startsWith("price[0].")) {
      const priceField = id.split(".")[1]; // Extract 'offerPrice' or 'standardPrice'
      setFormData((prev) => {
        const priceExists = prev.price.some((p) => p.currency === "INR");

        if (priceExists) {
          // Update the existing object with currency === "INR"
          return {
            ...prev,
            price: prev.price.map((p) =>
              p.currency === "INR" ? { ...p, [priceField]: value } : p
            ),
          };
        } else {
          // Add a new object with currency === "INR"
          return {
            ...prev,
            price: [
              ...prev.price,
              { currency: "INR", [priceField]: value },
            ],
          };
        }
      });
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
    if (field === "languages") {
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Check if the file is an image
      if (!file.type.startsWith("image/")) {
        setWarningMessage("Please upload a valid image file.");
        return;
      }

      const maxFileSize = 500 * 1024; // 500 KB
      if (file.size > maxFileSize) {
        setWarningMessage(
          "File size exceeds 500 KB. Please upload a smaller image."
        );
        return;
      }

      // If valid, set the file and preview
      setThumbnail(file);
      console.log(file);
      setWarningMessage("");
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview("/Course image.jpg");
      setWarningMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCourse(id);
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const deleteCourse = async (courseId) => {
    try {
      const response = await api.delete(`course/courses/${courseId}`);
      if (response.status === 200) {
        console.log("Course deleted successfully");
        Swal.fire({
          title: "Deleted!",
          text: "Course has been deleted successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          // Redirect or reload the page after successful deletion
          window.location.href = "/all-courses"; // Replace with your desired redirect route
        });
      } else {
        console.error("Error deleting course:", response);
        Swal.fire({
          title: "Error!",
          text: "There was an issue deleting the course.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an issue deleting the course.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCourse(id); // Pass the course ID to the delete method
      }
    });
  };

  const handleCancel = () => {
    console.log("form-Cancel");
  };

  const updateCourse = async (courseId) => {
    const courseData = {
      courseName: formData.courseName,
      description: formData.description,
      pricingType: formData.pricingType,
      price: formData.price, // Use price as an array
      languages: formData.languages,
      status: "active",
    };

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("thumbnail", thumbnail); // Add thumbnail file
      formDataToSend.append("payload", JSON.stringify(courseData)); // Add payload as JSON string

      const response = await api.put(
        `course/courses/${courseId}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure the right content type
          },
        }
      );

      if (response.status === 200) {
        console.log("Course updated successfully");
        Swal.fire({
          title: "Success!",
          text: "Course has been updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        console.error("Error updating course:", response);
        Swal.fire({
          title: "Error!",
          text: "There was an issue updating the course.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error updating course:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an issue updating the course.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await api.get("course/courses/");
        const courses = response.data.data;

        const selectedCourse = courses.find((course) => course._id === id);
        if (selectedCourse) {
          setFormData({
            courseName: selectedCourse.courseName || "",
            courseCode: selectedCourse.courseCode || "",
            description: selectedCourse.description || "",
            pricingType: selectedCourse.pricingType || "",
            price: selectedCourse.price,
            thumbnail: selectedCourse.thumbnail || "",
            languages: selectedCourse.languages || [],
          });


          setFaqs(selectedCourse.faqs || []); // Add this line to set FAQ data
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchCourseDetails();
  }, [id, priceChange]);

  const deleteFAQ = async (faqId) => {
    try {
      const response = await api.delete(`course/courses/${id}/faqs/${faqId}`);
      if (response.status === 200) {
        console.log("FAQ deleted successfully");

        setFaqs((prevFaqs) => prevFaqs.filter((faq) => faq._id !== faqId));
        Swal.fire({
          title: "Deleted!",
          text: "FAQ has been deleted successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        console.error("Error deleting FAQ:", response);
        Swal.fire({
          title: "Error!",
          text: "There was an issue deleting the FAQ.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an issue deleting the FAQ.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  const handleDeleteFAQ = (faqId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFAQ(faqId); // Call the delete function with the FAQ ID
      }
    });
  };
  
 
 
  return (
    <>
      <PageTitle
        activeMenu={"Edit Course"}
        middleMenu={"All Courses"}
        motherMenu={"Courses"}
      />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Courses Details</h4>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CsvUploadButton
                  priceChange={priceChange}
                  setPriceChange={setPriceChange}
                  courseId={id} />
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
                      disabled="true"
                    />
                  </div>
                  <div
                    style={{ marginBottom: "20px" }}
                    className="col-lg-12 col-md-12 col-sm-12"
                  >
                    <label className="form-label" htmlFor="description">
                      Course Details
                    </label>
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
                      isDisabled="true"
                      className="custom-react-select"
                      options={pricingOptions}
                      onChange={handlePricingTypeChange}
                      placeholder="Select Pricing Type"
                      value={pricingOptions.find(
                        (option) => option.value === formData.pricingType
                      )}
                      styles={customStyles}
                    />
                  </div>

                  {formData.pricingType === "one-time" && (
                    <div className="col-sm-6">
                      <div style={{ display: "flex", gap: "4px" }}>
                        <div style={{ marginTop: "" }} className="col-sm-6">
                          <InputField
                            label="Offer Price (in INR)"
                            id="price[0].offerPrice"
                            required
                            type="number"
                            placeholder="Enter offer price"
                            value={formData.price.find((p) => p.currency === "INR")?.offerPrice || ""}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div style={{ marginTop: "" }} className="col-sm-6">
                          <InputField
                            label="Standard Price (in INR)"
                            id="price[0].standardPrice"
                            type="number"
                            placeholder="Enter standard price"
                            value={formData.price.find((p) => p.currency === "INR")?.standardPrice || ""}
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
                        onChange={(selectedOption) =>
                          handleSelectChange(selectedOption, "languages")
                        }
                        placeholder="Select Languages"
                        required
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
                        onChange={handleFileChange}
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <PricingTable prices={formData.price} />
                  </div>
                  <div style={{ marginBottom: "10px" }} className="col-sm-6">
                    <Batch
                      onAddBatch={addBatch}
                      pricingType={formData.pricingType}
                    />
                  </div>

                  <div className="col-sm-6">
                    <ButtonComponent
                      className="btn btn-primary w-100"
                      label="Add FAQs"
                      onClick={() => window.location.href = `/courses/${id}/faqs`}
                    />
                  </div>


                  <div className="col-sm-6">
                    <div style={{ padding: "10px", outline: "1px solid black", borderRadius: "4px" }}>
                      <h4>Faqs</h4>
                      {faqs.length > 0 ? (
                        <div>
                          {faqs.map((faq) => (
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", margin: "10px 0", backgroundColor: "#6A73FA", border: "1px solid #ccc", borderRadius: "5px" }}>
                              <div
                                key={faq._id}

                              >  <div style={{ display: "flex", gap: "5px",alignItems:"center" }}>
                                  <p style={{ fontSize: "14px", color: "white", marginBottom: "0px" }}>Ques:</p> <span style={{ fontSize: "14px", color: "white" }}> {faq.question}</span> <br />
                                </div>

                                <div style={{ display: "flex", gap: "5px",alignItems:"center"  }}>
                                  <p style={{ fontSize: "14px", color: "white", marginBottom: "0px" }}>Ans:</p> <span style={{ fontSize: "14px", color: "white" }} s>{faq.answer}</span>
                                </div>

                              </div>

                              <div style={{ display: "flex", gap: "10px" }}>
                                <Trash size={22} color="white" onClick={() => handleDeleteFAQ(faq._id)} />
                                <PencilLine size={22} color="white"  />
                              </div>

                            </div>
                          ))}
                        </div>
                      ) : (
                        <p>No FAQs available for this course.</p>
                      )}

                    {/* Same input  */}
                      {/* <div style={{ padding: "8px", outline: "1px solid black", borderRadius: "8px" }} >
                        <div style={{ display: "flex", gap: "10px" }}>
                          <InputField
                            label="Question"
                            type="text"
                            placeholder="Update Question"
                           
                          />
                          <InputField
                            label="Answer"
                            type="text"
                            placeholder="Update Answer"
                           
                          />
                        </div>
                        <div style={{display:"flex",justifyContent:"end"}}>
                          <ButtonComponent
                            label="Save"
                            type="submit"
                            className="btn btn-primary me-1 All-btn"
                          />
                        </div>

                      </div> */}

                    </div>


                  </div>



                  {iconMoved && (
                    <div style={{ marginTop: "20px" }}>
                      <Rowbutton />
                    </div>
                  )}

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      gap: "10px",
                      marginTop: "30px",
                      marginBottom: "80px",
                      justifyContent: "space-between",
                    }}
                    className="col-lg-12 col-md-12 col-sm-12"
                  >
                    <div style={{ display: "flex" }}>
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

                    <div>
                      <ButtonComponent
                        label="Delete"
                        type="button"
                        className="btn btn-danger All-btn"
                        onClick={handleDelete}
                      />
                    </div>
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
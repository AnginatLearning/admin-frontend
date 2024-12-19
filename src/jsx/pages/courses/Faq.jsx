import React, { useState } from 'react';
import { useParams } from 'react-router-dom';  // To access URL params
import PageTitle from '../../layouts/PageTitle';
import { PlusCircle } from '@phosphor-icons/react';
import ButtonComponent from './Components/ButtonComponent';
import api from '../../../services/AxiosInstance';  // Make sure you have Axios instance set up
import Swal from 'sweetalert2';

const Faq = () => {
    const { id } = useParams();  // Get the course ID from the URL params
    const [question, setQuestion] = useState('');  // State for question
    const [answer, setAnswer] = useState('');  // State for answer

    // Handle form cancelation
    const handleCancel = () => {
        console.log('Form canceled');
        setQuestion('');  // Reset form fields
        setAnswer('');
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

       
        const payload = { question, answer };

        try {
            const response = await api.post(`/course/courses/${id}/faqs`, payload); 
            if (response.status === 200 || response.status === 201) {
                Swal.fire({
                    title: 'Success!',
                    text: 'FAQ has been submitted successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
                setQuestion(''); 
                setAnswer('');  
            }
        } catch (error) {
            console.error('Error submitting FAQ:', error);
            Swal.fire({
                title: 'Error!',
                text: 'There was an issue submitting the FAQ.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    return (
        <>
            <PageTitle activeMenu={"FAQs"} motherMenu={"Courses"} />
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div style={{ border: "1px solid #e6e6e6", padding: "15px", borderRadius: "8px" }}>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="Question">Question</label>
                                                <input
                                                    id="Question"
                                                    type="text"
                                                    className="form-control"
                                                    value={question}
                                                    onChange={(e) => setQuestion(e.target.value)}  // Update question state
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="Answer">Answer</label>
                                                <textarea
                                                    id="Answer"
                                                    className="form-control"
                                                    rows="5"
                                                    value={answer}
                                                    onChange={(e) => setAnswer(e.target.value)}  // Update answer state
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <div style={{ marginTop: "20px" }}>
                                        <PlusCircle size={33} />
                                    </div>
                                </div>

                                <div style={{ display: "flex", gap: "10px", marginTop: "30px", marginBottom: "80px" }} className="col-lg-12 col-md-12 col-sm-12">
                                    <ButtonComponent
                                        label="Submit"
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
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Faq;

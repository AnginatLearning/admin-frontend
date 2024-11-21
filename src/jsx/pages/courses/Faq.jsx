import React from 'react';
import { DatePicker } from 'rsuite';

import PageTitle from '../../layouts/PageTitle';
import { PlusCircle } from '@phosphor-icons/react';
import ButtonComponent from './Components/ButtonComponent';

const Faq = () => {
    const handleCancel = () => {

        console.log('Form canceled');
    };
    return (
        <>
            <PageTitle activeMenu={"FAQs"} motherMenu={"Courses"} />
            <div className="row">

                <div className="col-lg-12">
                    <div className="card">

                        <div className="card-body">
                            <form action="#" method="post">
                                <div style={{ border: "1px solid #e6e6e6", padding: "15px", borderRadius: "8px" }}>

                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="Question">Question</label>
                                                <input id="Question" type="text" className="form-control" />
                                            </div>
                                        </div>

                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="Answer">Answer</label>
                                                <textarea id="Answer" className="form-control" rows="5" />
                                            </div>
                                        </div>







                                    </div>


                                </div>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
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
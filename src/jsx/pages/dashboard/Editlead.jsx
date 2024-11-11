import React from 'react';
import Select from 'react-select';
import { DatePicker } from 'rsuite';

import PageTitle from '../../layouts/PageTitle';


const options = [
    { value: '1', label: 'Gender' },
    { value: '2', label: 'Male' },
    { value: '3', label: 'Female' }
]

const options1 = [
    { value: '1', label: 'Department' },
    { value: '2', label: 'React' },
    { value: '3', label: 'CSS' },
    { value: '4', label: 'JavaScript' },
    { value: '4', label: 'Angular' },
    { value: '4', label: 'HTML' },
    { value: '4', label: 'VueJs' },
    { value: '4', label: 'Ruby' },
    { value: '4', label: 'PHP' },
    { value: '4', label: 'ASP.NET' },
    { value: '4', label: 'Python' },
    { value: '4', label: 'MySQL' }
]

const Editlead = () => {
    return (
        <>
           
            <div className="row">
                <div className="col-xl-12 col-xxl-12 col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Edit Leads</h5>
                        </div>
                        <div className="card-body">
                            <form action="#" method="post">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="Enter_First_Name">First Name</label>
                                            <input id="Enter_First_Name" type="text" className="form-control" defaultValue="Deangelo" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="Enter_Last_Name">Last Name</label>
                                            <input id="Enter_Last_Name" type="text" className="form-control" defaultValue="Sena" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="Email">Email</label>
                                            <input id="Email" type="email" className="form-control" defaultValue="info@example.com" required />
                                        </div>
                                    </div>
                                   
                                    
                                    
                                    
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="Mobile_Number">Mobile Number</label>
                                            <input id="Mobile_Number" type="number" maxLength="10" name="phoneNumber" className="form-control" defaultValue="+01 987 654 3210" required />
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="Roll_No">Interest</label>
                                            <input id="Roll_No" type="text" className="form-control" defaultValue="52" required />
                                        </div>
                                    </div>
                                   
                                    
                                    
                                    
                                   
                                  
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <button type="submit" className="btn btn-primary me-1">Submit</button>
                                        <button type="submit" className="btn btn-light">Cancel</button>
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

export default Editlead;
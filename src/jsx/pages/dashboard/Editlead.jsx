import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../services/AxiosInstance';
import Select from 'react-select';
const Editlead = () => {
  const { id } = useParams(); 
  const [lead, setLead] = useState(null);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);      

  const options1 = [
    { value: '1', label: 'Pending' },
    { value: '2', label: 'Ongoing' },
    { value: '3', label: 'Closed' },
    { value: '4', label: 'Onboarded' },
   
]
  useEffect(() => {
    const fetchLeadDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get('lead/leads'); // Use the correct API endpoint to fetch all leads
        const fetchedLeads = Array.isArray(response.data.data.leads) 
          ? response.data.data.leads 
          : Object.values(response.data.data.leads);
        setLeads(fetchedLeads);

        const leadData = fetchedLeads.find((lead) => lead.id === parseInt(id, 10));
        setLead(leadData);

      } catch (error) {
        setError("Failed to load lead details. Please try again."); 
        console.error("Error fetching lead details:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLeadDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; 
  }
  
  if (error) {
    return <div>{error}</div>;
  }

  if (lead) {
    return <div>Lead not found</div>; 
  }

  return (
    <div className="row">
                <div className="col-xl-12 col-xxl-12 col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Edit Lead </h5>
                        </div>
                        <div className="card-body">
                            <form action="#" method="post">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label className="form-label"htmlFor="applicantName">Applicant Name</label>
                                            <input id="Enter_First_Name" type="text" className="form-control" defaultValue="Deangelo" required />

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
                                            <label className="form-label" htmlFor="course">Interest</label>
                                            <input id="Enter_Last_Name" type="text" className="form-control" defaultValue="Sena" required />
                                        </div>
                                    </div>
                                    
                                  
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="Roll_No">Mobile no.</label>
                                            <input id="Roll_No" type="text" className="form-control" defaultValue="52" required />
                                        </div>
                                    </div>
                                    
                                   
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label className="form-label">Status</label>
                                            <Select 
                                                isSearchable={false}
                                                defaultValue={options1[1]}
                                                options={options1} className="custom-react-select" 
                                            />
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
    // <div className="lead-detail">
    //   <h2>Lead Details</h2>
    //   <form>
    //     <div>
    //       <label htmlFor="applicantName"><strong>Name:</strong></label>
    //       <input
    //         type="text"
    //         id="applicantName"
    //         // value={lead.applicantName || ""}
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="course"><strong>Course:</strong></label>
    //       <input
    //         type="text"
    //         id="course"
    //         // value={lead.course || ""}
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="email"><strong>Email:</strong></label>
    //       <input
    //         type="email"
    //         id="email"
    //         // value={lead.email || ""}
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="phoneNumber"><strong>Phone:</strong></label>
    //       <input
    //         type="text"
    //         id="phoneNumber"
    //         // value={lead.phoneNumber || ""}
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="status"><strong>Status:</strong></label>
    //       <input
    //         type="text"
    //         id="status"
    //         // value={lead.status || ""}
    //       />
    //     </div>
    //     <div>
    //       <button type="submit">Save</button>
    //     </div>
    //   </form>
    // </div>
  );
};

export default Editlead;
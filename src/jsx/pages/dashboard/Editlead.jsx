import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../services/AxiosInstance';
import Select from 'react-select';
import Swal from 'sweetalert2'; 

const Editlead = () => {
  const { id } = useParams(); 
  const [lead, setLead] = useState(null);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);
  const [updates, setUpdates] = useState({});
  const [isOpen, setIsOpen] = useState(false);  
  
  const navigate = useNavigate();  

  const options1 = [
    { value: '1', label: 'Pending' },
    { value: '2', label: 'Ongoing' },
    { value: '3', label: 'Closed' },
    { value: '4', label: 'Onboarded' },
  ];

  useEffect(() => {
    const fetchLeadDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get('auth/lead/leads');
        const fetchedLeads = response.data.data.leads;
        console.log(fetchedLeads);

        const leadData = fetchedLeads.find((lead) => lead._id === id);
        
        setLeads(fetchedLeads);
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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUpdates((prevUpdates) => ({
      ...prevUpdates,
      [id]: value,
    }));
  };

  const handleStatusChange = (selectedOption) => {
    setUpdates((prevUpdates) => ({
      ...prevUpdates,
      status: selectedOption.label,
    }));
  };

  const handleDropdownOpen = () => {
    setIsOpen(true);
  };

  const handleDropdownClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(updates);
      const res = await api.patch('auth/lead/lead/status', {
        leadId: lead._id,
        ...updates,
      });
      console.log('Update response:', res);
      
      Swal.fire({
        title: 'Success!',
        text: 'Lead updated successfully.',
        icon: 'success',
        confirmButtonText: 'Ok',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(-1);
        }
      });
    } catch (error) {
      console.error("Error updating lead:", error);
      
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update lead.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!lead) {
    return <div>Lead not found</div>; 
  }

  return (
    <div className="row">
      <div className="col-xl-12 col-xxl-12 col-sm-12">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title">Edit Lead</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="applicantName">Applicant Name</label>
                    <input
                      id="applicantName"
                      type="text"
                      className="form-control"
                      defaultValue={lead.applicantName || ''}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      className="form-control"
                      defaultValue={lead.email || ''}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="course">Interest</label>
                    <input
                      id="course"
                      type="text"
                      className="form-control"
                      defaultValue={lead.course || ''}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="phoneNumber">Mobile no.</label>
                    <input
                      id="phoneNumber"
                      type="text"
                      className="form-control"
                      defaultValue={lead.phoneNumber || ''}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-label">Status</label>
                    <Select
                      isSearchable={false}
                      defaultValue={options1.find(option => option.label === lead.status) || options1[0]}
                      options={options1}
                      className="custom-react-select"
                      onChange={handleStatusChange}
                      onMenuOpen={handleDropdownOpen} 
                      onMenuClose={handleDropdownClose} 
                      styles={{
                        indicatorSeparator: () => ({ display: 'none' }),
                        dropdownIndicator: (provided) => ({
                          ...provided,
                          transform: isOpen ? 'rotate(-90deg)' : 'rotate(0deg)',  
                          transition: 'transform 0.3s ease',
                        }),
                      }}
                    />
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <button type="submit" className="btn btn-primary me-1">Submit</button>
                  <button type="button" className="btn btn-light" onClick={handleCancel}>Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editlead;

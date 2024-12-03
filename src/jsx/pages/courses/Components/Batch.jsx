import React, { useEffect, useState } from 'react';
import { DatePicker } from 'rsuite';
import ButtonComponent from './ButtonComponent';
import { PencilLine, Plus, Trash, TrashSimple } from '@phosphor-icons/react';
import Swal from 'sweetalert2';
import api from '../../../../services/AxiosInstance';
import { useParams } from 'react-router-dom';

// Utility function to convert 24-hour time to 12-hour format
const formatTimeTo12Hour = (time) => {
  if (!time) return '';
  const [hours, minutes] = time.split(':');
  const period = +hours >= 12 ? 'PM' : 'AM';
  const formattedHours = +hours % 12 || 12; // Convert 0 to 12 for midnight.
  return `${formattedHours}:${minutes} ${period}`;
};

const Batch = ({ onAddBatch, pricingType }) => {
  const { id } = useParams();
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [batches, setBatches] = useState([]);
  const [batchDetails, setBatchDetails] = useState({
    batchName: '',
    startDate: null,
    endDate: null,
    timeZone: '',
    seats: '',
    price: {
      offerPrice: 0,
      standardPrice: 0,
    },
  });
  const [editingBatch, setEditingBatch] = useState(null);  // Track the batch being edited
  const [iconMoved, setIconMoved] = useState(false);

  useEffect(() => {
    const fetchCourseAndBatches = async () => {
      try {
        const response = await api.get(`/course/courses/${id}`);
        const course = response.data.data;
  
        if (course.batches) {
          setBatches(course.batches);
        }
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };
  
    fetchCourseAndBatches();
  }, [id]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id.startsWith('price.')) {
      const field = id.split('.')[1]; 
      setBatchDetails((prev) => ({
        ...prev,
        price: {
          ...prev.price,
          [field]: value,
        },
      }));
    } else {
      setBatchDetails((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleDateChange = (id, value) => {
    setBatchDetails((prev) => ({ ...prev, [id]: value ? new Date(value) : null }));
  };

  const addBatch = () => {
    const { batchName, startDate, endDate, seats, price } = batchDetails;

    if (!batchName || !startDate || !endDate || !seats || !startTime || !endTime) {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill out all batch fields',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    if ((pricingType === 'batch') && (price.offerPrice === 0 || price.standardPrice === 0)) {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill out all batch pricing fields',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    const newBatch = {
      ...batchDetails,
      timeZone: `${formatTimeTo12Hour(startTime)} - ${formatTimeTo12Hour(endTime)}`,
    };

    setBatches((prevBatches) => [...prevBatches, newBatch]);
    onAddBatch(newBatch);
    
    setBatchDetails({
      batchName: '',
      startDate: null,
      endDate: null,
      timeZone: '',
      seats: '',
      price: {
        offerPrice: 0,
        standardPrice: 0,
      },
    });
    setStartTime('');
    setEndTime('');
    Swal.fire({
      title: 'Success!',
      text: 'Batch has been successfully added.',
      icon: 'success',
      confirmButtonText: 'OK',
    });
  };
 
  const saveBatch = async () => {
    const { batchName, startDate, endDate, seats, price } = batchDetails;
  
    if (!batchName || !startDate || !endDate || !seats || !startTime || !endTime) {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill out all batch fields',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }
  
    const updatedBatch = {
      batchName,
      startDate,
      endDate,
      seats,
      timeZone: `${formatTimeTo12Hour(startTime)} - ${formatTimeTo12Hour(endTime)}`,
      price,
    };
  
    try {
      const endpoint = `/course/courses/${id}/batches/${editingBatch._id}`;
      const response = await api.put(endpoint, updatedBatch);
  
      if (response.status === 200) {
        const updatedBatches = batches.map((batch) =>
          batch._id === editingBatch._id ? { ...updatedBatch, _id: editingBatch._id } : batch
        );
        setBatches(updatedBatches);
  
        Swal.fire({
          title: 'Success!',
          text: 'Batch has been updated.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
  
        setEditingBatch(null);
        setBatchDetails({
          batchName: '',
          startDate: null,
          endDate: null,
          timeZone: '',
          seats: '',
          price: {
            offerPrice: 0,
            standardPrice: 0,
          },
        });
        setStartTime('');
        setEndTime('');
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update the batch. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      console.error('Error updating batch:', error);
    }
  };
 

  const deleteBatch = async (batchId) => {
    try {
      const response = await api.delete(`/course/courses/${id}/batches/${batchId}`);
      
      if (response.status === 200) {
       
        setBatches((prevBatches) => prevBatches.filter((batch) => batch._id !== batchId));
        Swal.fire({
          title: 'Success!',
          text: 'Batch has been deleted successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to delete the batch. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      console.error('Error deleting batch:', error);
    }
  };
  
  
  const editBatch = (batch) => {
    setBatchDetails({
      batchName: batch.batchName,
      startDate: batch.startDate ? new Date(batch.startDate) : null, 
      endDate: batch.endDate ? new Date(batch.endDate) : null, 
      seats: batch.seats,
      price: batch.price,
    });
    setStartTime(batch.startTime);
    setEndTime(batch.endTime);
    setEditingBatch(batch); 
    setIconMoved(true); 
  };

  const toggleVisibility = () => {
    setIconMoved(!iconMoved);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
        <h5 style={{ color: '#312A2A', fontSize: '14px', fontWeight: '500' }}>Add Batch</h5>
        <Plus color="black" size={21} style={{ cursor: 'pointer' }} onClick={toggleVisibility} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {batches.map((batch, index) => (
          <div
            key={index}
            style={{
              background: '#6A73FA',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              padding: '12px',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <p style={{ color: 'white', fontSize: '12px', margin: '0' }}>
                {batch.startDate
                  ? new Date(batch.startDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })
                  : 'N/A'}
              </p>
              <p style={{ color: 'white', fontSize: '12px', margin: '0' }}>|</p>
              <p style={{ color: 'white', fontSize: '12px', margin: '0' }}>
                {batch.timeZone || 'Select a time zone'}
              </p>
            </div>

            <div style={{display:"flex", flexDirection:"row",gap:"8px"}}>
            
            <Trash size={22} color="white" onClick={() => deleteBatch(batch._id)}  />
            <PencilLine size={22} color="white" onClick={() => editBatch(batch)} />
            </div>
            
          </div>
        ))}

        {iconMoved && (
          <div
            style={{
              outline: '1px solid #888888',
              padding: '12px',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >      
             
         
                   <p style={{ fontSize: '14px', color: 'black', margin: '0 0 5px' }}>Select date and time</p>
                    
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
                 <label className="form-label">Batch Name</label>
                 <input
                  id="batchName"
                  className="form-control Inputfield-copy"
                  placeholder="Enter batch name"
                  value={batchDetails.batchName}
                  onChange={handleInputChange}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label className="form-label">Batch Seat</label>
                <input
                  id="seats" 
                  type='number'
                  className="form-control Inputfield-copy"
                  placeholder="Enter number of seats"
                  value={batchDetails.seats}
                  onChange={handleInputChange}
                />
              </div>
            </div>


         <div style={{display:"flex", flexWrap:"wrap", gap:"10px"}}>
          <div style={{ display: "flex", flexDirection: "column" }}>
                 <label className="form-label">Start Date</label>
                 <DatePicker
                  className="datepicker"
                  placeholder="Start Date"
                  value={batchDetails.startDate}
                  onChange={(value) => handleDateChange('startDate', value)}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label className="form-label">End Date</label>
                <DatePicker
                  className="datepicker"
                  placeholder="End Date"
                  value={batchDetails.endDate}
                  onChange={(value) => handleDateChange('endDate', value)}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label className="form-label">Start Time</label>
                <input
                  type="time"
                  className="form-control Inputfield-copy Inputfield-copys"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label className="form-label">End Time</label>
                <input
                  type="time"
                  className="form-control Inputfield-copy Inputfield-copys"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
         </div>

         {pricingType === 'batch' && (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label className="form-label">Enter Offer Price</label>
                  <input
                    id="price.offerPrice"
                    className="form-control Inputfield-copy"
                     type="number"
                    placeholder="Enter offer price"
                    value={batchDetails.price.offerPrice != 0 ? batchDetails.price.offerPrice : ""}
                    onChange={handleInputChange}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label className="form-label">Enter Offer Price</label>
                  <input
                    id="price.standardPrice"
                     type="number"
                    className="form-control Inputfield-copy"
                    placeholder="Enter standard price"
                    value={batchDetails.price.standardPrice != 0 ? batchDetails.price.standardPrice : ""}
                    onChange={handleInputChange}
                  />
                </div>


              </div>
            )}
            
           
            <div style={{ display: 'flex', justifyContent: 'end', gap: '5px',marginTop:"15px" }}>
            <ButtonComponent
               className="All-btn btn btn-primary"
               label={editingBatch ? 'Save Batch' : 'Add Batch'}
               onClick={editingBatch ? saveBatch : addBatch}
            />
              <ButtonComponent
                className="btn btn-danger light All-btn"
                label="Cancel"
                onClick={() => setIconMoved(false)}
              />
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default Batch;



import React, { useState } from 'react';
import { DatePicker } from 'rsuite';
import ButtonComponent from './ButtonComponent';
import { PencilLine, Plus } from '@phosphor-icons/react';
import Swal from 'sweetalert2';

// Utility function to convert 24-hour time to 12-hour format
const formatTimeTo12Hour = (time) => {
  if (!time) return '';
  const [hours, minutes] = time.split(':');
  const period = +hours >= 12 ? 'PM' : 'AM';
  const formattedHours = +hours % 12 || 12; // Convert 0 to 12 for midnight.
  return `${formattedHours}:${minutes} ${period}`;
};

const Batch = ({ onAddBatch, pricingType }) => {
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

  const [iconMoved, setIconMoved] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id.startsWith('price.')) {
      const field = id.split('.')[1]; // Extract 'offerPrice' or 'standardPrice'
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
    setBatchDetails((prev) => ({ ...prev, [id]: value }));
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

    if ((pricingType === 'batch') && (!batchName || !startDate || !endDate || !seats || !startTime || !endTime || price.offerPrice == 0 || price.standardPrice == 0)) {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill out all batch fields',
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

    // Reset fields
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
            {/* <PencilLine size={18} color="white" /> */}
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

            <div style={{ display: 'flex',flexWrap:"wrap", gap: '10px', alignItems: 'center' }}>
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
                label="Add Batch"
                onClick={addBatch}
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

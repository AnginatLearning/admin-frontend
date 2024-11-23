import React, { useState } from 'react';
import { DatePicker } from 'rsuite';
import ButtonComponent from './ButtonComponent';
import { PencilLine, Plus } from '@phosphor-icons/react';

const Batch = ({ onAddBatch }) => {
  const [batchDetails, setBatchDetails] = useState({
    batchName: '',
    startDate: null,
    endDate: null,
    timeZone: '',
    seats: '',
    offerPrice: '',
    standardPrice: '',
  });

  const [iconMoved, setIconMoved] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setBatchDetails((prev) => ({ ...prev, [id]: value }));
  };

  const handleDateChange = (id, value) => {
    setBatchDetails((prev) => ({ ...prev, [id]: value }));
  };

  const addBatch = () => {
    const { batchName, startDate, endDate, timeZone, seats, offerPrice, standardPrice } = batchDetails;

    if (!batchName || !startDate || !endDate || !timeZone || !seats) {
      alert('Please fill out all batch fields');
      return;
    }

    onAddBatch(batchDetails);
    setBatchDetails({
      batchName: '',
      startDate: null,
      endDate: null,
      timeZone: '',
      seats: '',
      offerPrice: '',
      standardPrice: '',
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
      <div
        style={{
          display: 'flex',
          justifyContent: iconMoved ? 'space-between' : 'space-between',
          alignItems: 'center',
          marginBottom: '10px',
        }}
      >
        {!iconMoved && (
          <p style={{ fontSize: '10px', marginTop: '0px', marginBottom: '0px' }}>Select date and time</p>
        )}

      </div>

      {iconMoved && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', cursor: 'pointer' }}>
          <div
            style={{
              background: '#6A73FA',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              padding: '12px',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <p style={{ color: 'white', fontSize: '12px', marginTop: '0px', marginBottom: '0px', cursor: 'pointer' }}>
                {batchDetails.startDate
                  ? new Date(batchDetails.startDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })
                  : 'Dec 2, 2024'}
              </p>
              <p style={{ color: 'white', fontSize: '12px', marginTop: '0px', marginBottom: '0px' }}>|</p>
              <p style={{ color: 'white', fontSize: '12px', marginTop: '0px', marginBottom: '0px' }}>
                {batchDetails.timeZone ? batchDetails.timeZone : 'Select a time zone'}
              </p>
            </div>
            <div>
              <PencilLine size={18} color="white" />
            </div>
          </div>

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
            <p style={{ fontSize: '14px', color: 'black', marginTop: '0px', marginBottom: '5px' }}>
              Select date and time
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', alignItems: 'center' }}>
              <div style={{ marginTop: '2px' }}>
                <input
                  id="batchName"
                  className="form-control Inputfield-copy"
                  placeholder="Enter batch name"
                  value={batchDetails.batchName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <input
                  id="seats"
                  className="form-control Inputfield-copy"
                  placeholder="Enter number of seats"
                  value={batchDetails.seats}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
              <div>
                <DatePicker
                  className="datepicker"
                  placeholder="Start Date"
                  value={batchDetails.startDate}
                  onChange={(value) => handleDateChange('startDate', value)}
                />
              </div>

              <div>
                <DatePicker
                  className="datepicker"
                  placeholder="End Date"
                  value={batchDetails.endDate}
                  onChange={(value) => handleDateChange('endDate', value)}
                />
              </div>

              <div>
                <input
                  id="timeZone"
                  className="form-control Inputfield-copy"
                  placeholder="Enter time zone"
                  value={batchDetails.timeZone}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
              <div>
                <input
                  id="offerPrice"
                  className="form-control Inputfield-copy"
                  placeholder="Enter offer price"
                  value={batchDetails.offerPrice}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <input
                  id="standardPrice"
                  className="form-control Inputfield-copy"
                  placeholder="Enter standard price"
                  value={batchDetails.standardPrice}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <p style={{ fontSize: '10px', marginTop: '0px', marginBottom: '0px' }}>
              Course will be private before publishing
            </p>

            <div
              style={{
                marginTop: '12px',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'end',
                gap: '5px',
              }}
            >
              <ButtonComponent
                className="All-btn btn  btn-primary"
                label="Add Batch"
                onClick={addBatch}
              />
              <ButtonComponent
                className="btn btn-danger light All-btn"
                label="Cancel"
                onClick={addBatch}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Batch;

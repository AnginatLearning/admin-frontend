import React, { useEffect, useState } from "react";
import { DatePicker } from "rsuite";
import ButtonComponent from "./ButtonComponent";
import { PencilLine, Plus, Trash, TrashSimple } from "@phosphor-icons/react";
import Swal from "sweetalert2";
import api from "../../../../services/AxiosInstance";
import { useParams } from "react-router-dom";

// Utility function to convert 24-hour time to 12-hour format
const formatTimeTo12Hour = (time) => {
  if (!time) return "";
  const [hours, minutes] = time.split(":");
  const period = +hours >= 12 ? "PM" : "AM";
  const formattedHours = +hours % 12 || 12; // Convert 0 to 12 for midnight.
  return `${formattedHours}:${minutes} ${period}`;
};

const Batch = ({ onAddBatch, pricingType }) => {
  const { id } = useParams();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [batches, setBatches] = useState([]);

  const [batchDetails, setBatchDetails] = useState({
    name: "",
    startDate: null,
    endDate: null,
    timeZone: "",
    seats: "",
    // price: {
    //   offerPrice: 0,
    //   standardPrice: 0,
    // },

    price: [
      {
        offerPrice: 0,
        standardPrice: 0,
        currency: "INR",
      },
    ],

    batchType: "",
  });
  const [editingBatch, setEditingBatch] = useState(null); // Track the batch being edited
  const [iconMoved, setIconMoved] = useState(false);

  useEffect(() => {
    const fetchCourseAndBatches = async () => {
      try {
        const response = await api.get(`/course/courses/${id}`);
        const course = response.data.data;

        if (course.batches) {
          setBatches(course.batches);

          console.log("course data", course);
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchCourseAndBatches();
  }, [id]);

  function convertTimeRangeTo24Hour(timeRange) {
    if (!timeRange || typeof timeRange !== "string") {
      return {
        error: "Invalid time range. Please provide a valid time range string.",
      };
    }

    // Helper function to convert time to 24-hour format
    function convertTo24HourFormat(time) {
      const [timePart, meridian] = time.split(" ");
      if (!timePart || !meridian || !["AM", "PM"].includes(meridian)) {
        throw new Error("Invalid time format");
      }

      let [hours, minutes] = timePart.split(":").map(Number);

      if (isNaN(hours) || isNaN(minutes)) {
        throw new Error("Invalid time format");
      }

      if (meridian === "PM" && hours !== 12) {
        hours += 12;
      } else if (meridian === "AM" && hours === 12) {
        hours = 0;
      }

      // Format with leading zeros
      hours = hours.toString().padStart(2, "0");
      minutes = minutes.toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    }

    try {
      // Split the time range into start and end times
      const [startTime, endTime] = timeRange.split(" - ");

      if (!startTime || !endTime) {
        throw new Error(
          "Time range must include a start and end time separated by ' - '"
        );
      }

      // Convert both times to 24-hour format
      const start = convertTo24HourFormat(startTime.trim());
      const end = convertTo24HourFormat(endTime.trim());

      // Return as a JSON object
      return { start, end };
    } catch (error) {
      return { error: error.message };
    }
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id.startsWith("price.")) {
      const field = id.split(".")[1];
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
    if (!value) {
      setBatchDetails((prev) => ({
        ...prev,
        [id]: null, // Set it to null if the value is empty
      }));
      return;
    }

    if (id === "startDate") {
      const selectedStartDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedStartDate < today) {
        Swal.fire({
          title: "Error!",
          text: "Start date cannot be in the past.",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }
    }
    if (id === "endDate" && !batchDetails.startDate) {
      Swal.fire({
        title: "Error!",
        text: "First select the start date",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
    if (id === "endDate" && batchDetails.startDate) {
      const selectedEndDate = new Date(value);
      const startDate = new Date(batchDetails.startDate);

      if (selectedEndDate < startDate) {
        Swal.fire({
          title: "Error!",
          text: "End date cannot be before start date.",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }
    }

    setBatchDetails((prev) => ({
      ...prev,
      [id]: value ? new Date(value) : null,
    }));
  };

  const addBatch = async () => {
    const { name, startDate, endDate, seats, price, batchType } = batchDetails;

    if (
      !name ||
      !startDate ||
      !endDate ||
      !seats ||
      !startTime ||
      !endTime ||
      !batchType
    ) {
      const missingFields = [];

      if (!name) missingFields.push("Batch Name");
      if (!startDate) missingFields.push("Start Date");
      if (!endDate) missingFields.push("End Date");
      if (!seats) missingFields.push("Seats");
      if (!startTime) missingFields.push("Start Time");
      if (!endTime) missingFields.push("End Time");
      if (!batchType) missingFields.push("Batch Type");

      const errorMessage = `Please fill out the ${missingFields.join(", ")}`;

      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "OK",
      });

      return;
    }

    if (
      pricingType === "batch" &&
      batchDetails.price.some(
        (p) => p.offerPrice === 0 || p.standardPrice === 0
      )
    ) {
      Swal.fire({
        title: "Error!",
        text: "Please fill out all batch pricing fields",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const newBatch = {
      ...batchDetails,
      timeZone: `${formatTimeTo12Hour(startTime)} - ${formatTimeTo12Hour(
        endTime
      )}`,
    };
    const url = window.location.pathname;

    if (url.includes("edit-courses")) {
      try {
        const res = await api.post(`course/courses/${id}/batches`, newBatch);

        if (res.status === 200) {
          Swal.fire({
            title: "Success!",
            text: "Batch has been updated.",
            icon: "success",
            confirmButtonText: "OK",
          });
          setBatchDetails({
            name: "",
            startDate: null,
            endDate: null,
            timeZone: "",
            seats: "",
            // price: {
            //   offerPrice: 0,
            //   standardPrice: 0,
            // },

            price: [
              {
                offerPrice: 0,
                standardPrice: 0,
                currency: "INR",
              },
            ],

            batchType: "",
          });
          setStartTime("");
          setEndTime("");
          setBatches((prevBatches) => [...prevBatches, newBatch]);
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to update the batch. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } else {
      setBatches((prevBatches) => [...prevBatches, newBatch]);
      onAddBatch(newBatch);
      Swal.fire({
        title: "Success!",
        text: "Batch has been updated.",
        icon: "success",
        confirmButtonText: "OK",
      });
      setBatchDetails({
        name: "",
        startDate: null,
        endDate: null,
        timeZone: "",
        seats: "",

        price: [
          {
            offerPrice: 0,
            standardPrice: 0,
            currency: "INR",
          },
        ],

        batchType: "",
      });
      setStartTime("");
      setEndTime("");
    }

    Swal.fire({
      title: "Success!",
      text: "Batch has been successfully added.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const saveBatch = async () => {
    const { name, startDate, endDate, seats, price, batchType } = batchDetails;

    if (
      !name ||
      !startDate ||
      !endDate ||
      !seats ||
      !startTime ||
      !endTime ||
      !batchType
    ) {
      const missingFields = [];

      if (!name) missingFields.push("Batch Name");
      if (!startDate) missingFields.push("Start Date");
      if (!endDate) missingFields.push("End Date");
      if (!seats) missingFields.push("Seats");
      if (!startTime) missingFields.push("Start Time");
      if (!endTime) missingFields.push("End Time");
      if (!endTime) missingFields.push("Batch Type");

      const errorMessage = `Please fill out the ${missingFields.join(", ")}`;

      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const updatedBatch = {
      name,
      startDate,
      endDate,
      seats,
      timeZone: `${formatTimeTo12Hour(startTime)} - ${formatTimeTo12Hour(
        endTime
      )}`,
      price,
      batchType,
    };

    try {
      const endpoint = `/course/courses/${id}/batches/${editingBatch._id}`;
      const response = await api.put(endpoint, updatedBatch);

      if (response.status === 200) {
        const updatedBatches = batches.map((batch) =>
          batch._id === editingBatch._id
            ? { ...updatedBatch, _id: editingBatch._id }
            : batch
        );
        setBatches(updatedBatches);

        Swal.fire({
          title: "Success!",
          text: "Batch has been updated.",
          icon: "success",
          confirmButtonText: "OK",
        });

        setEditingBatch(null);
        setBatchDetails({
          name: "",
          startDate: null,
          endDate: null,
          timeZone: "",
          seats: "",

          // price: {
          //   offerPrice: 0,
          //   standardPrice: 0,
          // },

          price: [
            {
              offerPrice: 0,
              standardPrice: 0,
              currency: "INR",
            },
          ],

          batchType: "",
        });
        setStartTime("");
        setEndTime("");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to update the batch. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Error updating batch:", error);
    }
  };

  const deleteBatch = async (batchId) => {
    try {
      const response = await api.delete(
        `/course/courses/${id}/batches/${batchId}`
      );

      if (response.status === 200) {
        setBatches((prevBatches) =>
          prevBatches.filter((batch) => batch._id !== batchId)
        );
        Swal.fire({
          title: "Success!",
          text: "Batch has been deleted successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to delete the batch. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Error deleting batch:", error);
    }
  };

  const editBatch = (batch) => {
    setIconMoved(false);

    const updatedPrice = batch.price.map((priceObj) => ({
      offerPrice: priceObj.offerPrice || 0, // Ensure offerPrice is defined
      standardPrice: priceObj.standardPrice || 0, // Ensure standardPrice is defined
      currency: priceObj.currency || "INR", // Add default currency if missing
    }));

    setBatchDetails({
      name: batch.name,
      startDate: batch.startDate ? new Date(batch.startDate) : null,
      endDate: batch.endDate ? new Date(batch.endDate) : null,
      seats: batch.seats,
      price: updatedPrice,
      batchType: batch.batchType,
    });

    setStartTime(convertTimeRangeTo24Hour(batch?.timeZone).start);
    setEndTime(convertTimeRangeTo24Hour(batch?.timeZone).end);
    setEditingBatch(batch);
  };

  const toggleVisibility = () => {
    setIconMoved(!iconMoved);
    setBatchDetails({
      name: "",
      startDate: null,
      endDate: null,
      timeZone: "",
      seats: "",

      // price: {
      //   offerPrice: 0,
      //   standardPrice: 0,
      // },

      price: [
        {
          offerPrice: 0,
          standardPrice: 0,
          currency: "INR",
        },
      ],

      batchType: "",
    });
    setStartTime("");
    setEndTime("");
    setEditingBatch(null);
  };

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;

    if (!batchDetails.startDate) {
      Swal.fire({
        title: "Error!",
        text: "Please select a start date first.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const selectedDate = new Date(batchDetails.startDate);
    const currentDate = new Date();
    const currentTime = new Date();
    currentTime.setSeconds(0, 0);

    const selectedDateTime = new Date(selectedDate);
    const [selectedHours, selectedMinutes] = selectedTime.split(":");
    selectedDateTime.setHours(selectedHours, selectedMinutes, 0, 0);

    if (selectedDate.toDateString() === currentDate.toDateString()) {
      if (selectedDateTime < currentTime) {
        Swal.fire({
          title: "Error!",
          text: "Start time cannot be in the past.",
          icon: "error",
          confirmButtonText: "OK",
        });
        setStartTime(""); // Reset time input
        return;
      }
    }
    setStartTime(selectedTime);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <h5 style={{ color: "#312A2A", fontSize: "14px", fontWeight: "500" }}>
          Add Batch
        </h5>
        <Plus
          color="black"
          size={21}
          style={{ cursor: "pointer" }}
          onClick={toggleVisibility}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {batches.map((batch, index) => (
          <>
            <div
              key={index}
              style={{
                background: "#6A73FA",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                padding: "12px",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <p style={{ color: "white", fontSize: "12px", margin: "0" }}>
                  {batch.startDate
                    ? new Date(batch.startDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "N/A"}
                </p>
                <p style={{ color: "white", fontSize: "12px", margin: "0" }}>
                  |
                </p>
                <p style={{ color: "white", fontSize: "12px", margin: "0" }}>
                  {batch.timeZone || "Select a time zone"}
                </p>
              </div>

              <div
                style={{ display: "flex", flexDirection: "row", gap: "8px" }}
              >
                <Trash
                  style={{ cursor: "pointer" }}
                  size={22}
                  color="white"
                  onClick={() => deleteBatch(batch._id)}
                />
                <PencilLine
                  style={{ cursor: "pointer" }}
                  size={22}
                  color="white"
                  onClick={() => editBatch(batch)}
                />
              </div>
            </div>

            {editingBatch && editingBatch._id === batch._id && (
              <div
                style={{
                  outline: "1px solid #888888",
                  padding: "12px",
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <p
                  style={{
                    fontSize: "14px",
                    color: "black",
                    margin: "0 0 5px",
                  }}
                >
                  Select date and time
                </p>

                <div
                  style={{ display: "flex", gap: "8px", alignItems: "center" }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label className="form-label">Batch Name</label>
                    <input
                      id="name"
                      className="form-control Inputfield-copy"
                      placeholder="Enter batch name"
                      value={batchDetails.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label className="form-label">Batch Seat</label>
                    <input
                      id="seats"
                      type="number"
                      className="form-control Inputfield-copy"
                      placeholder="Enter number of seats"
                      value={batchDetails.seats}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label className="form-label">Start Date</label>
                    <DatePicker
                      className="datepicker"
                      placeholder="Start Date"
                      value={batchDetails.startDate}
                      onChange={(value) => handleDateChange("startDate", value)}
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label className="form-label">End Date</label>
                    <DatePicker
                      className="datepicker"
                      placeholder="End Date"
                      value={batchDetails.endDate}
                      onChange={(value) => handleDateChange("endDate", value)}
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label className="form-label">Start Time</label>
                    <input
                      type="time"
                      className="form-control Inputfield-copy Inputfield-copys"
                      value={startTime}
                      onChange={(e) => {
                        setStartTime(e.target.value);
                      }}
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
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <label className="form-label">Batch Type</label>
                      <select
                        id="batchType"
                        className="form-control Inputfield-copy"
                        style={{
                          padding: "8px", // Adds space around the text for centering
                          height: "38px", // Adjusts the height for proper vertical alignment
                        }}
                        value={batchDetails.batchType}
                        onChange={(e) =>
                          setBatchDetails({
                            ...batchDetails,
                            batchType: e.target.value,
                          })
                        }
                      >
                        <option value="" selected={true} disabled>
                          Select Batch Type
                        </option>
                        <option value="weekdays">Weekdays</option>
                        <option value="weekends">Weekends</option>
                      </select>
                    </div>
                  </div>
                </div>

                {pricingType === "batch" && (
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <label className="form-label">Enter Offer Price</label>
                      <input
                        id="price.offerPrice"
                        className="form-control Inputfield-copy"
                        type="number"
                        placeholder="Enter offer price"
                        value={
                          batchDetails.price.offerPrice != 0
                            ? batchDetails.price.offerPrice
                            : ""
                        }
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
                        value={
                          batchDetails.price.standardPrice != 0
                            ? batchDetails.price.standardPrice
                            : ""
                        }
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                )}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    gap: "5px",
                    marginTop: "15px",
                  }}
                >
                  <ButtonComponent
                    className="All-btn btn btn-primary"
                    label={editingBatch ? "Save Batch" : "Add Batch"}
                    onClick={editingBatch ? saveBatch : addBatch}
                  />
                  <ButtonComponent
                    className="btn btn-danger light All-btn"
                    label="Cancel"
                    onClick={() => {
                      setIconMoved(false);
                      setBatchDetails({
                        name: "",
                        startDate: null,
                        endDate: null,
                        timeZone: "",
                        seats: "",

                        price: [
                          {
                            offerPrice: 0,
                            standardPrice: 0,
                            currency: "INR",
                          },
                        ],
                      });
                      setStartTime("");
                      setEndTime("");
                      setEditingBatch(null);
                    }}
                  />
                </div>
              </div>
            )}
          </>
        ))}

        {iconMoved && (
          <div
            style={{
              outline: "1px solid #888888",
              padding: "12px",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <p
              style={{
                fontSize: "14px",
                color: "black",
                margin: "0 0 5px",
              }}
            >
              Select date and time
            </p>

            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label className="form-label">Batch Name</label>
                <input
                  id="name"
                  className="form-control Inputfield-copy"
                  placeholder="Enter batch name"
                  value={batchDetails.name}
                  onChange={handleInputChange}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label className="form-label">Batch Seat</label>
                <input
                  id="seats"
                  type="number"
                  className="form-control Inputfield-copy"
                  placeholder="Enter number of seats"
                  value={batchDetails.seats}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label className="form-label">Start Date</label>
                <DatePicker
                  className="datepicker"
                  placeholder="Start Date"
                  value={batchDetails.startDate}
                  onChange={(value) => handleDateChange("startDate", value)}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label className="form-label">End Date</label>
                <DatePicker
                  className="datepicker"
                  placeholder="End Date"
                  value={batchDetails.endDate}
                  onChange={(value) => handleDateChange("endDate", value)}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label className="form-label">Start Time</label>
                <input
                  type="time"
                  className="form-control Inputfield-copy Inputfield-copys"
                  value={startTime}
                  onChange={handleTimeChange}
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

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label className="form-label">Batch Type</label>
                  <select
                    id="batchType"
                    className="form-control Inputfield-copy"
                    style={{
                      padding: "8px",
                      height: "38px",
                    }}
                    value={batchDetails.batchType}
                    onChange={(e) =>
                      setBatchDetails({
                        ...batchDetails,
                        batchType: e.target.value,
                      })
                    }
                  >
                    <option value="" disabled>
                      Select Batch Type
                    </option>
                    <option value="weekdays">Weekdays</option>
                    <option value="weekends">Weekends</option>
                  </select>
                </div>
              </div>
            </div>

            {pricingType === "batch" && (
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label className="form-label">Enter Offer Price</label>
                  <input
                    id="price.offerPrice"
                    className="form-control Inputfield-copy"
                    type="number"
                    placeholder="Enter offer price"
                    value={
                      batchDetails.price.offerPrice != 0
                        ? batchDetails.price.offerPrice
                        : ""
                    }
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
                    value={
                      batchDetails.price.standardPrice != 0
                        ? batchDetails.price.standardPrice
                        : ""
                    }
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "end",
                gap: "5px",
                marginTop: "15px",
              }}
            >
              <ButtonComponent
                className="All-btn btn btn-primary"
                label={editingBatch ? "Save Batch" : "Add Batch"}
                onClick={editingBatch ? saveBatch : addBatch}
              />
              <ButtonComponent
                className="btn btn-danger light All-btn"
                label="Cancel"
                onClick={() => {
                  setIconMoved(false);
                  setBatchDetails({
                    name: "",
                    startDate: null,
                    endDate: null,
                    timeZone: "",
                    seats: "",

                    price: [
                      {
                        offerPrice: 0,
                        standardPrice: 0,
                        currency: "INR",
                      },
                    ],
                  });
                  setStartTime("");
                  setEndTime("");
                  setEditingBatch(null);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Batch;

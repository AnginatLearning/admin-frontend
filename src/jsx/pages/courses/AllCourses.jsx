import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../../layouts/PageTitle";
import { Card, Col, Row } from "react-bootstrap";
import Banner from "/public/Course image.jpg";
import { PencilLine } from "@phosphor-icons/react";
import api from "../../../services/AxiosInstance";
import { calculateBatchDays } from "../../../utils/calculateBatchDays";
import { useSelector } from "react-redux";

const AllCourses = () => {
  const [loading, setLoading] = useState(true);
  const [filteredFeeData, setFilteredFeeData] = useState([]);
  const [courses, SetCourses] = useState([]);
  const query = useSelector((state) => state.search.query); // Access the query from Redux
  const navigate = useNavigate();

  const handleEditcourse = (id) => {
    navigate(`/edit-courses/${id}`);
  };

  const handleReadmore = (id) => {
    navigate(`/about-courses/${id}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const calculateDaysBetween = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end - start;
    const dayInMilliseconds = 1000 * 60 * 60 * 24;
    return Math.ceil(timeDifference / dayInMilliseconds);
  };

  const filterCoursesByQuery = (courses, query) => {
    if (query === "") {
      return courses;
    } else {
      return courses.filter((course) =>
        course.courseName.toLowerCase().includes(query.toLowerCase())
      );
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No token found");
        return;
      }
      try {
        const res = await api.get("course/courses/");
        const AllCourses = res.data.data;
        console.log(AllCourses);
        setFilteredFeeData(filterCoursesByQuery(AllCourses,query));
        SetCourses(AllCourses);
        setLoading(false);
      } catch (error) {
        console.error(
          "Error fetching Courses:",
          error.response ? error.response.data : error.message
        );
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    console.log("query", query);
 
    setFilteredFeeData(filterCoursesByQuery(courses, query));
  }, [query]);


  

  const renderBatchStartDate = (batches) => {
    if (!batches || batches.length === 0) return null;

    const firstBatchStartDate = formatDate(batches[0].startDate);
    const additionalBatchesCount = batches.length - 1;

    if (batches.length === 1) {
      return firstBatchStartDate;
    }

    return (
      <span>
        {firstBatchStartDate} (+{additionalBatchesCount} more batch
        {additionalBatchesCount > 1 ? "es" : ""})
      </span>
    );
  };

  // const renderBatchDuration = (batches) => {
  //   if (!batches || batches.length === 0) return null;

  //   if (batches.length === 1) {
  //     const batchDuration = calculateDaysBetween(
  //       batches[0].startDate,
  //       batches[0].endDate
  //     );
  //     return <span>{batchDuration} days</span>;
  //   }

  //   const totalDuration = batches.reduce((total, batch) => {
  //     return total + calculateDaysBetween(batch.startDate, batch.endDate);
  //   }, 0);

  //   return <span>{totalDuration} days</span>;
  // };

  const upcomingBatchDuration = (batches) => {
    if (!batches || batches.length === 0) return null;

    const currentDate = new Date();

    const batch = batches
      .filter((batch) => new Date(batch.startDate) > currentDate) // Filters future batches
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))[0]; // Sorts batches by startDate

    if (!batch) return null;

    const duration = calculateBatchDays(
      batch.startDate,
      batch.endDate,
      batch.batchType
    );

    return <span>{duration} days</span>;
  };

  return (
    <>
      <PageTitle activeMenu={"All Courses"} motherMenu={"Courses"} />
      <Row>
        {loading ? (
          <Col xs={12} style={{ textAlign: "center" }}>
            <div className="spinner-container">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </Col>
        ) : filteredFeeData.length > 0 ? (
          filteredFeeData.map((data, ind) => (
            <Col xl={3} xxl={4} lg={4} md={6} sm={6} key={ind}>
              <Card>
                {/* <img className="img-fluid rounded-top" src={data.thumbnail} alt="Banner" /> */}
                <img
                  style={{
                    height: "250px",
                    objectFit: "cover",
                    width: "100%",
                  }}
                  className="img-fluid rounded-top "
                  src={
                    data.thumbnail && data.thumbnail !== ""
                      ? data.thumbnail
                      : "/EmptyState.png"
                  }
                  alt="Course Banner"
                />
                <div className="card-body">
                  <h4>{data.courseName}</h4>
                  <ul className="list-group mb-3 list-group-flush">
                    {data.batches && data.batches.length > 0 && (
                      <li className="list-group-item px-0 border-top-0 d-flex justify-content-between">
                        <span style={{ fontSize: "14px" }}>
                          {renderBatchStartDate(data.batches)}
                        </span>
                      </li>
                    )}

                    {data.batches && data.batches.length > 0 && (
                      <li className="list-group-item px-0 d-flex justify-content-between">
                        <span style={{ fontSize: "14px" }} className="mb-0">
                          Duration:
                        </span>
                        <strong style={{ fontSize: "14px" }}>
                          {upcomingBatchDuration(data.batches)}
                        </strong>
                      </li>
                    )}

                    {/* <li style={{ borderBottom: "1px solid #e6e6e6" }} className="list-group-item px-0 d-flex justify-content-between">
                                            <span style={{ fontSize: "14px" }} className="mb-0">Instructor:</span>
                                            <strong style={{ fontSize: "14px" }}></strong>
                                        </li> */}
                  </ul>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <button
                      onClick={() => handleReadmore(data._id)}
                      disabled={true}
                      className="btn btn-primary All-btn"
                    >
                      Read More
                    </button>
                    <PencilLine
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => handleEditcourse(data._id)}
                      size={21}
                    />
                  </div>
                </div>
              </Card>
            </Col>
          ))
        ) : (
          <Col xs={12} style={{ textAlign: "center" }}>
            <p>No data available.</p>
          </Col>
        )}
      </Row>
    </>
  );
};

export default AllCourses;

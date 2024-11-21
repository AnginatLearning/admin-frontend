import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import PageTitle from '../../layouts/PageTitle';
import { Card, Col, Row } from 'react-bootstrap';
import { IMAGES } from '../../constant/theme';
import { PencilLine } from '@phosphor-icons/react';
import api from '../../../services/AxiosInstance';

const AllCourses = () => {
    const [filteredFeeData, setFilteredFeeData] = useState([]);
    const navigate = useNavigate();

    const handleEditcourse = (id) => {
        navigate(`/edit-courses/${id}`);
    };


    const handleReadmore = (id) => {
        navigate(`/about-courses/${id}`);  
    };

    useEffect(() => {
        const fetchCourses = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                console.error('No token found');
                return;
            }
            try {
                const res = await api.get('course/courses/');
                const AllCourses = res.data.data;
                setFilteredFeeData(AllCourses);
            } catch (error) {
                console.error('Error fetching Courses:', error.response ? error.response.data : error.message);
            }
        };
        fetchCourses();
    }, []);

    return (
        <>
            <PageTitle activeMenu={"All Courses"} motherMenu={"Courses"} />
            <Row>
                {filteredFeeData.map((data, ind) => (
                    <Col xl={3} xxl={4} lg={4} md={6} sm={6} key={ind}>
                        <Card>
                            <img className="img-fluid rounded-top" src={data.image} alt="" />
                            <div className="card-body">
                                <h4>{data.description}</h4>
                                <ul className="list-group mb-3 list-group-flush">
                                    <li className="list-group-item px-0 border-top-0 d-flex justify-content-between">
                                        <span style={{ fontSize: "14px" }} className="mb-0 text-[16px]">April 23</span>
                                        <Link to={"#"} className="add-wishlist-btn">
                                            <i className="la la-heart-o outline"></i>
                                            <i className="la la-heart fill" />
                                            {" "}<span style={{ fontSize: "14px" }}>{data.like}</span>
                                        </Link>
                                    </li>
                                    <li className="list-group-item px-0 d-flex justify-content-between">
                                        <span style={{ fontSize: "14px" }} className="mb-0">Duration :</span><strong style={{ fontSize: "14px" }}>12 Months</strong>
                                    </li>
                                    <li style={{ borderBottom: "1px solid #e6e6e6" }} className="list-group-item px-0 d-flex justify-content-between">
                                        <span style={{ fontSize: "14px" }} className="mb-0">Instructor :</span><strong style={{ fontSize: "14px" }}>{data.instructor}</strong></li>
                                </ul>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    {/* Button for "Read More" with dynamic course ID */}
                                    <button onClick={() => handleReadmore(data._id)} className="btn btn-primary All-btn">Read More</button>
                                    <PencilLine onClick={() => handleEditcourse(data._id)} size={21} />
                                </div>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default AllCourses;

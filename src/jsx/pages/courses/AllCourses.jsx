import React from 'react';
import {Link} from 'react-router-dom';

import PageTitle from '../../layouts/PageTitle';
import { Card, Col, Row } from 'react-bootstrap';
import { IMAGES } from '../../constant/theme';
import { PencilLine } from '@phosphor-icons/react';

const coursesData = [
    {image: IMAGES.course1, title:'Why Should You Consider Taking an Education Course?', like:'400',  Instructor:'Jack Ronan'  },
    {image: IMAGES.course2, title:'Education Courses: A Guide to Unlocking Your Potential', like:'320',  Instructor:'Jimmy Morris'  },
    {image: IMAGES.course3, title:'A Comprehensive Guide to Taking an Education Course', like:'250',  Instructor:'Konne Backfield'  },
    {image: IMAGES.course4, title:'When Is the Best Time to Take an Education Course?', like:'350',  Instructor:'Nashid Martines'  },
    {image: IMAGES.course5, title:'When Is the Best Time to Take an Education Course?', like:'450',  Instructor:'Jack Ronan'  },
    {image: IMAGES.course6, title:'Education Courses: A Guide to Unlocking Your Potential', like:'120',  Instructor:'Jimmy Morris'  },
    {image: IMAGES.course7, title:'A Comprehensive Guide to Taking an Education Course', like:'250',  Instructor:'Konne Backfield'  },
    {image: IMAGES.course8, title:'Why Should You Consider Taking an Education Course?', like:'302',  Instructor:'Nashid Martines' },
    
];

const AllCourses = () => {
    return (
        <>
            <PageTitle activeMenu={"All Courses"} motherMenu={"Courses"} />
            <Row>
                {coursesData.map((data, ind)=>(
                    <Col xl={3} xxl={4} lg={4} md={6} sm={6} key={ind}>
                        <Card>
                            <img className="img-fluid rounded-top" src={data.image} alt="" />
                            <div className="card-body">
                                <h4>{data.title}</h4>
                                <ul className="list-group mb-3 list-group-flush">
                                    <li  className="list-group-item px-0 border-top-0 d-flex justify-content-between">
                                        <span  style={{fontSize:"14px"}} className="mb-0 text-[16px]">April 23</span>
                                        <Link to={"#"} className="add-wishlist-btn">
                                            <i className="la la-heart-o outline"></i>
                                            <i className="la la-heart fill" />
                                            {" "}<span style={{fontSize:"14px"}}>{data.like}</span>
                                        </Link>
                                    </li>
                                    <li className="list-group-item px-0 d-flex justify-content-between">
                                        <span style={{fontSize:"14px"}} className="mb-0 ">Duration :</span><strong style={{fontSize:"14px"}}>12 Months</strong>
                                    </li>
                                    <li style={{borderBottom:"1px solid #e6e6e6"}} className="list-group-item px-0 d-flex  justify-content-between">
                                        <span style={{fontSize:"14px"}} className="mb-0">Instructor :</span><strong style={{fontSize:"14px"}}>{data.Instructor}</strong></li>
                                   
                                </ul>
                                <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                                  <Link to={"/about-courses"} className="btn btn-primary">Read More</Link>
                                  <PencilLine size={21} />
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
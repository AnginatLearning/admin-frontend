import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import api from '../../../services/AxiosInstance'; // Ensure the API instance is imported

import { BgCard } from '../../elements/CardDesign';
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";

// Import Charts
const SurveyChart = loadable(() => pMinDelay(import("../../elements/dashboard/SurveyChart"), 500));
const DonughtChart = loadable(() => pMinDelay(import("../../elements/dashboard/DonughtChart"), 500));
const University = loadable(() => pMinDelay(import("../../elements/dashboard/University"), 500));

// Card data template
const bgCarddBlog = [
    { title: "Total Students", number: '3180', icon: <i className="la la-users" />, percent: '80%', color: "primary" },
    { title: "New Students", number: '360', icon: <i className="la la-user" />, percent: '50%', color: "warning" },
    { title: "Total Courses", number: '', icon: <i className="la la-graduation-cap" />, percent: '60%', color: "secondary" }, // Updated to hold dynamic data
    { title: "Total Leads", number: '', icon: <i className="la la-dollar" />, percent: '35%', color: "danger" }, // Updated to hold dynamic data
];

const Home = () => {
    const [totalLeads, setTotalLeads] = useState(0);
    const [totalCourses, setTotalCourses] = useState(0); // State for total courses

    // Fetch total leads
    useEffect(() => {
        const fetchTotalLeads = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                console.error('No token found');
                return;
            }
            try {
                const res = await api.get('auth/lead/leads'); // Assume this endpoint returns the leads
                const allLeads = res.data.data.leads;
                setTotalLeads(allLeads.length);
            } catch (error) {
                console.error('Error fetching leads:', error.response ? error.response.data : error.message);
                Swal.fire('Error', 'Failed to load total leads.', 'error');
            }
        };

        fetchTotalLeads();
    }, []);

    // Fetch total courses
    useEffect(() => {
        const fetchCourses = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                console.error("No token found");
                return;
            }
            try {
                const res = await api.get("course/courses/");  // Adjust the endpoint as necessary
                const allCourses = res.data.data; // Assuming the API returns the courses in this format
                setTotalCourses(allCourses.length); // Count the total number of courses
            } catch (error) {
                console.error("Error fetching Courses:", error.response ? error.response.data : error.message);
                Swal.fire('Error', 'Failed to load total courses.', 'error'); // Alert on error
            }
        };
        fetchCourses();
    }, []);

    // Update the cards with the dynamic values
    bgCarddBlog[2].number = totalCourses; // Update the Total Courses card
    bgCarddBlog[3].number = totalLeads;   // Update the Total Leads card

    return (
        <>
            <Row>
                {bgCarddBlog.map((item, index) => (
                    <Col xl={'3'} xxl={'3'} sm={'6'} key={index}>
                        <div className={`widget-stat card bg-${item.color}`}>
                            <div className="card-body ">
                                <BgCard title={item.title} number={item.number} percent={item.percent} color={item.color} icon={item.icon} />
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default Home;
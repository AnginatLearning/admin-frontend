import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import api from "../../../services/AxiosInstance";

import { BgCard } from "../../elements/CardDesign";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";

// Import Charts
const SurveyChart = loadable(() =>
  pMinDelay(import("../../elements/dashboard/SurveyChart"), 500)
);
const DonughtChart = loadable(() =>
  pMinDelay(import("../../elements/dashboard/DonughtChart"), 500)
);
const University = loadable(() =>
  pMinDelay(import("../../elements/dashboard/University"), 500)
);

// Card data template
const bgCarddBlog = [
  {
    title: "Total Students",
    number: "3180",
    icon: <i className="la la-users" />,
    percent: "80%",
    color: "primary",
  },
  {
    title: "New Students",
    number: "360",
    icon: <i className="la la-user" />,
    percent: "50%",
    color: "warning",
  },
  {
    title: "Total Courses",
    number: "",
    icon: <i className="la la-graduation-cap" />,
    percent: "60%",
    color: "secondary",
  },
  {
    title: "Total Leads",
    number: "",
    icon: <i className="la la-dollar" />,
    percent: "35%",
    color: "danger",
  },
];

const Home = () => {
  const [totalLeads, setTotalLeads] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [coursesLast25Days, setCoursesLast25Days] = useState(0);
  const [coursesPercentage, setCoursesPercentage] = useState(0);
  const [leadsLast30Days, setLeadsLast30Days] = useState(0);
  const [leadsPercentage, setLeadsPercentage] = useState(0);

  // Fetch total leads
  useEffect(() => {
    const fetchTotalLeads = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No token found");
        return;
      }
      try {
        const res = await api.get("/lead/leads");
        const allLeads = res.data.data.leads;
        setTotalLeads(allLeads.length);

        const currentDate = new Date();
        const twentyDaysAgo = new Date(
          currentDate.setDate(currentDate.getDate() - 20)
        );

        const recentLeads = allLeads.filter((lead) => {
          const leadDate = new Date(lead.date);
          return leadDate >= twentyDaysAgo;
        });

        setLeadsLast30Days(recentLeads.length);

        if (allLeads.length > 0) {
          const percentage = Math.round(
            (recentLeads.length / allLeads.length) * 100
          );
          setLeadsPercentage(percentage);
        }

        console.log("Leads added in the last 20 days:", recentLeads.length);
        console.log(
          "Percentage of leads added in the last 20 days:",
          leadsPercentage
        );
      } catch (error) {
        console.error(
          "Error fetching leads:",
          error.response ? error.response.data : error.message
        );
        Swal.fire("Error", "Failed to load total leads.", "error");
      }
    };

    fetchTotalLeads();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No token found");
        return;
      }
      try {
        const res = await api.get("course/courses/");
        const allCourses = res.data.data;
        setTotalCourses(allCourses.length);

        const currentDate = new Date();
        const twentyFiveDaysAgo = new Date(
          currentDate.setDate(currentDate.getDate() - 20)
        );

        const recentCourses = allCourses.filter((course) => {
          const courseDate = new Date(course.createdAt);
          return courseDate >= twentyFiveDaysAgo;
        });

        setCoursesLast25Days(recentCourses.length);

        if (allCourses.length > 0) {
          const percentage = Math.round(
            (recentCourses.length / allCourses.length) * 100
          );
          setCoursesPercentage(percentage);
        }
      } catch (error) {
        console.error(
          "Error fetching Courses:",
          error.response ? error.response.data : error.message
        );
        Swal.fire("Error", "Failed to load total courses.", "error");
      }
    };
    fetchCourses();
  }, [totalCourses]);

  // Update the cards with the dynamic values
  bgCarddBlog[2].number = totalCourses;
  bgCarddBlog[3].number = totalLeads;
  bgCarddBlog[2].percent = `${coursesPercentage}%`;
  bgCarddBlog[3].percent = `${leadsPercentage}%`;

  return (
    <>
      <Row>
        {bgCarddBlog.map((item, index) => (
          <Col xl={"3"} xxl={"3"} sm={"6"} key={index}>
            <div className={`widget-stat card bg-${item.color}`}>
              <div className="card-body ">
                <BgCard
                  title={item.title}
                  number={item.number}
                  percent={item.percent}
                  color={item.color}
                  icon={item.icon}
                />
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import { Dropdown, Row, Tab } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Export, Trash } from "@phosphor-icons/react";
import Swal from "sweetalert2";
import api from "../../../services/AxiosInstance";

const theadData = [
  { heading: "Select", sortingVale: "Select" },
  { heading: "Name", sortingVale: "name" },
  { heading: "Interest", sortingVale: "Interest" },
  { heading: "Mobile", sortingVale: "mobile" },
  { heading: "Email", sortingVale: "email" },
  { heading: "Lead Date", sortingVale: "join" },
  { heading: "Status", sortingVale: "Status" },
  { heading: "Action", sortingVale: "action" },
];

const LeadManagement = () => {
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState(10);
  const [feeData, setFeeData] = useState([]);
  const [filteredFeeData, setFilteredFeeData] = useState([]);
  const [activePage, setActivePage] = useState(0);
  const [sortingOrder, setSortingOrder] = useState({
    column: null,
    direction: "asc",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeads = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No token found");
        return;
      }
      try {
        const res = await api.get("/lead/leads");
        const allLeads = res.data.data.leads;
        const totalLeads = allLeads.length;
        console.log(`Total number of leads: ${totalLeads}`);
        console.log(allLeads);

        const activeLeads = allLeads.filter(
          (lead) => lead.status !== "Deleted" && lead.status !== "Trashed"
        );
        setFeeData(activeLeads);
        setFilteredFeeData(activeLeads);
        setLoading(false);
      } catch (error) {
        console.error(
          "Error fetching leads:",
          error.response ? error.response.data : error.message
        );
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredData = feeData.filter((item) => {
      const searchString =
        `${item.applicantName} ${item.course} ${item.phoneNumber} ${item.email}`.toLowerCase();
      return searchString.includes(searchValue);
    });
    setFilteredFeeData(filteredData);
    setActivePage(0);
  };

  const numPages = Math.ceil(filteredFeeData.length / sort);
  const displayedLeads = filteredFeeData.slice(
    activePage * sort,
    (activePage + 1) * sort
  );

  const handleEntriesChange = (num) => {
    setSort(num);
    setActivePage(0);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const lead = filteredFeeData.find((lead) => lead._id === id);
        if (lead) {
          const payload = {
            leadId: id,
            updateData: { status: "Trashed" },
          };

          const response = await api.patch("/lead/lead/status", payload);
          if (response.data.status === "success") {
            Swal.fire("Deleted!", "Lead has been moved to trash.", "success");
            setFilteredFeeData(
              filteredFeeData.filter((lead) => lead._id !== id)
            );
          } else {
            Swal.fire("Error", "Something went wrong!", "error");
          }
        }
      } catch (error) {
        Swal.fire("Error", "Failed to delete lead.", "error");
        console.error(
          "Error deleting lead:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const SotingData = (column) => {
    let direction = "asc";
    if (sortingOrder.column === column && sortingOrder.direction === "asc") {
      direction = "desc";
    }
    const sortedData = [...filteredFeeData].sort((a, b) => {
      if (direction === "asc") {
        return a[column] > b[column] ? 1 : -1;
      } else {
        return a[column] < b[column] ? 1 : -1;
      }
    });
    setFilteredFeeData(sortedData);
    setSortingOrder({ column, direction });
    setActivePage(0); // Reset to first page after sorting
  };

  return (
    <>
      <Row>
        <Tab.Container defaultActiveKey={"List"}>
          <div className="col-lg-12">
            <Tab.Content className="row tab-content">
              <Tab.Pane eventKey="List" className="col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">All Leads</h4>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <div
                        id="holidayList"
                        className="dataTables_wrapper no-footer"
                      >
                        <div className="justify-content-between d-sm-flex">
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "20px",
                            }}
                            className="dataTables_length"
                          >
                            <div className="hover-pointer">
                              <label className="d-flex align-items-center hover-pointer">
                                Show
                                <Dropdown className="search-drop">
                                  <Dropdown.Toggle
                                    as="div"
                                    className="search-drop-btn"
                                  >
                                    {sort}
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu>
                                    <Dropdown.Item
                                      onClick={() => handleEntriesChange(10)}
                                    >
                                      10
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      onClick={() => handleEntriesChange(20)}
                                    >
                                      20
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      onClick={() => handleEntriesChange(30)}
                                    >
                                      30
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                                entries
                              </label>
                            </div>
                            <div
                              className="hover-pointer"
                              style={{
                                border: "solid 1px #E6E6E6",
                                padding: "7px",
                                borderRadius: "5px",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  gap: "4px",
                                }}
                              >
                                <Export size={16} />
                                <label htmlFor="">Export</label>
                              </div>
                            </div>
                            <div
                              onClick={() =>
                                navigate("/Lead-management-emptytrash")
                              }
                              className="hover-pointer"
                              style={{
                                border: "solid 1px #E6E6E6",
                                padding: "7px",
                                borderRadius: "5px",
                              }}
                            >
                              <div
                                className="hover-pointer"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  gap: "4px",
                                }}
                              >
                                <Trash size={16} />
                                <label htmlFor="">Empty Trash</label>
                              </div>
                            </div>
                          </div>
                          <div className="dataTables_filter ">
                            <label>
                              Search :{" "}
                              <input type="search" onChange={handleSearch} />
                            </label>
                          </div>
                        </div>
                        <table
                          id="example4"
                          className="display dataTable no-footer w-100"
                        >
                          <thead>
                            <tr>
                              {theadData.map((item, ind) => (
                                <th
                                  key={ind}
                                  onClick={() => SotingData(item.sortingVale)}
                                >
                                  {item.heading}
                                  <span>
                                    {sortingOrder.column === item.sortingVale &&
                                      (sortingOrder.direction === "asc" ? (
                                        <i
                                          className="fa fa-arrow-up ms-2 fs-12"
                                          style={{ opacity: "0.7" }}
                                        />
                                      ) : (
                                        <i
                                          className="fa fa-arrow-down ms-2 fs-12"
                                          style={{ opacity: "0.7" }}
                                        />
                                      ))}
                                    {sortingOrder.column !==
                                      item.sortingVale && (
                                      <i
                                        className="fa fa-sort ms-2 fs-12"
                                        style={{ opacity: "0.3" }}
                                      />
                                    )}
                                  </span>
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {loading ? (
                              <tr>
                                <td colSpan={8} style={{ textAlign: "center" }}>
                                  <div className="spinner-container">
                                    <div
                                      className="spinner-border text-primary"
                                      role="status"
                                    >
                                      <span className="visually-hidden">
                                        Loading...
                                      </span>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ) : displayedLeads.length > 0 ? (
                              displayedLeads.map((data) => (
                                <tr key={data._id}>
                                  <td>
                                    <input
                                      style={{ height: "15px", width: "15px" }}
                                      type="checkbox"
                                    />
                                  </td>
                                  <td>{data.applicantName}</td>
                                  <td>{data.course}</td>
                                  <td>
                                    <a href="#">{data.phoneNumber}</a>
                                  </td>
                                  <td>
                                    <a href="#">{data.email}</a>
                                  </td>
                                  <td>{formatDate(data.date)}</td>
                                  <td>{data.status}</td>
                                  <td>
                                    <button
                                      onClick={() =>
                                        navigate(
                                          `/Lead-management-edit-lead/${data._id}`
                                        )
                                      }
                                      className="btn btn-xs sharp btn-primary me-1"
                                    >
                                      <i className="fa fa-pencil" />
                                    </button>
                                    <a
                                      onClick={() => handleDelete(data._id)}
                                      className="btn btn-xs sharp btn-danger"
                                    >
                                      <i className="fa fa-trash" />
                                    </a>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={8} style={{ textAlign: "center" }}>
                                  No leads yet
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                        <div className="d-sm-flex text-center justify-content-between align-items-center mt-3">
                          <div className="dataTables_info">
                            Showing {activePage * sort + 1} to{" "}
                            {Math.min(
                              (activePage + 1) * sort,
                              filteredFeeData.length
                            )}{" "}
                            of {filteredFeeData.length} entries
                          </div>
                          <div className="dataTables_paginate paging_simple_numbers">
                            <Link
                              className={`paginate_button previous ${
                                activePage === 0 ? "disabled" : ""
                              }`}
                              to="#"
                              onClick={() =>
                                activePage > 0 && setActivePage(activePage - 1)
                              }
                            >
                              Previous
                            </Link>
                            <span>
                              {Array.from({ length: numPages }, (_, i) => (
                                <Link
                                  key={i}
                                  to="#"
                                  className={`paginate_button ${
                                    activePage === i ? "current" : ""
                                  }`}
                                  onClick={() => setActivePage(i)}
                                >
                                  {i + 1}
                                </Link>
                              ))}
                            </span>
                            <Link
                              className={`paginate_button next ${
                                activePage + 1 >= numPages ? "disabled" : ""
                              }`}
                              to="#"
                              onClick={() =>
                                activePage + 1 < numPages &&
                                setActivePage(activePage + 1)
                              }
                            >
                              Next
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </div>
        </Tab.Container>
      </Row>
    </>
  );
};

export default LeadManagement;

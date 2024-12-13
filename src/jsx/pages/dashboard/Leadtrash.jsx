// import React, { useState, useRef, useEffect } from 'react';
// import { Dropdown, Row, Nav, Tab } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
// import { Export, Trash, FunnelSimple } from "@phosphor-icons/react";
// import Swal from 'sweetalert2';
// import { IMAGES } from '../../constant/theme';
// import axios from 'axios';
// import api from '../../../services/AxiosInstance';
// import { ClockClockwise } from "@phosphor-icons/react";

// const theadData = [
//     { heading: 'Select', sortingVale: "Select" },
//     { heading: 'Name', sortingVale: "name" },
//     { heading: 'Interest', sortingVale: "Interest" },
//     { heading: 'Mobile', sortingVale: "mobile" },
//     { heading: 'Email', sortingVale: "email" },
//     { heading: 'Lead Date', sortingVale: "join" },
//     { heading: 'Status', sortingVale: "Status" },
//     { heading: 'Action', sortingVale: "action" }
// ];


// const Leadtrash = () => {
//     const [loading, setLoading] = useState(true);
//     const [sort, setSortata] = useState(10);
//     const [feeData, setFeeData] = useState([]);
//     const [data, setData] = useState(
//         document.querySelectorAll('#holidayList tbody tr')
//     )
//     const [filteredFeeData, setFilteredFeeData] = useState([]);

//     useEffect(() => {
//         const fetchLeads = async () => {
//             const token = localStorage.getItem('accessToken');
//             if (!token) {
//                 console.error('No token found');
//                 return;
//             }
//             try {
//                 const res = await api.get('auth/lead/leads')
//                 setFeeData(res.data.data.leads);
//                 setFilteredFeeData(res.data.data.leads);
//                 setTimeout(() => {
//                     setLoading(false);
//                 }, 1000);
//             } catch (error) {
//                 console.error('Error fetching leads:', error.response ? error.response.data : error.message);
//             }
//         };
//         fetchLeads();
//     }, []);

//     const handleSearch = (e) => {
//         const searchValue = e.target.value.toLowerCase();
//         const filteredData = feeData.filter((item) => {
//             const searchString = `${item.applicantName} ${item.course} ${item.phoneNumber} ${item.email}`.toLowerCase();
//             return searchString.includes(searchValue);
//         });
//         setFilteredFeeData(filteredData);
//     };
//     const activePag = useRef(0)
//     const [test, settest] = useState(0)

//     const chageData = (frist, sec) => {
//         for (var i = 0; i < data.length; ++i) {
//             if (i >= frist && i < sec) {
//                 data[i].classList.remove('d-none')
//             } else {
//                 data[i].classList.add('d-none')
//             }
//         }
//     }

//     useEffect(() => {
//         setData(document.querySelectorAll('#holidayList tbody tr'))
//     }, [test])


//     activePag.current === 0 && chageData(0, sort)

//     let paggination = Array(Math.ceil(data.length / sort))
//         .fill()
//         .map((_, i) => i + 1)


//     const onClick = (i) => {
//         activePag.current = i
//         chageData(activePag.current * sort, (activePag.current + 1) * sort)
//         settest(i)
//     }

//     const [iconData, setIconDate] = useState({ complete: false, ind: Number });

//     useEffect(() => {
//         const fetchLeads = async () => {
//             const token = localStorage.getItem('accessToken');
//             if (!token) {
//                 console.error('No token found');
//                 return;
//             }
//             try {
//                 const res = await api.get('auth/lead/leads');

//                 const activeLeads = res.data.data.leads.filter(lead => lead.status == 'Trashed', lead => lead.status !== '');
//                 setFeeData(activeLeads);
//                 setFilteredFeeData(activeLeads);
//             } catch (error) {
//                 console.error('Error fetching leads:', error.response ? error.response.data : error.message);
//             }
//         };
//         fetchLeads();
//     }, []);


//     function SotingData(name) {
//         const sortedPeople = [...feeData];
//         switch (name) {
//             case "rollno":
//                 sortedPeople.sort((a, b) => {
//                     return a.rollno < b.rollno ? -1 : 1
//                 });
//                 break;
//             case "name":
//                 sortedPeople.sort((a, b) => {
//                     return iconData.complete ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
//                 });
//                 break;
//             case "education":
//                 sortedPeople.sort((a, b) => {
//                     return iconData.complete ? a.education.localeCompare(b.education) : b.education.localeCompare(a.education)
//                 });
//                 break;
//             case "mobile":
//                 sortedPeople.sort((a, b) => {
//                     return iconData.complete ? a.mobile.localeCompare(b.mobile) : b.mobile.localeCompare(a.mobile)
//                 });
//                 break;
//             case "join":
//                 sortedPeople.sort((a, b) => {
//                     return iconData.complete ? a.join.localeCompare(b.join) : b.join.localeCompare(a.join)
//                 });
//                 break;
//             default:
//                 break;
//         }
//         setFeeData(sortedPeople);
//     }

//     const navigate = useNavigate()
//     const Leademptytrash = () => {
//         navigate("/Lead-management-emptytrash")
//     }

//     const handleDelete = async (id) => {

//         const firstResult = await Swal.fire({
//             title: 'Delete items',
//             text: 'Are you sure you want to permanently delete these items? This action cannot be undone.',
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonText: 'Yes',
//             cancelButtonText: 'No',
//             background: '#e6e6e6',
//             customClass: {

//                 confirmButton: 'swal-btn-confirm',
//                 cancelButton: 'swal-btn-cancel'
//             },
//         });


//         if (firstResult.isConfirmed) {

//             const secondResult = await Swal.fire({
//                 title: 'Are You Sure?',
//                 text: 'Do you really want to permanently delete this ?',
//                 icon: 'error',
//                 showCancelButton: true,
//                 confirmButtonText: 'Yes',
//                 cancelButtonText: 'No',
//                 background: '#e6e6e6',
//                 customClass: {
//                     confirmButton: 'swal-btn-confirm',
//                     cancelButton: 'swal-btn-cancel'
//                 },
//             });


//             if (secondResult.isConfirmed) {
//                 try {
//                     const lead = feeData.find(lead => lead._id === id);

//                     if (lead) {
//                         console.log("Lead Information to delete:", lead);


//                         const payload = {
//                             leadId: id,
//                             updateData: {
//                                 status: 'Deleted', 
//                                 course: lead.course,  
//                                 applicantName: lead.applicantName,  
//                                 phoneNumber: lead.phoneNumber,  
//                                 email: lead.email,  
//                             }
//                         };

//                         const response = await api.patch('auth/lead/lead/status', payload);

//                         if (response.status === 200) {
//                             Swal.fire('Deleted!', 'Lead status has been moved to Trash', 'success');


//                             setFeeData(feeData.filter(lead => lead._id !== id));
//                             setFilteredFeeData(filteredFeeData.filter(lead => lead._id !== id));
//                         } else {
//                             Swal.fire('Error', 'Something went wrong!', 'error');
//                         }
//                     } else {
//                         console.log("Lead not found with ID:", id);
//                     }
//                 } catch (error) {
//                     Swal.fire('Error', 'Failed to update lead status.', 'error');
//                     console.error('Error deleting lead:', error.response ? error.response.data : error.message);
//                 }
//             } else {

//                 Swal.fire('Cancelled', 'The lead is safe :)', 'info');
//             }
//         } else {

//             Swal.fire('Cancelled', 'The lead was not deleted.', 'info');
//         }
//     };


//     const handleRestore = async (id) => {

//         const firstResult = await Swal.fire({
//             title: 'Restore items',
//             text: 'Do you want to restore these items? They will be moved back to their original location.',
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonText: 'Yes',
//             cancelButtonText: 'No',
//             background: '#e6e6e6',
//             customClass: {
//                 confirmButton: 'swal-btn-confirm',
//                 cancelButton: 'swal-btn-cancel',
//             },

//         });


//         if (firstResult.isConfirmed) {
//             try {
//                 const lead = feeData.find(lead => lead._id === id);



//                 if (lead) {
//                     console.log("Lead Information to restore:", lead);


//                     const payload = {
//                         leadId: id,
//                         updateData: {
//                             status: 'Restored', 
//                             course: lead.course,  
//                             applicantName: lead.applicantName,  
//                             phoneNumber: lead.phoneNumber,  
//                             email: lead.email,  
//                         }
//                     };


//                     const response = await api.patch('auth/lead/lead/status', payload);

//                     if (response.status === 200) {

//                         Swal.fire('Restored!', 'Lead has been successfully restored.', 'success');


//                         setFeeData(feeData.filter(lead => lead._id !== id));
//                         setFilteredFeeData(filteredFeeData.filter(lead => lead._id !== id));
//                     } else {

//                         Swal.fire('Error', 'Something went wrong while restoring the lead!', 'error');
//                     }
//                 } else {
//                     console.log("Lead not found with ID:", id);
//                     Swal.fire('Error', 'Lead not found!', 'error');
//                 }
//             } catch (error) {

//                 Swal.fire('Error', 'Failed to restore lead status.', 'error');
//                 console.error('Error restoring lead:', error.response ? error.response.data : error.message);
//             }
//         } else {
//             Swal.fire('Cancelled', 'The lead was not restored.', 'info');
//         }
//     };

//     const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         const year = date.getFullYear();
//         const month = (date.getMonth() + 1).toString().padStart(2, '0');
//         const day = date.getDate().toString().padStart(2, '0');
//         return `${year}-${month}-${day}`;
//     };
//     const Editlead = () => {
//         //    navigate('/Editlead')
//     }


//     return (
//         <>

//             <Row>
//                 <Tab.Container defaultActiveKey={"List"}>

//                     <div className="col-lg-12">
//                         <Tab.Content className="row tab-content">
//                             <Tab.Pane eventKey="List" className="col-lg-12">
//                                 <div className="card">
//                                     <div className="card-header">
//                                         <h4 className="card-title" >Trash Files</h4>

//                                     </div>
//                                     <div className="card-body">
//                                         <div className="table-responsive">
//                                             <div id='holidayList' className='dataTables_wrapper no-footer'>
//                                                 <div className='justify-content-between d-sm-flex'>
//                                                     <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }} className='dataTables_length'>
//                                                         <div className='hover-pointer'>
//                                                             <label className='d-flex align-items-center hover-pointer'>
//                                                                 Show
//                                                                 <Dropdown className='search-drop'>
//                                                                     <Dropdown.Toggle as="div" className="search-drop-btn">
//                                                                         {sort}
//                                                                     </Dropdown.Toggle>
//                                                                     <Dropdown.Menu>
//                                                                         <Dropdown.Item onClick={() => setSortata('10')}>10</Dropdown.Item>
//                                                                         <Dropdown.Item onClick={() => setSortata('20')}>20</Dropdown.Item>
//                                                                         <Dropdown.Item onClick={() => setSortata('30')}>30</Dropdown.Item>
//                                                                     </Dropdown.Menu>
//                                                                 </Dropdown>
//                                                                 entries
//                                                             </label>
//                                                         </div>



//                                                         <div className='hover-pointer' style={{ border: "solid 01px #E6E6E6", padding: "7px", borderRadius: '5px' }}>
//                                                             <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
//                                                                 <Export size={16} />
//                                                                 <label htmlFor="">Export</label>
//                                                             </div>
//                                                         </div>

//                                                         <div onClick={Leademptytrash} className='hover-pointer' style={{ border: "solid 01px #E6E6E6", padding: "7px", borderRadius: '5px' }}>
//                                                             <div className='hover-pointer' style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
//                                                                 <Trash size={16} />
//                                                                 <label htmlFor="">Empty Trash</label>
//                                                             </div>
//                                                         </div>






//                                                     </div>


//                                                     {/* <div style={{display:"flex",alignItems:'center',justifyContent:"center"}} className="dataTables_filter">
//                                                          <button style={{padding:"8px",borderRadius:"5px",border:"none",backgroundColor:"#ffff", outline:"solid 1px black",opacity:"50px"}}> <span></span> Trash</button>
//                                                     </div> */}


//                                                     <div className="dataTables_filter ">
//                                                         <label>Search : <input type="search" className="" placeholder=""
//                                                             onChange={handleSearch}
//                                                         />
//                                                         </label>
//                                                     </div>
//                                                 </div>
//                                                 <table id="example4" className="display dataTable no-footer w-100" >
//                                                     <thead>
//                                                         <tr>
//                                                             {theadData.map((item, ind) => (
//                                                                 <th key={ind}
//                                                                     onClick={() => { SotingData(item.sortingVale); setIconDate(prevState => ({ complete: !prevState.complete, ind: ind })) }}
//                                                                 >{item.heading}
//                                                                     <span>
//                                                                         {ind !== iconData.ind &&
//                                                                             <i className="fa fa-sort ms-2 fs-12" style={{ opacity: '0.3' }} />
//                                                                         }
//                                                                         {ind === iconData.ind && (
//                                                                             iconData.complete ?
//                                                                                 <i className="fa fa-arrow-down ms-2 fs-12" style={{ opacity: '0.7' }} />
//                                                                                 :
//                                                                                 <i className="fa fa-arrow-up ms-2 fs-12" style={{ opacity: '0.7' }} />
//                                                                         )
//                                                                         }
//                                                                     </span>
//                                                                 </th>
//                                                             ))}
//                                                         </tr>
//                                                     </thead>
//                                                     <tbody>
//                                                         {loading ? (

//                                                             <tr>
//                                                                 <td colSpan={8} style={{ textAlign: 'center' }}>
//                                                                     <div className="spinner-container">
//                                                                         <div className="spinner-border text-primary" role="status">
//                                                                             <span className="visually-hidden">Loading...</span>
//                                                                         </div>
//                                                                     </div>
//                                                                 </td>
//                                                             </tr>
//                                                         ) : filteredFeeData.length > 0 ? (

//                                                             filteredFeeData.map((data, ind) => (
//                                                                 <tr key={ind}>
//                                                                     <td>
//                                                                         <input
//                                                                             style={{ height: "15px", width: "15px" }}
//                                                                             type="checkbox"
//                                                                         />
//                                                                     </td>
//                                                                     <td>{data.applicantName}</td>
//                                                                     <td>{data.course}</td>
//                                                                     <td>
//                                                                         <a href="#">{data.phoneNumber}</a>
//                                                                     </td>
//                                                                     <td>
//                                                                         <a href="#">{data.email}</a>
//                                                                     </td>
//                                                                     <td>{formatDate(data.date)}</td>
//                                                                     <td>{data.status}</td>
//                                                                     <td>
//                                                                         <button style={{ outline: "none", border: "none" }} onClick={Editlead}>
//                                                                             <Link to={"#"} onClick={() => handleRestore(data._id)} className="btn btn-xs sharp btn-primary me-1"><ClockClockwise size={16} weight="bold" /></Link>

//                                                                         </button>
//                                                                         <Link to={"#"} onClick={() => handleDelete(data._id)} className="btn btn-xs sharp btn-danger"><i className="fa fa-trash" /></Link>
//                                                                     </td>
//                                                                 </tr>
//                                                             ))
//                                                         ) : (

//                                                             <tr>
//                                                                 <td colSpan={8} style={{ textAlign: "center" }}>
//                                                                     No leads yet
//                                                                 </td>
//                                                             </tr>
//                                                         )}
//                                                     </tbody>

//                                                 </table>
//                                                 <div className='d-sm-flex text-center justify-content-between align-items-center mt-3'>
//                                                     <div className='dataTables_info'>
//                                                         Showing {activePag.current * sort + 1} to{' '}
//                                                         {data.length > (activePag.current + 1) * sort
//                                                             ? (activePag.current + 1) * sort
//                                                             : data.length}{' '}
//                                                         of {data.length} entries
//                                                     </div>

//                                                     <div
//                                                         className='dataTables_paginate paging_simple_numbers'
//                                                         id='example5_paginate'
//                                                     >
//                                                         <Link
//                                                             className='paginate_button previous disabled'
//                                                             to='#'
//                                                             onClick={() =>
//                                                                 activePag.current > 0 && onClick(activePag.current - 1)
//                                                             }
//                                                         >
//                                                             Previous
//                                                         </Link>
//                                                         <span>
//                                                             {paggination.map((number, i) => (
//                                                                 <Link
//                                                                     key={i}
//                                                                     to='#'
//                                                                     className={`paginate_button  ${activePag.current === i ? 'current' : ''
//                                                                         } `}
//                                                                     onClick={() => onClick(i)}
//                                                                 >
//                                                                     {number}
//                                                                 </Link>
//                                                             ))}
//                                                         </span>
//                                                         <Link
//                                                             className='paginate_button next'
//                                                             to='#'
//                                                             onClick={() =>
//                                                                 activePag.current + 1 < paggination.length &&
//                                                                 onClick(activePag.current + 1)
//                                                             }
//                                                         >
//                                                             Next
//                                                         </Link>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </Tab.Pane>
//                         </Tab.Content>
//                     </div>
//                 </Tab.Container>
//             </Row>
//         </>
//     );
// };

// export default Leadtrash;

import React, { useState, useEffect } from 'react';
import { Dropdown, Row, Tab } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Trash, ClockClockwise } from '@phosphor-icons/react';
import Swal from 'sweetalert2';
import api from '../../../services/AxiosInstance';

const theadData = [
    { heading: 'Select', sortingVale: "Select" },
    { heading: 'Name', sortingVale: "name" },
    { heading: 'Interest', sortingVale: "Interest" },
    { heading: 'Mobile', sortingVale: "mobile" },
    { heading: 'Email', sortingVale: "email" },
    { heading: 'Lead Date', sortingVale: "join" },
    { heading: 'Status', sortingVale: "Status" },
    { heading: 'Action', sortingVale: "action" }
];

const Leadtrash = () => {

    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState(10); // Default to 10 entries per page
    const [feeData, setFeeData] = useState([]);
    const [filteredFeeData, setFilteredFeeData] = useState([]);
    const [activePage, setActivePage] = useState(0);
    const [iconData, setIconData] = useState({ complete: false, ind: -1 });

    useEffect(() => {
        const fetchLeads = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                console.error('No token found');
                return;
            }
            try {
                const res = await api.get('auth/lead/leads');
                const activeLeads = res.data.data.leads.filter(lead => lead.status === 'Trashed');
                setFeeData(activeLeads);
                setFilteredFeeData(activeLeads);
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.error('Error fetching leads:', error.response ? error.response.data : error.message);
            }
        };
        fetchLeads();
    }, []);

    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase();
        const filteredData = feeData.filter((item) => {
            const searchString = `${item.applicantName} ${item.course} ${item.phoneNumber} ${item.email}`.toLowerCase();
            return searchString.includes(searchValue);
        });
        setFilteredFeeData(filteredData);
        setActivePage(0); // Reset to first page on search
    };

    const handleEntriesChange = (num) => {
        setSort(num);
        setActivePage(0); // Reset to first page on entries change
    };

    const numPages = Math.ceil(filteredFeeData.length / sort);
    const displayedLeads = filteredFeeData.slice(activePage * sort, (activePage + 1) * sort);

    const handlePaginationClick = (page) => {
        setActivePage(page);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleDelete = async (id) => {
        const firstResult = await Swal.fire({
            title: 'Delete items',
            text: 'Are you sure you want to permanently delete these items?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            background: '#e6e6e6',
            customClass: {
                confirmButton: 'swal-btn-confirm',
                cancelButton: 'swal-btn-cancel'
            },
        });

        if (firstResult.isConfirmed) {
            const secondResult = await Swal.fire({
                title: 'Are You Sure?',
                text: 'Do you really want to permanently delete this ?',
                icon: 'error',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                background: '#e6e6e6',
                customClass: {
                    confirmButton: 'swal-btn-confirm',
                    cancelButton: 'swal-btn-cancel'
                },
            });

            if (secondResult.isConfirmed) {
                try {
                    const lead = feeData.find(lead => lead._id === id);
                    if (lead) {
                        const payload = {
                            leadId: id,
                            updateData: {
                                status: 'Deleted',
                                course: lead.course,
                                applicantName: lead.applicantName,
                                phoneNumber: lead.phoneNumber,
                                email: lead.email,
                            }
                        };

                        const response = await api.patch('auth/lead/lead/status', payload);
                        if (response.status === 200) {
                            Swal.fire('Deleted!', 'Lead status has been moved to Trash', 'success');
                            setFeeData(prevData => prevData.filter(lead => lead._id !== id));
                            setFilteredFeeData(prevData => prevData.filter(lead => lead._id !== id));
                        } else {
                            Swal.fire('Error', 'Something went wrong!', 'error');
                        }
                    } else {
                        console.log("Lead not found with ID:", id);
                    }
                } catch (error) {
                    Swal.fire('Error', 'Failed to update lead status.', 'error');
                    console.error('Error deleting lead:', error.response ? error.response.data : error.message);
                }
            } else {
                Swal.fire('Cancelled', 'The lead is safe :)');
            }
        } else {
            Swal.fire('Cancelled', 'The lead was not deleted.');
        }
    };

    const handleRestore = async (id) => {
        const confirmRestore = await Swal.fire({
            title: 'Restore items',
            text: 'Do you want to restore these items?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        });

        if (confirmRestore.isConfirmed) {
            try {
                const response = await api.patch(`auth/lead/lead/status`, {
                    leadId: id,
                    updateData: { status: 'Restored' }
                });

                if (response.status === 200) {
                    Swal.fire('Restored!', 'Lead has been successfully restored.', 'success');
                    setFeeData(prevData => prevData.filter(lead => lead._id !== id));
                    setFilteredFeeData(prevData => prevData.filter(lead => lead._id !== id));
                }
            } catch (error) {
                Swal.fire('Error', 'Failed to restore lead.', 'error');
            }
        }
    };

    const handleSort = (index) => {
        let newIconData = { ...iconData };

        if (newIconData.ind === index) {
            newIconData.complete = !newIconData.complete; // Toggle sorting direction
        } else {
            newIconData.ind = index; // Update the sorted column index
            newIconData.complete = true; // Set sorting direction to descending by default
        }

        // Sort the data based on the column index and direction
        const sortedData = [...filteredFeeData].sort((a, b) => {
            const key = theadData[index].sortingVale; // Get the column key to sort by

            if (newIconData.complete) {
                // Sort in descending order
                return a[key] < b[key] ? 1 : -1;
            } else {
                // Sort in ascending order
                return a[key] > b[key] ? 1 : -1;
            }
        });

        setFilteredFeeData(sortedData); // Update the state with sorted data
        setIconData(newIconData); // Update the state of sorting icons
        setActivePage(0); // Reset to first page when sorted
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
                                        <h4 className="card-title">Trash Files</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <div id='holidayList' className='dataTables_wrapper no-footer'>
                                                <div className='justify-content-between d-sm-flex'>
                                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }} className='dataTables_length'>
                                                        <div className='hover-pointer'>
                                                            <label className='d-flex align-items-center hover-pointer'>
                                                                Show
                                                                <Dropdown className='search-drop'>
                                                                    <Dropdown.Toggle as="div" className="search-drop-btn">
                                                                        {sort}
                                                                    </Dropdown.Toggle>
                                                                    <Dropdown.Menu>
                                                                        <Dropdown.Item onClick={() => handleEntriesChange(10)}>10</Dropdown.Item>
                                                                        <Dropdown.Item onClick={() => handleEntriesChange(20)}>20</Dropdown.Item>
                                                                        <Dropdown.Item onClick={() => handleEntriesChange(30)}>30</Dropdown.Item>
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                                entries
                                                            </label>
                                                        </div>
                                                    </div>

                                                    <div className="dataTables_filter ">
                                                        <label>Search: <input type="search" placeholder="" onChange={handleSearch} /></label>
                                                    </div>
                                                </div>
                                                <table id="example4" className="display dataTable no-footer w-100">
                                                    <thead>
                                                        <tr>
                                                            {theadData.map((item, ind) => (
                                                                <th key={ind} onClick={() => handleSort(ind)}>
                                                                    {item.heading}
                                                                    <span>
                                                                        {ind !== iconData.ind &&
                                                                            <i className="fa fa-sort ms-2 fs-12" style={{ opacity: '0.3' }} />
                                                                        }
                                                                        {ind === iconData.ind && (
                                                                            iconData.complete ?
                                                                                <i className="fa fa-arrow-down ms-2 fs-12" style={{ opacity: '0.7' }} />
                                                                                :
                                                                                <i className="fa fa-arrow-up ms-2 fs-12" style={{ opacity: '0.7' }} />
                                                                        )}
                                                                    </span>
                                                                </th>
                                                            ))}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {loading ? (
                                                            <tr>
                                                                <td colSpan={8} style={{ textAlign: 'center' }}>
                                                                    <div className="spinner-container">
                                                                        <div className="spinner-border text-primary" role="status">
                                                                            <span className="visually-hidden">Loading...</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ) : displayedLeads.length > 0 ? (
                                                            displayedLeads.map((data) => (
                                                                <tr key={data._id}>
                                                                    <td>
                                                                        <input style={{ height: "15px", width: "15px" }} type="checkbox" />
                                                                    </td>
                                                                    <td>{data.applicantName}</td>
                                                                    <td>{data.course}</td>
                                                                    <td><a href="#">{data.phoneNumber}</a></td>
                                                                    <td><a href="#">{data.email}</a></td>
                                                                    <td>{formatDate(data.date)}</td>
                                                                    <td>{data.status}</td>
                                                                    <td>
                                                                        <button onClick={() => handleRestore(data._id)} className="btn btn-xs sharp btn-primary me-1">
                                                                            <ClockClockwise size={16} weight="bold" />
                                                                        </button>
                                                                        <button onClick={() => handleDelete(data._id)} className="btn btn-xs sharp btn-danger">
                                                                            <i className="fa fa-trash" />
                                                                        </button>
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

                                                {/* Pagination Section */}
                                                <div className='d-sm-flex text-center justify-content-between align-items-center mt-3'>
                                                    <div className='dataTables_info'>
                                                        Showing {(activePage * sort) + 1} to {Math.min((activePage + 1) * sort, filteredFeeData.length)} of {filteredFeeData.length} entries
                                                    </div>

                                                    <div className='dataTables_paginate paging_simple_numbers'>
                                                        <Link className='paginate_button previous' to='#' onClick={() => handlePaginationClick(Math.max(0, activePage - 1))}>
                                                            Previous
                                                        </Link>
                                                        <span>
                                                            {Array.from({ length: numPages }, (_, i) => (
                                                                <Link key={i} to='#' className={`paginate_button ${activePage === i ? 'current' : ''}`} onClick={() => handlePaginationClick(i)}>
                                                                    {i + 1}
                                                                </Link>
                                                            ))}
                                                        </span>
                                                        <Link className='paginate_button next' to='#' onClick={() => handlePaginationClick(Math.min(numPages - 1, activePage + 1))}>
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

export default Leadtrash;
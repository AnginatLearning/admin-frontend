
// import React, { useState, useRef, useEffect } from 'react';
// import { Dropdown, Row, Nav, Tab } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
// import { Export,Trash,FunnelSimple } from "@phosphor-icons/react";
// import Swal from 'sweetalert2';
// import { IMAGES } from '../../constant/theme';
// import axios from 'axios';
// import api from '../../../services/AxiosInstance';


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


// const LeadManagement = () => {
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
//                 const res = await api.get('auth/lead/leads');
//                 // console.log(res.data.data.leads)
//                 const allLeads = res.data.data.leads;
//                 const activeLeads = allLeads.filter(lead => lead.status !== 'Deleted' && lead.status !== 'Trashed' );
//                 setFeeData(activeLeads);
//                 setFilteredFeeData(activeLeads);
//                 setTimeout(() => {
//                     setLoading(false);
//                 }, 1000);
//             } catch (error) {
//                 console.error('Error fetching leads:', error.response ? error.response.data : error.message);
//                 setLoading(false)
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


//     function SotingData(name) {
//         const sortedPeople = [...filteredFeeData];
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
//         setFilteredFeeData(sortedPeople);
//     }
    
//     const navigate = useNavigate()
//     const Leademptytrash = () =>{
//         navigate("/Lead-management-emptytrash")
//     }

//     const handleDelete = async (id) => {
       
//         const result = await Swal.fire({
//             title: 'Are you sure?',
//             text: 'Do you really want to delete this?',
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonText: 'Delete',
//             cancelButtonText: 'Cancel',
//             customClass:  {
                
//                 confirmButton: 'swal-btn-confirm', 
//                 cancelButton: 'swal-btn-cancel' 
//             },
//         });
    
//         if (result.isConfirmed) {
//             try {
//                 const lead = filteredFeeData.find(lead => lead._id === id);
    
//                 if (lead) {
//                     console.log("Lead Information to delete:", lead);


//                     const payload = {
//                             leadId: id,
//                             updateData: {
//                                 status: 'Trashed', 
//                                 course: lead.course,  
//                                 applicantName: lead.applicantName,  
//                                 phoneNumber: lead.phoneNumber,  
//                                 email: lead.email,  
//                             }
//                         };
    
//                     const response = await api.patch('auth/lead/lead/status', payload)
    
//                     if (response.data.status === 'success') {
//                         Swal.fire('Deleted!', 'success');
    
//                         setFilteredFeeData(filteredFeeData.filter(lead => lead._id !== id));
//                     } else {
//                         Swal.fire('Error', 'Something went wrong!', 'error');
//                     }
//                 } else {
//                     console.log("Lead not found with ID:", id);
//                 }
//             } catch (error) {
//                 Swal.fire('Error', 'Failed to update lead status.', 'error');
//                 console.error('Error deleting lead:', error.response ? error.response.data : error.message);
//             }
//         } else {
            
//             console.log("Deletion canceled");
//         }
//     };

//     const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         const year = date.getFullYear();
//         const month = (date.getMonth() + 1).toString().padStart(2, '0');  // Ensure two digits
//         const day = date.getDate().toString().padStart(2, '0'); // Ensure two digits
//         return `${year}-${month}-${day}`;  // Return in YYYY-MM-DD format
//     };
    
//     const Editlead = (id) => {
//   navigate(`/Lead-management-edit-lead/${id}`);
// };

//     return (
//         <>

//             <Row>
//                 <Tab.Container defaultActiveKey={"List"}>

//                     <div className="col-lg-12">
//                         <Tab.Content className="row tab-content">
//                             <Tab.Pane eventKey="List" className="col-lg-12">
//                                 <div className="card">
//                                     <div className="card-header">
//                                         <h4 className="card-title" >All Leads</h4>

//                                     </div>
//                                     <div className="card-body">
//                                         <div className="table-responsive">
//                                             <div id='holidayList' className='dataTables_wrapper no-footer'>
//                                                 <div className='justify-content-between d-sm-flex'>
//                                                     <div style={{display:"flex",flexWrap:"wrap",gap:"20px"}} className='dataTables_length'>
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

                                                       
                                                     

//                                                        <div  className='hover-pointer' style={{border:"solid 01px #E6E6E6",padding:"7px",borderRadius:'5px'}}>
//                                                              <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"4px"}}>
//                                                                  <Export size={16} />
//                                                                  <label htmlFor="">Export</label>
//                                                              </div>
//                                                        </div>
                                                         
//                                                          <div onClick={Leademptytrash} className='hover-pointer' style={{border:"solid 01px #E6E6E6",padding:"7px",borderRadius:'5px'}}>
//                                                              <div className='hover-pointer' style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"4px"}}>
//                                                                  <Trash size={16} />
//                                                                  <label htmlFor="">Empty Trash</label>
//                                                              </div>
//                                                        </div>
                                                      

                                                       

                                                        

//                                                     </div>


//                                                     {/* <div style={{display:"flex",alignItems:'center',justifyContent:"center"}} className="dataTables_filter">
//                                                          <button style={{padding:"8px",borderRadius:"5px",border:"none",backgroundColor:"#ffff", outline:"solid 1px black",opacity:"50px"}}> <span></span> Trash</button>
//                                                     </div> */}


//                                                     <div  className="dataTables_filter ">
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
//                                                          {loading ? (
                                                            
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
//                                                                         <button
//                                                                             style={{ outline: "none", border: "none" }}
//                                                                             onClick={() => Editlead(data._id)}
//                                                                         >
//                                                                             <a href="#" className="btn btn-xs sharp btn-primary me-1">
//                                                                                 <i className="fa fa-pencil" />
//                                                                             </a>
//                                                                         </button>
//                                                                         <a
//                                                                             onClick={() => handleDelete(data._id)}
//                                                                             href="#"
//                                                                             className="btn btn-xs sharp btn-danger"
//                                                                         >
//                                                                             <i className="fa fa-trash" />
//                                                                         </a>
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

// export default LeadManagement;
import React, { useState, useEffect } from 'react';
import { Dropdown, Row, Tab } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Export, Trash } from "@phosphor-icons/react";
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

const LeadManagement = () => {
    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState(10); 
    const [feeData, setFeeData] = useState([]);
    const [filteredFeeData, setFilteredFeeData] = useState([]);
    const [activePage, setActivePage] = useState(0);
    const [sortingOrder, setSortingOrder] = useState({ column: null, direction: 'asc' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLeads = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                console.error('No token found');
                return;
            }
            try {
                const res = await api.get('auth/lead/leads');
                const allLeads = res.data.data.leads;
                const activeLeads = allLeads.filter(lead => lead.status !== 'Deleted' && lead.status !== 'Trashed');
                setFeeData(activeLeads);
                setFilteredFeeData(activeLeads);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching leads:', error.response ? error.response.data : error.message);
                setLoading(false);
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
        setActivePage(0); 
    };

    const numPages = Math.ceil(filteredFeeData.length / sort);
    const displayedLeads = filteredFeeData.slice(activePage * sort, (activePage + 1) * sort);

    const handleEntriesChange = (num) => {
        setSort(num);
        setActivePage(0); 
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to delete this?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
        });

        if (result.isConfirmed) {
            try {
                const lead = filteredFeeData.find(lead => lead._id === id);
                if (lead) {
                    const payload = {
                        leadId: id,
                        updateData: { status: 'Trashed' }
                    };

                    const response = await api.patch('auth/lead/lead/status', payload);
                    if (response.data.status === 'success') {
                        Swal.fire('Deleted!', 'Lead has been moved to trash.', 'success');
                        setFilteredFeeData(filteredFeeData.filter(lead => lead._id !== id));
                    } else {
                        Swal.fire('Error', 'Something went wrong!', 'error');
                    }
                }
            } catch (error) {
                Swal.fire('Error', 'Failed to delete lead.', 'error');
                console.error('Error deleting lead:', error.response ? error.response.data : error.message);
            }
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const SotingData = (column) => {
        let direction = 'asc';
        if (sortingOrder.column === column && sortingOrder.direction === 'asc') {
            direction = 'desc';
        }
        const sortedData = [...filteredFeeData].sort((a, b) => {
            if (direction === 'asc') {
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
                                                        <div className='hover-pointer' style={{ border: "solid 1px #E6E6E6", padding: "7px", borderRadius: '5px' }}>
                                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                                                                <Export size={16} />
                                                                <label htmlFor="">Export</label>
                                                            </div>
                                                        </div>
                                                        <div onClick={() => navigate("/Lead-management-emptytrash")} className='hover-pointer' style={{ border: "solid 1px #E6E6E6", padding: "7px", borderRadius: '5px' }}>
                                                            <div className='hover-pointer' style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                                                                <Trash size={16} />
                                                                <label htmlFor="">Empty Trash</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="dataTables_filter ">
                                                        <label>Search : <input type="search" onChange={handleSearch} /></label>
                                                    </div>
                                                </div>
                                                <table id="example4" className="display dataTable no-footer w-100">
                                                    <thead>
                                                        <tr>
                                                            {theadData.map((item, ind) => (
                                                                <th key={ind} onClick={() => SotingData(item.sortingVale)}>
                                                                    {item.heading}
                                                                    <span>
                                                                        {sortingOrder.column === item.sortingVale && (
                                                                            sortingOrder.direction === 'asc'
                                                                                ? <i className="fa fa-arrow-up ms-2 fs-12" style={{ opacity: '0.7' }} />
                                                                                : <i className="fa fa-arrow-down ms-2 fs-12" style={{ opacity: '0.7' }} />
                                                                        )}
                                                                        {sortingOrder.column !== item.sortingVale &&
                                                                            <i className="fa fa-sort ms-2 fs-12" style={{ opacity: '0.3' }} />
                                                                        }
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
                                                                    <td>
                                                                        <a href="#">{data.phoneNumber}</a>
                                                                    </td>
                                                                    <td>
                                                                        <a href="#">{data.email}</a>
                                                                    </td>
                                                                    <td>{formatDate(data.date)}</td>
                                                                    <td>{data.status}</td>
                                                                    <td>
                                                                        <button onClick={() => navigate(`/Lead-management-edit-lead/${data._id}`)} className="btn btn-xs sharp btn-primary me-1">
                                                                            <i className="fa fa-pencil" />
                                                                        </button>
                                                                        <a onClick={() => handleDelete(data._id)} className="btn btn-xs sharp btn-danger">
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
                                                <div className='d-sm-flex text-center justify-content-between align-items-center mt-3'>
                                                    <div className='dataTables_info'>
                                                        Showing {activePage * sort + 1} to {Math.min((activePage + 1) * sort, filteredFeeData.length)} of {filteredFeeData.length} entries
                                                    </div>
                                                    <div className='dataTables_paginate paging_simple_numbers'>
                                                        <Link className={`paginate_button previous ${activePage === 0 ? 'disabled' : ''}`} to='#' onClick={() => activePage > 0 && setActivePage(activePage - 1)}>
                                                            Previous
                                                        </Link>
                                                        <span>
                                                            {Array.from({ length: numPages }, (_, i) => (
                                                                <Link key={i} to='#' className={`paginate_button ${activePage === i ? 'current' : ''}`} onClick={() => setActivePage(i)}>
                                                                    {i + 1}
                                                                </Link>
                                                            ))}
                                                        </span>
                                                        <Link className={`paginate_button next ${activePage + 1 >= numPages ? 'disabled' : ''}`} to='#' onClick={() => activePage + 1 < numPages && setActivePage(activePage + 1)}>
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
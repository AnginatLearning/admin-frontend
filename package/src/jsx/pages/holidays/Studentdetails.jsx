import React, { Fragment } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

import PageTitle from "../../layouts/PageTitle";

/// images
import avartar5 from "../../../assets/images/avatar/5.png";
import avartar1 from "../../../assets/images/avatar/1.png";

const Studentdetails = () => {
   const drop = (
      <Dropdown>
         <Dropdown.Toggle variant="" className="btn btn-primary tp-btn-light sharp i-false">
            <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
               <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <rect x="0" y="0" width="24" height="24"></rect>
                  <circle fill="#000000" cx="5" cy="12" r="2"></circle>
                  <circle fill="#000000" cx="12" cy="12" r="2"></circle>
                  <circle fill="#000000" cx="19" cy="12" r="2"></circle>
               </g>
            </svg>
         </Dropdown.Toggle>
         <Dropdown.Menu>
            <Dropdown.Item href="#">Edit</Dropdown.Item>
            <Dropdown.Item href="#" className="text-danger">
               Delete
            </Dropdown.Item>
         </Dropdown.Menu>
      </Dropdown>
   );

   const chackboxFun = (type) => {
      setTimeout(()=>{               
         const chackbox = document.querySelectorAll(".customer_shop_single input");
         const motherChackBox = document.querySelector(".customer_shop input");
         for (let i = 0; i < chackbox.length; i++) {
            const element = chackbox[i];
            if (type === "all") {
               if (motherChackBox.checked) {
                  element.checked = true;
               } else {
                  element.checked = false;
               }
            } else {
               if (!element.checked) {
                  motherChackBox.checked = false;
                  break;
               } else {
                  motherChackBox.checked = true;
               }
            }
         }
      },100)
   };

   const chack = (i) => (
      <div className={`form-check custom-checkbox ms-2`}>
         <input
            type="checkbox"
            className="form-check-input  "
            id={`checkAll${i}`}
            required=""
            onClick={() => chackboxFun()}
         />
         <label
            className="form-check-label"
            htmlFor={`checkAll${i}`}
         ></label>
      </div>
   );

   return (
      <Fragment>
         <PageTitle activeMenu="Customers" motherMenu="Shop" />
         <div className="row">
            <div className="col-lg-12">
               <div className="card">
                  <div className="card-body p-0">
                     <div className="table-responsive">
                        <table className="table mb-0 table-striped order-table">
                           <thead>
                              <tr>
                                 <th className="customer_shop">
                                    <div className="form-check custom-checkbox mx-2">
                                       <input
                                          type="checkbox"
                                          className="form-check-input"
                                          id="checkAll"
                                          onClick={() => chackboxFun("all")}
                                       />
                                       <label
                                          className="form-check-label"
                                          htmlFor="checkAll"
                                       ></label>
                                    </div>
                                 </th>
                                 <th>Name</th>
                                 <th>Email</th>
                                 <th>Interest</th>
                                 <th>Mobile</th>
                                
                                 <th>Lead Date</th>
                                 <th className="ps-5 width200" >
                                    Status
                                 </th>
                                 <th>Action</th>
                              </tr>
                           </thead>
                           <tbody id="customers">
                              <tr className="btn-reveal-trigger">
                                 <td className="customer_shop_single">
                                    {chack(1)}
                                 </td>
                                 <td className="py-3">
                                    <Link to="/ecom-customers">
                                       <div className="media d-flex align-items-center">
                                          <div className=" me-2">
                                             <div className="">
                                                <img
                                                   className="rounded-circle img-fluid"
                                                   src={avartar5}
                                                   width="30"
                                                   alt=""
                                                />
                                             </div>
                                          </div>
                                          <div className="media-body">
                                             <h5 className="mb-0 fs--1">
                                                Ricky Antony
                                             </h5>
                                          </div>
                                       </div>
                                    </Link>
                                 </td>
                                 <td className="py-2">
                                    <a href="mailto:ricky@example.com">
                                       info@example.com
                                    </a>
                                 </td>
                                 <td className="py-2">
                                    {" "}
                                    <a href="tel:2012001851">Architect</a>
                                 </td>
                                 <td className="py-2">
                                    {" "}
                                    <a href="tel:2012001851">(201) 200-1851</a>
                                 </td>
                                 

                                 <td className="py-2">30/03/2018</td>
                                 <td className="py-2 ps-5 wspace-no">
                                   Approved
                                 </td>
                                 <td className="py-2 text-right">{drop}</td>
                              </tr>

                              <tr className="btn-reveal-trigger">
                                 <td className="customer_shop_single">
                                    {chack(2)}
                                 </td>
                                 <td className="py-3">
                                    <Link to="/ecom-customers">
                                       <div className="media d-flex align-items-center">
                                          <div className=" me-2">
                                             <div className="">
                                                <img
                                                   className="rounded-circle img-fluid"
                                                   src={avartar5}
                                                   width="30"
                                                   alt=""
                                                />
                                             </div>
                                          </div>
                                          <div className="media-body">
                                             <h5 className="mb-0 fs--1">
                                                Ricky Antony
                                             </h5>
                                          </div>
                                       </div>
                                    </Link>
                                 </td>
                                 <td className="py-2">
                                    <a href="mailto:ricky@example.com">
                                       info@example.com
                                    </a>
                                 </td>
                                 <td className="py-2">
                                    {" "}
                                    <a href="tel:2012001851">Architect</a>
                                 </td>
                                 <td className="py-2">
                                    {" "}
                                    <a href="tel:2012001851">(201) 200-1851</a>
                                 </td>
                                 

                                 <td className="py-2">30/03/2018</td>
                                 <td className="py-2 ps-5 wspace-no">
                                   Approved
                                 </td>
                                 <td className="py-2 text-right">{drop}</td>
                              </tr>

                              <tr className="btn-reveal-trigger">
                                 <td className="customer_shop_single">
                                    {chack(1)}
                                 </td>
                                 <td className="py-3">
                                    <Link to="/ecom-customers">
                                       <div className="media d-flex align-items-center">
                                          <div className=" me-2">
                                             <div className="">
                                                <img
                                                   className="rounded-circle img-fluid"
                                                   src={avartar5}
                                                   width="30"
                                                   alt=""
                                                />
                                             </div>
                                          </div>
                                          <div className="media-body">
                                             <h5 className="mb-0 fs--1">
                                                Ricky Antony
                                             </h5>
                                          </div>
                                       </div>
                                    </Link>
                                 </td>
                                 <td className="py-2">
                                    <a href="mailto:ricky@example.com">
                                       info@example.com
                                    </a>
                                 </td>
                                 <td className="py-2">
                                    {" "}
                                    <a href="tel:2012001851">Architect</a>
                                 </td>
                                 <td className="py-2">
                                    {" "}
                                    <a href="tel:2012001851">(201) 200-1851</a>
                                 </td>
                                 

                                 <td className="py-2">30/03/2018</td>
                                 <td className="py-2 ps-5 wspace-no">
                                  Pending
                                 </td>
                                 <td className="py-2 text-right">{drop}</td>
                              </tr>


                              <tr className="btn-reveal-trigger">
                                 <td className="customer_shop_single">
                                    {chack(1)}
                                 </td>
                                 <td className="py-3">
                                    <Link to="/ecom-customers">
                                       <div className="media d-flex align-items-center">
                                          <div className=" me-2">
                                             <div className="">
                                                <img
                                                   className="rounded-circle img-fluid"
                                                   src={avartar5}
                                                   width="30"
                                                   alt=""
                                                />
                                             </div>
                                          </div>
                                          <div className="media-body">
                                             <h5 className="mb-0 fs--1">
                                                Ricky Antony
                                             </h5>
                                          </div>
                                       </div>
                                    </Link>
                                 </td>
                                 <td className="py-2">
                                    <a href="mailto:ricky@example.com">
                                       info@example.com
                                    </a>
                                 </td>
                                 <td className="py-2">
                                    {" "}
                                    <a href="tel:2012001851">Architect</a>
                                 </td>
                                 <td className="py-2">
                                    {" "}
                                    <a href="tel:2012001851">(201) 200-1851</a>
                                 </td>
                                 

                                 <td className="py-2">30/03/2018</td>
                                 <td className="py-2 ps-5 wspace-no">
                                   Approved
                                 </td>
                                 <td className="py-2 text-right">{drop}</td>
                              </tr>


                              <tr className="btn-reveal-trigger">
                                 <td className="customer_shop_single">
                                    {chack(1)}
                                 </td>
                                 <td className="py-3">
                                    <Link to="/ecom-customers">
                                       <div className="media d-flex align-items-center">
                                          <div className=" me-2">
                                             <div className="">
                                                <img
                                                   className="rounded-circle img-fluid"
                                                   src={avartar5}
                                                   width="30"
                                                   alt=""
                                                />
                                             </div>
                                          </div>
                                          <div className="media-body">
                                             <h5 className="mb-0 fs--1">
                                                Ricky Antony
                                             </h5>
                                          </div>
                                       </div>
                                    </Link>
                                 </td>
                                 <td className="py-2">
                                    <a href="mailto:ricky@example.com">
                                       info@example.com
                                    </a>
                                 </td>
                                 <td className="py-2">
                                    {" "}
                                    <a href="tel:2012001851">Architect</a>
                                 </td>
                                 <td className="py-2">
                                    {" "}
                                    <a href="tel:2012001851">(201) 200-1851</a>
                                 </td>
                                 

                                 <td className="py-2">30/03/2018</td>
                                 <td className="py-2 ps-5 wspace-no">
                                   Pending
                                 </td>
                                 <td className="py-2 text-right">{drop}</td>
                              </tr>


                              <tr className="btn-reveal-trigger">
                                 <td className="customer_shop_single">
                                    {chack(1)}
                                 </td>
                                 <td className="py-3">
                                    <Link to="/ecom-customers">
                                       <div className="media d-flex align-items-center">
                                          <div className=" me-2">
                                             <div className="">
                                                <img
                                                   className="rounded-circle img-fluid"
                                                   src={avartar5}
                                                   width="30"
                                                   alt=""
                                                />
                                             </div>
                                          </div>
                                          <div className="media-body">
                                             <h5 className="mb-0 fs--1">
                                                Ricky Antony
                                             </h5>
                                          </div>
                                       </div>
                                    </Link>
                                 </td>
                                 <td className="py-2">
                                    <a href="mailto:ricky@example.com">
                                       info@example.com
                                    </a>
                                 </td>
                                 <td className="py-2">
                                    {" "}
                                    <a href="tel:2012001851">Architect</a>
                                 </td>
                                 <td className="py-2">
                                    {" "}
                                    <a href="tel:2012001851">(201) 200-1851</a>
                                 </td>
                                 

                                 <td className="py-2">30/03/2018</td>
                                 <td className="py-2 ps-5 wspace-no">
                                   Approved
                                 </td>
                                 <td className="py-2 text-right">{drop}</td>
                              </tr>

                              <tr className="btn-reveal-trigger">
                                 <td className="customer_shop_single">
                                    {chack(1)}
                                 </td>
                                 <td className="py-3">
                                    <Link to="/ecom-customers">
                                       <div className="media d-flex align-items-center">
                                          <div className=" me-2">
                                             <div className="">
                                                <img
                                                   className="rounded-circle img-fluid"
                                                   src={avartar5}
                                                   width="30"
                                                   alt=""
                                                />
                                             </div>
                                          </div>
                                          <div className="media-body">
                                             <h5 className="mb-0 fs--1">
                                                Ricky Antony
                                             </h5>
                                          </div>
                                       </div>
                                    </Link>
                                 </td>
                                 <td className="py-2">
                                    <a href="mailto:ricky@example.com">
                                       info@example.com
                                    </a>
                                 </td>
                                 <td className="py-2">
                                    {" "}
                                    <a href="tel:2012001851">Architect</a>
                                 </td>
                                 <td className="py-2">
                                    {" "}
                                    <a href="tel:2012001851">(201) 200-1851</a>
                                 </td>
                                 

                                 <td className="py-2">30/03/2018</td>
                                 <td className="py-2 ps-5 wspace-no">
                                   Pending
                                 </td>
                                 <td className="py-2 text-right">{drop}</td>
                              </tr>
                             
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Fragment>
   );
};

export default Studentdetails;

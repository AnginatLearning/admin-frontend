import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Chalkboard } from "@phosphor-icons/react";

// images
import login from "../../../assets/images/login-img.png";
import google from "../../../assets/images/download (1).png";
import facebook from "../../../assets/images/download (2).png";


function Selectone(props) {
  const navigate = useNavigate();

  const handleschool = () => {
    navigate("/school")
  }

  const handleinstitute = () => {
    navigate("/institute")
  }

    return (
        <div>
            <div className="Section">
                <div className='down'>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100vh", flexDirection: "column", gap: "20px" }} className='down-body'>
                        <div><img style={{ width: "400px" }} className='login-img' src={login} alt="" /></div>
                        <div><p style={{ fontSize: "28px", color: "black", fontWeight: "500" }}>Welcome To <br />Spring Learns</p></div>
                        <p style={{ fontSize: "15px", textAlign: "center" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                    </div>
                </div>

                <div className='upper'>
                    <div style={{ paddingTop: "100px", paddingBottom: "100px" }}>
                        <div className="card-body">
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} className="mb-2">
                                <p style={{ fontSize: "28px", fontWeight: "700", color: "black" }}>ANGINAT</p>
                                <Link className="text-primary" to="/login"> <p style={{ marginRight: "10px", color: "#889292" }}>Back to home</p>  </Link>
                            </div>
                            <h4 style={{ fontSize: "24px", marginTop: "20px", fontWeight: "500" }} className="mb-4">Select One</h4>

                        </div>

                    </div>

                    <div >
                       <form action="">
                        <div className='select-button' style={{ padding: "1.875rem", display: 'flex', justifyContent: "space-around", paddingBottom: "300px" }}>
                            <button onClick={handleschool} className='school-button' style={{ display: 'flex', flexDirection: "column", alignItems: "center" }} >
                                <div><Chalkboard style={{ color: "black" }} size={48} /></div>
                                <p style={{ fontSize: "30px", fontWeight: "500", color: "black" }}>School</p>
                            </button>

                            <button onClick={handleinstitute} className='Institute-button' >
                                <div><Chalkboard style={{ color: "black" }} size={48} /></div>
                                <p style={{ fontSize: "30px", fontWeight: "500", color: "black" }}>Institute</p>
                            </button>

                        </div>
                    </form>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default Selectone;

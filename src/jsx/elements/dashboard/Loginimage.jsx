import React from 'react'

const Loginimage = () => {
  return (
    <div>
        <div className="down">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100vh",
                  flexDirection: "column",
                  gap: "20px",
                }}
                className="down-body"
              >
                <div>
                  <img
                    style={{ width: "450px" }}
                    className="login-img"
                    src={login}
                    alt=""
                  />
                </div>
                <div>
                  <p style={{ fontSize: "28px", color: "black", fontWeight: "500" }}>
                    Welcome To <br />Spring Learns
                  </p>
                </div>
                <p style={{ fontSize: "16px", textAlign: "center" }}>
                  Empowering education with streamlined management tools for institutions, instructors, and students.Discover a seamless approach to education management with Anginat. 
                </p>
                
              </div>
            </div>
    </div>
  )
}

export default Loginimage
import React from "react";
import { Link } from "react-router-dom";

const PageTitle = ({ motherMenu, middleMenu, activeMenu, pageContent }) => {
  return (
    <div className="row page-titles mx-0">
      <div className="col-sm-6 p-md-0">
        <div className="welcome-text">
          <h4 style={{ color: "black" }}>{activeMenu}</h4>
        </div>
      </div>
      <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"#"}>{motherMenu}</Link>
          </li>
          {/* Conditionally render middle menu if it exists */}
          {middleMenu && (
            <li className="breadcrumb-item">
              <Link to={"#"}>{middleMenu}</Link>
            </li>
          )}
          <li className="breadcrumb-item active">
            <Link to={"#"} style={{ color: "black" }}>
              {activeMenu}
            </Link>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default PageTitle;

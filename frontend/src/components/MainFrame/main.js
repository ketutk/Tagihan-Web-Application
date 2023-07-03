import { useState, useEffect, Fragment } from "react";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";

// Components
import LoadingSpinner from "../SubComponents/loader";

// Styling
import { BsHouseDoorFill } from "react-icons/bs";
import { FaBookMedical, FaBook } from "react-icons/fa";
import { RiLogoutBoxFill } from "react-icons/ri";

import "../../css/main.css";

const Main = ({ page: Page }) => {
  // Page Effect
  const [isLoading, setIsLoading] = useState(false);
  const [resNav, setNav] = useState(false);

  // Functional State
  const [redirect, setRedirect] = useState(false);

  // useEffect(() => {
  //   setIsLoading(true);
  //   // setTimeout(() => {
  //   //   setPage("dashboard");
  //   //   setIsLoading(false);
  //   // }, 500);
  // }, []);

  const navChange = () => {
    if (resNav === false) {
      setNav(true);
    } else {
      setNav(false);
    }
  };
  const logout = () => {
    localStorage.clear();
    setRedirect(true);
  };

  return (
    <Fragment>
      <div className="row" style={{ width: "auto", height: "100vh", padding: "0", margin: "0" }}>
        {redirect && <Navigate to="/" />}
        <div className={`col-md-2 pt-3 main-nav ${resNav ? " responsive" : ""}`} style={{ backgroundColor: "#FAFAFA", padding: "0", margin: "0" }}>
          <div className="row flex-direction-column align-items-center" style={{ width: "100%", padding: "0", margin: "0" }}>
            <Link to="/main" style={{ textDecoration: "none" }}>
              <div className="col-md-12 text-center">
                <p style={{ color: "#6EB9FF", fontSize: "2em" }}>
                  <b style={{ color: "#0286FF" }}>My</b>Tagihans
                </p>
              </div>
            </Link>
            <div className="col-md-12 mt-5 py-2 my-2 btn text-nowrap">
              <Link to="/main" style={{ textDecoration: "none" }}>
                <div className="d-flex align-items-center justify-content-start mx-5">
                  <div className="d-flex align-items-center justify-content-start fs-3">
                    <BsHouseDoorFill style={{ color: "#0286FF" }} />
                  </div>
                  <div className="d-flex align-items-center justify-content-start">
                    <b className="mx-2 text-black">Dashboard</b>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-12 py-2 my-2 btn text-nowrap">
              <Link to="/newbook" style={{ textDecoration: "none" }}>
                <div className="d-flex align-items-center justify-content-start mx-5">
                  <div className="d-flex align-items-center justify-content-start fs-3">
                    <FaBookMedical style={{ color: "#0286FF" }} />
                  </div>
                  <div className="d-flex align-items-center justify-content-start">
                    <b className="mx-2 text-black">New Book</b>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-12 py-2 my-2 btn text-nowrap">
              <Link to="/listbook" style={{ textDecoration: "none" }}>
                <div className="d-flex align-items-center justify-content-start mx-5">
                  <div className="d-flex align-items-center justify-content-start fs-3">
                    <FaBook style={{ color: "#0286FF" }} />
                  </div>
                  <div className="d-flex align-items-center justify-content-start">
                    <b className="mx-2 text-black">List Book</b>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-12 py-2 my-2 btn text-nowrap">
              <div className="d-flex align-items-center justify-content-start mx-5">
                <div className="d-flex align-items-center justify-content-start fs-3">
                  <RiLogoutBoxFill style={{ color: "#0286FF" }} />
                </div>
                <div className="d-flex align-items-center justify-content-start" onClick={logout}>
                  <b className="mx-2">Log Out</b>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-10 pt-3" style={{ padding: "0", margin: "0" }}>
          {isLoading && <LoadingSpinner />}
          {!isLoading && <Page navChange={navChange} />}
        </div>
      </div>
    </Fragment>
  );
};

export default Main;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Components
import LoadingSpinner from "../SubComponents/loader";

// Styling
import { RiLogoutBoxFill } from "react-icons/ri";

import "../../css/main.css";

const Template = ({ page: Page, prev }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [resNav, setNav] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const navChange = () => {
    if (resNav === false) {
      setNav(true);
    } else {
      setNav(false);
    }
  };

  return (
    <div className="row" style={{ width: "auto", height: "100vh", padding: "0", margin: "0" }}>
      <div className={`col-md-2 pt-3 main-nav ${resNav ? " responsive" : ""}`} id="resNav" style={{ backgroundColor: "#FAFAFA", padding: "0", margin: "0" }}>
        <div className="row flex-direction-column align-items-between justify-content-between" style={{ width: "100%", padding: "0", margin: "0" }}>
          <div className="col-md-12 text-center">
            <p style={{ color: "#6EB9FF", fontSize: "2em" }}>
              <b style={{ color: "#0286FF" }}>My</b>Tagihans
            </p>
          </div>
          <div className="col-md-12 py-2 text-nowrap btn mt-5 d-flex justify-content-center">
            <Link to={`/${prev}`} style={{ textDecoration: "none" }}>
              <div className="d-flex align-items-center justify-content-start mx-4">
                <div className="d-flex align-items-center justify-content-start fs-1">
                  <RiLogoutBoxFill style={{ color: "#0286FF" }} />
                </div>
                <div className="d-flex align-items-center justify-content-start fs-4">
                  <b className="mx-2 fw-semibold">Kembali</b>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="col-md-10 pt-3" style={{ padding: "0", margin: "0" }}>
        {isLoading && <LoadingSpinner />}
        {!isLoading && <Page navChange={navChange} />}
      </div>
    </div>
  );
};

export default Template;

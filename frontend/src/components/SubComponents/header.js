import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import "../../css/header.css";
const Header = ({ page, navChange, user }) => {
  const [active, setActive] = useState(false);

  const onActive = () => {
    if (active === false) {
      setActive(true);
    } else {
      setActive(false);
    }
  };
  return (
    <div className="col-md-12" id="resNav">
      <div className="d-flex justify-content-between">
        <h3 className="d-flex justify-content-between mx-3" style={{ color: "#0286FF" }}>
          {page}
        </h3>
        <div
          onClick={() => {
            navChange();
            onActive();
          }}
          className={`d-flex justify-content-between px-4 py-2 text-center mx-3 ${active ? " active" : ""}`}
          id="nav"
        >
          <div className="d-flex align-items-center me-2">
            <FaUserCircle />
          </div>
          <b className="d-flex align-items-center">{user.username}</b>
        </div>
      </div>
      <hr style={{ color: "#0286FF" }} />
    </div>
  );
};

export default Header;

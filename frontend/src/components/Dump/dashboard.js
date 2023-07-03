import { Fragment, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [redirect, setRedirect] = useState(false);
  const [user, setUser] = useState({});
  const [legal, setLegal] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" />;
  }

  axios
    .get("http://localhost:3001/user", {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      setUser(res.data.data);
      setLegal(true);
    })
    .catch((err) => {
      setLegal(false);
      setError(err.response.data.message);
      setTimeout(() => {
        localStorage.clear();
        setRedirect(true);
      }, 3000);
    });

  const Logout = () => {
    localStorage.clear();
    setRedirect(true);
  };

  return (
    <Fragment>
      {redirect && <Navigate to="/" />}
      {legal && (
        <div className="row text-center align-content-between justify-content-center" style={{ height: "90vh", width: "100%" }}>
          <h3 className="col-md-8">Welcome {user.username}</h3>
          <div className="col-md-8">
            <Link to="/newbook" style={{ textDecoration: "none" }}>
              <button className="btn btn-primary mx-3">Buat Buku</button>
            </Link>
            <Link to="/listbook" style={{ textDecoration: "none" }}>
              <button className="btn btn-primary mx-3">Daftar Buku</button>
            </Link>
          </div>
          <div className="col-md-8">
            <button className="btn btn-primary" onClick={Logout}>
              Logout
            </button>
          </div>
        </div>
      )}
      {!legal && <h2 className="text-center">{error}</h2>}
    </Fragment>
  );
};

export default Dashboard;

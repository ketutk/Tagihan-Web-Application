import { useState, Fragment } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="main" />;
  }

  const onChangeUsername = (e) => {
    const value = e.target.value;
    setUsername(value);
    setError("");
  };
  const onChangePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
    setError("");
  };
  const submitLogin = () => {
    const data = {
      username: username,
      password: password,
    };
    axios
      .post("http://localhost:3001/login", data)
      .then((result) => {
        if (result) {
          localStorage.setItem("token", result.data.token);
          setRedirect(true);
        }
      })
      .catch((e) => {
        setError(e.response.data.message);
      });
  };
  return (
    <Fragment>
      {redirect && <Navigate to="main" />}
      <div>
        <div className="container">
          <div className="row justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div className="col-md-6">
              <div className="card p-4">
                <div className="card-body">
                  {error && <div className="alert alert-danger text-center">{error}</div>}

                  <div className="form-group mb-3">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Username" value={username} onChange={onChangeUsername} />
                  </div>
                  <div className="form-group mb-3">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Password" value={password} onChange={onChangePassword} />
                  </div>
                  <button className="btn btn-primary my-3" onClick={submitLogin} style={{ width: "100%" }}>
                    Login
                  </button>
                  <hr />
                  <p className="text-center">
                    Belum Punya Akun ?{" "}
                    <Link to="daftar" style={{ textDecoration: "none" }}>
                      Daftar Disini
                    </Link>
                  </p>
                  <Link to="forgotpass" style={{ textDecoration: "none" }}>
                    <p className="text-end">Lupa Password ?</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;

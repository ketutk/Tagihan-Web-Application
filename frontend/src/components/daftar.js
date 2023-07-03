import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Daftar = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const [error, setError] = useState("");

  const onChangeUsername = (e) => {
    const value = e.target.value;
    setUsername(value);
    setError("");
  };

  const onChangeEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
    setError("");
  };

  const onChangePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
    setError("");
  };
  const klikDaftar = () => {
    const data = {
      username: username,
      email: email,
      password: password,
    };
    axios
      .post("https://outrageous-bat-headscarf.cyclic.app/daftar", data)
      .then((result) => {
        if (result) {
          if (result.data) {
            setUsername("");
            setEmail("");
            setPassword("");
            setAlert(result.data.message);
            setTimeout(() => {
              setAlert("");
            }, 3000);
          }
        }
      })
      .catch((e) => {
        setError(e.response.data.message);
      });
  };

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center align-items-center" style={{ height: "100vh" }}>
          <div className="col-md-6">
            <div className="card p-5">
              <div className="card-body">
                {error && (
                  <div className="alert alert-danger text-center">
                    <p>{error}</p>
                  </div>
                )}
                {alert && (
                  <div className="alert alert-primary text-center">
                    <p>{alert}</p>
                  </div>
                )}

                <div className="form-group mb-3">
                  <label>Username</label>
                  <input type="text" className="form-control" placeholder="Username" value={username} onChange={onChangeUsername} />
                </div>
                <div className="form-group mb-3">
                  <label>Email</label>
                  <input type="text" className="form-control" placeholder="Email" value={email} onChange={onChangeEmail} />
                </div>
                <div className="form-group mb-3">
                  <label>Password</label>
                  <input type="password" className="form-control" placeholder="Password" value={password} onChange={onChangePassword} />
                </div>
                <button className="btn btn-primary my-3" onClick={klikDaftar} style={{ width: "100%" }}>
                  Daftar
                </button>
                <hr />
                <p className="text-center">Sudah Punya Akun ? Login disini</p>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <button className="btn btn-primary my-1" style={{ width: "100%" }}>
                    Login
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Daftar;

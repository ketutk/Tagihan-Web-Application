import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [alert, setAlert] = useState("");

  const changeEmail = (e) => {
    setEmail(e.target.value);
    setError("");
    setAlert("");
  };
  const send = () => {
    if (!email) {
      setError("Email wajib diisi");
    } else {
      axios
        .put("https://outrageous-bat-headscarf.cyclic.app/forgotpassword", { email: email })
        .then((res) => {
          setEmail("");
          setAlert("Silahkan cek email anda");
          setTimeout(() => {
            setAlert("");
          }, 3000);
        })
        .catch((e) => {
          setError(e.response.data.message);
        });
    }
  };
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="col-md-6">
          <div className="card p-4">
            <div className="card-body">
              {error && <div className="alert alert-danger text-center">{error}</div>}
              {alert && <div className="alert alert-primary text-center">{alert}</div>}

              <div className="form-group mb-3">
                <label>Email</label>
                <input type="text" className="form-control" placeholder="Masukkan email" value={email} onChange={changeEmail} />
              </div>
              <button className="btn btn-primary" onClick={send}>
                Kirim
              </button>
              <Link to="/" style={{ textDecoration: "none" }}>
                <button className="btn btn-primary mx-3">Login</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;

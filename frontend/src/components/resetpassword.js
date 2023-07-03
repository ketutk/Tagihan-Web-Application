import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [alert, setAlert] = useState("");

  const { token } = useParams();

  const changePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (!value) {
      setErrorPassword("Password tidak boleh kosong");
    } else {
      setErrorPassword("");
    }
  };
  const changeConfirmPassword = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (!value) {
      setErrorConfirmPassword("Password tidak boleh kosong");
    } else if (password !== value) {
      setErrorConfirmPassword("Password tidak sama dengan sebelumnya");
    } else {
      setErrorConfirmPassword("");
    }
  };
  const simpan = () => {
    const data = {
      password: password,
      token: token,
    };
    axios.put("http://localhost:3001/resetpassword", data).then((res) => {
      if (res) {
        setPassword("");
        setConfirmPassword("");
        setAlert(res.data.message);
        setTimeout(() => {
          setAlert("");
        }, 3000);
      }
    });
  };
  return (
    <div>
      <div className="container">
        <div className="row justify-content-center align-items-center" style={{ height: "100vh" }}>
          <div className="col-md-6">
            <div className="card p-5">
              <div className="card-body">
                {alert && <p className="alert alert-primary">{alert}</p>}
                <div className="form-group mb-3">
                  <label>New Password</label>
                  <input type="password" className="form-control" placeholder="Masukkan password baru" value={password} onChange={changePassword} />
                  {errorPassword && <p className="text-danger">{errorPassword}</p>}
                </div>
                <div className="form-group mb-3">
                  <label>Confirm Password</label>
                  <input type="password" className="form-control" placeholder="Masukkan ulang password" value={confirmPassword} onChange={changeConfirmPassword} />
                  {errorConfirmPassword && <p className="text-danger">{errorConfirmPassword}</p>}
                </div>
                <button className="btn btn-primary my-3" onClick={simpan} style={{ width: "100%" }}>
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

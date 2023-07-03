import { useState, Fragment, useEffect } from "react";
import { Navigate } from "react-router-dom";

import Header from "../SubComponents/header";
import LoadingSpinner from "../SubComponents/loader";
import axios from "axios";

const Newbook = ({ navChange }) => {
  // USE STATE=====================================================
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  const [legal, setLegal] = useState(false);
  const [alert, setAlert] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);

  // FORM
  const [formStage, setFormStage] = useState(1);
  const [desc, setDesc] = useState("");
  const [bulan, setBulan] = useState("");
  const [tahun, setTahun] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [nama, setNama] = useState("");
  const [dokter, setDokter] = useState("");
  const [tagihan, setTagihan] = useState("");
  const [ferror, setFerror] = useState("");
  const [fmsg, setFmsg] = useState("");

  // FUNCTIONAL ========================================================
  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      return <Navigate to="/" />;
    }

    axios
      .get("https://outrageous-bat-headscarf.cyclic.app/user", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setUser(res.data.data);
        setLegal(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      })
      .catch((err) => {
        localStorage.clear();
        setRedirect(true);
      });
  }, []);

  const onChangeDesc = (e) => {
    const newDesc = bulan.concat(" ", tahun);
    setDesc(newDesc);
    setError("");

    setFerror("");
    setFmsg("");
  };
  const onChangeBulan = (e) => {
    const value = e.target.value;
    setBulan(value);
    setError("");

    setFerror("");
    setFmsg("");
  };
  const onChangeTahun = (e) => {
    const value = e.target.value;
    setTahun(value);
    setError("");

    setFerror("");
    setFmsg("");
  };
  const onChangeTanggal = (e) => {
    const value = e.target.value;
    setTanggal(value);
    setError("");

    setFerror("");
    setFmsg("");
  };
  const onChangeNama = (e) => {
    const value = e.target.value;
    setNama(value);
    setError("");

    setFerror("");
    setFmsg("");
  };
  const onChangeDokter = (e) => {
    const value = e.target.value;
    setDokter(value);
    setError("");

    setFerror("");
    setFmsg("");
  };
  const onChangeTagihan = (e) => {
    const value = e.target.value;
    setTagihan(value);
    setError("");

    setFerror("");
    setFmsg("");
  };

  const changeStage = () => {
    if (formStage === 1) {
      if (desc === "" || tahun === "" || bulan === "") {
        let err = "";
        if (tahun === "") {
          err += "tahun";
        }
        if (bulan === "") {
          err += "bulan";
        }
        setFerror(`desc ${err}`);
        setFmsg("Judul buku harus diisi !");
      } else {
        setFormStage(2);
      }
    } else {
      setFormStage(1);
    }
  };

  const tambah = () => {
    if (nama === "" || dokter === "" || tanggal === "" || tagihan === "") {
      let err = "";
      if (nama === "") {
        err += "nama";
      }
      if (dokter === "") {
        err += "dokter";
      }
      if (tanggal === "") {
        err += "tanggal";
      }
      if (tagihan === "") {
        err += "tagihan";
      }
      setFerror(`data ${err}`);
      setFmsg("Semua Data harus diisi !");
    } else {
      const data = {
        desc,
        nama,
        dokter,
        tanggal,
        tagihan,
      };
      const token = localStorage.getItem("token");
      if (!token) {
        return <Navigate to="/" />;
      }

      axios
        .post("https://outrageous-bat-headscarf.cyclic.app/newbook", data, {
          headers: {
            Authorization: token,
          },
        })
        .then((result) => {
          setDesc("");
          setBulan("");
          setTahun("");
          setDokter("");
          setNama("");
          setTagihan("");
          setTanggal("");
          setAlert(result.data.message);
          setFormStage(1);
          setTimeout(() => {
            setAlert("");
          }, 3000);
        })
        .catch((e) => {
          setError(e.response.data.message);
          setFormStage(1);
        });
    }
  };

  return (
    <Fragment>
      {redirect && <Navigate to="/" />}
      {isLoading && <LoadingSpinner />}
      {legal && !isLoading && (
        <div className="row flex-direction-column" style={{ width: "100%", padding: "0", margin: "0" }}>
          {/* HEADER */}
          <Header page="New Book" user={user} navChange={navChange} />
          <div className="col-md-12 d-flex justify-content-center align-items-center">
            <div className="d-flex justify-content-center align-items-center mt-5" style={{ width: "80%" }}>
              <div className="card p-3 mb-5 rounded" style={{ width: "100%", boxShadow: "0 1rem 3rem #6EB9FF" }}>
                {formStage === 1 && (
                  <div className="card-body">
                    <h4 className="card-title mb-5">Buat Judul Buku</h4>
                    {alert && <div className="alert alert-success fs-5 text-center">{alert}</div>}
                    {error && <div className="alert alert-danger fs-5 text-center">{error}</div>}
                    <div className="input-group has-validation">
                      <div className={`form-floating input-group-lg fs-5 me-3 ${ferror.match("bulan") ? "is-invalid" : ""}`}>
                        <input type="text" className={`form-control ${ferror.match("bulan") ? "is-invalid" : ""}`} id="bulan" placeholder="Bulan" value={bulan} onChange={onChangeBulan} onBlur={onChangeDesc} required />
                        <label for="bulan">Bulan</label>
                      </div>
                      <div className={`form-floating input-group-lg fs-5 ${ferror.match("tahun") ? "is-invalid" : ""}`}>
                        <input type="text" className={`form-control ${ferror.match("tahun") ? "is-invalid" : ""}`} id="tahun" placeholder="Tahun" value={tahun} onChange={onChangeTahun} onBlur={onChangeDesc} required />
                        <label for="tahun">Tahun</label>
                      </div>
                      {ferror.match("desc") && <div className="invalid-feedback fs-5">{fmsg}</div>}
                    </div>
                    <div className="row justify-content-end">
                      <div className="col text-end">
                        <button className="btn btn-primary mt-5 fs-5" onClick={changeStage}>
                          Selanjutnya
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {formStage === 2 && (
                  <div className="card-body">
                    <h4 className="card-title mb-5">Isi Tagihan</h4>
                    <div className="input-group has-validation">
                      <div className={`form-floating ${ferror.match("nama") ? "is-invalid" : ""}`}>
                        <input type="text" className={`form-control ${ferror.match("nama") ? "is-invalid" : ""}`} id="nama" placeholder="Nama" value={nama} onChange={onChangeNama} required />
                        <label for="nama">Nama Pasien</label>
                      </div>
                      {/* <div className="invalid-feedback">Please choose a username.</div> */}
                    </div>
                    <div className="input-group has-validation mt-4">
                      <div className={`form-floating ${ferror.match("dokter") ? "is-invalid" : ""}`}>
                        <input type="text" className={`form-control ${ferror.match("dokter") ? "is-invalid" : ""}`} id="dokter" placeholder="Dokter" value={dokter} onChange={onChangeDokter} required />
                        <label for="dokter">Dokter</label>
                      </div>
                    </div>
                    <div className="input-group has-validation mt-4">
                      <div className={`form-floating me-3 ${ferror.match("tanggal") ? "is-invalid" : ""}`}>
                        <input type="date" className={`form-control ${ferror.match("tanggal") ? "is-invalid" : ""}`} id="tanggal" placeholder="Tanggal" value={tanggal} onChange={onChangeTanggal} required />
                        <label for="tanggal">Tanggal</label>
                      </div>
                      <div className={`form-floating ${ferror.match("tagihan") ? "is-invalid" : ""}`}>
                        <input type="number" className={`form-control ${ferror.match("tagihan") ? "is-invalid" : ""}`} id="tagihan" placeholder="Tagihan" value={tagihan} onChange={onChangeTagihan} required />
                        <label for="tagihan">Tagihan</label>
                      </div>
                    </div>
                    {ferror.match("data") && <div className="text-danger text-center mt-3 fs-5">{fmsg}</div>}
                    <div className="row justify-content-between">
                      <div className="col text-start">
                        <button className="btn btn-primary mt-4 fs-5" onClick={changeStage}>
                          Kembali
                        </button>
                      </div>
                      <div className="col text-end">
                        <button className="btn btn-primary mt-4 fs-5" onClick={tambah}>
                          Buat Buku
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Newbook;

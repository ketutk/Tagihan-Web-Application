import { useState, Fragment } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const Newbook = () => {
  const [desc, setDesc] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [nama, setNama] = useState("");
  const [dokter, setDokter] = useState("");
  const [tagihan, setTagihan] = useState("");
  const [alert, setAlert] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState("");
  const [legal, setLegal] = useState("");

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

  const onChangeDesc = (e) => {
    const value = e.target.value;
    setDesc(value);
    setError("");
  };
  const onChangeTanggal = (e) => {
    const value = e.target.value;
    setTanggal(value);
    setError("");
  };
  const onChangeNama = (e) => {
    const value = e.target.value;
    setNama(value);
    setError("");
  };
  const onChangeDokter = (e) => {
    const value = e.target.value;
    setDokter(value);
    setError("");
  };
  const onChangeTagihan = (e) => {
    const value = e.target.value;
    setTagihan(value);
    setError("");
  };

  const Tambah = () => {
    if (desc === "" || tanggal === "" || nama === "" || dokter === "" || tagihan === "") {
      setError("Semua kolom wajib diisi");
    } else {
      const newBook = {
        desc: desc,
        tanggal: tanggal,
        nama: nama,
        dokter: dokter,
        tagihan: tagihan,
      };
      axios
        .post("http://localhost:3001/newbook", newBook, {
          headers: {
            Authorization: token,
          },
        })
        .then((result) => {
          setDesc("");
          setDokter("");
          setNama("");
          setTagihan("");
          setTanggal("");
          setAlert(result.data.message);
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
    <Fragment>
      {redirect && <Navigate to="/" />}
      {legal && (
        <div className="container-xl">
          <div className="container-md">
            <div className="row justify-content-center text-center">
              <h2 className="mt-3">Tambah Buku Tagihan</h2>
            </div>
            <div className="row flex-column justify-content-center align-content-center mt-4">
              <div className="row flex-column justify-content-center align-content-center">
                <div className="col-md-8">
                  <div className="row justify-content-center align-content-center text-md-center">
                    {alert && <div className="alert alert-primary">{alert}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="col-md-12">
                      <label className="col-md-5 col-form-label">
                        <h3>Deskripsi Buku</h3>
                      </label>
                    </div>
                    <div className="col-md-8">
                      <input type="text" className="form-control nama-pasien masuk" placeholder="Masukkan dengan format `Bulan (spasi) Tahun`" value={desc} onChange={onChangeDesc} />
                    </div>
                  </div>
                </div>
                <div className="col-md-8 text-center">
                  <h3 className="my-4">Isi Data</h3>
                  <hr />
                </div>
                <div className="col-md-8">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="row flex-column">
                        <div className="col">
                          <label className="col-md-1 col-form-label">
                            <h5>Tanggal</h5>
                          </label>
                        </div>
                        <div className="col-md-11">
                          <div className="input-group date">
                            <input type="date" className="form-control tanggal masuk" id="date" value={tanggal} onFocus={onChangeTanggal} onChange={onChangeTanggal} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="row flex-column">
                        <div className="col-11 text-md-end">
                          <label className="col-md-5 col-form-label">
                            <h5>Nama Pasien</h5>
                          </label>
                        </div>
                        <div className="col-md-11">
                          <input type="text" className="form-control nama-pasien masuk" placeholder="Masukkan nama..." value={nama} onChange={onChangeNama} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="row flex-column">
                        <div className="col">
                          <label className="col-md-1 col-form-label">
                            <h5>Tagihan</h5>
                          </label>
                        </div>
                        <div className="col-md-11">
                          <input type="number" className="form-control tagihan-masuk" placeholder="Masukkan dalam rupiah..." value={tagihan} onChange={onChangeTagihan} />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="row flex-column">
                        <div className="col-11 text-md-end">
                          <label className="col-md-5 col-form-label">
                            <h5>Nama Dokter</h5>
                          </label>
                        </div>
                        <div className="col-md-11">
                          <input type="text" className="form-control nama-dokter masuk" value={dokter} onChange={onChangeDokter} placeholder="Masukkan nama..." />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-8 my-3 text-center">
                  <button onClick={Tambah} className="btn btn-primary px-3">
                    Tambah Buku Tagihan
                  </button>
                </div>
                <div className="col-md-8 text-center">
                  <Link to="/dashboard" style={{ textDecoration: "none" }}>
                    <button className="btn btn-primary px-3 mb-5">Kembali</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!legal && <h3 className="text-center">{error}</h3>}
    </Fragment>
  );
};

export default Newbook;

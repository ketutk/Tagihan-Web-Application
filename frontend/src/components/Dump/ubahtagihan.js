import axios from "axios";
import React from "react";
import { useParams, useLocation, Link, Navigate } from "react-router-dom";
import { Fragment, useState } from "react";

const UbahTagihan = () => {
  const [data, setData] = useState({});
  const [tanggal, setTanggal] = useState("");
  const [nama, setNama] = useState("");
  const [dokter, setDokter] = useState("");
  const [tagihan, setTagihan] = useState("");

  const [error, setError] = useState("");
  const [alert, setAlert] = useState("");
  const [legal, setLegal] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [status, setStatus] = useState(false);

  const { bookid } = useParams();

  let query = useQuery();
  const idTagihan = query.get("idTagihan");

  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" />;
  }

  if (idTagihan) {
    axios
      .get(`http://localhost:3001/ubah/${bookid}?idTagihan=${idTagihan}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setData(res.data.data);
        setError(res.data.message);
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

    const onChangeTanggal = (e) => {
      const value = e.target.value;
      setTanggal(value);
    };
    const onChangeNama = (e) => {
      const value = e.target.value;
      setNama(value);
    };
    const onChangeDokter = (e) => {
      const value = e.target.value;
      setDokter(value);
    };
    const onChangeTagihan = (e) => {
      const value = e.target.value;
      setTagihan(value);
    };

    const focusOut = (e) => {
      const value = e.target.value;
      if (value === "") {
        if (e.target.id === "nama") {
          setNama(data.nama);
        } else if (e.target.id === "dokter") {
          setDokter(data.dokter);
        } else if (e.target.id === "tagihan") {
          setTagihan(data.tagihan);
        }
      }
    };
    const focusIn = (e) => {
      const value = e.target.value;
      if (value === "") {
        if (e.target.id === "nama") {
          setNama(data.nama);
        } else if (e.target.id === "dokter") {
          setDokter(data.dokter);
        } else if (e.target.id === "tagihan") {
          setTagihan(data.tagihan);
        }
      }
    };
    const ubah = () => {
      const newData = {
        bookid,
        idTagihan,
        nama: nama === "" ? data.nama : nama,
        dokter: dokter === "" ? data.dokter : dokter,
        tanggal: tanggal === "" ? data.tanggal : tanggal,
        tagihan: tagihan === "" ? data.tagihan : tagihan,
      };

      axios
        .post("http://localhost:3001/update", newData, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          if (res.data.status) {
            setAlert(res.data.message);
            setTimeout(() => {
              setStatus(true);
            }, 2000);
          }
        })
        .catch((err) => {
          setError(err.response.data.message);
        });
    };

    return (
      <Fragment>
        {status && <Navigate to={`/tagihan/${bookid}`} />}
        {redirect && <Navigate to="/" />}
        {legal && (
          <div className="container-xl">
            <div className="container-md">
              <div className="row justify-content-center text-center">
                <h2 className="mt-3">Tambah Tagihan</h2>
              </div>
              <div className="row flex-column justify-content-center align-content-center mt-4">
                <div className="row flex-column justify-content-center align-content-center">
                  <div className="col-md-8 text-center">
                    <h3 className="my-4">Isi Data</h3>
                    <hr />
                  </div>
                  <div className="col-md-8">
                    {error && <div className="alert alert-danger text-center">{error}</div>}
                    {alert && <div className="alert alert-success text-center">{alert}</div>}
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
                              <input type="date" className="form-control" id="date" value={tanggal === "" ? data.tanggal : tanggal} onFocus={onChangeTanggal} onChange={onChangeTanggal} />
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
                            <input type="text" className="form-control nama-pasien masuk" id="nama" value={nama} placeholder={data.nama} onChange={onChangeNama} onBlur={focusOut} onFocus={focusIn} />
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
                            <input type="number" className="form-control tagihan-masuk" id="tagihan" placeholder={data.tagihan} value={tagihan} onChange={onChangeTagihan} onBlur={focusOut} onFocus={focusIn} />
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
                            <input type="text" className="form-control nama-dokter masuk" id="dokter" value={dokter} placeholder={data.dokter} onChange={onChangeDokter} onBlur={focusOut} onFocus={focusIn} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8 my-3 text-center">
                    <button onClick={ubah} className="btn btn-primary px-3">
                      Ubah Buku Tagihan
                    </button>
                  </div>
                  <div className="col-md-8 text-center">
                    <Link to={`/tagihan/${bookid}`} style={{ textDecoration: "none" }}>
                      <button className="btn btn-primary px-3 mb-5">Kembali</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {!legal && (
          <div>
            <h3 className="text-center">{error}</h3>
          </div>
        )}
      </Fragment>
    );
  } else {
    return (
      <div>
        {!idTagihan && <Navigate to="/listbook" />}
        <h3 className="text-center">Data gagal didapatkan</h3>
      </div>
    );
  }
};

export default UbahTagihan;

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

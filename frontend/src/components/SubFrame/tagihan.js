import Header from "../SubComponents/header";
import Tablefill from "../SubComponents/table";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { useState, Fragment } from "react";
import { useParams, Navigate } from "react-router-dom";
const Tagihan = ({ navChange }) => {
  const [book, setBook] = useState([]);
  const [user, setUser] = useState({});

  const [alert, setAlert] = useState("");
  const [legal, setLegal] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  const [tanggal, setTanggal] = useState("");
  const [nama, setNama] = useState("");
  const [dokter, setDokter] = useState("");
  const [tagihan, setTagihan] = useState("");
  const [ferror, setFerror] = useState("");
  const [fmsg, setFmsg] = useState("");

  const { bookid } = useParams();

  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" />;
  }

  axios
    .get(`http://localhost:3001/tagihan/${bookid}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      setBook(res.data.data.detail);
      setUser(res.data.user);
      setLegal(true);
    })
    .catch((err) => {
      setLegal(false);
      setError(err);
      setTimeout(() => {
        localStorage.clear();
        setRedirect(true);
      }, 3000);
    });

  const hapus = (e) => {
    const yakin = window.confirm("Apakah anda yakin ingin menghapus tagihan ini ?");
    if (yakin) {
      const data = {
        bookid: bookid,
        idTagihan: e.target.value,
      };
      axios
        .post("http://localhost:3001/hapus", data, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          setAlert(res.data.message);
          setTimeout(() => {
            setAlert("");
          }, 3000);
        })
        .catch((err) => {
          setError(err.response.data.message);
          setTimeout(() => {
            setError("");
          }, 3000);
        });
    }
  };

  const handleClose = () => {
    setShow(false);
    setDokter("");
    setNama("");
    setTagihan("");
    setTanggal("");
    setFerror("");
    setFmsg("");
  };

  const handleShow = () => setShow(true);

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
        bookid,
        nama,
        dokter,
        tanggal,
        tagihan,
      };

      axios
        .post("http://localhost:3001/tambah", data, {
          headers: {
            Authorization: token,
          },
        })
        .then((result) => {
          setDokter("");
          setNama("");
          setTagihan("");
          setTanggal("");
          setAlert(result.data.message);
          handleClose();
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
        <div className="row flex-direction-column" style={{ width: "100%", padding: "0", margin: "0" }}>
          <Header page="ListBook | Tagihan" user={user} navChange={navChange} />

          {/* BODY */}
          <div className="col-md-12">
            {alert && <div className="alert alert-success text-center">{alert}</div>}
            {error && <div className="alert alert-danger text-center">{error}</div>}
            {book.length === 0 && <div className="alert alert-danger text-center">Belum ada data tagihan</div>}
            <div className="mx-3 mb-3 mt-4 d-flex justify-content-center">
              <div className="overflow-y-auto d-block" style={{ width: "90%", boxShadow: "0 1rem 3rem #6EB9FF" }}>
                {book.length !== 0 && <Tablefill data={book} hapus={hapus} />}
              </div>
            </div>
            <div className="text-center mb-4">
              <button className="btn btn-primary fs-5" onClick={handleShow}>
                Tambah Tagihan
              </button>
              <Modal size="lg" show={show} onHide={handleClose} backdrop="static" keyboard={true} centered aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton>
                  <Modal.Title id="example-modal-sizes-title-lg">Tambah Tagihan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="d-flex justify-content-center" style={{ width: "100%" }}>
                    <div style={{ width: "90%" }}>
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
                      <div className="row justify-content-center">
                        <div className="col text-center">
                          <button className="btn btn-primary my-4 fs-5" style={{ width: "100%" }} onClick={tambah}>
                            Tambah
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default Tagihan;

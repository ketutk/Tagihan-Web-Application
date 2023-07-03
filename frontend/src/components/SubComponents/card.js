import "../../css/cardmain.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

const Card = ({ deskripsi, id, token, hapus, setChange }) => {
  const [show, setShow] = useState(false);
  const [newName, setNewName] = useState("");
  const [alert, setAlert] = useState("");
  const [error, setError] = useState("");

  const handleClose = () => {
    setShow(false);
    setNewName("");
    setAlert("");
    setError("");
  };
  const handleShow = () => setShow(true);

  const onNewName = (e) => {
    setNewName(e.target.value);
    setAlert("");
    setError("");
  };

  const change = () => {
    axios
      .post(
        "https://outrageous-bat-headscarf.cyclic.app/editbook",
        {
          _id: id,
          newName: newName,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        setAlert(res.data.message);
        window.location.reload(false);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };
  return (
    <>
      <div className="col-md-4 my-3">
        <div className="card cardcss">
          <div className="card-body">
            <h5 className="card-title">{deskripsi.split(" ")[0]}</h5>
            <h6 className="card-subtitle mb-2">{deskripsi.split(" ")[1]}</h6>
            <div className="d-inline">
              <Link to={`/tagihan/${id}`} style={{ textDecoration: "none" }}>
                <button className="btn">Lihat Tagihan</button>
              </Link>
            </div>
            <div className="d-inline mx-2">
              <Button variant="primary" onClick={handleShow}>
                Ubah
              </Button>
            </div>
            <div className="d-inline">
              <button className="btn" onClick={hapus} value={id}>
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true} centered>
        <Modal.Header closeButton>
          <Modal.Title>Ubah Nama Buku</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Nama Buku</h6>
          {alert && <div className="alert alert-success mb-3">{alert}</div>}
          {error && <div className="alert alert-danger mb-3">{error}</div>}
          <input type="text" placeholder={deskripsi} className="form-control" onChange={onNewName} value={newName} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tutup
          </Button>
          <Button variant="primary" onClick={change}>
            Ubah
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Card;

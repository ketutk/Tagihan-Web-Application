import { useState, Fragment } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

const Card = (props) => {
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
        "http://localhost:3001/editbook",
        {
          _id: props.id,
          newName: newName,
        },
        {
          headers: {
            Authorization: props.token,
          },
        }
      )
      .then((res) => {
        setAlert(res.data.message);
        setTimeout(() => {
          setAlert("");
        }, 3000);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  const words = props.deskripsi.split(" ");
  if (words.length === 2) {
    return (
      <>
        <div className="col-md-4 my-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{props.deskripsi.split(" ")[0]}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{props.deskripsi.split(" ")[1]}</h6>
              <Link to={`/tagihan/${props.id}`} style={{ textDecoration: "none" }}>
                <button className="btn btn-primary">Lihat Tagihan</button>
              </Link>

              <div className="d-inline mx-2">
                <Button variant="primary" onClick={handleShow}>
                  Ubah
                </Button>
              </div>
              <div className="d-inline">
                <button value={props.id} className="btn btn-primary" onClick={props.hapus}>
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
            <input type="text" placeholder={props.deskripsi} className="form-control" onChange={onNewName} value={newName} />
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
  } else {
    return (
      <>
        <div className="col-md-4 my-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{props.deskripsi}</h5>
              <h6 className="card-subtitle mb-2 text-muted">-</h6>
              <button className="btn btn-primary">Lihat Tagihan</button>
              <div className="d-inline mx-2">
                <Button variant="primary" onClick={handleShow}>
                  Ubah
                </Button>
              </div>
              <div className="d-inline">
                <button value={props.id} className="btn btn-primary" onClick={props.hapus}>
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

            <input type="text" placeholder={props.deskripsi} className="form-control" onChange={onNewName} value={newName} />
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
  }
};

const Listbook = () => {
  const [search, setSearch] = useState("");
  const [searchRes, setSearchRes] = useState([]);
  const [searchStat, setSearchStat] = useState(false);
  const [book, setBook] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [legal, setLegal] = useState(false);
  const [error, setError] = useState("");
  const [alert, setAlert] = useState("");

  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" />;
  }

  axios
    .get("http://localhost:3001/listbook", {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      setBook(res.data.data.books);
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

  const searcher = (e) => {
    setSearch(e.target.value);
    setError("");
  };

  const searching = () => {
    const tampung = [];
    book.forEach((e) => {
      let exist = e.deskripsi.toLowerCase().match(`${search.toLowerCase()}`);
      if (exist) {
        tampung.push(e);
      }
    });
    if (tampung.length !== 0) {
      setSearchRes(tampung);
      setSearchStat(true);
    } else {
      setSearchRes([]);
      setSearchStat(true);
      setError("Buku yang dicari tidak ditemukan");
    }
  };

  const hapus = (e) => {
    const yakin = window.confirm("Apakah anda yakin ingin menghapus ?");
    if (yakin) {
      axios
        .post(
          "http://localhost:3001/deletebook",
          { _id: e.target.value },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          setAlert(res.data.message);
          setTimeout(() => {
            setAlert("");
          }, 3000);
        })
        .catch((err) => {
          setError(err.data.message);
          setTimeout(() => {
            setError("");
          }, 3000);
        });
    }
  };
  return (
    <Fragment>
      {redirect && <Navigate to="/" />}
      {legal && (
        <div className="container-xl">
          <div className="row justify-content-center mt-3">
            <h3 className="text-center">Daftar Buku</h3>
            <div className="col-md-8 my-4">
              <div className="input-group">
                <input type="text" className="form-control input-keyword searcher" placeholder="Cari buku tagihan..." id="search" name="search" onChange={searcher} value={search} />
                <div className="input-group-append">
                  <button className="btn btn-primary search-btn px-3" id="button-addon2" onClick={searching}>
                    Cari Buku
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-9">
              <div className="row">
                {book.length === 0 && <div className="alert alert-danger">Belum ada buku, silahkan buat terlebih dahulu</div>}
                {error && <div className="alert alert-danger text-center">{error}</div>}
                {alert && <div className="alert alert-success text-center">{alert}</div>}
                {!searchStat && book.map((e) => <Card deskripsi={e.deskripsi} id={e._id} hapus={hapus} token={token} />)}
                {searchStat && searchRes.map((e) => <Card deskripsi={e.deskripsi} id={e._id} hapus={hapus} token={token} />)}
              </div>
            </div>
          </div>
          <div className="text-center">
            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              <button className="btn btn-primary px-3 mb-5">Kembali</button>
            </Link>
          </div>
        </div>
      )}
      {!legal && <h3 className="text-center">{error}</h3>}
    </Fragment>
  );
};

export default Listbook;

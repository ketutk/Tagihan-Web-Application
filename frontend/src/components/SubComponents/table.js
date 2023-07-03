import { FormatRupiah } from "@arismun/format-rupiah";
import { Modal } from "react-bootstrap";
import { useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const Tablefill = ({ data, hapus }) => {
  const [tagihan, setTagihan] = useState({});
  const [isShow, setIsShow] = useState(false);
  const dataTagihan = data;

  const hitung = () => {
    let totalTagihan = 0;
    dataTagihan.forEach((e) => {
      totalTagihan += e.tagihan;
    });
    return totalTagihan;
  };

  const showUpdate = (e) => {
    const set = dataTagihan.find((data) => data._id === e.target.value);
    setTagihan(set);
    setIsShow(true);
  };

  const handleClose = () => {
    setIsShow(false);
  };

  return (
    <Fragment>
      <table className="table table-hover text-nowrap text-center table-sm table-striped" style={{ padding: "0", margin: "0", width: "100%" }}>
        <thead className="table-primary" style={{ position: "sticky", top: "0", left: "0" }}>
          <tr>
            <th scope="col" className="py-3 px-3">
              No
            </th>
            <th scope="col" className="py-3 px-3">
              Pasien
            </th>
            <th scope="col" className="py-3 px-3">
              Dokter
            </th>
            <th scope="col" className="py-3 px-3">
              Tagihan
            </th>
            <th scope="col" className="py-3 px-3">
              Tanggal
            </th>
            <th scope="col" className="py-3 px-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {dataTagihan.map((item, index) => {
            return <Row index={index + 1} nama={item.nama} dokter={item.dokter} tagihan={item.tagihan} tanggal={item.tanggal} _id={item._id} hapus={hapus} showUpdate={showUpdate} />;
          })}

          {/* ======================================================== */}
          <tr style={{ position: "sticky", bottom: "0", left: "0" }}>
            <th scope="row" colSpan="3" className="table-primary px-3">
              Total Tagihan
            </th>
            <td className="bg-white">
              <FormatRupiah value={hitung()} />
            </td>
            <td colSpan="2" className="bg-white"></td>
          </tr>
        </tbody>
      </table>
      {isShow && <Modalshow nama={tagihan.nama} tanggal={tagihan.tanggal} tagihan={tagihan.tagihan} dokter={tagihan.dokter} idTagihan={tagihan._id} show={isShow} handleClose={handleClose} />}
    </Fragment>
  );
};

const Modalshow = ({ nama, tanggal, tagihan, dokter, idTagihan, show, handleClose }) => {
  const [alert, setAlert] = useState("");
  const [error, setError] = useState("");

  const [tanggals, setTanggal] = useState(tanggal);
  const [namas, setNama] = useState("");
  const [dokters, setDokter] = useState("");
  const [tagihans, setTagihan] = useState("");

  const { bookid } = useParams();

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

  const change = () => {
    const token = localStorage.getItem("token");
    const newData = {
      bookid,
      idTagihan,
      nama: namas === "" ? nama : namas,
      dokter: dokters === "" ? dokter : dokters,
      tanggal: tanggals === "" ? tanggal : tanggals,
      tagihan: tagihans === "" ? tagihan : tagihans,
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
            handleClose();
          }, 1000);
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  return (
    <Modal size="lg" show={show} onHide={handleClose} backdrop="static" keyboard={true} centered aria-labelledby="example-modal-sizes-title-lg">
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">Ubah Tagihan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center" style={{ width: "100%" }}>
          <div style={{ width: "90%" }}>
            {alert && <div className="alert alert-success text-center">{alert}</div>}
            {error && <div className="alert alert-success text-center">{error}</div>}
            <div className="input-group has-validation">
              <div className={`form-floating`}>
                <input type="text" className={`form-control`} id="nama" placeholder="Nama" value={namas} onChange={onChangeNama} required />
                <label for="nama">{nama}</label>
              </div>
              {/* <div className="invalid-feedback">Please choose a username.</div> */}
            </div>
            <div className="input-group has-validation mt-4">
              <div className={`form-floating`}>
                <input type="text" className={`form-control`} id="dokter" placeholder="Dokter" value={dokters} onChange={onChangeDokter} required />
                <label for="dokter">{dokter}</label>
              </div>
            </div>
            <div className="input-group has-validation mt-4">
              <div className={`form-floating me-3`}>
                <input type="date" className={`form-control`} id="tanggal" placeholder="Tanggal" value={tanggals} onChange={onChangeTanggal} required />
                <label for="tanggal">{tanggal}</label>
              </div>
              <div className={`form-floating`}>
                <input type="number" className={`form-control`} id="tagihan" placeholder="Tagihan" value={tagihans} onChange={onChangeTagihan} required />
                <label for="tagihan">{tagihan}</label>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col text-center">
                <button className="btn btn-primary my-4 fs-5" style={{ width: "100%" }} onClick={change}>
                  Perbarui
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

const Row = ({ index, nama, dokter, tagihan, tanggal, _id, hapus, showUpdate }) => {
  //   const { bookid } = useParams();

  return (
    <tr>
      <th scope="row" className="table-primary px-3">
        {index}
      </th>
      <td className="px-3">{nama}</td>
      <td className="px-3">{dokter}</td>
      <td className="px-3">
        <FormatRupiah value={tagihan} />
      </td>
      <td className="px-3">{tanggal}</td>
      <td className="text-center px-3">
        {/* <Link to={`/ubah/${bookid}?idTagihan=${_id}`} style={{ textDecoration: "none" }}>
          <button className="btn btn-primary px-3">Ubah</button>
        </Link> */}
        <button className="btn btn-primary px-3" value={_id} onClick={showUpdate}>
          Ubah
        </button>

        <button className="btn btn-primary px-3 mx-3" value={_id} onClick={hapus}>
          Hapus
        </button>
      </td>
    </tr>
  );
};

export default Tablefill;

import { useState, Fragment } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { FormatRupiah } from "@arismun/format-rupiah";
import axios from "axios";

const Tagihan = () => {
  const [book, setBook] = useState([]);

  const [alert, setAlert] = useState("");
  const [legal, setLegal] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <Fragment>
      {redirect && <Navigate to="/" />}
      {legal && (
        <div className="container-xl">
          <h3 className="text-center mt-3">Tagihan</h3>
          <div className="row justify-content-center text-center my-3">
            <div className="col-md-10">
              <Link to={`/tambah/${bookid}`} style={{ textDecoration: "none" }}>
                <button className="btn btn-primary">Tambah Tagihan</button>
              </Link>
            </div>
          </div>
          <div className="row justify-content-center">
            {alert && <div className="alert alert-success text-center">{alert}</div>}
            {error && <div className="alert alert-danger text-center">{error}</div>}
            <div className="col-md-10 overflow-x-auto">
              <Tablefill data={book} hapus={hapus} />
            </div>
          </div>
          <div className="row justify-content-center text-center mt-5">
            <Link to="/listbook" style={{ textDecoration: "none" }}>
              <button className="btn btn-primary px-3 mb-5">Kembali</button>
            </Link>
          </div>
        </div>
      )}
      {!legal && <h3 className="text-center">{error}</h3>}
    </Fragment>
  );
};

export default Tagihan;

// SUB KOMPONEN==============================================================================================

const Row = (props) => {
  const { bookid } = useParams();

  return (
    <tr>
      <th scope="row" className="table-primary px-3">
        {props.index}
      </th>
      <td className="px-3">{props.nama}</td>
      <td className="px-3">{props.dokter}</td>
      <td className="px-3">
        <FormatRupiah value={props.tagihan} />
      </td>
      <td className="px-3">{props.tanggal}</td>
      <td className="text-center px-3">
        <Link to={`/ubah/${bookid}?idTagihan=${props._id}`} style={{ textDecoration: "none" }}>
          <button className="btn btn-primary px-3">Ubah</button>
        </Link>
        <button className="btn btn-primary px-3 mx-3" value={props._id} onClick={props.hapus}>
          Hapus
        </button>
      </td>
    </tr>
  );
};

const Tablefill = (props) => {
  const dataTagihan = props.data;
  const hitung = () => {
    let totalTagihan = 0;
    dataTagihan.forEach((e) => {
      totalTagihan += e.tagihan;
    });
    return totalTagihan;
  };

  return (
    <table className="table table-hover text-nowrap text-center table-sm table-striped">
      <thead className="table-primary">
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
          return <Row index={index + 1} nama={item.nama} dokter={item.dokter} tagihan={item.tagihan} tanggal={item.tanggal} _id={item._id} hapus={props.hapus} />;
        })}

        {/* ======================================================== */}
        <tr>
          <th scope="row" colSpan="3" className="table-primary px-3">
            Total Tagihan
          </th>
          <td>
            <FormatRupiah value={hitung()} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

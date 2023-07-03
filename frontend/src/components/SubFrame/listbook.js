import Header from "../SubComponents/header";
import Card from "../SubComponents/card";
import MiniLoadingSpinner from "../SubComponents/miniloader";

import { useState, useEffect, Fragment } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
const Listbook = ({ navChange }) => {
  // Main state
  const [user, setUser] = useState({});
  const [Datamain, setDatamain] = useState([]);
  const [legal, setLegal] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");
  const [isChange, setIsChange] = useState(false);

  // Pagination state
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Search state
  const [search, setSearch] = useState("");
  const [nullSearch, setNullSearch] = useState(false);

  // Loading feature
  const [isLoading, setIsLoading] = useState(false);

  function refreshPage() {
    window.location.reload(false);
  }

  function getData() {
    axios
      .get("https://outrageous-bat-headscarf.cyclic.app/listbook", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setUser(res.data.user);
        setDatamain(res.data.data.books);
        if ((nullSearch === false && data.length === 0) || (nullSearch === false && isChange === true)) {
          setData(res.data.data.books);
        }
        setLegal(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      })
      .catch((err) => {
        localStorage.clear();
        setRedirect(true);
      });
  }

  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      return <Navigate to="/" />;
    }
    getData();
  }, []);

  const token = localStorage.getItem("token");

  const hapus = (e) => {
    const yakin = window.confirm("Apakah anda yakin ingin menghapus ?");
    if (yakin) {
      if (!token) {
        return <Navigate to="/" />;
      }
      axios
        .post(
          "https://outrageous-bat-headscarf.cyclic.app/deletebook",
          { _id: e.target.value },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          refreshPage();
        })
        .catch((err) => {
          setError(err.data.message);
          setTimeout(() => {
            setError("");
          }, 3000);
        });
    }
  };

  const setChange = (e) => {
    setIsChange(e);
  };

  // Search Feature

  const searchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setNullSearch(false);
  };
  const searchBook = () => {
    const tampung = [];
    Datamain.forEach((e) => {
      let exist = e.deskripsi.toLowerCase().match(`${search.toLowerCase()}`);
      if (exist) {
        tampung.push(e);
      }
    });
    if (tampung.length !== 0) {
      setIsLoading(true);
      setData(tampung);
      setCurrentPage(1);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } else {
      setNullSearch(true);
    }
  };

  // =======================

  // ======================

  // Pagination
  const recordsPerPage = 6;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const npage = Math.ceil(data.length / recordsPerPage);
  let records = data.slice(firstIndex, lastIndex);

  const number = [...Array(npage + 1).keys()].slice(1);
  const prePage = () => {
    setIsLoading(true);
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  const nextPage = () => {
    setIsLoading(true);
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  const changePage = (id) => {
    setIsLoading(true);
    setCurrentPage(id);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  // ============================

  return (
    <Fragment>
      {redirect && <Navigate to="/" />}
      {legal && (
        <div className="row flex-direction-column" style={{ width: "100%", padding: "0", margin: "0" }}>
          {/* HEADER */}
          <Header page="List Book" user={user} navChange={navChange} />
          <div className="col-md-12">
            <div className="d-flex justify-content-center">
              <div className="input-group input-group-lg mb-5 mx-3 d-flex justify-content-center has-validation" style={{ width: "80%" }}>
                <input
                  type="text"
                  value={search}
                  onChange={searchChange}
                  className={`form-control ${nullSearch ? "is-invalid" : ""}`}
                  placeholder="Masukkan buku yang ingin dicari...."
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-lg"
                />
                <button className="btn btn-primary" type="button" id="button-addon2" onClick={searchBook}>
                  Cari Buku
                </button>
                {nullSearch && <div className="invalid-feedback fs-5">Buku yang dicari tidak ditemukan. </div>}
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="row mx-3">
              <div className="col-md-12">
                <div className="row">
                  {error && <div className="alert alert-danger">{error}</div>}
                  {isLoading && <MiniLoadingSpinner />}
                  {isLoading !== true && Datamain.length === 0 && <div className="alert alert-danger text-center">Belum ada buku</div>}
                  {isLoading !== true && Datamain.length !== 0 && records.map((e) => <Card deskripsi={e.deskripsi} id={e._id} hapus={hapus} token={token} setChange={setChange} />)}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="d-flex justify-content-center my-5">
              <ul className="pagination">
                <li className="page-item">
                  <button href="#" className="page-link" onClick={prePage}>
                    Prev
                  </button>
                </li>
                {number.map((n, i) => (
                  <li className={`page-item ${currentPage === n ? "active" : ""}`} key={i}>
                    <button href="#" className="page-link" onClick={() => changePage(n)}>
                      {n}
                    </button>
                  </li>
                ))}
                <li className="page-item">
                  <button href="#" className="page-link" onClick={nextPage}>
                    Next
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Listbook;

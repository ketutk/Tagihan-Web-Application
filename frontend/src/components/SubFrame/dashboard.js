import Header from "../SubComponents/header";
import Cardmain from "../SubComponents/cardmain";
import Activity from "../SubComponents/activity";
import LoadingSpinner from "../SubComponents/loader";

import { useState, useEffect, Fragment } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Dashboard = ({ navChange }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState({});
  const [data, setData] = useState({});
  const [legal, setLegal] = useState(false);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return <Navigate to="/" />;
    }
    setIsLoading(true);
    axios
      .get("https://outrageous-bat-headscarf.cyclic.app/dashboard", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setUser(res.data.user);
        setData(res.data.data.books);
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

  const showRecBook = () => {
    if (data.length === 4) {
      return data.map((e, i) => {
        return <Cardmain deskripsi={e.desc} bookid={e.bookid} />;
      });
    } else {
      const tampung = [];
      for (let i = 0; i < 4; i++) {
        tampung.push(<Cardmain deskripsi={data[i] ? data[i].desc : "NaN"} bookid={data[i] ? data[i].bookid : ""} />);
      }
      return tampung;
    }
  };

  const showActivity = () => {
    if (data.length === 4) {
      return data.map((e, i) => {
        return <Activity desc={e.activity} book={e.desc} date={e.date} time={e.time} bookid={e.bookid} key={i} />;

        // if (data.length < i + 1) {
        //   return <Activity desc={"NaN"} book={"NaN"} date={"NaN"} time={"NaN"} bookid={""} />;
        // } else {
        // }
      });
    } else {
      const tampung = [];
      for (let i = 0; i < 4; i++) {
        tampung.push(<Activity desc={data[i] ? data[i].activity : "NaN"} book={data[i] ? data[i].desc : "NaN"} date={data[i] ? data[i].date : "NaN"} time={data[i] ? data[i].time : "NaN"} bookid={data[i] ? data[i].bookid : ""} />);
      }
      return tampung;
    }
  };

  return (
    <Fragment>
      {redirect && <Navigate to="/" />}
      {isLoading && <LoadingSpinner />}
      {legal && !isLoading && (
        <div className="row flex-direction-column" style={{ width: "100%", padding: "0", margin: "0" }}>
          {/* HEADER */}
          <Header page="Dashboard" user={user} navChange={navChange} />

          {/* BODY */}
          <div className="col-md-12">
            <h4 className="mx-3">Recent Books</h4>
            <div className="row mx-3">
              <div className="col-md-12">
                <div className="row">
                  {showRecBook()}
                  {/* {data.map((e, i) => {
                    if (data.length < i + 1) {
                      return <Cardmain deskripsi={"NaN"} bookid={""} />;
                    } else {
                      return <Cardmain deskripsi={e.desc} bookid={e.bookid} />;
                    }
                  })} */}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <h4 className="mx-3 mt-2">Recent Activity</h4>
            <div className="mt-3 mb-5 mx-3 overflow-x-auto">
              {showActivity()}
              {/* {data.length === 4 &&
                data.map((e, i) => {
                  return <Activity desc={e.activity} book={e.desc} date={e.date} time={e.time} bookid={e.bookid} />;

                  // if (data.length < i + 1) {
                  //   return <Activity desc={"NaN"} book={"NaN"} date={"NaN"} time={"NaN"} bookid={""} />;
                  // } else {
                  // }
                })}
              {function () {
                for (let i = 0; i < 4; i++) {
                  return <Activity desc={data[i] ? data[i].activity : "NaN"} book={data[i] ? data[i].desc : "NaN"} date={data[i] ? data[i].date : "NaN"} time={data[i] ? data[i].time : "NaN"} bookid={data[i] ? data[i].bookid : ""} />;
                }
              }} */}
              {/* {data.length !== 4 &&
                ((<Activity desc={data[0] ? data[0].activity : "NaN"} book={data[0] ? data[0].desc : "NaN"} date={data[0] ? data[0].date : "NaN"} time={data[0] ? data[0].time : "NaN"} bookid={data[0] ? data[0].bookid : ""} />),
                (<Activity desc={data[1] ? data[1].activity : "NaN"} book={data[1] ? data[1].desc : "NaN"} date={data[1] ? data[1].date : "NaN"} time={data[1] ? data[1].time : "NaN"} bookid={data[1] ? data[1].bookid : ""} />),
                (<Activity desc={data[2] ? data[2].activity : "NaN"} book={data[2] ? data[2].desc : "NaN"} date={data[2] ? data[2].date : "NaN"} time={data[2] ? data[2].time : "NaN"} bookid={data[2] ? data[2].bookid : ""} />),
                (<Activity desc={data[3] ? data[3].activity : "NaN"} book={data[3] ? data[3].desc : "NaN"} date={data[3] ? data[3].date : "NaN"} time={data[3] ? data[3].time : "NaN"} bookid={data[3] ? data[3].bookid : ""} />))} */}
            </div>
          </div>
          <div></div>
        </div>
      )}
    </Fragment>
  );
};

export default Dashboard;

import { Link } from "react-router-dom";

const Activity = (props) => {
  return (
    <div className="py-3 my-2" style={{ backgroundColor: "#FAFAFA" }}>
      <div className="d-flex justify-content-between mx-5">
        <div className="px-3 py-2 d-flex text-nowrap justify-content-center" style={{ backgroundColor: "#FC8955", width: "5em" }}>
          <b>{props.desc}</b>
        </div>
        <div className="px-3 py-2 d-flex text-nowrap justify-content-center">
          <b>BOOK : {props.book}</b>
        </div>
        <div className="px-3 py-2 d-flex text-nowrap justify-content-center">
          <b>{props.date}</b>
        </div>
        <div className="px-3 py-2 d-flex text-nowrap justify-content-center">
          <b>{props.time}</b>
        </div>
        <Link to={`/tagihan/${props.bookid}`} style={{ textDecoration: "none" }}>
          <button className="btn btn-primary px-3 py-2 d-flex text-nowrap justify-content-center">Lihat</button>
        </Link>

        {/* <b className="px-3 py-2 d-flex text-nowrap">BOOKS : {props.book}</b>
      <b className="px-3 py-2 d-flex text-nowrap">{props.date}</b>
      <b className="px-3 py-2 d-flex text-nowrap">{props.time}</b>
      <a className="btn px-3 py-2 d-flex text-nowrap text-end" style={{ borderColor: "#0286FF" }}>
        Lihat
      </a> */}
      </div>
    </div>
  );
};

export default Activity;

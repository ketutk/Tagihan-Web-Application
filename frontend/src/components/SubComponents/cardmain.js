import "../../css/cardmain.css";
import { Link } from "react-router-dom";
const Cardmain = (props) => {
  const words = props.deskripsi.split(" ");
  if (words.length !== 2) {
    return (
      <div className="col-md-3 my-3">
        <div className="card cardcss">
          <div className="card-body">
            <h5 className="card-title">{props.deskripsi}</h5>
            <h6 className="card-subtitle mb-2">-</h6>
            <Link to={`/tagihan/${props.bookid}`} style={{ textDecoration: "none" }}>
              <button className="btn">Lihat Tagihan</button>
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="col-md-3 my-3">
        <div className="card cardcss">
          <div className="card-body">
            <h5 className="card-title">{props.deskripsi.split(" ")[0]}</h5>
            <h6 className="card-subtitle mb-2">{props.deskripsi.split(" ")[1]}</h6>
            <Link to={`/tagihan/${props.bookid}`} style={{ textDecoration: "none" }}>
              <button className="btn">Lihat Tagihan</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default Cardmain;

export default function LoadingSpinner() {
  return (
    <div className="d-flex justify-content-center position-relative" style={{ height: "80%" }}>
      <div className="spinner-border text-info position-absolute" style={{ width: "10em", height: "10em", top: "50%", left: "50%", marginTop: "-5em", marginLeft: "-5em" }} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

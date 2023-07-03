export default function LoadingSpinner() {
  return (
    <div className="d-flex justify-content-center position-relative" style={{ height: "80%" }}>
      <div className="spinner-border text-info position-absolute" style={{ width: "10em", height: "10em", top: "40%", left: "40%" }} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

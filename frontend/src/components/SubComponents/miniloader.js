export default function MiniLoadingSpinner() {
  return (
    <div className="d-flex justify-content-center position-relative my-5" style={{ height: "80%" }}>
      <div className="spinner-border text-info position-absolute" style={{ width: "2em", height: "2em", top: "50%", left: "48%" }} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

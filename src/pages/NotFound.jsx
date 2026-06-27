import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container" style={{ textAlign: "center", padding: "6rem 0" }}>
        <span className="eyebrow">404 · empty compartment</span>
        <h1 className="display" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", margin: "1rem 0" }}>
          Nothing in this tray.
        </h1>
        <p className="lede" style={{ marginInline: "auto" }}>
          The page you're looking for isn't on the menu today.
        </p>
        <Link className="btn btn-primary" to="/" style={{ marginTop: "1.5rem" }}>
          Back to the box
        </Link>
      </div>
    </section>
  );
}

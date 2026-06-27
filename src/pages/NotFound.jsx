import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container" style={{ textAlign: "center", padding: "6rem 0" }}>
        <span className="eyebrow">404 · 空の仕切り</span>
        <h1 className="display" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", margin: "1rem 0" }}>
          このトレイには、何もありません。
        </h1>
        <p className="lede" style={{ marginInline: "auto" }}>
          お探しのページは、本日のメニューにありません。
        </p>
        <Link className="btn btn-primary" to="/" style={{ marginTop: "1.5rem" }}>
          箱に戻る
        </Link>
      </div>
    </section>
  );
}

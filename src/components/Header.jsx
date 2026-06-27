import { NavLink, Link } from "react-router-dom";
import { siteConfig } from "../config/siteConfig.js";
import "./header.css";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__bar">
        <Link to="/" className="brand" aria-label={`${siteConfig.brand.name} — home`}>
          <span className="brand__kanji" aria-hidden="true">{siteConfig.brand.kanji}</span>
          <span className="brand__word">{siteConfig.brand.name}</span>
        </Link>

        <nav aria-label="Primary">
          <ul className="nav">
            {siteConfig.nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) => "nav__link" + (isActive ? " is-active" : "")}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <a className="btn btn-primary header-cta" href={`mailto:${siteConfig.contact.email}`}>
          Order a box
        </a>
      </div>
    </header>
  );
}

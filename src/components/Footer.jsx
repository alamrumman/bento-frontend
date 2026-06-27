import { Link } from "react-router-dom";
import { siteConfig } from "../config/siteConfig.js";
import "./footer.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <div className="brand">
            <span className="brand__kanji" aria-hidden="true">{siteConfig.brand.kanji}</span>
            <span className="brand__word">{siteConfig.brand.name}</span>
          </div>
          <p className="site-footer__tag">{siteConfig.brand.description}</p>
        </div>

        <div className="site-footer__col">
          <h4 className="site-footer__h">Site</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>

        <div className="site-footer__col">
          <h4 className="site-footer__h">Legal</h4>
          <ul>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms &amp; Conditions</Link></li>
          </ul>
        </div>

        <div className="site-footer__col">
          <h4 className="site-footer__h">Contact</h4>
          <ul>
            <li>
              <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
            </li>
            <li>
              <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer noopener">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container site-footer__base">
        <span>© {year} {siteConfig.legal.entityName}. All rights reserved.</span>
        <span className="site-footer__kanji" aria-hidden="true">{siteConfig.brand.kanji}</span>
      </div>
    </footer>
  );
}

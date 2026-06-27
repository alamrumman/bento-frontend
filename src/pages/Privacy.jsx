import { useEffect } from "react";
import { siteConfig } from "../config/siteConfig.js";
import "./legal.css";

const SECTIONS = [
  { id: "overview", title: "Overview" },
  { id: "data", title: "Data we collect" },
  { id: "cookies", title: "Cookies & analytics" },
  { id: "thirdparty", title: "Third-party services" },
  { id: "retention", title: "Retention" },
  { id: "rights", title: "Your rights" },
  { id: "contact", title: "Contact" },
];

export default function Privacy() {
  useEffect(() => {
    document.title = `Privacy Policy — ${siteConfig.brand.name}`;
  }, []);

  return (
    <article className="legal">
      <div className="legal__container">
        <header className="legal__header">
          <span className="eyebrow">legal</span>
          <h1 className="legal__title">Privacy Policy</h1>
          <div className="legal__meta">
            <span>Last updated: {siteConfig.legal.lastUpdated}</span>
            <span>{siteConfig.legal.entityName}</span>
          </div>
        </header>

        <nav className="legal__toc" aria-label="Sections">
          <h2>Sections</h2>
          <ol>
            {SECTIONS.map((s) => (
              <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>
            ))}
          </ol>
        </nav>

        <section id="overview">
          <h3>1. Overview</h3>
          <p>
            This Privacy Policy explains how {siteConfig.legal.entityName} ("{siteConfig.brand.name}",
            "we", "us") handles information when you visit our website. We do not operate an
            ecommerce store, account system, or newsletter on this site, so the scope of data we
            handle is intentionally small.
          </p>
        </section>

        <section id="data">
          <h3>2. Data we collect</h3>
          <p>The site itself does not collect personal data from you directly. Specifically:</p>
          <ul>
            <li>No account creation, login, or password storage.</li>
            <li>No newsletter signup form.</li>
            <li>No order or payment form on this site.</li>
          </ul>
          <p>
            If you contact us via the email address {" "}
            <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>, we receive
            your message, email address, and any information you choose to share with us.
          </p>
        </section>

        <section id="cookies">
          <h3>3. Cookies & analytics</h3>
          <p>
            This site does not set marketing or advertising cookies. If we use lightweight,
            privacy-respecting analytics in the future to count anonymous page views, we will
            update this policy and describe the tool here.
          </p>
        </section>

        <section id="thirdparty">
          <h3>4. Third-party services</h3>
          <p>
            We load fonts from Google Fonts to render typography. Loading a Google Fonts
            stylesheet results in a request to <code>fonts.googleapis.com</code> and{" "}
            <code>fonts.gstatic.com</code>. No personally identifiable account information is
            sent in this request from our side.
          </p>
        </section>

        <section id="retention">
          <h3>5. Retention</h3>
          <p>
            Emails you send us are retained for as long as needed to respond to your message and
            for a reasonable period afterwards in our standard inbox. You can request deletion at
            any time using the contact details below.
          </p>
        </section>

        <section id="rights">
          <h3>6. Your rights</h3>
          <p>
            Depending on where you live, you may have rights to access, correct, delete, or
            object to the processing of personal data we hold about you. To exercise these
            rights, contact us at the email address below.
          </p>
        </section>

        <section id="contact">
          <h3>7. Contact</h3>
          <p>
            Questions about this Privacy Policy, or about how we handle your data, can be sent
            to <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.
          </p>
        </section>

        <p className="legal__note">
          This policy is a plain-language template suitable for a small static marketing site
          with no transactional features. It is not a substitute for legal review by counsel in
          your jurisdiction.
        </p>
      </div>
    </article>
  );
}

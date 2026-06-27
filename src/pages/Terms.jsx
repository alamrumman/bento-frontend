import { useEffect } from "react";
import { siteConfig } from "../config/siteConfig.js";
import "./legal.css";

const SECTIONS = [
  { id: "acceptance", title: "Acceptance of terms" },
  { id: "use", title: "Use of the site" },
  { id: "ip", title: "Intellectual property" },
  { id: "thirdparty", title: "Third-party links" },
  { id: "disclaimers", title: "Disclaimers" },
  { id: "liability", title: "Limitation of liability" },
  { id: "changes", title: "Changes" },
  { id: "contact", title: "Contact" },
];

export default function Terms() {
  useEffect(() => {
    document.title = `Terms & Conditions — ${siteConfig.brand.name}`;
  }, []);

  return (
    <article className="legal">
      <div className="legal__container">
        <header className="legal__header">
          <span className="eyebrow">legal</span>
          <h1 className="legal__title">Terms &amp; Conditions</h1>
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

        <section id="acceptance">
          <h3>1. Acceptance of terms</h3>
          <p>
            By accessing or using the {siteConfig.brand.name} website, you agree to be bound by
            these Terms &amp; Conditions. If you do not agree, please do not use the site.
          </p>
        </section>

        <section id="use">
          <h3>2. Use of the site</h3>
          <p>
            This site is provided for informational purposes about the {siteConfig.brand.name}
            {" "}brand and our bento offering. You may browse it freely for personal,
            non-commercial use. You agree not to attempt to disrupt the site's operation,
            scrape it at unreasonable rates, or use it in any way that violates applicable law.
          </p>
        </section>

        <section id="ip">
          <h3>3. Intellectual property</h3>
          <p>
            All content on this site — including the {siteConfig.brand.name} name, marks,
            illustrations, written copy, and design — is owned by{" "}
            {siteConfig.legal.entityName} or its licensors. You may not reproduce, distribute, or
            create derivative works from this content without our prior written permission.
          </p>
        </section>

        <section id="thirdparty">
          <h3>4. Third-party links</h3>
          <p>
            The site may link to third-party websites (for example, social media or font
            providers). We do not control those sites and are not responsible for their content,
            policies, or practices.
          </p>
        </section>

        <section id="disclaimers">
          <h3>5. Disclaimers</h3>
          <p>
            The site is provided "as is" and "as available", without warranties of any kind,
            either express or implied, including but not limited to implied warranties of
            merchantability, fitness for a particular purpose, or non-infringement.
          </p>
        </section>

        <section id="liability">
          <h3>6. Limitation of liability</h3>
          <p>
            To the maximum extent permitted by applicable law, {siteConfig.legal.entityName}{" "}
            will not be liable for any indirect, incidental, special, consequential, or punitive
            damages arising out of or related to your use of, or inability to use, the site.
          </p>
        </section>

        <section id="changes">
          <h3>7. Changes</h3>
          <p>
            We may update these terms from time to time. The "Last updated" date above will
            change whenever we publish a revised version. Continued use of the site after a
            change constitutes acceptance of the updated terms.
          </p>
        </section>

        <section id="contact">
          <h3>8. Contact</h3>
          <p>
            Questions about these terms can be sent to{" "}
            <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.
          </p>
        </section>

        <p className="legal__note">
          These terms are a plain-language template for a small static marketing site without
          transactional features. They are not a substitute for legal review by counsel in your
          jurisdiction.
        </p>
      </div>
    </article>
  );
}

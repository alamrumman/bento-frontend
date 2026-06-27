import { useEffect } from "react";
import { siteConfig } from "../config/siteConfig.js";
import "./about.css";

export default function About() {
  useEffect(() => {
    document.title = `About — ${siteConfig.brand.name}`;
  }, []);

  return (
    <>
      <section className="section about-hero">
        <div className="container about-hero__grid">
          <div>
            <span className="eyebrow">about maru</span>
            <h1 className="display about-title">
              We sell discipline,<br />wrapped as dinner.
            </h1>
            <p className="lede about-lede">
              {siteConfig.brand.name} is a small kitchen with a strong opinion: a meal is more
              honest when it comes with edges. The compartment isn't decoration — it's the
              constraint that makes the food behave.
            </p>
          </div>
          <aside className="about-card">
            <span className="eyebrow">at a glance</span>
            <dl>
              <div><dt>Founded</dt><dd>Tokyo, 2024</dd></div>
              <div><dt>Kitchen</dt><dd>One, by design</dd></div>
              <div><dt>Daily output</dt><dd>~180 bento</dd></div>
              <div><dt>Returnable trays</dt><dd>Yes — every order</dd></div>
            </dl>
            <a className="btn btn-ghost" href={`mailto:${siteConfig.contact.email}`}>
              {siteConfig.contact.email}
            </a>
          </aside>
        </div>
      </section>

      <section className="section section--inset">
        <div className="container about-prose">
          <span className="eyebrow">our story</span>
          <h2 className="h2">A box, on purpose.</h2>
          <div className="prose">
            <p>
              {siteConfig.brand.name} began as a personal logistics problem: a working week of
              meals that were good, balanced, and not negotiable in the moment. The simplest
              answer was the most disciplined one — fix the meal at the kitchen, not at lunch.
            </p>
            <p>
              The first prototype was a black tray, three compartments, three rules: a protein
              with a sauce that wouldn't run, a grain that wouldn't go soft, and a vegetable
              with enough acid to wake you up after lunch. We've changed the menu since. We
              haven't changed the rules.
            </p>
            <p>
              We don't have a CEO-and-founder photo with crossed arms. We have a small kitchen,
              a delivery loop, and an inbox at <a href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}</a>.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container about-grid">
          <div>
            <span className="eyebrow">our promise</span>
            <h2 className="h2">Built once, served the way it was designed.</h2>
          </div>
          <ul className="promise-list">
            <li>
              <span className="promise-list__n">01</span>
              <div>
                <h3 className="h3">Portioning before plating.</h3>
                <p>Every component is weighed and labeled before it touches a tray.</p>
              </div>
            </li>
            <li>
              <span className="promise-list__n">02</span>
              <div>
                <h3 className="h3">No filler.</h3>
                <p>If an ingredient isn't earning its compartment, it isn't in the box.</p>
              </div>
            </li>
            <li>
              <span className="promise-list__n">03</span>
              <div>
                <h3 className="h3">The tray comes back.</h3>
                <p>Returnable, washable, lacquered tray — collected on your next delivery.</p>
              </div>
            </li>
            <li>
              <span className="promise-list__n">04</span>
              <div>
                <h3 className="h3">One menu a day.</h3>
                <p>One kitchen, one menu, made well. No 40-item slop list.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

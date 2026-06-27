import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import BentoBox from "../components/BentoBox.jsx";
import "./home.css";

const BEATS = [
  {
    eyebrow: "01 · introducing maru",
    title: ["Your meal,", "divided."],
    body:
      "Maru bento boxes start as a single, balanced idea — then we draw the lines that make every portion deliberate.",
  },
  {
    eyebrow: "02 · open the lid",
    title: ["A meal you", "can read."],
    body: "Each compartment is labeled, weighed, and named. No guessing, no mixing, no mystery dressing pooled at the bottom.",
  },
  {
    eyebrow: "03 · protein",
    title: ["Salmon", "teriyaki."],
    body: "Wild-caught, glazed with shio-koji and tamari. 32 g of protein, portioned for one.",
  },
  {
    eyebrow: "04 · grains",
    title: ["Short-grain", "sesame rice."],
    body: "Steamed with kombu, finished with toasted sesame. Carbohydrates that earn their place in the box.",
  },
  {
    eyebrow: "05 · vegetables & pickle",
    title: ["Cucumber", "and ume."],
    body: "Salt-cured cucumber and house-pickled plum — acidity, crunch, and the small jolt that ties the meal together.",
  },
  {
    eyebrow: "06 · the whole",
    title: ["丸 — round,", "whole, complete."],
    body: "Three compartments. One balanced meal. Built once, served the way it was designed.",
  },
];

export default function Home() {
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener?.("change", sync);
    return () => mq.removeEventListener?.("change", sync);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const track = trackRef.current;
    if (!track) return;

    let rafId = 0;
    let pending = false;

    const update = () => {
      pending = false;
      const rect = track.getBoundingClientRect();
      const vh = window.innerHeight;
      // total scrollable inside the pinned section
      const scrollable = rect.height - vh;
      const scrolled = -rect.top;
      const p = Math.min(1, Math.max(0, scrolled / scrollable));
      setProgress(p);
    };

    const onScroll = () => {
      if (pending) return;
      pending = true;
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [reduced]);

  // Map progress to an active beat index for copy crossfade
  const beatBounds = [0.0, 0.14, 0.3, 0.48, 0.66, 0.82, 1.0];
  const activeBeat = Math.max(
    0,
    beatBounds.findIndex((b, i) => i > 0 && progress < b) - 1
  );
  const safeActive = activeBeat === -1 ? BEATS.length - 1 : Math.min(BEATS.length - 1, activeBeat);

  return (
    <>
      {/* ---------- HERO SCROLL STORY ---------- */}
      <section
        ref={trackRef}
        className={"scroll-story" + (reduced ? " is-reduced" : "")}
        aria-label="Maru bento — opening sequence"
      >
        {reduced ? (
          <ReducedHero />
        ) : (
          <div className="scroll-stage">
            <div className="container scroll-grid">
              <div className="copy">
                <span className="pill"><span className="dot" />a balanced bento, by design</span>
                {BEATS.map((b, i) => (
                  <div
                    key={i}
                    className={"beat" + (i === safeActive ? " is-active" : "")}
                    aria-hidden={i !== safeActive}
                  >
                    <span className="eyebrow">{b.eyebrow}</span>
                    <h1 className="display hero-title">
                      {b.title.map((line, idx) => (
                        <span key={idx} className="hero-line">{line}</span>
                      ))}
                    </h1>
                    <p className="lede beat__body">{b.body}</p>
                  </div>
                ))}

                <div className="cta-row">
                  <a className="btn btn-primary" href="#compartments">See what's inside</a>
                  <Link className="btn btn-ghost" to="/about">Our story</Link>
                </div>

                <ScrollProgress p={progress} />
              </div>

              <div className="stage">
                <BentoBox progress={progress} />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ---------- COMPARTMENTS / VALUE PROPS ---------- */}
      <section id="compartments" className="section">
        <div className="container">
          <span className="eyebrow">the compartments</span>
          <h2 className="h2 section-h">Three parts. One whole.</h2>
          <p className="lede section-lede">
            Bento isn't a salad bowl with extra steps. It's a discipline — dividing a meal so each
            element keeps its texture, temperature, and intent.
          </p>

          <ul className="compartments">
            <li className="compartment">
              <span className="compartment__tag">protein</span>
              <h3 className="h3">Glazed, never drowned.</h3>
              <p>Sealed in its own quadrant so the soy doesn't run into your rice.</p>
              <span className="compartment__nutri">32g protein · 240 kcal</span>
            </li>
            <li className="compartment">
              <span className="compartment__tag">grains</span>
              <h3 className="h3">Rice with a backbone.</h3>
              <p>Short-grain rice steamed with kombu and finished with toasted sesame.</p>
              <span className="compartment__nutri">48g carbs · 220 kcal</span>
            </li>
            <li className="compartment">
              <span className="compartment__tag">veg / pickle</span>
              <h3 className="h3">Bright on purpose.</h3>
              <p>Salt-cured cucumber and ume to reset your palate between bites.</p>
              <span className="compartment__nutri">9g fiber · 80 kcal</span>
            </li>
          </ul>
        </div>
      </section>

      {/* ---------- BRAND STORY ---------- */}
      <section className="section section--inset">
        <div className="container brand-story">
          <div>
            <span className="eyebrow">the maru idea</span>
            <h2 className="h2">A circle is a constraint.</h2>
          </div>
          <div className="prose">
            <p>
              Maru — 丸 — means whole, complete, rounded off. Not because a meal should be
              everything, but because what's in the box should be enough.
            </p>
            <p>
              We start with three lines drawn in a tray, then we cook to fit. No filler. No
              upsell. No optional dressing sachet you'll throw away.
            </p>
            <p>
              The box is the brief. The brief is the meal.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- VALUES CAROUSEL ---------- */}
      <section className="section">
        <div className="container">
          <div className="values-head">
            <span className="eyebrow">how we work</span>
            <h2 className="h2">Four rules. One box.</h2>
            <p className="lede values-head__lede">
              Four quiet disciplines that show up in every Maru bento — the things you taste
              before you can name them.
            </p>
          </div>
          <ValuesCarousel />
        </div>
      </section>
    </>
  );
}

/* ----- value rule icons ----- */
const IconPortion = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4.5" y="11" width="6" height="14" rx="1.2" />
    <rect x="13" y="5"  width="6" height="20" rx="1.2" />
    <rect x="21.5" y="15" width="6" height="10" rx="1.2" />
    <line x1="3" y1="27" x2="29" y2="27" opacity=".5" />
  </svg>
);
const IconClock = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="16" cy="17" r="10" />
    <path d="M16 10.5 L16 17 L20.5 19.5" />
    <line x1="13" y1="3.5" x2="19" y2="3.5" />
    <line x1="16" y1="3.5" x2="16" y2="7" />
  </svg>
);
const IconRecycle = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 13 A9 9 0 0 1 23 11" />
    <path d="M5 9 L7 13 L11 11" />
    <path d="M25 19 A9 9 0 0 1 9 21" />
    <path d="M27 23 L25 19 L21 21" />
  </svg>
);
const IconNoFiller = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="16" cy="16" r="11" />
    <line x1="8" y1="8" x2="24" y2="24" />
  </svg>
);

/* ----- decorative card illustrations (watermark, bottom-right) ----- */
const ArtPortion = () => (
  <svg viewBox="0 0 160 160" fill="none" stroke="currentColor" strokeWidth="1.4"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {/* tray, three compartments — overhead */}
    <rect x="14" y="40" width="132" height="84" rx="10" />
    <line x1="78" y1="40" x2="78" y2="124" />
    <line x1="78" y1="82" x2="146" y2="82" />
    {/* protein slices in left compartment */}
    <ellipse cx="36" cy="60" rx="16" ry="6" />
    <ellipse cx="52" cy="78" rx="16" ry="6" />
    <ellipse cx="38" cy="96" rx="16" ry="6" />
    <ellipse cx="54" cy="113" rx="14" ry="5" />
    {/* sesame rice — small dots, top right */}
    <g>
      <circle cx="92"  cy="56" r="1.4" fill="currentColor" />
      <circle cx="102" cy="63" r="1.4" fill="currentColor" />
      <circle cx="112" cy="58" r="1.4" fill="currentColor" />
      <circle cx="122" cy="65" r="1.4" fill="currentColor" />
      <circle cx="130" cy="58" r="1.4" fill="currentColor" />
      <circle cx="98"  cy="72" r="1.4" fill="currentColor" />
      <circle cx="118" cy="73" r="1.4" fill="currentColor" />
      <circle cx="132" cy="72" r="1.4" fill="currentColor" />
    </g>
    {/* veg rounds — bottom right */}
    <circle cx="94"  cy="100" r="4.2" />
    <circle cx="110" cy="106" r="4.2" />
    <circle cx="126" cy="100" r="4.2" />
    <circle cx="100" cy="116" r="4.2" />
    <circle cx="120" cy="116" r="4.2" />
    {/* tiny balance/scale icon above tray */}
    <g transform="translate(50 18)">
      <line x1="0" y1="10" x2="44" y2="10" />
      <line x1="22" y1="2" x2="22" y2="14" />
      <path d="M0 10 L6 18 L12 10" strokeWidth="1.1" />
      <path d="M32 10 L38 18 L44 10" strokeWidth="1.1" />
      <line x1="22" y1="0" x2="22" y2="2" />
    </g>
  </svg>
);

const ArtClock = () => (
  <svg viewBox="0 0 160 160" fill="none" stroke="currentColor" strokeWidth="1.4"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {/* horizon hills */}
    <path d="M0 116 Q40 102, 80 110 T160 106 L160 132 L0 132 Z"
          stroke="none" fill="currentColor" opacity="0.18" />
    <line x1="0" y1="116" x2="160" y2="116" />
    {/* far hill outline */}
    <path d="M16 116 Q40 100, 64 110" strokeWidth="1.1" opacity=".7" />
    <path d="M88 110 Q116 100, 144 114" strokeWidth="1.1" opacity=".7" />
    {/* rising sun */}
    <circle cx="80" cy="116" r="32" />
    <line x1="80" y1="116" x2="80" y2="92" strokeWidth="1.2" />
    <path d="M80 92 L84 96 L80 100 L76 96 Z" fill="currentColor" strokeWidth="0" />
    {/* sun rays */}
    <g strokeLinecap="round">
      <line x1="80"  y1="58" x2="80"  y2="50" />
      <line x1="48"  y1="74" x2="42"  y2="68" />
      <line x1="112" y1="74" x2="118" y2="68" />
      <line x1="32"  y1="100" x2="24" y2="100" />
      <line x1="128" y1="100" x2="136" y2="100" />
    </g>
    {/* small cloud */}
    <path d="M28 56 Q34 46, 44 50 Q50 42, 58 50 Q66 56, 56 60 L34 60 Q22 60, 28 56 Z"
          strokeWidth="1.1" />
    {/* time hint */}
    <text x="106" y="20" fontFamily="monospace" fontSize="8"
          fill="currentColor" stroke="none" letterSpacing="2" opacity="0.85">05:00</text>
  </svg>
);

const ArtRecycle = () => (
  <svg viewBox="0 0 160 160" fill="none" stroke="currentColor" strokeWidth="1.4"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {/* outer loop top half */}
    <path d="M80 22 A58 58 0 0 1 138 80" />
    <path d="M138 80 A58 58 0 0 1 80 138" />
    {/* outer loop bottom half (counter for visual rhythm) */}
    <path d="M22 80 A58 58 0 0 1 80 22" strokeDasharray="3 5" />
    <path d="M80 138 A58 58 0 0 1 22 80" strokeDasharray="3 5" />
    {/* arrow heads */}
    <path d="M70 22 L80 22 L80 12" />
    <path d="M90 138 L80 138 L80 148" />
    {/* central mini bento tray */}
    <rect x="52" y="64" width="56" height="32" rx="4" />
    <line x1="80" y1="64" x2="80" y2="96" />
    <line x1="80" y1="80" x2="108" y2="80" />
    {/* small marks inside */}
    <ellipse cx="66" cy="80" rx="6" ry="3" />
    <circle cx="90" cy="72" r="1.5" fill="currentColor" />
    <circle cx="98" cy="72" r="1.5" fill="currentColor" />
    <circle cx="94" cy="88" r="2.5" />
    {/* leaf accent */}
    <g transform="translate(120 116)">
      <path d="M0 6 Q8 -4, 16 4 Q10 12, 0 6 Z" />
      <line x1="8" y1="2" x2="12" y2="6" strokeWidth="0.9" />
    </g>
  </svg>
);

const ArtNoFiller = () => (
  <svg viewBox="0 0 160 160" fill="none" stroke="currentColor" strokeWidth="1.4"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {/* tray */}
    <rect x="14" y="44" width="132" height="74" rx="10" />
    {/* three compartments */}
    <line x1="58" y1="44" x2="58" y2="118" />
    <line x1="102" y1="44" x2="102" y2="118" />
    {/* center compartment: ONE earned ingredient (an oval salmon slice) */}
    <ellipse cx="80" cy="80" rx="16" ry="9" />
    <path d="M68 78 Q80 73, 92 80" strokeWidth="0.9" />
    <path d="M70 84 Q80 80, 92 86" strokeWidth="0.9" />
    {/* center label dash */}
    <line x1="72" y1="100" x2="88" y2="100" strokeWidth="1.1" />
    {/* outer compartments: cross-hatch suggesting "intentionally empty" */}
    <g strokeDasharray="2 3" opacity="0.7">
      <line x1="22" y1="56" x2="50" y2="106" />
      <line x1="50" y1="56" x2="22" y2="106" />
      <line x1="110" y1="56" x2="138" y2="106" />
      <line x1="138" y1="56" x2="110" y2="106" />
    </g>
    {/* label ribbon */}
    <text x="58" y="32" fontFamily="monospace" fontSize="9"
          fill="currentColor" stroke="none" letterSpacing="3" opacity="0.85">ENOUGH</text>
  </svg>
);

/* ----- rotating values drum ----- */
const ROTATE_MS = 3500;

function ValuesCarousel() {
  const items = useMemo(
    () => [
      {
        k: "Portioned",
        v: "Every gram weighed, every compartment labeled. Bento ergonomics before flavor.",
        bullets: [
          "Three compartments, three measured weights",
          "Sealed, never mixed in transit",
          "Same brief, every box",
        ],
        icon: <IconPortion />,
        art:  <ArtPortion />,
      },
      {
        k: "Cooked daily",
        v: "Made in the morning, delivered chilled, eaten same-day. Never reheated yesterday.",
        bullets: [
          "Prep begins at 5 am sharp",
          "Boxes leave the kitchen by 10 am",
          "Eaten same day — no exceptions",
        ],
        icon: <IconClock />,
        art:  <ArtClock />,
      },
      {
        k: "Recycled inside-out",
        v: "The lacquered tray returns on your next delivery — it never sees a landfill.",
        bullets: [
          "Lacquered, dishwasher-safe tray",
          "Collected on your next delivery loop",
          "Zero single-use packaging in the box",
        ],
        icon: <IconRecycle />,
        art:  <ArtRecycle />,
      },
      {
        k: "No filler",
        v: "If an ingredient isn't earning its compartment, it isn't in the box.",
        bullets: [
          "Every ingredient weighed and named",
          "One menu a day, made well",
          "No filler greens, no upsell sachets",
        ],
        icon: <IconNoFiller />,
        art:  <ArtNoFiller />,
      },
    ],
    []
  );

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = items.length;

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % n), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [paused, n]);

  const step = 360 / n;

  return (
    <div
      className={"vcar" + (paused ? " is-paused" : "")}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      style={{ "--rotate-ms": `${ROTATE_MS}ms` }}
    >
      <div className="vcar__head" aria-hidden="true">
        <span className="vcar__counter">
          <strong>{String(active + 1).padStart(2, "0")}</strong>
          <span className="vcar__sep" />
          {String(n).padStart(2, "0")}
        </span>
        <span className="vcar__state">
          <span className="vcar__pulse" />
          {paused ? "Paused" : "Auto · 3.5s"}
        </span>
      </div>

      <div className="vcar__stage">
        <div
          className="vcar__drum"
          style={{ "--rot": `-${active * step}deg` }}
        >
          {items.map((it, i) => (
            <article
              className="vcard"
              key={it.k}
              style={{ "--i": i, "--step": `${step}deg` }}
              aria-hidden={i !== active}
            >
              {/* decorative illustration — sits behind text */}
              <div className="vcard__art" aria-hidden="true">{it.art}</div>

              <div className="vcard__top">
                <div className="vcard__icon">{it.icon}</div>
                <span className="vcard__no">
                  Rule {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                </span>
              </div>
              <h3 className="vcard__title">{it.k}</h3>
              <p className="vcard__body">{it.v}</p>
              <ul className="vcard__list">
                {it.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
              <div className="vcard__ticket">
                <span className="vcard__dash" />
                MARU · QUALITY RULE
                <span className="vcard__ticket-end">No. {String(i + 1).padStart(3, "0")}</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <nav className="vcar__nav" aria-label="Choose a rule">
        {items.map((it, i) => (
          <button
            key={it.k}
            className={"vcar__dot" + (i === active ? " is-active" : "")}
            onClick={() => setActive(i)}
            aria-label={it.k}
            aria-current={i === active ? "true" : undefined}
          />
        ))}
      </nav>
    </div>
  );
}

/* ----- progress indicator ----- */
function ScrollProgress({ p }) {
  return (
    <div className="scroll-progress" aria-hidden="true">
      <span className="scroll-progress__rail">
        <span className="scroll-progress__fill" style={{ transform: `scaleX(${p})` }} />
      </span>
      <span className="scroll-progress__num">{String(Math.round(p * 100)).padStart(2, "0")}</span>
    </div>
  );
}

/* ----- reduced-motion fallback hero ----- */
function ReducedHero() {
  return (
    <div className="container reduced-hero">
      <div>
        <span className="pill"><span className="dot" />a balanced bento, by design</span>
        <span className="eyebrow">introducing maru</span>
        <h1 className="display hero-title">
          <span className="hero-line">Your meal,</span>
          <span className="hero-line">divided.</span>
        </h1>
        <p className="lede">
          Three compartments. One balanced meal. Protein, grains, vegetables — portioned,
          labeled, and built to be eaten the way it was designed.
        </p>
        <div className="cta-row">
          <a className="btn btn-primary" href="#compartments">See what's inside</a>
          <Link className="btn btn-ghost" to="/about">Our story</Link>
        </div>
      </div>
      <div className="stage">
        <BentoBox progress={0.9} />
      </div>
    </div>
  );
}

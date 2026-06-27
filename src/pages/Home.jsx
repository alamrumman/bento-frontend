import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import BentoBox from "../components/BentoBox.jsx";
import "./home.css";

const BEATS = [
  {
    eyebrow: "01 · マルのはじまり",
    title: ["ひと食を、", "きちんと分けて。"],
    body:
      "マルの弁当は、ひとつのバランスから始まります。そこに線を引き、ひとつひとつの分量に意味を持たせる。",
  },
  {
    eyebrow: "02 · 蓋を開ける",
    title: ["読める、", "ひと食。"],
    body: "すべての仕切りに名前と重さがあります。曖昧さも、混ざりも、底に溜まる謎のソースも、ありません。",
  },
  {
    eyebrow: "03 · たんぱく質",
    title: ["鮭の", "照り焼き。"],
    body: "天然ものに、塩麹とたまり醤油で照りを纏わせる。たんぱく質32g、おひとり分の設計。",
  },
  {
    eyebrow: "04 · 主食",
    title: ["短粒の", "ごまご飯。"],
    body: "昆布で炊いて、炒り胡麻で仕上げる。箱の中に居る価値のある、炭水化物です。",
  },
  {
    eyebrow: "05 · 野菜と漬物",
    title: ["きゅうりと、", "梅。"],
    body: "塩漬けのきゅうりと、自家製の梅干し。酸味、食感、そして食事全体をまとめる小さな刺激。",
  },
  {
    eyebrow: "06 · 全体",
    title: ["丸 ― まるく、", "整い、完全に。"],
    body: "三つの仕切り。ひとつのバランスのとれた食事。設計通りに、一度だけ組み立てる。",
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
        aria-label="マル弁当 ― 開封のシークエンス"
      >
        {reduced ? (
          <ReducedHero />
        ) : (
          <div className="scroll-stage">
            <div className="container scroll-grid">
              <div className="copy">
                <span className="pill"><span className="dot" />設計された、バランスの弁当</span>
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
                  <a className="btn btn-primary" href="#compartments">中身を見る</a>
                  <Link className="btn btn-ghost" to="/about">私たちの物語</Link>
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
          <span className="eyebrow">仕切りについて</span>
          <h2 className="h2 section-h">三つの部分。ひとつの全体。</h2>
          <p className="lede section-lede">
            弁当は、サラダボウルの手の込んだ版ではありません。食材の食感、温度、意図を保つために
            食事を分ける ― それが、規律です。
          </p>

          <ul className="compartments">
            <li className="compartment">
              <span className="compartment__tag">たんぱく質</span>
              <h3 className="h3">照りを纏う、溺れない。</h3>
              <p>醤油がご飯に流れないよう、独自の区画で封じ込める。</p>
              <span className="compartment__nutri">たんぱく質 32g · 240 kcal</span>
            </li>
            <li className="compartment">
              <span className="compartment__tag">主食</span>
              <h3 className="h3">芯のある、ご飯。</h3>
              <p>昆布で炊いた短粒米を、炒り胡麻で仕上げる。</p>
              <span className="compartment__nutri">炭水化物 48g · 220 kcal</span>
            </li>
            <li className="compartment">
              <span className="compartment__tag">野菜・漬物</span>
              <h3 className="h3">あえての、鮮やかさ。</h3>
              <p>塩漬けきゅうりと梅で、ひと口の合間に味覚をリセット。</p>
              <span className="compartment__nutri">食物繊維 9g · 80 kcal</span>
            </li>
          </ul>
        </div>
      </section>

      {/* ---------- BRAND STORY ---------- */}
      <section className="section section--inset">
        <div className="container brand-story">
          <div>
            <span className="eyebrow">マルの思想</span>
            <h2 className="h2">円は、制約である。</h2>
          </div>
          <div className="prose">
            <p>
              マル ― 丸 ― は、全体、完成、丸みを帯びた、という意味です。食事がすべてを
              含むべきだから、ではありません。箱の中身が十分であればいい、それだけです。
            </p>
            <p>
              私たちはまず、トレイに三本の線を引きます。それから、それに合わせて料理する。
              詰め物なし。押し売りなし。捨てる運命のドレッシング袋もなし。
            </p>
            <p>
              箱が、指示書。指示書が、食事。
            </p>
          </div>
        </div>
      </section>

      {/* ---------- VALUES CAROUSEL ---------- */}
      <section className="section">
        <div className="container">
          <div className="values-head">
            <span className="eyebrow">私たちの働き方</span>
            <h2 className="h2">四つの規律。ひとつの箱。</h2>
            <p className="lede values-head__lede">
              すべてのマル弁当に現れる、四つの静かな規律 ―
              名前を付ける前に、味で気づくもの。
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
    <text x="98" y="20" fontFamily="monospace" fontSize="8"
          fill="currentColor" stroke="none" letterSpacing="2" opacity="0.85">朝 05:00</text>
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
    <text x="62" y="32" fontFamily="serif" fontSize="14"
          fill="currentColor" stroke="none" letterSpacing="4" opacity="0.85">これで足る</text>
  </svg>
);

/* ----- rotating values drum ----- */
const ROTATE_MS = 3500;

function ValuesCarousel() {
  const items = useMemo(
    () => [
      {
        k: "適量",
        v: "すべてのグラムを計り、すべての仕切りに名前を。味の前に、まず弁当の使い心地を。",
        bullets: [
          "三つの仕切り、三つの計量",
          "密封され、配送中に混ざらない",
          "同じ仕様書、すべての箱に",
        ],
        icon: <IconPortion />,
        art:  <ArtPortion />,
      },
      {
        k: "毎日調理",
        v: "朝に作り、冷蔵で届け、その日のうちに食べる。昨日の温め直しは、ありません。",
        bullets: [
          "仕込みは朝五時きっかりに開始",
          "箱は午前十時までに厨房を出る",
          "その日のうちに ― 例外なく",
        ],
        icon: <IconClock />,
        art:  <ArtClock />,
      },
      {
        k: "内も外も再利用",
        v: "漆塗りのトレイは、次の配送便で回収します。埋立地に行くことは、ありません。",
        bullets: [
          "漆塗り、食洗機対応のトレイ",
          "次回の配送便で回収",
          "箱の中に使い捨て包装は一切なし",
        ],
        icon: <IconRecycle />,
        art:  <ArtRecycle />,
      },
      {
        k: "詰め物なし",
        v: "自分の仕切りに値しない食材は、箱に入れません。",
        bullets: [
          "すべての食材に、重さと名前を",
          "一日、一献立、丁寧に",
          "詰め物の葉物なし、押し売りの袋なし",
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
          {paused ? "一時停止" : "自動 · 3.5秒"}
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
                  規律 {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
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
                マル · 品質規律
                <span className="vcard__ticket-end">第 {String(i + 1).padStart(3, "0")} 号</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <nav className="vcar__nav" aria-label="規律を選ぶ">
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
        <span className="pill"><span className="dot" />設計された、バランスの弁当</span>
        <span className="eyebrow">マルのはじまり</span>
        <h1 className="display hero-title">
          <span className="hero-line">ひと食を、</span>
          <span className="hero-line">きちんと分けて。</span>
        </h1>
        <p className="lede">
          三つの仕切り。ひとつのバランスのとれた食事。たんぱく質、主食、野菜 ―
          計量され、名付けられ、設計通りに食べられるよう組み立てられた。
        </p>
        <div className="cta-row">
          <a className="btn btn-primary" href="#compartments">中身を見る</a>
          <Link className="btn btn-ghost" to="/about">私たちの物語</Link>
        </div>
      </div>
      <div className="stage">
        <BentoBox progress={0.9} />
      </div>
    </div>
  );
}

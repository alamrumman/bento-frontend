import { useMemo } from "react";
import "./bento-box.css";

/* ---------- math ---------- */
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const mapRange = (v, inMin, inMax) => {
  if (inMax === inMin) return 0;
  return clamp((v - inMin) / (inMax - inMin));
};
const lerp = (a, b, t) => a + (b - a) * t;
/* smoothstep — gentle ease on both ends */
const smooth = (t) => t * t * (3 - 2 * t);
/* easeOutBack — overshoot for stamp tickets */
const back = (t) => {
  const c1 = 1.6, c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

/**
 * BentoBox — single SVG scene rotated in CSS 3D.
 * `progress` is 0..1 from the scroll story.
 *
 * Beat windows:
 *  0.00 - 0.14   closed
 *  0.14 - 0.30   lid lifts + tilts
 *  0.30 - 0.48   protein cascade in
 *  0.48 - 0.66   grains cascade in
 *  0.66 - 0.82   vegetables cascade in
 *  0.82 - 1.00   box flattens to top-down + nutrition tally
 */
export default function BentoBox({ progress = 0, label = "マル弁当、アニメーション" }) {
  const p = clamp(progress);

  const lidLift = smooth(mapRange(p, 0.1, 0.3));
  const c1 = back(mapRange(p, 0.28, 0.46));
  const c2 = back(mapRange(p, 0.46, 0.62));
  const c3 = back(mapRange(p, 0.64, 0.8));
  const topDown = smooth(mapRange(p, 0.78, 0.98));
  const tallyIn = smooth(mapRange(p, 0.9, 1.0));

  /* idle micro-motion: floating lid when fully lifted */
  const lidFloat = lidLift > 0.95 && topDown < 0.05 ? 1 : 0;

  /* Each ticket has two anchor points — iso layout vs top-down layout —
     interpolated by `topDown`. Positions are %-of-container. */
  const labels = useMemo(() => {
    const entries = [
      {
        id: 1, name: "たんぱく質", t: c1, hint: "鮭 · 32g",
        iso:  { left: -2, top: 12, rot: -4 },
        flat: { left: -4, top: 42, rot: 0 },
      },
      {
        id: 2, name: "主食", t: c2, hint: "ごまご飯 · 48g",
        iso:  { left: 80, top: 8,  rot:  4 },
        flat: { left: 82, top: 10, rot:  0 },
      },
      {
        id: 3, name: "野菜・漬物", t: c3, hint: "きゅうり · 梅",
        iso:  { left: -2, top: 62, rot: -4 },
        flat: { left: 82, top: 68, rot:  0 },
      },
    ];
    return entries.map((e) => ({
      ...e,
      left: lerp(e.iso.left, e.flat.left, topDown),
      top:  lerp(e.iso.top,  e.flat.top,  topDown),
      rot:  lerp(e.iso.rot,  e.flat.rot,  topDown),
    }));
  }, [c1, c2, c3, topDown]);

  return (
    <figure
      className="bento"
      aria-label={label}
      style={{
        "--p": p,
        "--lid-lift": lidLift,
        "--lid-float": lidFloat,
        "--c1": clamp(c1),
        "--c2": clamp(c2),
        "--c3": clamp(c3),
        "--top-down": topDown,
        "--tally": tallyIn,
      }}
    >
      <div className="bento__scene">
        <div className="bento__stage">
          {/* ambient backdrop glow */}
          <div className="bento__ambient" aria-hidden="true" />

          {/* floor shadow — outside preserve-3d to fake ground */}
          <div className="bento__floor" aria-hidden="true" />

          <div className="bento__box">
            {/* ============ TRAY ============ */}
            <svg
              className="bento__tray"
              viewBox="0 0 520 380"
              role="img"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="trayOuter" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#22281f" />
                  <stop offset="100%" stopColor="#0b0f0a" />
                </linearGradient>
                <linearGradient id="trayInner" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#1a1f17" />
                  <stop offset="100%" stopColor="#0d110a" />
                </linearGradient>
                <linearGradient id="trayRim" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#3b4232" />
                  <stop offset="100%" stopColor="#1a1f15" />
                </linearGradient>

                {/* salmon */}
                <linearGradient id="salmonBase" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#f29677" />
                  <stop offset="100%" stopColor="#c5573a" />
                </linearGradient>
                <linearGradient id="salmonGlaze" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
                  <stop offset="60%" stopColor="rgba(255,255,255,0)" />
                </linearGradient>

                {/* rice */}
                <radialGradient id="riceMound" cx="0.5" cy="0.4" r="0.7">
                  <stop offset="0%" stopColor="#fefaf0" />
                  <stop offset="80%" stopColor="#f3e7c8" />
                  <stop offset="100%" stopColor="#d9c897" />
                </radialGradient>

                {/* veg */}
                <radialGradient id="cucumber" cx="0.5" cy="0.5" r="0.55">
                  <stop offset="0%" stopColor="#cfe1b3" />
                  <stop offset="70%" stopColor="#8da876" />
                  <stop offset="100%" stopColor="#5a7045" />
                </radialGradient>
                <radialGradient id="ume" cx="0.5" cy="0.4" r="0.65">
                  <stop offset="0%" stopColor="#ef7d6a" />
                  <stop offset="100%" stopColor="#a83c2f" />
                </radialGradient>

                <filter id="innerShadow">
                  <feGaussianBlur stdDeviation="3" />
                  <feOffset dx="0" dy="2" result="off" />
                  <feFlood floodColor="#000" floodOpacity="0.45" />
                  <feComposite in2="off" operator="in" />
                  <feComposite in2="SourceGraphic" operator="over" />
                </filter>

                <filter id="softGlow">
                  <feGaussianBlur stdDeviation="5" />
                </filter>

                <clipPath id="cProtein">
                  <rect x="36" y="36" width="216" height="308" rx="12" />
                </clipPath>
                <clipPath id="cGrains">
                  <rect x="268" y="36" width="216" height="148" rx="12" />
                </clipPath>
                <clipPath id="cVeg">
                  <rect x="268" y="196" width="216" height="148" rx="12" />
                </clipPath>
              </defs>

              {/* outer shell + lacquer rim */}
              <rect x="6" y="6" width="508" height="368" rx="28" fill="url(#trayOuter)" />
              <rect x="14" y="14" width="492" height="352" rx="24" fill="none"
                    stroke="url(#trayRim)" strokeWidth="2" />

              {/* inner cavity */}
              <rect x="28" y="28" width="464" height="324" rx="18" fill="url(#trayInner)" />

              {/* divider grooves */}
              <line x1="260" y1="32" x2="260" y2="350" stroke="#0a0d08" strokeWidth="2" />
              <line x1="262" y1="190" x2="488" y2="190" stroke="#0a0d08" strokeWidth="2" />
              <line x1="260" y1="32" x2="260" y2="350" stroke="#4a5340" strokeWidth="1" opacity="0.5" />
              <line x1="262" y1="190" x2="488" y2="190" stroke="#4a5340" strokeWidth="1" opacity="0.5" />

              {/* ====== COMPARTMENT 1 — PROTEIN (5 sashimi slices) ====== */}
              <g className="bento__c bento__c--1" clipPath="url(#cProtein)">
                {/* dark bed */}
                <rect x="36" y="36" width="216" height="308" rx="12" fill="#10130d" />

                {/* slice 1 — top, wide */}
                <g transform="translate(58 54)">
                  <path d="M0 28 Q12 0, 72 2 Q140 6, 156 26 Q150 56, 80 62 Q15 66, 0 50 Z"
                        fill="url(#salmonBase)" />
                  <g stroke="#fff7ea" strokeWidth="1.2" fill="none" opacity=".55" strokeLinecap="round">
                    <path d="M12 30 Q70 24, 148 34" />
                    <path d="M14 40 Q70 36, 148 46" />
                    <path d="M18 50 Q70 48, 144 56" />
                  </g>
                  <path d="M10 26 Q70 6, 152 20 Q140 32, 80 28 Q30 26, 10 34 Z"
                        fill="url(#salmonGlaze)" />
                </g>

                {/* slice 2 — middle */}
                <g transform="translate(62 122)">
                  <path d="M0 26 Q10 0, 66 3 Q132 6, 150 24 Q144 56, 78 62 Q14 66, 0 48 Z"
                        fill="url(#salmonBase)" opacity=".96" />
                  <g stroke="#fff7ea" strokeWidth="1.1" fill="none" opacity=".5" strokeLinecap="round">
                    <path d="M14 28 Q66 24, 144 34" />
                    <path d="M16 40 Q66 38, 142 50" />
                    <path d="M20 52 Q66 50, 138 58" />
                  </g>
                  <path d="M10 24 Q66 6, 148 20 Q132 30, 78 26 Q28 24, 10 30 Z"
                        fill="url(#salmonGlaze)" />
                </g>

                {/* slice 3 — middle-bottom, large */}
                <g transform="translate(58 192)">
                  <path d="M0 28 Q12 0, 72 2 Q140 6, 156 26 Q148 58, 80 62 Q15 65, 0 50 Z"
                        fill="url(#salmonBase)" opacity=".94" />
                  <g stroke="#fff7ea" strokeWidth="1.1" fill="none" opacity=".5" strokeLinecap="round">
                    <path d="M14 30 Q70 26, 146 36" />
                    <path d="M16 42 Q70 38, 144 50" />
                    <path d="M20 52 Q70 50, 140 58" />
                  </g>
                </g>

                {/* slice 4 — bottom left, small */}
                <g transform="translate(48 268)">
                  <path d="M0 18 Q6 0, 38 2 Q72 4, 84 18 Q78 38, 42 42 Q10 44, 0 30 Z"
                        fill="url(#salmonBase)" opacity=".92" />
                  <g stroke="#fff7ea" strokeWidth="1" fill="none" opacity=".5" strokeLinecap="round">
                    <path d="M8 20 Q42 16, 78 24" />
                    <path d="M10 30 Q42 28, 76 34" />
                  </g>
                </g>

                {/* slice 5 — bottom right, small */}
                <g transform="translate(146 268)">
                  <path d="M0 18 Q6 0, 38 2 Q72 4, 84 18 Q78 38, 42 42 Q10 44, 0 30 Z"
                        fill="url(#salmonBase)" opacity=".92" />
                  <g stroke="#fff7ea" strokeWidth="1" fill="none" opacity=".5" strokeLinecap="round">
                    <path d="M8 20 Q42 16, 78 24" />
                    <path d="M10 30 Q42 28, 76 34" />
                  </g>
                </g>

                {/* abundant sesame garnish */}
                <g fill="#f4e2a0">
                  <circle cx="80"  cy="74"  r="1.6" />
                  <circle cx="112" cy="90"  r="1.6" />
                  <circle cx="148" cy="76"  r="1.6" />
                  <circle cx="180" cy="98"  r="1.6" />
                  <circle cx="206" cy="78"  r="1.5" />
                  <circle cx="92"  cy="144" r="1.5" />
                  <circle cx="125" cy="156" r="1.5" />
                  <circle cx="160" cy="146" r="1.5" />
                  <circle cx="195" cy="158" r="1.5" />
                  <circle cx="220" cy="146" r="1.4" />
                  <circle cx="100" cy="218" r="1.5" />
                  <circle cx="138" cy="208" r="1.5" />
                  <circle cx="175" cy="224" r="1.5" />
                  <circle cx="210" cy="212" r="1.4" />
                  <circle cx="72"  cy="288" r="1.3" />
                  <circle cx="168" cy="284" r="1.3" />
                  <circle cx="202" cy="294" r="1.3" />
                </g>

                {/* chive scatter — bottom strip */}
                <g fill="#cfe5a8" stroke="#7c8b6f" strokeWidth=".4">
                  <rect x="60"  y="332" width="18" height="2.5" rx="1.25" transform="rotate(-8 69 333)" />
                  <rect x="100" y="334" width="22" height="2.5" rx="1.25" transform="rotate(12 111 335)" />
                  <rect x="160" y="330" width="20" height="2.5" rx="1.25" transform="rotate(-4 170 331)" />
                  <rect x="200" y="334" width="16" height="2.5" rx="1.25" transform="rotate(8 208 335)" />
                </g>

                {/* inner shadow rim */}
                <rect x="36" y="36" width="216" height="308" rx="12"
                      fill="none" stroke="#000" strokeWidth="6" opacity="0.45"
                      style={{ filter: "blur(4px)" }} />
              </g>

              {/* ====== COMPARTMENT 2 — GRAINS ====== */}
              <g className="bento__c bento__c--2" clipPath="url(#cGrains)">
                <rect x="268" y="36" width="216" height="148" rx="12" fill="#10130d" />

                {/* rice mound */}
                <ellipse cx="376" cy="115" rx="92" ry="58" fill="url(#riceMound)" />
                <ellipse cx="376" cy="105" rx="80" ry="48" fill="#fffdf2" opacity="0.4" />

                {/* sesame seeds */}
                <g fill="#3b3015">
                  {Array.from({ length: 22 }).map((_, i) => {
                    const a = (i * 137.5 * Math.PI) / 180;
                    const r = 8 + (i % 4) * 12;
                    const x = 376 + Math.cos(a) * r;
                    const y = 110 + Math.sin(a) * r * 0.55;
                    return <circle key={i} cx={x} cy={y} r={1.6} />;
                  })}
                </g>

                {/* umeboshi center */}
                <g>
                  <ellipse cx="376" cy="106" rx="11" ry="9" fill="url(#ume)" />
                  <ellipse cx="372" cy="103" rx="3" ry="2" fill="#fff" opacity="0.4" />
                </g>

                {/* nori strip */}
                <rect x="320" y="148" width="112" height="10" rx="2" fill="#1a1f17"
                      transform="rotate(-3 376 153)" />
                <rect x="320" y="148" width="112" height="10" rx="2" fill="#2a3526"
                      transform="rotate(-3 376 153)" opacity="0.4" />

                <rect x="268" y="36" width="216" height="148" rx="12"
                      fill="none" stroke="#000" strokeWidth="6" opacity="0.45"
                      style={{ filter: "blur(4px)" }} />
              </g>

              {/* ====== COMPARTMENT 3 — VEG / PICKLE ====== */}
              <g className="bento__c bento__c--3" clipPath="url(#cVeg)">
                <rect x="268" y="196" width="216" height="148" rx="12" fill="#10130d" />

                {/* cucumber rounds */}
                <g>
                  {[
                    { cx: 308, cy: 232, r: 16 },
                    { cx: 348, cy: 252, r: 17 },
                    { cx: 388, cy: 230, r: 16 },
                    { cx: 428, cy: 250, r: 17 },
                    { cx: 320, cy: 290, r: 15 },
                    { cx: 362, cy: 305, r: 16 },
                    { cx: 402, cy: 292, r: 16 },
                    { cx: 442, cy: 304, r: 15 },
                  ].map((c, i) => (
                    <g key={i}>
                      <circle cx={c.cx} cy={c.cy} r={c.r} fill="url(#cucumber)" />
                      <circle cx={c.cx} cy={c.cy} r={c.r - 3} fill="none"
                              stroke="#cfe1b3" strokeWidth="0.8" opacity="0.7" />
                      {/* seeds */}
                      <circle cx={c.cx - 3} cy={c.cy - 1} r="1.2" fill="#f5f0d5" opacity="0.85" />
                      <circle cx={c.cx + 3} cy={c.cy + 1} r="1.2" fill="#f5f0d5" opacity="0.85" />
                      <circle cx={c.cx} cy={c.cy + 4} r="1.2" fill="#f5f0d5" opacity="0.85" />
                    </g>
                  ))}
                </g>

                {/* pickled ginger sliver */}
                <g fill="#f7d5cf" stroke="#d9a39a" strokeWidth=".5">
                  <path d="M285 320 Q310 314, 332 326 Q322 332, 300 330 Q286 328, 285 320 Z" />
                </g>

                {/* salt sprinkle */}
                <g fill="#fff" opacity="0.6">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <circle key={i}
                            cx={282 + (i * 13) % 196}
                            cy={208 + ((i * 7) % 130)}
                            r=".7" />
                  ))}
                </g>

                <rect x="268" y="196" width="216" height="148" rx="12"
                      fill="none" stroke="#000" strokeWidth="6" opacity="0.45"
                      style={{ filter: "blur(4px)" }} />
              </g>

              {/* top rim highlight */}
              <rect x="14" y="14" width="492" height="14" rx="6"
                    fill="url(#trayRim)" opacity="0.4" />
            </svg>

            {/* ============ STEAM (rises from rice) ============ */}
            <div className="bento__steam" aria-hidden="true">
              <span className="steam steam--1" />
              <span className="steam steam--2" />
              <span className="steam steam--3" />
            </div>

            {/* ============ LID ============ */}
            <svg
              className="bento__lid"
              viewBox="0 0 520 380"
              role="img"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="lidFace" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#fffaee" />
                  <stop offset="55%" stopColor="#f4ebd4" />
                  <stop offset="100%" stopColor="#d9cda7" />
                </linearGradient>
                <linearGradient id="lidEdge" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#e8dec0" />
                  <stop offset="100%" stopColor="#a89a72" />
                </linearGradient>
                <pattern id="linen" width="6" height="6" patternUnits="userSpaceOnUse">
                  <rect width="6" height="6" fill="transparent" />
                  <path d="M0 3 L6 3" stroke="#c0b58e" strokeWidth=".3" opacity=".18" />
                  <path d="M3 0 L3 6" stroke="#c0b58e" strokeWidth=".3" opacity=".18" />
                </pattern>
              </defs>

              {/* lid bottom face (visible only when lifted, slightly inset) */}
              <rect x="14" y="14" width="492" height="352" rx="28" fill="url(#lidEdge)" />
              {/* lid top face */}
              <rect x="10" y="6" width="500" height="352" rx="28" fill="url(#lidFace)" />
              <rect x="10" y="6" width="500" height="352" rx="28" fill="url(#linen)" />

              {/* center kanji stamp */}
              <g transform="translate(260 188)">
                <circle r="56" fill="none" stroke="#c84b31" strokeWidth="2" opacity="0.85" />
                <circle r="56" fill="none" stroke="#c84b31" strokeWidth="0.6" opacity="0.4"
                        strokeDasharray="2 4" transform="scale(1.08)" />
                <text textAnchor="middle" dominantBaseline="central"
                      fontFamily="var(--serif)" fontSize="64" fontWeight="500"
                      fill="#b8401f" opacity="0.92"
                      style={{ fontVariationSettings: '"opsz" 96' }}>
                  丸
                </text>
              </g>

              {/* lid wordmark */}
              <text x="260" y="310" textAnchor="middle"
                    fontFamily="var(--mono)" fontSize="12" letterSpacing="6"
                    fill="#7a6e4c" opacity="0.7">
                M A R U · BENTO
              </text>

              {/* corner ornament */}
              <g stroke="#a89a72" strokeWidth="0.8" fill="none" opacity="0.55">
                <path d="M28 24 L48 24 M28 24 L28 44" />
                <path d="M492 24 L472 24 M492 24 L492 44" />
                <path d="M28 340 L48 340 M28 340 L28 320" />
                <path d="M492 340 L472 340 M492 340 L492 320" />
              </g>

              {/* subtle highlight on top edge */}
              <rect x="20" y="10" width="480" height="6" rx="3"
                    fill="#ffffff" opacity="0.5" />
            </svg>
          </div>
        </div>

        {/* ============ NUTRITION TALLY (final beat) ============
           Lives INSIDE bento__scene so it's bounded by the 3D stage area —
           on mobile, the tickets reflow below the scene and the tally never
           overlaps them. */}
        <div className="bento__tally" aria-hidden="true">
          <div className="tally__row">
            <span className="tally__k">たんぱく質</span>
            <span className="tally__v">32g</span>
          </div>
          <div className="tally__row">
            <span className="tally__k">炭水化物</span>
            <span className="tally__v">48g</span>
          </div>
          <div className="tally__row">
            <span className="tally__k">食物繊維</span>
            <span className="tally__v">9g</span>
          </div>
          <div className="tally__row tally__row--total">
            <span className="tally__k">合計</span>
            <span className="tally__v">540 kcal</span>
          </div>
        </div>
      </div>

      {/* ============ FLOATING TICKETS ============ */}
      <div className="bento__tickets" aria-hidden="true">
        {labels.map((l) => (
          <span
            key={l.id}
            className="ticket"
            style={{
              "--t": clamp(l.t),
              "--rot": `${l.rot}deg`,
              left: `${l.left}%`,
              top: `${l.top}%`,
            }}
          >
            <span className="ticket__bar" />
            <span className="ticket__name">{l.name}</span>
            <span className="ticket__hint">{l.hint}</span>
          </span>
        ))}
      </div>
    </figure>
  );
}

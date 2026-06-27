# Product Requirements Document

## Maru — Bento Box Brand Landing Site

**Version:** 1.0
**Status:** Draft for review
**Type:** Pure frontend, static marketing site (no backend, no auth, no cart)

---

## 1. Overview

### 1.1 Summary

A marketing landing site for **Maru**, a modern healthy meal-prep bento box brand. The centerpiece is a scroll-driven hero "story" in which an illustrated bento box opens, rotates, and reveals its compartments as the user scrolls — inspired by Apple-style product scroll narratives, reinterpreted through the lens of Japanese bento culture (precision portioning, compartmentalization, labeling).

### 1.2 Goals

- Communicate the brand's core idea — a meal divided into deliberate, balanced parts — through the hero motion itself, not just copy.
- Deliver a fast, GPU-friendly scroll animation built without 3D renders or photography (none are available).
- Ship a small, maintainable static site: 4 pages, one shared config for brand-wide values (starting with contact email).
- Avoid templated "wellness SaaS" or "AI-generated default" visual patterns (see Design Direction).

### 1.3 Non-Goals

- No ecommerce, cart, checkout, or login (explicitly out of scope; confirmed pure marketing site).
- No CMS or backend. No newsletter-to-CRM integration.
- No real product photography or 3D/WebGL model — box is illustrated (SVG/CSS).

---

## 2. Brand Direction

### 2.1 Identity

- **Name:** Maru (丸) — "circle / whole, complete." Reinforces the idea of a complete, balanced meal.
- **Theme:** Light theme only.
- **Conceptual anchor:** Bento-ness comes from compartmentalization and precise portioning, not just "healthy food in a box." Design language (grid, labeling, dividers) should visually express portioning and division, not generic wellness-brand styling.

### 2.2 Design Tokens (draft — confirm before build)

**Color**
| Token | Hex | Use |
|---|---|---|
| Rice paper (bg) | `#FAF7F0` | Background |
| Nori ink (text) | `#1F2620` | Primary text, high-contrast elements |
| Pickled ginger (accent) | `#C84B31` | Signature accent — used sparingly (CTAs, key highlights) |
| Matcha (secondary) | `#7C8B6F` | Compartment labels, dividers, secondary UI |
| Egg yolk (tertiary) | `#E8C468` | Rare highlight / spotlight moments only |
| Lacquer beige (border) | `#D8D2C2` | Borders, dividers, tray-edge motifs |

**Type**
| Role | Typeface | Notes |
|---|---|---|
| Display | Fraunces | Headlines; warm, high-contrast serif with optical sizing — avoids generic sans-only hierarchy |
| Body | Inter or General Sans | Body copy, readability at small sizes |
| Utility / labels | Space Mono or JetBrains Mono | Compartment tags, nutrition callouts — "label printer / receipt" feel |

**Signature element**
The bento box itself: layered SVG, independently animatable compartments, soft per-panel drop shadows, subtle paper/lacquer texture. Compartments open like drawers; labels arrive with a stamped "kitchen ticket" snap (slight overshoot) — the one deliberate moment of motion personality, kept distinct from the otherwise calm, precise rest of the page.

### 2.3 What we are deliberately avoiding

- Cream background + terracotta accent + generic high-contrast serif (current AI-default look #1).
- Sage/mint "wellness SaaS" palette and soft-rounded card design.
- Numbered step markers used as decoration rather than real sequence information.

---

## 3. Site Structure

| Page               | Path       | Purpose                                                                                                     |
| ------------------ | ---------- | ----------------------------------------------------------------------------------------------------------- |
| Home               | `/`        | Hero scroll story + supporting marketing content (product story, compartments breakdown, brand value props) |
| About Us           | `/about`   | Brand story, mission, founders/team (placeholder copy unless supplied)                                      |
| Privacy Policy     | `/privacy` | Standard privacy policy                                                                                     |
| Terms & Conditions | `/terms`   | Standard terms of service                                                                                   |

No Menu/Products or Contact page in v1 (confirmed). Contact email surfaces in footer and legal pages via shared config (see §5).

---

## 4. Hero Scroll Story — Functional Spec

### 4.1 Concept

On load, a closed bento box sits centered in the viewport. As the user scrolls through the hero section, the box is **pinned** (sticky) while a scroll-linked timeline drives its animation: lid removal, rotation, and sequential reveal of compartments. Supporting copy/labels animate in alongside each beat. Once the sequence completes, normal page scroll resumes into the next section.

### 4.2 Beat Sequence (6 beats)

| Beat | Box state                                           | Supporting content                                            |
| ---- | --------------------------------------------------- | ------------------------------------------------------------- |
| 1    | Closed box, centered, lid on                        | Eyebrow + headline: brand intro ("Maru — your meal, divided") |
| 2    | Lid lifts and tilts back                            | Transitional copy                                             |
| 3    | Rotate to reveal compartment 1 (protein)            | Label tag stamps in, short descriptor                         |
| 4    | Rotate to reveal compartment 2 (grains)             | Label tag stamps in                                           |
| 5    | Rotate to reveal compartment 3 (vegetables/pickles) | Label tag stamps in                                           |
| 6    | Full top-down open view, all compartments labeled   | Nutrition totals tally up; transitions into rest of page      |

### 4.3 Mechanism Diagram

The bento box stays fixed in a pinned viewport. Scroll position alone drives which
beat is active — the box itself never moves down the page with the user; only its
internal state (lid, rotation, open compartments) changes as scroll progress advances.

```
   scroll
     |
     v
 ┌─────────┐
 │ beat 1  │  closed box
 └────┬────┘
      |
      v
 ┌─────────┐
 │ beat 2  │  lid lifts back
 └────┬────┘
      |
      v
 ┌─────────┐
 │ beat 3-5│  rotate, reveal each compartment
 │         │  (protein -> grains -> vegetables)
 └────┬────┘
      |
      v
 ┌─────────┐
 │ beat 6  │  full top-down view, all labeled
 └─────────┘

      PINNED HERO VIEWPORT (right side, fixed during sequence)
      ┌───────────────────────────────────┐
      │                                   │
      │     box stays visually fixed      │
      │     ( only state changes )        │
      │                                   │
      │   label tags stamp in per beat,   │
      │   kitchen-ticket style e.g.       │
      │   [ PROTEIN ]                     │
      │                                   │
      └───────────────────────────────────┘
        scroll progress (0-100%) drives:
        - which beat is "active"
        - lid/rotation/compartment state
        - which label tag is stamped in
```

### 4.4 Technical approach (no build yet — for planning)

- Box constructed as SVG (or layered CSS/SVG hybrid), not raster images — keeps it crisp at any size and animatable per-part.
- Scroll-linked animation driven by transform/opacity only (no layout-thrashing properties) for GPU-friendly performance.
- Pinning achieved via sticky positioning + scroll-progress calculation (library choice TBD at build time — e.g. native scroll-driven animations, or a lightweight scroll library).
- `prefers-reduced-motion` must be respected: reduced-motion users get a simplified, non-pinned fallback (e.g. static image states or fade transitions instead of scroll-scrubbed motion).
- Mobile: pinned scroll storytelling needs a simplified beat count or interaction model on small viewports — to be addressed at build time, not skipped.

---

## 5. Shared Configuration Requirement

### 5.1 Single source of truth for brand-wide values

A shared config (e.g. `siteConfig.ts` / `brand.config.json`) holds values referenced across multiple pages so they update in one place:

- **Contact/support email** — appears in footer (sitewide), About page, Privacy Policy, Terms & Conditions.
- Extensible later to other shared values (social links, brand name string, etc.) without changing the requirement's intent: one edit, every usage updates.

### 5.2 Explicitly out of scope for this requirement

- No newsletter signup-to-CRM sync (would require a backend; site is pure frontend/static).
- No user-submitted data persistence of any kind.

---

## 6. Page Content Requirements

### 6.1 Home

- Hero scroll story (§4)
- Post-hero sections: brand story snippet, compartment/portioning value proposition, supporting visuals consistent with the illustrated bento system
- Footer with sitewide nav, contact email (from shared config), links to About/Privacy/Terms

### 6.2 About Us

- Brand mission and story
- Placeholder copy to be supplied or drafted collaboratively (no real founder/company info provided yet)

### 6.3 Privacy Policy

- Standard sections: data collected, cookies/analytics (if any), third-party services, user rights, contact for privacy inquiries (via shared config email)
- Placeholder/template legal language — **not a substitute for actual legal review**

### 6.4 Terms & Conditions

- Standard sections: acceptance of terms, use of site, intellectual property, disclaimers, limitation of liability, contact (via shared config email)
- Placeholder/template legal language — **not a substitute for actual legal review**

---

## 7. Non-Functional Requirements

- **Performance:** Hero animation must run smoothly (target 60fps) using transform/opacity-only animations; avoid layout-triggering properties during scroll.
- **Responsiveness:** Full responsive support down to mobile; hero story adapts (simplified if needed) rather than breaking.
- **Accessibility:** Keyboard focus visible; `prefers-reduced-motion` respected with a real fallback experience, not just disabled animation.
- **Stack:** Pure frontend, static-deployable (no server required at runtime).

---

_This PRD reflects decisions made through requirements discussion. Visual direction in §2 is a proposed starting point pending explicit sign-off before implementation begins._

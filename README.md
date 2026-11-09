# PawPath Pet Travel - React & Tailwind CSS Demo

A pet-travel and live pet-tracking demo website built with **React**, **Vite**, and **Tailwind CSS**.

> **Demo project.** PawPath Pet Travel is a fictional brand. Contact details are placeholders and tracking codes are sample data; this is not a real service.

---

## 🐾 Features & Architecture

- **Design & Brand Identity**:
  - Exact brand colors: Coral (`#f97362`, `#e85a48`), Teal (`#0f766e`, `#0b4f4a`, `#08332f`), Warm Cream (`#fff8f1`), and Ink (`#17302d`).
  - Typography: Google Fonts **Fredoka**, **Nunito**, and **Nunito Sans** with exact optical weights and letter-spacing.
  - Custom SVG paw icon logo and badges for the PawPath brand.

- **Interactive Header & Navigation**:
  - Frosted glass floating navbar with scroll detection (`scrolled` state adjusts opacity, backdrop blur, and dark teal glass).
  - Multi-level dropdown menus for **Services** (Air, Road, International, Vet Paperwork, Quarantine, Boarding, Crates) and **Company** (About, Careers, Blog, FAQ, Reunions).
  - Responsive mobile drawer (`mnav`) with quick pet tracking search, categorized links, and direct hotline contact.

- **Hero & Live Pet Card**:
  - Full-bleed background with layered linear/radial gradient overlays.
  - Interactive tracking search form with paw action button.
  - Floating live pet card (`Bella`) with live pulsing beacon, animated flight line, status badge, and handler photo updates.

- **Value Proposition Promise Bar**:
  - Overlapping elevated frosted glass bar highlighting the 4 core promises: *One coordinator*, *Photo updates*, *Vet paperwork handled*, and *Live tracking*.

- **Services Bento Grid**:
  - 12-column bento layout featuring all 6 services with card zoom hover animations, photo backdrops, and solid gradient accents.

- **How It Works**:
  - 4-step calm journey progression in warm rounded container with coral step highlight.

- **Live Pet Tracking Showcase**:
  - Real-time 3-column dashboard:
    1. **Pet Profile**: Max (German Shepherd, 6 yrs, 38 kg, verified status, crate & papers).
    2. **Interactive Route Map**: Flight route from London (LHR) to Melbourne (MEL) via Dubai (DXB) and Singapore (SIN) with animated active leg and live status bar.
    3. **Care Updates Feed**: Real-time events logged by handlers with photo thumbnails and timestamps.

- **Who We Help & Verified Reviews**:
  - 2x2 ruled list with icons for Families, Military/Diplomatic, Expats, and Breeders.
  - 5-star testimonials with client quotes and route details.

- **Free Quote Banner & Interactive Modals**:
  - Full-width quote calculator banner with instant validation.
  - Interactive **Live Track Modal**: Search any tracking code (e.g. `PPT-84SW-AR8D-QK3Z`) to view full journey timeline, checkpoints, and handler gallery.
  - Interactive **Quote Modal**: Request a custom pet travel itinerary from any CTA on the page.

- **Floating Action Button (FAB)**:
  - Bottom-right coral contact hub with shortcuts to call, WhatsApp (`wa.me/15550100199 placeholder`), email, and instant pet tracking.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The site will run at `http://localhost:3000` (or `http://localhost:5173`).

### 3. Build for Production
```bash
npm run build
```
Generates the optimized production build in `dist/`.

---

## 📂 Project Structure

```
├── public/
│   ├── assets/img/             # Local images (pt-air, pt-hero-m, pt-reunion, etc.)
├── src/
│   ├── components/
│   │   ├── PawIcon.jsx         # Signature Paw print SVG icon
│   │   ├── Navbar.jsx          # Glass navbar + dropdowns + mobile drawer
│   │   ├── Hero.jsx            # Hero section with live pet card & search
│   │   ├── PromiseBar.jsx      # 4-item frosted glass promise bar
│   │   ├── ServicesBento.jsx   # 6-card services bento grid
│   │   ├── HowItWorks.jsx      # 4-step process section
│   │   ├── TrackingShowcase.jsx# 3-column tracking dashboard & route map
│   │   ├── WhoWeHelp.jsx       # 2-column ruled list of customer groups
│   │   ├── Reviews.jsx         # 5-star verified pet owner testimonials
│   │   ├── QuoteBanner.jsx     # Quote calculator section
│   │   ├── Footer.jsx          # Dark teal footer with newsletter & links
│   │   ├── FloatingContact.jsx # Floating action button & contact popover
│   │   ├── TrackModal.jsx      # Interactive live pet tracking modal
│   │   └── QuoteModal.jsx      # Instant travel quote modal
│   ├── App.jsx                 # Main application layout
│   ├── index.css               # Tailwind CSS & custom glassmorphism styles
│   └── main.jsx                # React root mount
├── index.html                  # Root HTML template with preloaded fonts
├── tailwind.config.js          # Custom colors, fonts, and animation configs
├── vite.config.js              # Vite configuration
└── package.json
```


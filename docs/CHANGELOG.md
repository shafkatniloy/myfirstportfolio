# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.3.0] — Apple Liquid Glass UI, Decoupled Architecture & Polish (Current)

### Added
- **True Refractive 3D Liquid Glass Architecture (`liquid-glass-ui` skill):**
  - Integrated full 4-layer optical physics implementation:
    1. **Low-Blur Optical Refraction:** Reduced blur to crisp `3.5px` with `saturate(165%)` and `contrast(104%)` so background elements clearly refract rather than blur.
    2. **Edge-Only Bezel Displacement Map:** Hidden SVG filters (`#liquid-lens-filter`, `#liquid-lens-bar`, `#liquid-lens-orb`) driven by offscreen Canvas-generated normal maps in `assets/js/main.js` that stretch pixels only along curved borders.
    3. **Stacked 3D Inner Volume:** Layered `inset` box shadows for top specular rim, bottom curved depth shadow, inner ambient glow, and elevation shadow.
    4. **Directional Specular Lighting & Active 3D Droplet:** Multi-tiered borders (bright top, subtle bottom) and active nav pills styled as convex top-lit water droplets (`radial-gradient` with dual inset rim highlights).
  - Cross-browser graceful fallback for Safari/Firefox (`blur(12px) saturate(180%)`).
- **Apple Liquid Glass Design System Overhaul:**
  - Transitioned the entire UI to an Apple visionOS / iOS "Liquid Glass" design language.
  - Hyper-translucent luminous surfaces with optical refraction (`backdrop-filter: blur(28px) saturate(210%)` / `-webkit-backdrop-filter`).
  - Tuned crystal glass background fills (`rgba(255, 255, 255, 0.38)` in light mode, `rgba(18, 20, 29, 0.38)` in dark mode).
  - Razor-sharp dual specular rim highlights (`inset 0 1.5px 0 0 rgba(255, 255, 255, 0.95)` top highlight and `inset 0 -1px 0 0 rgba(255, 255, 255, 0.35)` caustic bounce).
  - **Floating Dynamic Island Capsule Navbar:** Floating 14px from top edge with pill curvature (`border-radius: 9999px`), max width 1140px, specular reflection sheen (`::before`), and responsive mobile drawer integration.
  - **Liquid Physics & Spring Transitions:** Apple-style spring cubic bezier (`cubic-bezier(0.16, 1, 0.3, 1)`) on buttons, cards, social icons, and floating controls.
  - Added dedicated header spacing (`padding-top: 125px`) to prevent floating capsule navbar overlap with hero intro text.
- **Eye-Soothing Ambient Aurora Hero Section:**
  - Modern dual-column layout replacing legacy static background photo.
  - Theme-adaptive ambient radial glow (`::before` / `::after` aurora effects).
  - Floating glass portrait avatar card (`.hero-avatar-card`) with animated floating micro-badges (`Specialist 1437` and `1,500+ Solved`).
  - Professional cropped portrait avatar with centered head-and-shoulders framing.
- **Undergraduate Thesis Direct Paper Link:**
  - Added direct link to the thesis paper on Google Drive (`https://drive.google.com/file/d/131T7xRat_Lf8NZ7WwlqTMygQengB0CFq/view`).
  - Added dedicated "View Paper" action button and interactive card hover styling.

### Changed
- **Decoupled from Meyawo Template Branding:**
  - Completely purged all legacy Meyawo template comments, metadata, and references across all files.
  - Renamed `assets/css/meyawo.css` $\rightarrow$ `assets/css/base.css`.
  - Renamed `assets/js/meyawo.js` $\rightarrow$ `assets/js/main.js`.
  - Renamed `assets/scss/meyawo.scss` $\rightarrow$ `assets/scss/base.scss`.
  - Updated stylesheet and script references in `index.html`, `thankyou.html`, and `components.html`.
- **Contact Form Asynchronous AJAX Upgrade:**
  - Modernized submission via FormSubmit AJAX endpoint (`https://formsubmit.co/ajax/shafkatniloy119@gmail.com`).
  - Added live spinning button state (`Sending...`) and disabled multi-click protection.
  - Added in-page frosted glass success and error alerts (`.glass-alert`).
  - Added hidden honeypot spam protection (`_honey`) to prevent intrusive reCAPTCHA prompts.
  - Built-in `file:///` local protocol detection with one-click direct email fallback.
- **Streamlined Content & Clean Flow:**
  - Removed fictional testimonials section (Sir Albert Einstein and Catwoman).
  - Removed redundant "Want to work with me? / Hire Me" banner.
  - Removed ChatGPT mini-game launcher container from bottom of home page.
  - Restored full horizontal desktop navbar with frosted glass hover pills.
- **Comprehensive Mobile Viewport Polish:**
  - Added global `overflow-x: hidden` and `max-width: 100vw` to eliminate mobile horizontal scroll jitter.
  - Preserved compact 2x2 dashboard grid for Quick Stats on narrow mobile viewports (`< 480px`).
  - Set 16px font size on contact form inputs to prevent automatic iOS Safari zooming.
  - Centered about section slideshow image on mobile screens.

### Fixed
- **Bottom-Left Floating Theme Palette Dropdown:**
  - Resolved visibility bug where clicking `#floatingPaletteToggleBtn` was unresponsive.
  - Fixed container clipping caused by `overflow: hidden` on `.floating-glass-bar`, changing to `overflow: visible !important`.
  - Configured upward-opening popover positioning (`bottom: calc(100% + 14px)`) with smooth fluid upward animation (`@keyframes fadeInUp`) and clean centering above the quick-action pill.
  - Cleaned up inline style overrides on `#floatingPaletteDropdown`.
- **LinkedIn Profile URL:** Corrected username slug to `safkat-islam-niloy-40423924b` across `index.html` and `thankyou.html`.

---

## [1.2.0] — Resume Sync & UI Modernization

### Added
- **Competitive Programming & Contests Section (`#contests`):**
  - Online judge cards for Codeforces (Specialist, Max Rating: 1437) and CodeChef (3-Star, Max Rating: 1632).
  - 8+ Onsite contest achievements with status badges:
    - 🥇 1st Place | 3rd NSTU National Science Fest 2024 (Solved 6 problems)
    - 🥈 4th Rank | CoU CSE Fest 2025 IUPC Divisional (Solved 6 problems)
    - 🥉 3rd Rank | ICE-TechCombat 2023 Senior Segment (Solved 4 problems)
    - 🏅 12th Rank | IIUC Tech Fest 2025 (Solved 6 problems)
    - 🏅 13th Rank | NWU CSE Fest 2025
    - 🏅 33rd Rank | MU CSE Fest 2025
    - 🏅 69th Rank | Uttara University IUPC 2025 & AUST IUPC 2025
    - Representation across 6 national IUPC competitions
- **Featured Projects & Research Section (`#portfolio`):**
  - `ShopSphere.API` — Layered ASP.NET Core e-commerce RESTful API (Domain/App/Infra/API, EF Core, Repository/Unit of Work, JWT, Swagger, AutoMapper).
  - `Courier Management System` — Full-stack PHP, SQL, and AJAX tracking system.
  - `Undergraduate Thesis` — Multi-Label Chest X-Ray Classification with Frontal–Lateral Fusion, Grad-CAM, and BiomedCLIP zero-shot evaluation.
- **Training & Co-Curricular Activities Section (`#activities`):**
  - Public Relations Secretary — CSTE Club, NSTU (2024–25 Committee).
  - Problem Setter — NSTU Intra University Programming Contest 2026.
  - Problem Setter — 4th NSTU National Science Fest 2026.
  - Programming Instructor & Junior Batch Lab Assistant.
- **Modern UI Components & Glassmorphism:**
  - Complete **Glass UI** overhaul using frosted-glass aesthetics (`backdrop-filter: blur(16px)`), translucent glass backgrounds, delicate borders, and layered shadows across all cards, containers, and navigation.
  - **Dark Mode System:** Smooth dark/light mode toggle with automatic `prefers-color-scheme` detection and persistent state stored in `localStorage`.
  - **Dynamic Theme Color Switcher:** Custom color palette picker featuring 6 selectable accent themes (Royal Purple, Electric Blue, Emerald Green, Ruby Rose, Sunset Amber, Cyber Cyan) driven by CSS variables and persisted in `localStorage`.
  - Dual access controls: integrated directly into the **top Navbar** and via a sleek **Floating Glass Quick-Switch Bar** at the bottom-left.
  - Responsive **Quick Stats Counter Bar** (1,500+ problems solved, Specialist 1437, 3-Star 1632, 3.65 CGPA).
  - **Floating Back-to-Top Button** with smooth animated scrolling.
  - **Interactive Slideshow Dots:** Allows manual slide selection in addition to automatic cycling.
  - **Direct Contact Badges:** Clickable email, phone (`+8801407383051`), and location (Dhaka, Bangladesh) badges.

### Changed
- **Compact Viewport & Proportional Scaling:**
  - Scaled base root font size to `14.5px` to eliminate the overly "zoomed-in" appearance and reduce vertical scrolling depth by ~40-50%.
  - Reduced section padding from `70px` to `36px` and section title margins from `4rem` to `1.25rem`, preventing excessive empty vertical gaps.
  - Balanced Hero header min-height (`56vh` vs `100vh`) and responsive title scaling, ensuring below-the-fold content is intuitively accessible.
  - Consolidated and compact-tuned all Glass UI component cards (Stats, Education, Skills, Contests, Projects, Activities, Blog, Testimonials, Contact), removing conflicting duplicate CSS blocks.
  - Replaced oversized `15vh` empty spacer with clean `18px` padding on the game launcher button row.
  - Enhanced footer contrast and text visibility for dark mode (`var(--text-muted)`).
- **Recent Posts / Blog Section:**
  - Featured actual written Facebook posts by Safkat Niloy with direct Facebook post links, reaction counters, and author attribution.
  - Added **"ধ্রুবান্ত-১৬: আমার ফেয়ারওয়েল"** (CSTE 16th Batch Farewell reflection with real invitation image and 77 reactions).
  - Maintained **"বাংলাদেশের আজকের হারটা কোনো ভাবেই মানতে পারতেসি না"** (Cricket match analysis).
  - Added direct link button to personal Facebook timeline (`@niloy.119`).
- **Skills Section:** Re-architected into 4 core areas (Languages, Backend & .NET, Web & Tools, Databases & Architecture) with modern pill badges.
- **Education Section:** Ordered in reverse chronological sequence (NSTU $\rightarrow$ College $\rightarrow$ School) with CGPA badge.
- **Navbar:** Added direct navigation links for Education, Skills, Contests, Projects, and Activities; mobile menu now automatically dismisses upon tapping any link.
- **Navbar Styling:** Added modern backdrop blur (`backdrop-filter: blur(14px)`) when scrolled.

### Fixed
- **Netlify Continuous Deployment Sync:** Fixed Netlify automatic build triggering by synchronizing the remote `master` branch with `main` (`git push origin main:master`), aligning with Netlify's configured production branch.
- Fixed unclosed quotation marks and duplicate `class` attributes in project screenshots.
- Fixed mismatched HTML tags (`<h4>` opened with `</h5>` closed in project headers).
- Fixed duplicate IDs (`id="service"` and `id="contact"` were each used in two separate sections).
- Fixed invalid CSS property computation (`height: 254*1.2px;` in card styles).
- Corrected typos (`COMPETETIVE`, `PASSONATE`, `beleive`, `requried`, `Testmonial`).

---

## [1.1.0] — Initial Netlify Deployment

### Added
- Browser mini-game (`game/`) — "Catch the Falling Object" built with JavaScript.
- Social media buttons section (Facebook, LinkedIn, Instagram, GitHub, Codeforces).
- Visit counter via hitwebcounter.
- `thankyou.html` — confirmation page after contact form submission.
- Project documentation in `docs/` (`CHANGELOG.md`, `CONTRIBUTING.md`, `LICENSE.md`, `PROJECT_STRUCTURE.md`) and root `README.md`.

### Changed
- Profile section cycles through multiple photos using a dot-indicator slideshow.
- Contact form redirects to deployed `thankyou.html` on Netlify.

---

## [1.0.0] — Initial Release

### Added
- `index.html` — main single-page portfolio with basic sections.
- `assets/css/base.css` — Bootstrap baseline theme.
- `assets/css/style.css` — custom portfolio styles.
- `assets/js/main.js` — navigation toggle and slideshow.
- `components.html` — UI component reference page.

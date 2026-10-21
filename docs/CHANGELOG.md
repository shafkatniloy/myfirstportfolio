# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.2.0] — Resume Sync & UI Modernization (Current)

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
- `assets/css/meyawo.css` — Meyawo Bootstrap theme.
- `assets/css/style.css` — custom portfolio styles.
- `assets/js/meyawo.js` — navigation toggle and slideshow.
- `components.html` — theme UI component reference page.

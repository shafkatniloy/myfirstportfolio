# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

### Planned
- Add real project links for the Jumping Raihan Java game source code
- Fix missing `catch-example.png` image in `game/` folder
- Set up a Sass compilation workflow for `assets/scss/`
- Add more blog posts
- Make contact form redirect URL configurable per environment

---

## [1.1.0] — Initial Netlify Deployment

### Added
- Browser mini-game (`game/`) — "Catch the Falling Object" built with JavaScript
- Social media buttons section (Facebook, LinkedIn, Instagram, GitHub, Codeforces)
- Visit counter via hitwebcounter
- `thankyou.html` — confirmation page after contact form submission
- `PROJECT_STRUCTURE.md` — full project map and guide

### Changed
- Profile section now cycles through multiple photos using a dot-indicator slideshow
- Contact form redirects to deployed `thankyou.html` on Netlify

---

## [1.0.0] — Initial Release

### Added
- `index.html` — main single-page portfolio with all sections:
  - Hero / Home with links to Codeforces, design portfolio, LinkedIn, and CodeChef
  - About Me section with downloadable CV
  - Education timeline (SSC, HSC, BSE at NSTU)
  - Skills section (C++, Java, HTML/CSS, Database/MySQL)
  - Portfolio section with Jumping Raihan Java game screenshots and Inventory Management System screenshots
  - (Fictional) Testimonials section
  - Blog section with two posts
  - Contact form powered by FormSubmit
- `assets/css/meyawo.css` — Meyawo Bootstrap theme
- `assets/css/style.css` — custom portfolio styles and animations
- `assets/js/meyawo.js` — navigation toggle, smooth scroll, and profile slideshow
- `assets/imgs/` — all portraits, game screenshots, education logos, blog images, and icons
- `assets/scss/` — SCSS source files (Meyawo theme + Bootstrap 4.3.1 sources)
- `assets/vendors/` — jQuery 3.4.1, Bootstrap 4.3.1, Themify Icons
- `components.html` — theme UI component reference page


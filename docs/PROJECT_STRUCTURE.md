# Portfolio Project Structure

This is Safkat Islam Niloy's personal portfolio website, built with HTML5, CSS3, JavaScript, jQuery, and a custom Glass UI design system with Bootstrap 4. Pages and assets are served directly as static files.

---

## Directory Tree

```text
myfirstportfolio/
├── README.md                  # Main GitHub project overview & highlights
├── index.html                 # Main single-page portfolio
├── components.html            # UI component reference
├── thankyou.html              # Contact form confirmation page
├── tab logo.png               # Site favicon
├── docs/                      # Project documentation
│   ├── CHANGELOG.md           # Version history and release notes
│   ├── CONTRIBUTING.md        # Contribution & development guide
│   ├── LICENSE.md             # MIT License
│   └── PROJECT_STRUCTURE.md   # This architecture and directory guide
├── assets/
│   ├── css/
│   │   ├── base.css           # Bootstrap 4 foundation and baseline layout styles
│   │   └── style.css          # Apple Liquid Glass design tokens, Dynamic Island navbar, specular highlights, responsive cards, & animations
│   ├── js/
│   │   └── main.js            # Dark mode, 6-theme palette switchers (dual navbar & floating bar), navigation, slideshow, & AJAX contact form
│   ├── imgs/
│   │   ├── education/         # School, college, and university logos
│   │   ├── dbms project/      # Inventory system screenshots
│   │   └── ...                # Portraits, game assets, icons, and blog images
│   ├── scss/                  # Sass sources for baseline styling
│   └── vendors/
│       ├── bootstrap/         # Bootstrap 4.3.1 bundle, affix, and scripts
│       ├── jquery/            # jQuery 3.4.1 library
│       └── themify-icons/     # Icon class definitions & webfonts
└── game/
    ├── index.html             # Catch the Falling Object browser game
    ├── style.css              # Game layout and appearance
    ├── script.js              # Movement, scoring, game loop, and restart logic
    ├── left.jpg               # Left-arrow instruction image
    └── right.jpg              # Right-arrow instruction image
```

---

## Sections in `index.html`

| Anchor / ID | Section Name | Description |
|---|---|---|
| `#home` | **Hero / Header** | Welcome greeting, headline, profile links (Codeforces, CodeChef, GitHub, LinkedIn), and glowing hero portrait avatar card |
| `#about` | **About Me** | Bio, NSTU CSTE credentials, interactive profile photo slideshow, CV download |
| — | **Stats Strip** | Quick responsive counter: 1500+ solved, Specialist 1437, 3-Star 1632, 3.65 CGPA |
| `#education` | **Education** | Reverse-chronological cards: NSTU (CGPA 3.65), DMRC (HSC), Hazi MD. Ekhlasuddin (SSC) |
| `#skills` | **Skills & Technologies** | Languages (C/C++, C#, Python, SQL), Backend (.NET, EF Core, PHP), Web, and Databases |
| `#contests` | **Competitive Programming** | Codeforces & CodeChef cards + 8 onsite contest achievements (IUPCs & Fests) |
| `#portfolio` | **Projects & Research** | ShopSphere.API, Courier Management System, Undergraduate Thesis, and Java game |
| `#activities` | **Co-Curricular & Leadership** | PR Secretary (CSTE Club), Problem Setter (NSTU Intra & Science Fest), Teaching |
| `#blog` | **Blog** | Featured blog excerpts with read-more links |
| `#contact` | **Contact** | Contact pills (Email, Phone `+8801407383051`, Location) + FormSubmit form |
| `#social` | **Social Channels** | Animated hover pill buttons for Facebook, LinkedIn, Instagram, GitHub, Codeforces |

---

## How the Files Connect

1. `index.html` loads Themify Icons, Font Awesome 5, `assets/css/base.css`, and `assets/css/style.css`.
2. `assets/css/style.css` contains all custom design elements: Apple Liquid Glass design tokens (`--liquid-glass-bg`, `--liquid-glass-rim`), Dynamic Island capsule navbar, specular edge reflections, spring bezier physics, responsive contest & project cards, thesis link box, and floating quick-action controls.
3. At the footer, jQuery loads before Bootstrap, affix plugin, and `assets/js/main.js`.
4. `assets/js/main.js` handles:
   - Dark/Light mode toggle with automatic `prefers-color-scheme` detection and `localStorage` persistence
   - 6-color accent palette switching with dual interactive access (top capsule navbar & bottom-left floating quick bar)
   - Smooth anchor scrolling and auto-closing mobile navbar
   - Dynamic show/hide and click scrolling for `#backToTop`
   - Timed auto-play and clickable manual dot navigation for `#aboutImage`
5. The contact form submits asynchronously via FormSubmit AJAX API with instant in-page frosted glass feedback, honeypot spam protection (`_honey`), and automatic `mailto:` fallback.
6. Standalone browser game runs from `game/index.html`.

---

## Deployment & CI/CD Pipeline

- **Hosting Platform:** Netlify ([shafkatniloy.netlify.app](https://shafkatniloy.netlify.app))
- **Monitored Branch:** `main` (Production)
- **Deployment Command:**
  ```bash
  git push origin main
  ```

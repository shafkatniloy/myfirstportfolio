# Portfolio Project Structure

This is Safkat Islam Niloy's personal portfolio website, built with HTML5, CSS3, JavaScript, jQuery, and a customized Bootstrap-based Meyawo theme. Pages and assets are served directly as static files.

---

## Directory Tree

```text
myfirstportfolio/
├── README.md                  # Main GitHub project overview & highlights
├── index.html                 # Main single-page portfolio
├── components.html            # Theme UI component examples
├── thankyou.html              # Contact form confirmation page
├── tab logo.png               # Site favicon
├── docs/                      # Project documentation
│   ├── CHANGELOG.md           # Version history and release notes
│   ├── CONTRIBUTING.md        # Contribution & development guide
│   ├── LICENSE.md             # MIT License
│   └── PROJECT_STRUCTURE.md   # This architecture and directory guide
├── assets/
│   ├── css/
│   │   ├── meyawo.css         # Bootstrap and Meyawo theme baseline styles
│   │   └── style.css          # Custom styling, shadcn-inspired components, cards, & animations
│   ├── js/
│   │   └── meyawo.js          # Navigation, smooth scroll, interactive slideshow, & back-to-top logic
│   ├── imgs/
│   │   ├── education/         # School, college, and university logos
│   │   ├── dbms project/      # Inventory system screenshots
│   │   └── ...                # Portraits, game assets, icons, and blog images
│   ├── scss/                  # Sass sources for the theme
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

1. `index.html` loads Themify Icons, Font Awesome 5, `assets/css/meyawo.css`, and `assets/css/style.css`.
2. `assets/css/style.css` contains all custom design elements: quick stats strip, contest cards, project cards, thesis box, glassmorphism navbar blur, and back-to-top button.
3. At the footer, jQuery loads before Bootstrap, affix plugin, and `assets/js/meyawo.js`.
4. `assets/js/meyawo.js` handles:
   - Smooth anchor scrolling and auto-closing mobile navbar
   - Dynamic show/hide and click scrolling for `#backToTop`
   - Timed auto-play and clickable manual dot navigation for `#aboutImage`
5. The contact form posts to FormSubmit, redirecting upon success to `thankyou.html`.
6. Standalone browser game runs from `game/index.html`.

---

## Deployment & CI/CD Pipeline

- **Hosting Platform:** Netlify ([shafkatniloy.netlify.app](https://shafkatniloy.netlify.app))
- **Monitored Branch:** `master` (synchronized with `main`)
- **Deployment Command:**
  ```bash
  git push origin main && git push origin main:master
  ```

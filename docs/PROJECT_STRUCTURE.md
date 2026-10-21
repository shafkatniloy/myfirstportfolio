# Portfolio Project Structure

This is Safkat Niloy's static portfolio website, built with HTML, CSS, JavaScript, jQuery, and the Bootstrap-based Meyawo theme. Pages and assets are served directly; the repository has no package manifest or configured build command.

## Directory tree

The tree below groups image assets and third-party library files for readability.

```text
myfirstportfolio/
├── PROJECT_STRUCTURE.md       # This guide
├── index.html                 # Main portfolio page
├── components.html            # Theme UI component examples
├── thankyou.html              # Contact form confirmation page
├── tab logo.png               # Site favicon
├── assets/
│   ├── css/
│   │   ├── meyawo.css         # Bootstrap and Meyawo theme styles
│   │   └── style.css          # Portfolio-specific styles and animations
│   ├── js/
│   │   └── meyawo.js          # Navigation and profile slideshow behavior
│   ├── imgs/
│   │   ├── education/         # School, college, and university logos
│   │   ├── dbms project/      # Inventory system screenshots
│   │   └── ...                # Portraits, game screenshots, icons, blog images,
│   │                          # backgrounds, and another favicon copy
│   ├── scss/
│   │   ├── meyawo.scss        # Theme Sass entry point
│   │   ├── abstracts/         # Theme variables and mixins
│   │   ├── base/              # Base styles and typography
│   │   ├── components/        # Buttons, cards, navigation, and other UI styles
│   │   ├── layout/            # Header, footer, and section styles
│   │   └── vendors/
│   │       └── bootstrap-4.3.1/ # Bootstrap Sass sources and utilities
│   └── vendors/
│       ├── bootstrap/         # Bootstrap JavaScript, bundles, maps, affix plugin
│       ├── jquery/            # jQuery 3.4.1 builds and source maps
│       └── themify-icons/
│           ├── css/           # Icon class definitions
│           └── fonts/         # Icon font files
└── game/
    ├── index.html             # Catch the Falling Object browser game
    ├── style.css              # Game layout and appearance
    ├── script.js              # Movement, scoring, game loop, and restart logic
    ├── left.jpg               # Left-arrow instruction image
    └── right.jpg              # Right-arrow instruction image
```

Hidden directories such as `.git/`, `.agents/`, and `.codex/` support version control or development tooling and are omitted from the website tree.

## Main pages

| File | Purpose |
| --- | --- |
| `index.html` | Contains the introduction, About section, education, skills, project galleries, testimonials, blog excerpts, contact form, social links, and link to the browser game. |
| `components.html` | Contains the theme's component showcase, useful as a reference for existing UI styles. |
| `thankyou.html` | Displays a confirmation message, a return link, and social links after contact form submission. |
| `game/index.html` | Runs a standalone JavaScript game controlled with the left and right arrow keys. This is separate from the Java-based Jumping Raihan project showcased on the homepage. |

## How the files connect

1. `index.html` loads Themify Icons, `assets/css/meyawo.css`, and then `assets/css/style.css`. The custom stylesheet can override the earlier theme styles.
2. At the bottom of the page, jQuery loads before the Bootstrap bundle, Bootstrap affix plugin, and `assets/js/meyawo.js`.
3. `meyawo.js` contains the navigation toggle, smooth-scroll handler, and an automatic slideshow using `m4.jpg`, `m1.jpg`, `m3.png`, and `m5.png`.
4. Images are referenced from `assets/imgs/`. The theme CSS currently uses `assets/imgs/bg.jpg` for the header background.
5. The contact form posts to FormSubmit. Its `_next` field currently points to the deployed `thankyou.html` URL on Netlify.
6. The browser game loads its own CSS, JavaScript, and instruction images using paths relative to `game/`.

The browser loads CSS files directly. Changes to the Sass sources require compilation to CSS before they affect the site; no Sass build workflow is configured in this repository.

## Where to make common changes

| Change | Files to edit |
| --- | --- |
| Introduction, biography, education, skills, or profile links | `index.html` |
| Project titles, descriptions, screenshots, or repository links | `index.html` and `assets/imgs/` |
| Custom buttons, education cards, social buttons, or slideshow appearance | `assets/css/style.css` |
| Navigation or slideshow behavior | `assets/js/meyawo.js` |
| Theme-wide styling | `assets/css/meyawo.css`, or the corresponding Sass sources with a compilation workflow |
| Contact destination or post-submission redirect | The contact form in `index.html` |
| Confirmation page content | `thankyou.html` |
| Browser game behavior or appearance | `game/script.js` and `game/style.css` |

## External resources and structure notes

- Google Fonts and Font Awesome provide externally loaded fonts and icons.
- FormSubmit handles contact submissions; there is no local backend for the form.
- The homepage also references an external visit counter, coding profiles, social profiles, a design portfolio, and Google Drive downloads.
- The Java game and PHP/MySQL inventory project are showcased through screenshots and external links. Their application source code is not included here.
- `game/index.html` references `catch-example.png`, but that file is currently missing from `game/`.
- Some asset filenames contain spaces. Preserve their exact paths when updating references.

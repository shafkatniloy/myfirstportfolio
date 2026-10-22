# Contributing

Thank you for your interest in contributing to Safkat Niloy's portfolio! This is a personal project, but suggestions, bug reports, and improvements are welcome.

---

## 🐛 Reporting Bugs

If you spot a broken link, missing image, layout issue, or any other bug:

1. Open an [Issue](../../issues) on GitHub.
2. Include:
   - A clear description of the problem
   - The browser and OS you are using
   - A screenshot if the issue is visual
   - Steps to reproduce (if applicable)

---

## 💡 Suggesting Improvements

Have an idea to improve the design or add a feature?

1. Open an [Issue](../../issues) with the label **enhancement**.
2. Describe what you'd like to see and why it would be useful.

---

## 🔧 Making Changes (Pull Requests)

### 1. Fork & Clone

```bash
git clone https://github.com/shafkatniloy/myfirstportfolio.git
cd myfirstportfolio
```

### 2. Create a Branch

Use a descriptive branch name:

```bash
git checkout -b fix/broken-game-image
# or
git checkout -b feature/add-dark-mode
```

### 3. Make Your Changes

- **Content / HTML:** Edit `index.html`, `thankyou.html`, or `components.html`.
- **Custom styles:** Edit `assets/css/style.css` directly (no build step needed).
- **Base styles:** Edit `assets/css/base.css` or the SCSS sources in `assets/scss/` (requires a Sass compiler).
- **JavaScript / Interactivity:** Edit `assets/js/main.js`.
- **Game:** Edit `game/script.js` or `game/style.css`.

> **Tip:** For quick styling tweaks, always edit `assets/css/style.css` — it loads after `base.css` and can override any defaults without touching the SCSS.

### 4. Test Locally

Run a local server to preview your changes before committing:

```bash
python3 -m http.server 5500
```

Open [http://localhost:5500](http://localhost:5500) and check:
- [ ] Desktop layout looks correct
- [ ] Mobile / responsive layout looks correct
- [ ] All links and buttons work
- [ ] Profile slideshow cycles correctly
- [ ] Contact form fields are intact
- [ ] Mini game (`game/index.html`) still runs

### 5. Commit & Push

Write clear, concise commit messages:

```bash
git add .
git commit -m "fix: restore missing catch-example.png in game folder"
git push origin fix/broken-game-image
```

### 6. Open a Pull Request

Go to GitHub and open a pull request against the `main` branch. Describe:
- What was changed and why
- Any known side effects or related issues

### 7. Production Deployment (Netlify)

> **Important Deployment Note:**
> Netlify is configured to watch the **`main`** branch for production builds.
> Once your changes are committed to `main`, deploy them live to [shafkatniloy.netlify.app](https://shafkatniloy.netlify.app) by pushing directly to `main`:
>
> ```bash
> git push origin main
> ```
> Netlify will automatically detect the push on `main` and publish the updated site live.

---

## 📁 Key Files at a Glance

| File | Purpose |
|---|---|
| `README.md` | Main GitHub overview and profile highlights |
| `index.html` | All portfolio content — edit here for bio, projects, blog, contact |
| `assets/css/style.css` | Custom styles, card designs, and animations |
| `assets/js/main.js` | Navigation, slideshow, theme controller, and contact logic |
| `game/script.js` | Browser mini-game logic |
| `docs/PROJECT_STRUCTURE.md` | Full project map and file guide |
| `docs/CHANGELOG.md` | Version history and release notes |

---

## ✅ Code Style

- Use 4-space indentation for HTML and CSS.
- Keep class names consistent with existing Bootstrap and portfolio conventions.
- Add `alt` text to all `<img>` tags.
- Avoid inline styles where a CSS class can be used instead.
- When adding new images, place them in `assets/imgs/` and use lowercase, hyphen-separated filenames (e.g., `project-screenshot.png`).

---

## 📬 Questions?

Feel free to reach out via the [contact form](https://shafkatniloy.netlify.app/#contact) or open a GitHub Issue.


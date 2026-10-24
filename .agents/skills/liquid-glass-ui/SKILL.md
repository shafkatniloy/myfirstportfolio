---
name: liquid-glass-ui
description: Implement true refractive 3D liquid glass UI components on the web (like iOS 26 / YouTube Music). Use this skill whenever the user asks for "liquid glass", "refractive glass", "water droplet UI", or "3D glassmorphism". Never use a flat CSS blur alone.
---

# True Refractive Liquid Glass (Web Architecture)

When asked to create "Liquid Glass", **NEVER** output a simple `backdrop-filter: blur(16px)` with a flat semi-transparent background. True liquid glass behaves like a curved convex water droplet: it **stretches and bends pixels near the rounded edges** while keeping the center relatively clear, paired with 3D inner volume and wet specular rim highlights.

---

## Core Visual Rules (The 4 Mandatory Layers)

### 1. Low-Blur Optical Refraction (`backdrop-filter`)
- **Rule:** Water droplets bend light; they do not heavily frost it. Keep `blur()` strictly between **`2px` and `5px`** so the warped text/images behind the glass remain sharp enough to see the refraction effect.
- **Color Boost:** Always pair with `saturate(150%)` to `saturate(180%)` and `contrast(105%)` so background colors pop through the glass lens.
- **Filter Chain:** `backdrop-filter: url(#liquid-lens-filter) blur(3.5px) saturate(165%);`

### 2. Edge-Only Bezel Displacement Map (`<svg>` + `<canvas>`)
- Do **not** use random noise (`feTurbulence`) unless a wavy water surface is requested. True UI liquid glass is flat in the center and curved only at the outer bezel (`border-radius`).
- Generate an offscreen `<canvas>` normal map dynamically sized to the element (or a reusable SVG data URI):
  - **Neutral (Flat Center):** `rgb(128, 128, 128)` — zero pixel shift in X (`R` channel) or Y (`G` channel).
  - **Left / Right Edges (`R` channel):** Approaches `0` on the left bezel and `255` on the right bezel to stretch pixels horizontally around the curve.
  - **Top / Bottom Edges (`G` channel):** Approaches `0` on the top bezel and `255` on the bottom bezel to stretch text vertically as it passes under the top and bottom rim.
- Feed this canvas Data URL into `<feImage>` -> `<feDisplacementMap in="SourceGraphic" scale="28" xChannelSelector="R" yChannelSelector="G">`.

### 3. 3D Inner Volume (Stacked `inset` Box Shadows)
- Flat borders look like stickers. Liquid glass requires thickness:
  - **Top Wet Specular Rim:** `inset 0 2px 4px rgba(255, 255, 255, 0.55)`
  - **Bottom Curved Depth Shadow:** `inset 0 -6px 12px rgba(0, 0, 0, 0.55)`
  - **Inner Ambient Glow:** `inset 0 0 16px rgba(255, 255, 255, 0.10)`
  - **Outer Elevation Shadow:** `0 14px 32px rgba(0, 0, 0, 0.65)`

### 4. Directional Rim Lighting & Active Bubble Droplet
- **Container Rim:** Top border must be brighter (`rgba(255, 255, 255, 0.45)`) than the bottom border (`rgba(255, 255, 255, 0.12)`).
- **Active Pill / Tab Droplet:** Active items inside a liquid glass bar look like a raised 3D water droplet sitting inside the glass tube, using a top-lit radial gradient:
  `radial-gradient(circle at 50% 15%, rgba(255, 255, 255, 0.32) 0%, rgba(255, 255, 255, 0.06) 55%, rgba(0, 0, 0, 0.35) 100%)`

---

## Reference Implementation Pattern (Copy & Adapt)

Whenever building a Liquid Glass navbar, floating button, or card, include both the **CSS 3D Lighting** and the **JS Bezel Lens Generator**:

### 1. HTML + Hidden SVG Filter
```html
<!-- Hidden SVG Filter for True Bezel Refraction -->
<svg width="0" height="0" style="position: absolute; pointer-events: none;">
  <defs>
    <filter id="liquid-lens-filter" x="0%" y="0%" width="100%" height="100%" color-interpolation-filters="sRGB">
      <feImage id="liquid-lens-map" x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="lensMap" />
      <feDisplacementMap in="SourceGraphic" in2="lensMap" scale="32" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </defs>
</svg>

<!-- Liquid Glass Component -->
<nav class="liquid-glass-pill" id="liquid-nav">
  <button class="liquid-tab active">Home</button>
  <button class="liquid-tab">New</button>
  <button class="liquid-tab">Radio</button>
  <button class="liquid-tab">Library</button>
  <button class="liquid-tab">Search</button>
</nav>
```

### 2. CSS 3D Volume & Specular Styling
```css
.liquid-glass-pill {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px;
  border-radius: 999px;

  /* 1. Subtle wet surface sheen */
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.14) 0%,
    rgba(255, 255, 255, 0.03) 45%,
    rgba(0, 0, 0, 0.28) 100%
  );

  /* 2. True Edge Refraction + Low Blur + High Saturation */
  backdrop-filter: url(#liquid-lens-filter) blur(3.5px) saturate(165%);
  -webkit-backdrop-filter: url(#liquid-lens-filter) blur(3.5px) saturate(165%);

  /* 3. Directional Specular Borders */
  border-top: 1px solid rgba(255, 255, 255, 0.48);
  border-left: 1px solid rgba(255, 255, 255, 0.24);
  border-right: 1px solid rgba(255, 255, 255, 0.24);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);

  /* 4. Stacked 3D Inner & Outer Shadows */
  box-shadow:
    0 16px 36px rgba(0, 0, 0, 0.7),
    inset 0 2px 4px rgba(255, 255, 255, 0.45),
    inset 0 -6px 12px rgba(0, 0, 0, 0.55),
    inset 0 0 18px rgba(255, 255, 255, 0.08);
}

/* Raised 3D Droplet for Active Tab */
.liquid-tab.active {
  background: radial-gradient(
    circle at 50% 12%,
    rgba(255, 255, 255, 0.32) 0%,
    rgba(255, 255, 255, 0.06) 55%,
    rgba(0, 0, 0, 0.35) 100%
  );
  box-shadow:
    inset 0 2px 3px rgba(255, 255, 255, 0.65),
    inset 0 -4px 6px rgba(0, 0, 0, 0.55),
    0 4px 12px rgba(0, 0, 0, 0.45);
  border-radius: 999px;
}
```

### 3. JavaScript Bezel Normal-Map Generator
This script generates an exact pill-shaped lens map so **only the curved top, bottom, left, and right edges bend the background text**, while keeping the center flat:

```javascript
function buildLiquidLensMap(width = 360, height = 68, bezelThickness = 22) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  const radius = height / 2;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // Find distance to nearest inner pill spine point
      const spineX = Math.max(radius, Math.min(width - radius, x));
      const spineY = radius;

      const dx = x - spineX;
      const dy = y - spineY;
      const distFromSpine = Math.sqrt(dx * dx + dy * dy);

      // How close are we to the outer edge? (0 = inner flat zone, 1 = outer rim)
      const bezelStart = radius - bezelThickness;
      let t = Math.max(0, Math.min(1, (distFromSpine - bezelStart) / bezelThickness));

      // Smooth cubic curve for realistic glass lens curvature
      const curve = t * t * (3 - 2 * t);

      // Normal vector pointing outward
      const nx = distFromSpine > 0 ? dx / distFromSpine : 0;
      const ny = distFromSpine > 0 ? dy / distFromSpine : 0;

      // 128 is zero displacement. Push outward near edges:
      const r = Math.round(128 + nx * curve * 127);
      const g = Math.round(128 + ny * curve * 127);

      const idx = (y * width + x) * 4;
      data[idx] = r;     // X displacement
      data[idx + 1] = g; // Y displacement
      data[idx + 2] = 128;
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const feImage = document.getElementById('liquid-lens-map');
  if (feImage) {
    feImage.setAttribute('href', canvas.toDataURL('image/png'));
  }
}

buildLiquidLensMap(360, 68, 22);
```

---

## Cross-Browser Fallback Rule
- **Chromium (Chrome, Edge, Brave, Android WebView):** Supports `backdrop-filter: url(#liquid-lens-filter)` natively and renders real-time edge refraction.
- **Safari / Firefox:** Does not support SVG URLs inside `backdrop-filter`. Always include a `@supports not` or JS engine check so Safari/Firefox gracefully fall back to `backdrop-filter: blur(12px) saturate(180%)` while keeping the 3D specular rim and inner shadows intact.


# Atelier Solum — Portfolio Prototype

A static, no-build prototype for a design-build studio (interior, exterior,
landscaping, consultancy, construction). Plain HTML/CSS/JS — open `index.html`
directly, or serve the folder, and it works with no install step.

## Run it locally

```bash
cd architect-portfolio
python3 -m http.server 8000
# visit http://localhost:8000
```

## Structure

```
index.html                    Home page
projects/*.html                4 sample project detail pages (shared template)
css/base.css                   Design tokens, reset, typography, grain texture
css/layout.css                 Header, full-screen nav, footer, dark sections
css/components.css             Buttons, hero, bento grid, cards, gallery, lightbox, tour embeds
css/responsive.css             Breakpoint overrides
js/nav.js                      Sticky header + full-screen overlay menu
js/reveal.js                   Scroll-reveal (IntersectionObserver)
js/lightbox.js                 Click-to-open image gallery viewer
js/cursor.js                   Custom cursor (desktop only, auto-disabled on touch)
js/main.js                     Shared page init
```

## Media strategy (why nothing heavy is committed)

All photos are hotlinked from Unsplash's CDN with fixed IDs and size/quality
query params (`?auto=format&fit=crop&w=...&q=60`), so the repo stays a few
kilobytes of HTML/CSS/JS with zero committed images. Gallery images use
`loading="lazy"` plus explicit `width`/`height` to avoid layout shift.

The one sample video (a small CC0 clip) and the 3D/360° assets are likewise
hotlinked — no binaries in the repo. See "Virtual tour" below for the exact
sources.

**Before going live with the client's real media:**
- Host real photos/video in cloud storage or a CDN (Cloudflare Images,
  Cloudinary, S3 + CloudFront), not in this repo.
- Serve responsive `srcset` variants and modern formats (WebP/AVIF).
- Compress and transcode video (H.264/H.265, a few Mb/s max, short clips) and
  always keep `loading="lazy"` / `preload="none"` on below-the-fold media.
- Swap every `data-full` / `src` in the galleries and `<model-viewer>` /
  Pannellum embeds for the client's actual assets.

## Virtual tour ("the VR feel")

Two dependency-free, plain-HTML-compatible techniques are demoed, so the
client can see both options:

- **`<model-viewer>`** (Google web component, loaded via a single `<script
  type="module">` CDN tag) — a rotatable, zoomable 3D model with an AR button
  on supported phones. Used on the home page teaser and on the *Riverside
  Residence* / *Courtyard Retreat* project pages. Currently pointed at
  model-viewer's own public demo `.glb` files as stand-ins — swap `src` for a
  real export (GLB/GLTF) from SketchUp, Revit, or Blender.
- **Pannellum.js** — a 360° equirectangular photo viewer (drag to look
  around), used on the *Maple Hill Renovation* and *Harbor View Build* pages.
  Currently pointed at Pannellum's own public demo photos — swap `panorama`
  for a real 360° camera photo of the site/room.

Both are CDN `<script>`/`<link>` tags with no build step, matching the
plain-HTML constraint. For a true walk-through VR headset experience later,
the natural next step would be WebXR — out of scope for this prototype.

## What's placeholder vs. real

Everything — project names, copy, specs, photos, video, 3D/360 assets, the
contact form — is placeholder content for demonstrating layout and
interaction. The contact form does not submit anywhere yet.

# Adriel Kampa de Gois — Cybersecurity Portfolio

Personal portfolio site — dark, terminal-inspired design built with plain HTML/CSS/JS (no build step, no framework).

Live structure: `Hero → About → Skills → Journey → Projects → Contact`.

## Run locally

Just open `index.html` in a browser, or serve it:

```bash
npx serve .
```

## Deploy to GitHub Pages (your domain: AdrielKampa.github.io)

1. Create a **new public repository** on GitHub named exactly:
   ```
   AdrielKampa.github.io
   ```
   (This exact name makes GitHub serve it at the root domain instead of a subpath.)

2. From this folder, initialize git and push:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/AdrielKampa/AdrielKampa.github.io.git
   git push -u origin main
   ```

3. On GitHub: go to the repo → **Settings → Pages** → under "Build and deployment", Source = **Deploy from a branch**, Branch = **main** / `/ (root)`. Save.

4. Wait 1–2 minutes, then your site is live at:
   ```
   https://AdrielKampa.github.io
   ```

### Optional: custom domain
If you buy a domain later, add a `CNAME` file at the project root containing just the domain (e.g. `adrielkampa.dev`), then point your domain's DNS to GitHub Pages (A records to GitHub's IPs or a CNAME to `AdrielKampa.github.io`). GitHub's docs: https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site

## Adding a new project

Open `index.html`, find the `<!-- Project 3: placeholder for future work -->` card inside `#projects`, and duplicate its structure:

```html
<div class="project-card reveal" style="border-style:solid; border-color:var(--border-subtle);">
  <span class="project-status" style="color:var(--accent-green); background:rgba(57,255,157,0.1); border-color:rgba(57,255,157,0.3);">Completed</span>
  <div class="project-icon" style="color:var(--accent-green); border-color:var(--border-subtle);">
    <!-- swap the SVG if you like -->
  </div>
  <div class="project-title" style="color:var(--text-primary);">Your Project Title</div>
  <div class="project-desc" style="color:var(--text-secondary);">One or two sentences describing what it does and why.</div>
  <div class="project-tags">
    <span class="project-tag">Tech</span>
    <span class="project-tag">Stack</span>
  </div>
  <a href="https://github.com/AdrielKampa/your-repo" target="_blank" rel="noopener" class="project-link" style="color:var(--accent-green);">
    View on GitHub
  </a>
</div>
```

Solid border + green status = finished project. Dashed border (default `.project-card`) + violet "In Development" / "Coming Soon" status = work in progress.

## Adding a certification

Once you finish the Cisco Ethical Hacker cert (or add a new one), update:
- The **About panel** "Current Cert" row in `index.html`
- The **Journey timeline**'s last entry
- Consider adding a dedicated "Certifications" section (grid of badge cards) once you have 2+ to show — ask for it and it can be scaffolded in.

## Tech notes

- No build tools — pure HTML/CSS/JS, loads fast, zero dependencies besides Google Fonts.
- `js/main.js` powers the typing terminal animation, the connecting-particles background, scroll-reveal, and nav behavior.
- Respects `prefers-reduced-motion` (disables the canvas animation).
- Fully responsive: mobile nav, stacked grids under 980px/760px breakpoints.

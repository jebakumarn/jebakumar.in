# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The personal portfolio at **jebakumar.in** (see [public/CNAME](public/CNAME)), served via GitHub Pages. As of v2 it is an **[Astro](https://astro.build) static site** with a hand-rolled "Terminal / Systems" design — no Bootstrap, no jQuery, no runtime framework. Astro compiles `src/` to static HTML/CSS/JS in `dist/` at build time.

Design language: monospace-forward (JetBrains Mono + Inter via Google Fonts), near-black background with amber (`--amber`) + terminal-green (`--green`) accents, terminal-window chrome (three-dot titlebars, `path` labels), `>` command prompts, a blinking cursor, and ASCII hairline rules.

## Commands

Node.js is required (not committed; install locally or rely on CI).

```bash
npm install        # install deps (astro)
npm run dev        # dev server at http://localhost:4321
npm run build      # static build -> dist/
npm run preview    # serve the built dist/ locally
```

Deployment is automatic via [.github/workflows/deploy.yml](.github/workflows/deploy.yml): push to `main` → `withastro/action@v3` builds → `actions/deploy-pages` publishes. **One-time setup:** GitHub repo Settings → Pages → Source must be set to **"GitHub Actions"**. There is no committed `package-lock.json` on purpose (the action runs `npm install`); if you add one, keep it in sync with `package.json` or the action's `npm ci` will fail.

## Architecture & conventions

- **Layout & chrome are components, not copy-paste.** [src/layouts/BaseLayout.astro](src/layouts/BaseLayout.astro) owns `<head>`, fonts, the no-flash theme init, and wraps every page with [Nav](src/components/Nav.astro) + [Footer](src/components/Footer.astro). Pages import `BaseLayout` and fill the default slot. Change nav/footer/theme in one place.
- **Content is data, not markup.** All page content lives in typed modules under [src/data/](src/data/): `profile.ts`, `experience.ts` (5 roles), `certifications.ts` (28), `education.ts` (4), `skills.ts` (30, name+percent), `projects.ts` (15). Pages import these and render them. To edit site content, edit the data file — not a page's HTML.
- **Reusable UI:** [TerminalWindow.astro](src/components/TerminalWindow.astro) (titlebar + `path` prop + slot body), [Prompt.astro](src/components/Prompt.astro), [ThemeToggle.astro](src/components/ThemeToggle.astro).
- **Theming.** All colors are CSS custom properties in [src/styles/global.css](src/styles/global.css) under `:root[data-theme='dark']` (default) and `:root[data-theme='light']` ("paper terminal"). `data-theme` is set on `<html>`. The no-flash init is an inline `is:inline` script in `BaseLayout`; the toggle logic + `localStorage['theme']` persistence is in [src/scripts/theme.ts](src/scripts/theme.ts). global.css is a single global stylesheet imported by `BaseLayout`; pages add page-specific rules in scoped `<style>` blocks.
- **Client behavior is per-page TS modules** in [src/scripts/](src/scripts/), imported via a page's `<script>` tag: `chatbot.ts` (contact), `contactForm.ts` (contact), `labAuth.ts` (lab), `theme.ts` (all, via BaseLayout). All are null-guarded so they're inert where their markup is absent.
- **Duration math** is centralized in [src/lib/duration.ts](src/lib/duration.ts): `formatTenure`, `formatRange`, `totalExperience`. This replaced the old fragile per-page inline date scripts and now counts **every** role (including AMD). "Years of experience" is computed at build time, so it refreshes on each deploy.

## Client-only "backend" (unchanged from v1, keys preserved)

Everything is front-end simulation; no server. Storage keys are intentionally the same as the legacy site so existing data survives:
- Lab auth ([labAuth.ts](src/scripts/labAuth.ts)): users in `localStorage['lab_users']` (plaintext — demo only), session in `sessionStorage['lab_current_user']`.
- Contact form ([contactForm.ts](src/scripts/contactForm.ts)): writes to `localStorage['contact_messages']`.
- Theme: `localStorage['theme']`.

## AI chatbot

The contact-page chatbot ([src/scripts/chatbot.ts](src/scripts/chatbot.ts)) calls a **Cloudflare Worker** ([cloudflare-worker/](cloudflare-worker/)) that runs a real LLM on Cloudflare's free Workers AI (no API key, no token billing). The Worker's system prompt holds Jeba's bio and the policy (answer safe/professional questions, politely refuse offensive/political ones). **Set `CHATBOT_ENDPOINT` in chatbot.ts** to the deployed Worker URL (see [cloudflare-worker/README.md](cloudflare-worker/README.md)); until then, a built-in keyword responder is the offline fallback so the page never breaks.

## Important gotchas

- **Nav subdomains are external.** Blog/Lab/Cloud nav links point to `blog.jebakumar.in`, `lab.jebakumar.in`, `cloud.jebakumar.in` (separately hosted). The local [/lab](src/pages/lab.astro) and [/blog](src/pages/blog.astro) pages are still built and reachable by URL but are intentionally minimal.
- **`legacy/` is the old hand-written site**, kept for reference/parity only — not built, not served. Don't edit it expecting site changes. `Blogs/` and `cloudflare-worker/` are untouched by the rebuild.
- **Assets live in [public/assets/](public/assets/)** and are served at `/assets/...`. Reference them with root-absolute paths (`/assets/images/profile.jpg`), not relative.
- **The About "book flip" is gone.** About is now a terminal tab browser (`about.md / experience.log / certs.json / education.txt / skills.cfg / projects/`) with `#hash` deep-linking; all the old content is preserved in the data files.

# Riba docs site (`@ribajs/doc`)

Static site built with Vite + Pug, deployed to GitHub Pages (`.github/workflows/deploy-docs.yml`).

## Live demos

Every `demos/*` package with a `package.json` is built into `_demos/<id>/` and copied to
`_site/demos/<id>/`; `demos.html` is the gallery, `demo.html?id=<id>` embeds a demo in an iframe
(`rv-demo-viewer`).

| Command | Purpose |
|---|---|
| `yarn workspace @ribajs/doc build:demos` | Build all demos (4 in parallel, per-demo timeout, one retry) and write `_demos/manifest.json` |
| `yarn workspace @ribajs/doc build` | Build the site; copies `_demos` to `_site/demos` |
| `yarn workspace @ribajs/doc smoke:demos` | Load every demo in headless Chromium; writes `_smoke/report.json` + screenshots, exits 1 on any unexplained finding |
| `yarn workspace @ribajs/doc start:live` | Site + demo watcher + preview on `http://localhost:4173` |

Use `localhost`, not `127.0.0.1`: imgur answers hotlinked images with 403 when the `Referer` is an IP literal.

### Authoring rules for demos

- Reference assets from `public/` root-absolute (`/images/a.jpg`, `/iconset/svg/x.svg`). The
  `basePathPlugin` in `infra/vite-config` prefixes them with the Vite `base`, so the demo works at `/`
  and under `/demos/<id>/`. Do not climb with `../../../images/…` and do not use bare names of files
  that Vite never emits.
- Page links in router demos must be relative (`./page-1.html`).
- A demo that cannot run is not hidden: declare it in the demo's `package.json`:

  ```json
  { "riba": { "demo": { "knownIssues": [{ "issue": 1234, "title": "Needs a backend" }] } } }
  ```

  The viewer shows a banner with the link, and the smoke gate reports its findings as `known`
  instead of failing. `skip: true` leaves a demo out of the build entirely.

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
| `yarn workspace @ribajs/doc start:live` | Site + demo watcher + preview on `http://127.0.0.1:4173` |

Hotlinking demos that load imgur images must send no referrer (`<meta name="referrer" content="no-referrer">`): imgur answers 403 when the `Referer` is an IP literal such as `127.0.0.1`.

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

## Languages

English is the markup of every page, so the site is complete without a translation. A translation is
a catalog (`_site/locales/<lang>.json`) that the i18n module loads once the language is active
(`?lang=de`, the switcher in the navbar, or the browser language; the choice is remembered). A text
without a translation stays English. The catalogs are built from these sources, only languages with
content get a file:

| Source | Becomes |
|---|---|
| `demos/<id>/README.<lang>.md` | Title and description of the demo card and viewer (`demos.<id>.*`); `README.md` stays the English source |
| `src/doc/**/<page>.<lang>.md` next to `<page>.md` | The translated page, rendered with the same markdown rules (`md.<page>`); `md()` wraps a page in `rv-i18n-html` only when a sibling exists |
| `src/locales/<lang>/<name>.yml` | UI strings under `<name>.*` (`ui.yml` holds navigation, gallery and viewer texts) |

Markup asks for a UI string with `rv-i18n-text="'ui.some.key'"` (the English text stays inside the
element), scripts with `uiText('ui.some.key', 'English text')`. Add the key to `src/locales/<lang>/ui.yml`.

`yarn workspace @ribajs/doc check:locales` (part of `check`, and of the deploy workflow) fails on a
translation without an English sibling, a translated page no page renders, an orphan key, a `{{ placeholder }}`
that differs from the English text, a demo without an English description and invalid YAML or JSON.
`build:demos` fails for a demo without an English `README.md` title and first paragraph.

/**
 * Playwright config for the demo smoke run.
 *
 * Separate from ./playwright.config.ts on purpose: the existing e2e projects own
 * the vite dev servers on 5181/5184 and must stay untouched, and the smoke gate
 * must not inherit their webServer, their projects or their port. Port 4173 is
 * Pascal's running live preview (yarn start:live) and is never used here either.
 *
 * The gate itself is a standalone Node program, not a spec file:
 *
 *   yarn workspace @ribajs/doc smoke:demos     # <- the real entry point
 *
 * It serves infra/doc/_site on its own free port (default 4799, SMOKE_PORT
 * overrides it), loads every demo from infra/doc/_demos/manifest.json, classifies
 * every finding as same-origin / external / known and writes
 * infra/doc/_smoke/report.json. Exit code 0 means every demo is ok or known.
 *
 * This config only documents that run for the Playwright tooling (editors, --list,
 * CI matrices). testMatch points at the script so it is discoverable; the run
 * itself is the npm script above, because a script without @playwright/test
 * fixtures is not a spec and would be reported as "no tests found".
 */
import { defineConfig } from "@playwright/test";

/** Own port for the smoke run; 0 lets the OS pick a free one. */
const smokePort = Number(process.env.SMOKE_PORT ?? 4799);

export default defineConfig({
  testDir: "./infra/doc/scripts",
  testMatch: "smoke-demos.mjs",
  // One demo at a time: the gate shares one browser and one static server, and a
  // parallel run would make the findings of two demos indistinguishable.
  fullyParallel: false,
  workers: 1,
  timeout: 30_000,
  retries: 0,
  forbidOnly: !!process.env.CI,
  reporter: [["list"]],
  use: {
    baseURL: `http://127.0.0.1:${smokePort}`,
    trace: "off",
    video: "off",
    screenshot: "off",
  },
  // No webServer on purpose: smoke-demos.mjs starts and stops its own server.
  metadata: {
    smoke: {
      script: "infra/doc/scripts/smoke-demos.mjs",
      command: "yarn workspace @ribajs/doc smoke:demos",
      manifest: "infra/doc/_demos/manifest.json",
      report: "infra/doc/_smoke/report.json",
      port: smokePort,
    },
  },
});
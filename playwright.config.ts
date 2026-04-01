import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  retries: process.env.CI ? 1 : 0,
  use: {
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "router-slide-transition",
      testMatch: "router-slide-transition/**/*.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "http://localhost:5181",
      },
    },
    {
      name: "router-svg-transition",
      testMatch: "router-svg-transition/**/*.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "http://localhost:5182",
      },
    },
    {
      name: "hook-order",
      testMatch: "hook-order/**/*.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        // Hook order fixture is hosted as part of the slide demo
        baseURL: "http://localhost:5181",
      },
    },
    {
      name: "router-basic",
      testMatch: "router-basic/**/*.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "http://localhost:5184",
      },
    },
  ],
  webServer: [
    {
      command: "yarn vite --port 5181 --strictPort",
      cwd: "demos/router-slide-transition",
      port: 5181,
      reuseExistingServer: true,
      timeout: 60_000,
    },
    {
      command: "yarn vite --port 5182 --strictPort",
      cwd: "demos/router-svg-transition",
      port: 5182,
      reuseExistingServer: true,
      timeout: 60_000,
    },
    {
      command: "yarn vite --port 5184 --strictPort",
      cwd: "demos/router-view",
      port: 5184,
      reuseExistingServer: true,
      timeout: 60_000,
    },
  ],
});

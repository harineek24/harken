import { defineConfig, devices } from "@playwright/test";

import { config } from "dotenv";

config({
  path: ".env.local",
});

const PORT = process.env.PORT || 3000;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 2 : 8,
  reporter: "html",
  use: {
    baseURL,
    trace: "retain-on-failure",
  },

  timeout: 30 * 1000,
  expect: {
    timeout: 10 * 1000,
  },

  projects: [
    {
      name: "e2e",
      testMatch: /.*\.test\.ts/,
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],

  webServer: {
    command: "pnpm dev",
    url: baseURL,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
});

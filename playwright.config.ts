import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  // globalSetup: "global-setup.ts",
  // globalTeardown: "global-setup.ts",
  testMatch: "**.spec.ts",
  // testIgnore: "**.skip.**.ts",
  timeout: 60 * 1000,
  use: {
    headless: false,
    baseURL: "https://playwright.dev",
    httpCredentials: {
      username: 'guest',
      password: 'welcome2qauto'
    },
    trace: 'on',
    // trace: "retain-on-failure",
    testIdAttribute: 'qa-dont-touch'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "qauto",
      testMatch: "**.qauto.spec.ts",
      use: {
        headless: false,
        baseURL: "https://qauto.forstudy.space/",
        httpCredentials: {
          username: "guest",
          password: "welcome2qauto",
        },
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

import { defineConfig, devices } from '@playwright/test';
import envData from './data/env.json'
import path from 'path';

const ENV = process.env.ENV || 'dev';
const CONFIG = envData[ENV as keyof typeof envData];
console.log(`✅ Running tests on environment: ${ENV}`);

export default defineConfig({
  testDir: './tests',
  timeout: 4 * 60000,
  workers: 1,
  // retries: 1,

  use: {
    baseURL: CONFIG.baseURL,
    ignoreHTTPSErrors: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: 'on-first-retry',
  },
  outputDir: path.join(__dirname, `test-results-${ENV}`),

  reporter: [
    ["html", { open: "never" }],
    ["allure-playwright", { resultsDir: `./allure/allure-results-${ENV}`, detail: true, suiteTitle: false }],
  ],


  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        deviceScaleFactor: undefined,
        viewport: null,
        headless: false,
        launchOptions: {
          args: ["--start-maximized"],
        },
        video: {
          mode: 'retain-on-failure',
          size: { width: 1920, height: 1080 },
        },
      },
    }
  ],

});
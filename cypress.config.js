// cypress.config.js
const { defineConfig } = require("cypress");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@cypress/browserify-preprocessor");
const sqlServer = require("cypress-sql-server");
const ExcelJS = require("exceljs");
const path = require("path");
const fs = require('fs');

async function setupNodeEvents(on, config) {
  // ─── SQL SERVER TASKS ─────────────────────────────────────────────────────────
  config.db = {
    userName: "CloudSAce7e739a",
    password: "CypressD@tabase123",
    server: "cypressservertg.database.windows.net",
    options: {
      database: "CypressDatabase",
      encrypt: true,
      rowCollectionOnRequestCompletion: true,
    },
  }
  // ─── Inline Excel Task ───
  on("task", {
    parseExcel: async (fileName) => {
      const workbook = new ExcelJS.Workbook();
      const filePath = path.resolve("cypress/downloads", fileName);
      await workbook.xlsx.readFile(filePath);
      const worksheet = workbook.getWorksheet(1);

      const result = [];
      const headers = [];

      worksheet.eachRow((row, rowNumber) => {
        const values = row.values.slice(1);
        if (rowNumber === 1) {
          headers.push(...values);
        } else {
          const rowObject = {};
          values.forEach((val, i) => {
            rowObject[headers[i]] = val;
          });
          result.push(rowObject);
        }
      });

      // 🔽 Write result to a file for visibility
    const outputPath = path.resolve("cypress/downloads", "parsed-output.json");
    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
      return result;
    },

    ...sqlServer.loadDBPlugin(config.db),
  });


  // ─── BDD / CUCUMBER PREPROCESSOR ───────────────────────────────────────────────
  await addCucumberPreprocessorPlugin(on, {
    ...config,
    testFileExtension: ".feature",
    stepDefinitions: "./cypress/e2e/BDD/step_definitions",
  });

  // ─── BROWSERIFY FOR .feature & .js ─────────────────────────────────────────────
  on(
    "file:preprocessor",
    browserify({
      typescript: require.resolve("typescript"),
    })
  );

  return config;
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents,
    specPattern: [
      "cypress/e2e/BDD/features/*.feature",
      "cypress/e2e/UI/*.js",
      "cypress/e2e/API/*.js",
      "cypress/e2e/DB/*.js",
    ],
    supportFile: "cypress/support/e2e.js",
  },

  // ─── Your other Cypress settings ───────────────────────────────────────────────
  defaultCommandTimeout: 6000,
  video: true,
  screenshotOnRunFailure: true,
  viewportWidth: 1920,
  viewportHeight: 1080,
  retries: { runMode: 1 },
  projectId: "CypressCourse",
  env: { url: "https://rahulshettyacademy.com/" },
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports/html",
    overwrite: false,
    html: true,
    json: true,
  },
});

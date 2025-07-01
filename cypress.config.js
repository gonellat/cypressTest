const { defineConfig } = require("cypress");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@cypress/browserify-preprocessor");
const sqlServer = require('cypress-sql-server');

async function setupNodeEvents(on, config) {
  config.db = {
    userName: "CloudSAce7e739a",
    password: "CypressD@tabase123",
    server: "cypressservertg.database.windows.net",
    options: {
      database: "CypressDatabase",
      encrypt: true,
      rowCollectionOnRequestCompletion: true
    }
  }
  let tasks = sqlServer.loadDBPlugin(config.db);
  on('task', tasks);

  if (!config.env) {
    config.env = {};
  }

  await preprocessor.addCucumberPreprocessorPlugin(on, {
    ...config,
    testFileExtension: '.feature', // ✅ tells Cypress to not try JS parsing
    stepDefinitions: './cypress/e2e/BDD/step_definitions'
  });

  on("file:preprocessor", browserify({
    typescript: require.resolve("typescript"),
  }));


  return config;
}


module.exports = defineConfig({
  defaultCommandTimeout: 6000,
  video: true,
  screenshotOnRunFailure: true,
  viewportWidth: 1920,
  viewportHeight: 1080,

  retries: {
    runMode: 1
  },
  projectId: "CypressCourse",

  env: {
    url: "https://rahulshettyacademy.com/",
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: "cypress/reports/html",
    overwrite: false,
    html: true,
    json: true
  },


  retries: {
    runMode: 1,

  },


  e2e: {
    setupNodeEvents,
    specPattern: [
      "cypress/e2e/BDD/features/*.feature",
      "cypress/e2e/UI/*.js",
      "cypress/e2e/API/*.js",
      "cypress/e2e/DB/*.js"
    ],
    supportFile: "cypress/support/e2e.js",

  },
});

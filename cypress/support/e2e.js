// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
// Stuff in here runs once at the start of your test run
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

const sqlServer = require('cypress-sql-server');
sqlServer.loadDBCommands();

require('cypress-mochawesome-reporter/register');
require('./commands');
require('./beforeEach')

// Import commands.js using ES2015 syntax:
// Alternatively you can use CommonJS syntax:
// require('./commands')
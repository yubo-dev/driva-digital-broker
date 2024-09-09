// cypress.config.ts
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.spec.ts", // Ensure this matches your test file pattern
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});

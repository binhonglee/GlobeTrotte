export default {
  extensions: ["ts", "vue"],
  require: ["./src/cockpit/tests/_setup.js"],
  babel: true,
  timeout: "2m",
  files: [
    "src/cockpit/tests/**/*_ava.test.ts",
    "!src/cockpit/tests/cypress/**/*",
    "!src/cockpit/tests/puppeteer/**/*",
  ],
  tap: true,
};

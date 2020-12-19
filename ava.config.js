export default {
  extensions: ["ts", "vue"],
  require: [
    "ts-node/register",
    "./src/cockpit/tests/components/_setup.js",
  ],
  babel: true,
  timeout: "2m",
};

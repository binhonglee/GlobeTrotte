module.exports = {
  extends: ["../../.eslintrc.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    project: ["./*/tsconfig.json"],
    sourceType: "module",
  },
};

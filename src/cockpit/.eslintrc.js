module.exports = {
  "extends": [
    "../../.eslintrc.js",
    "plugin:vue/vue3-recommended",
    "@vue/typescript/recommended",
    "@vue/prettier"
  ],
  parserOptions: {
    ecmaVersion: 2020,
    project: "./tsconfig.json"
  },
}

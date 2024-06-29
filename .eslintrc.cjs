// @ts-check
// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
const { defineConfig } = require("eslint-define-config");

/// <reference types="@eslint-types/typescript-eslint" />

module.exports = defineConfig({
  env: {
    browser: true,
    es2023: true,
    node: true,
  },
  extends: [
    "@nuxt/eslint-config",
    "plugin:perfectionist/recommended-natural",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/base",
    "plugin:vue/vue3-essential",
    "plugin:vue/vue3-recommended",
    "plugin:vue/vue3-strongly-recommended",
  ],
  globals: {
    turnstile: true,
  },
  overrides: [
    {
      files: ["*.vue"],
      parser: "vue-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
    },
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        tsconfigRootDir: process.cwd(),
      },
    },
  ],
  plugins: [
    "@typescript-eslint",
    "i",
    "unicorn",
    "perfectionist",
    "@stylistic/js",
  ],
  root: true,
  rules: {
    "@typescript-eslint/no-explicit-any": "warn",
    "i/first": "error",
    "i/no-duplicates": "error",
    "i/no-mutable-exports": "error",
    "i/no-named-default": "error",
    "i/no-self-import": "error",
    "i/no-webpack-loader-syntax": "error",
    "i/order": "off",
    "vue/attributes-order": "off",
    "vue/html-self-closing": "off",
    "vue/max-attributes-per-line": [
      "warn",
      {
        singleline: {
          max: 3,
        },
      },
    ],
    "vue/multi-word-component-names": "off",
    "vue/no-multiple-template-root": "off",
    "vue/singleline-html-element-content-newline": "off"
  },
  settings: {},
});

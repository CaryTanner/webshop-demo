// @ts-check
const eslint = require("@eslint/js");
const { defineConfig } = require("eslint/config");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const eslintConfigPrettier = require('eslint-config-prettier');
const prettierPlugin = require("eslint-plugin-prettier/recommended");

module.exports = defineConfig([
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
      eslintConfigPrettier,
      prettierPlugin,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
      "@typescript-eslint/member-ordering": [
        "error", {
            default: ["static-field", "instance-field", "static-method", "instance-method"],
        }
      ],
      "require-await": "error",
      "no-unused-expressions": "error",
      "no-undef-init": "error",
      "no-var": "error",
      "prefer-const": "error",
      "no-console": "error",
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      angular.configs.templateRecommended,
      angular.configs.templateAccessibility,
    ],
    rules: {
      '@angular-eslint/template/button-has-type': 'warn',
      '@angular-eslint/template/eqeqeq': 'error',
    },
  }
]);

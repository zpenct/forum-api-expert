const globals = require("globals");
const pluginJs = require("@eslint/js");

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
  },
  {
    languageOptions: {
      globals: globals.node,
      sourceType: "commonjs", 
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      "no-underscore-dangle": "off",
      "camelcase": "off",
      "semi": "off",
      "object-curly-newline": "off",
      "no-unused-vars": "off", 
    },
  },
  {
    files: ["**/*.test.js", "**/__tests__/**/*.js"],
    languageOptions: {
      globals: globals.jest,
      sourceType: "commonjs", 
    },
  },
  
];

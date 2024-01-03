/** @typedef  {import("prettier").Config} PrettierConfig */
/** @typedef  {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */

/** @type { PrettierConfig | SortImportsConfig } */
const config = {
  arrowParens: "always",
  printWidth: 80,
  singleQuote: false,
  semi: true,
  trailingComma: "all",
  tabWidth: 2,
  proseWrap: "always",

  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(react-native/(.*)$)|^(react-native$)|^(@react-native/(.*)$)|^(@react-native$)",
    "",
    "^(expo/(.*)$)|^(expo$)|^(@expo/(.*)$)|^(@expo$)",
    "^(next/(.*)$)|^(next$)",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@omnistylejs/(.*)$",
    "^omnistyle/(.*)$",
    "",
    "^~/(.*)$",
    "^[./]",
  ],
  // Last version that doesn't squash type and value imports
  importOrderTypeScriptVersion: "4.4.0",

  plugins: ["@ianvs/prettier-plugin-sort-imports", "prettier-plugin-pkg"],
};

module.exports = config;

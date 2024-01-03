/** @type {import('jest').Config} */
const config = {
  displayName: "@omnistylejs/core",

  rootDir: ".",

  preset: "react-native",

  testEnvironment: "node",
  modulePathIgnorePatterns: ["./dist/"],
  testRegex: "src/__tests__/.*.tsx?$",
};

module.exports = config;

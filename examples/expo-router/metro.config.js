const { getDefaultConfig } = require("@expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.watchFolders = [workspaceRoot];

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

config.resolver.sourceExts.push("cjs", "mjs", "svg");
config.resolver.assetExts = config.resolver.assetExts.filter(
  (ext) => !config.resolver.sourceExts.includes(ext),
);

config.resolver.resolverMainFields = ["react-native", "browser", "main"];

config.resolver.disableHierarchicalLookup = true;
config.resolver.preferNativePlatform = true;

config.transformer.unstable_allowRequireContext = true;

module.exports = config;

// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  transpilePackages: [
    "@omnistylejs/components",
    "@omnistylejs/core",

    "expo",
    "expo-router",
    "react-native",
    "react-native-web",

    "expo-linking",
    "expo-constants",
    "expo-modules-core",
    "react-native-safe-area-context",
    "react-native-reanimated",
    "react-native-gesture-handler",
  ],

  webpack: (webpackConfig, { buildId, isServer, webpack }) => {
    webpackConfig.plugins.push(
      new webpack.DefinePlugin({
        "process.env.BUILD_ID": JSON.stringify(buildId),
      }),
    );

    if (!isServer) {
      webpackConfig.resolve.fallback = { fs: false, net: false, tls: false };
    }

    if (!webpackConfig.resolve) {
      webpackConfig.resolve = {};
    }

    webpackConfig.resolve.alias = {
      ...(webpackConfig.resolve.alias || {}),

      "react-native$": "react-native-web",
      "react-native/Libraries/EventEmitter/RCTDeviceEventEmitter$":
        "react-native-web/dist/vendor/react-native/NativeEventEmitter/RCTDeviceEventEmitter",
      "react-native/Libraries/vendor/emitter/EventEmitter$":
        "react-native-web/dist/vendor/react-native/emitter/EventEmitter",
      "react-native/Libraries/EventEmitter/NativeEventEmitter$":
        "react-native-web/dist/vendor/react-native/NativeEventEmitter",
    };

    webpackConfig.resolve.extensions = [
      ".web.js",
      ".web.jsx",
      ".web.ts",
      ".web.tsx",
      ...(webpackConfig.resolve.extensions ?? []),
    ];

    if (!webpackConfig.plugins) {
      webpackConfig.plugins = [];
    }

    // Expose __DEV__ from Metro.
    webpackConfig.plugins.push(
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(process.env.NODE_ENV !== "production"),
      }),
    );

    return webpackConfig;
  },
};

module.exports = nextConfig;

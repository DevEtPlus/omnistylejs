module.exports = (api) => {
  api.cache(true);

  return {
    presets: [["babel-preset-expo", { jsxRuntime: "automatic" }]],

    plugins: [require.resolve("expo-router/babel")],
  };
};

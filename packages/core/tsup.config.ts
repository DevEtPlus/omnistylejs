import { defineConfig } from "tsup";

import { config } from "../../tsup.config";

export default defineConfig((opts) => [
  ...config(opts, {
    commonOpts: {
      name: "@omnistylejs/core",
    },
  }),
]);

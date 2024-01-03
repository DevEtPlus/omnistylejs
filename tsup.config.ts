import fs from "fs";
import path from "path";

import { Options } from "tsup";

const common: Options = {
  target: "esnext",
  dts: true,
  sourcemap: true,
  minify: true,
  entry: ["src", "!src/**/*.test.*", "!src/**__test__/**"],
  external: ["react", "react-dom", "react-native", "react-native-web"],
  esbuildOptions: (option) => {
    // Needed to prevent auto-replacing of process.env.NODE_ENV in all builds
    option.platform = "neutral";
    // Needed to return to normal lookup behavior when platform: 'neutral'
    option.mainFields = ["browser", "module", "main"];
    option.conditions = ["browser"];
    option.banner = {
      js: `"use client";`,
    };
  },
};

export const config = (
  opts: Options,
  otherOpts?: {
    commonOpts?: Options;
    cjsOpts?: Options;
    esmOpts?: Options;
  },
): Options[] => [
  {
    ...common,
    clean: !opts.watch,
    format: "cjs",
    define: { __ESM__: "false" },
    bundle: false,
    ...otherOpts?.commonOpts,
    ...otherOpts?.cjsOpts,
  },
  {
    ...common,
    clean: !opts.watch,
    format: "esm",
    define: { __ESM__: "true" },
    bundle: true,
    esbuildPlugins: [
      {
        name: "add-extension",
        setup(build) {
          build.onResolve({ filter: /.*/ }, (args) => {
            const fileExtension = ".ts";
            const extension = ".mjs";

            if (args.importer) {
              const p = path.join(args.resolveDir, args.path);

              let tsPath = `${p}${fileExtension}`;
              let tsxPath = `${p}${fileExtension}x`;

              let importPath = "";

              if (fs.existsSync(tsPath) || fs.existsSync(tsxPath)) {
                importPath = args.path + extension;
              } else {
                tsPath = path.join(
                  args.resolveDir,
                  args.path,
                  `index${fileExtension}`,
                );
                tsxPath = path.join(
                  args.resolveDir,
                  args.path,
                  `index${fileExtension}x`,
                );

                if (fs.existsSync(tsPath) || fs.existsSync(tsxPath)) {
                  importPath = `${args.path}/index${extension}`;
                }
              }

              return { path: importPath, external: true };
            }
          });
        },
      },
    ],
    ...otherOpts?.commonOpts,
    ...otherOpts?.cjsOpts,
  },
];

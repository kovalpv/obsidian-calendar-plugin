import builtins from "builtin-modules";
import esbuild from "esbuild";
import process from "process";

const banner = `/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/
`;

import fs from "fs";

const renamePlugin = () => ({
  name: "rename-plugin",
  setup(build) {
    build.onEnd(async () => {
      try {
        fs.renameSync("./dist/main.css", "./dist/styles.css");
        console.log("Renamed main.css to styles.css");
      } catch (e) {
        console.error("Failed to rename file:", e);
      }
    });
  }
});

const prod = process.argv[2] === "production";

const context = await esbuild.context({
  banner: {
    js: banner
  },
  entryPoints: ["src/main.tsx"],
  bundle: true,
  external: [
    "obsidian",
    "electron",
    "@codemirror/autocomplete",
    "@codemirror/collab",
    "@codemirror/commands",
    "@codemirror/language",
    "@codemirror/lint",
    "@codemirror/search",
    "@codemirror/state",
    "@codemirror/view",
    "@lezer/common",
    "@lezer/highlight",
    "@lezer/lr",
    ...builtins
  ],
  format: "cjs",
  target: "es2018",
  logLevel: "info",
  sourcemap: prod ? false : "inline",
  treeShaking: true,
  outfile: "dist/main.js",
  minify: prod,
  plugins: [renamePlugin()]
});

if (prod) {
  await context.rebuild();
  process.exit(0);
} else {
  await context.watch();
}

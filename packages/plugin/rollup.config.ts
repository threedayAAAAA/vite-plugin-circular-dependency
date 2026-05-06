import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import html from "rollup-plugin-html";

export default {
  input: "src/index.ts",
  external: ["chalk", "@rollup/pluginutils", /^node:/],
  output: [
    {
      file: "dist/index.mjs",
      format: "esm",
    },
    {
      file: "dist/index.cjs",
      format: "cjs",
    },
  ],
  plugins: [
    html({
      include: "**/*.html", // 包含所有 HTML 文件
    }),
    typescript({
      tsconfig: "./tsconfig.json",
      compilerOptions: {
        module: "ESNext",
      },
    }),
    terser(),
  ],
};

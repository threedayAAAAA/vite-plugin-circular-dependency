import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import circleDependency from "vite-plugin-circular-dependency";

export default defineConfig({
  plugins: [
    vue(),
    circleDependency({
      outputFilePath: "./circleDep",
      circleImportThrowErr: true,
      // ignoreDynamicImport: true,
      // exclude: ["src/dasync_module/indirectCircleDep/router/config.ts"],
    }),
  ],
});

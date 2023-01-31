import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import circleDependency from 'rollup-plugin-circular-dependency'

export default defineConfig({
  plugins: [
    vue(),
    circleDependency({
        exclude: './src/sync_module/circleDep/*',
        outputFilePath: './circleDep'
    })
  ],
})

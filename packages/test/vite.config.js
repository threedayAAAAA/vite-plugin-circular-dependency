import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import circleDependency from '../plugin/index'
import circleDependency from 'vite-plugin-circular-dependency'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    circleDependency()
  ],
})

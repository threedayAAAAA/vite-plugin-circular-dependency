import typescript from  '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.mjs', 
        format: 'esm', 
      }, {
        file: 'dist/index.cjs.js', 
        format: 'cjs', 
      }, {
        file: 'dist/index.umd.js',
        name: 'GLWidget',
        format: 'umd',
      }
    ],
    plugins: [
        typescript(),
        terser()
    ]
  }
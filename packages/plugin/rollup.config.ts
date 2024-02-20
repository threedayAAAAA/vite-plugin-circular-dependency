import typescript from  'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.mjs', 
        format: 'esm', 
      }, 
      {
        file: 'dist/index.cjs', 
        format: 'cjs', 
      }, 
      {
        file: 'dist/index.umd.js',
        name: 'CircularDependency',
        format: 'umd',
      }
    ],
    plugins: [
        typescript({
            tsconfigOverride: {
                compilerOptions: {
                    module: 'ESNext',
                },
            },
            useTsconfigDeclarationDir: true,
        }),
        terser()
    ]
  }
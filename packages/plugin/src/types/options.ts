import type { FilterPattern } from '@rollup/pluginutils'

export interface Options {
    /**
     * The file address of the scan result output, the default console print
     */
    outputFilePath?: string
  
    /**
     * Rules to include transforming target.
     *
     * @default [/\.[jt]sx?$/, /\.vue\??/]
     */
    include?: FilterPattern

    /**
     * Rules to exclude scan target.
     *
     * @default [/node_modules/, /\.git/]
     */
    exclude?: FilterPattern
  }
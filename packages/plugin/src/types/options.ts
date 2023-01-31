import type { FilterPattern } from '@rollup/pluginutils'

export interface Options {
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

    /**
     * The file address of the scan result output, the default console print
     */
    outputFilePath?: string

    /**
     * Whether the scan result shows the absolute path of the module
     *
     * @default false
     */
    moduleAbsolutePath?: boolean
  }
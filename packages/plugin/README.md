## rollup-plugin-circular-dependency

### Installation

Run

> npm i --dev rollup-plugin-circular-dependency

or  

> yarn add --dev rollup-plugin-circular-dependency

or  

> pnpm i --dev rollup-plugin-circular-dependency

## Usage

Create a `rollup.config.js` [configuration file](https://www.rollupjs.org/guide/en/#configuration-files) and import the plugin:

```js
import circleDependency from 'rollup-plugin-circular-dependency'

export default {
  input: 'src/index.js',
  output: {
    dir: 'output',
    format: 'cjs'
  },
  plugins: [circleDependency()]
};
```
## Options

```js
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
```

## Meta
[LICENSE (MIT)](./LICENSE)
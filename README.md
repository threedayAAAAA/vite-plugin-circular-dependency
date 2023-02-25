# vite-plugin-circular-dependency

## Introduce
A build-time vite plugin that can check circular imports, self-introductions, is compatible with dynamic imports or static imports, and has nothing to do with the front-end framework

## DEMO

```js
// Configure the output path, 
// a scan report will be generated to the specified path
export default defineConfig({
  plugins: [
    vue(),
    circleDependency({
        outputFilePath: './circleDep'
    })
  ],
})
```

![image](https://user-images.githubusercontent.com/38604634/221328375-8dc381f1-6895-4875-93a0-d3d675153894.png)

```js
// Without any configuration, it will be printed on the console
export default defineConfig({
  plugins: [
    circleDependency()
  ],
})
```

![image](https://user-images.githubusercontent.com/38604634/221328836-62b58f09-c11c-4429-a143-e92ef9aefa9f.png)


## Installation

```ts
npm i -D vite-plugin-circular-dependency
// yarn add --dev vite-plugin-circular-dependency
// pnpm i --dev vite-plugin-circular-dependency
```
## Usage

Please use this plugin when building

In your `vite.config.(js|ts)` import the plugin and register it.

```typescript
import { defineConfig } from 'vite'
import circleDependency from 'vite-plugin-circular-dependency'

export default defineConfig({
  plugins: [
    circleDependency()
  ],
})
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
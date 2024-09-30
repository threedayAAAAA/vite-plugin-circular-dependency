## vite-plugin-circular-dependency

English | [中文](README_zh.md)

A framework-agnostic build-time Vite plugin designed to detect circular imports and self-references, compatible with dynamic and static imports.

### DEMO

```js
// Configure the output path,
// a scan report will be generated to the specified path
export default defineConfig({
  plugins: [
    circleDependency({
      outputFilePath: "./circleDep",
    }),
  ],
});
```

![image](https://user-images.githubusercontent.com/38604634/221328375-8dc381f1-6895-4875-93a0-d3d675153894.png)

```js
// Without any configuration, it will be printed on the console
export default defineConfig({
  plugins: [circleDependency()],
});
```

![image](https://user-images.githubusercontent.com/38604634/221328836-62b58f09-c11c-4429-a143-e92ef9aefa9f.png)

### Installation

```ts
npm i -D vite-plugin-circular-dependency
// yarn add --dev vite-plugin-circular-dependency
// pnpm i --dev vite-plugin-circular-dependency
```

### Usage

Please use this plugin when building

In your `vite.config.(js|ts)` import the plugin and register it.

```typescript
import { defineConfig } from "vite";
import circleDependency from "vite-plugin-circular-dependency";

export default defineConfig({
  plugins: [circleDependency()],
});
```

### Options

```ts
export interface Options {
  /**
   * Rules to include transforming target.
   *
   * @default [/\.[jt]sx?$/, /\.vue\??/]
   */
  include?: FilterPattern;

  /**
   * Rules to exclude scan target.
   *
   * @default [/node_modules/, /\.git/]
   */
  exclude?: FilterPattern;

  /**
   * The file address of the scan result output, the default console print
   */
  outputFilePath?: string;

  // If configured, will output the products of circular references as an interactive HTML application to the specified address
  outputInteractiveFilePath?: string;

  /**
   * Whether to throw an error when a circular import exists
   *
   * @default true
   */
  circleImportThrowErr?: boolean;

  /**
   * Format the path of the output node.
   * By default, vite.config will be used as the root path to generate a relative path
   *
   * @default function
   */
  formatOutModulePath?: (path: string) => string;

  /**
   * The result of formatted output
   * will also affect the data format in the console print or output file
   *
   * @default (data: CircleData) => data
   */
  formatOut?: (data: CircleData) => any;

  /**
   * Whether to ignore dynamic imports during the scan.
   *
   * @default false
   *
   * If the file has the @circular-ignore tag, the module will also be ignored for circular dependency scanning.
   * Example:
   * // @circular-ignore
   * import { example } from './exampleModule';
   */
  ignoreDynamicImport?: boolean;
}
```

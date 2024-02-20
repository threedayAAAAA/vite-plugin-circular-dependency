## vite-plugin-circular-dependency

与框架无关的构建时 Vite 插件，旨在检测循环导入和自引用，兼容动态和静态导入。

### 示例

```js
// 配置输出路径，
// 扫描报告将生成到指定路径
export default defineConfig({
  plugins: [
    circleDependency({
        outputFilePath: './circleDep'
    })
  ],
})
```

![image](https://user-images.githubusercontent.com/38604634/221328375-8dc381f1-6895-4875-93a0-d3d675153894.png)

```js
// 如果没有任何配置，结果将打印在控制台上
export default defineConfig({
  plugins: [
    circleDependency()
  ],
})
```

![image](https://user-images.githubusercontent.com/38604634/221328836-62b58f09-c11c-4429-a143-e92ef9aefa9f.png)


### 安装

```ts
npm i -D vite-plugin-circular-dependency
// yarn add --dev vite-plugin-circular-dependency
// pnpm i --dev vite-plugin-circular-dependency
```
### 使用方法

请在构建时使用此插件。

在您的 `vite.config.(js|ts)` 中导入插件并注册它。

```typescript
import { defineConfig } from 'vite'
import circleDependency from 'vite-plugin-circular-dependency'

export default defineConfig({
  plugins: [
    circleDependency()
  ],
})
```

### 配置选项

```ts
export interface Options {
    /**
     * 包含转换目标的规则。
     *
     * @default [/\.[jt]sx?$/, /\.vue\??/]
     */
    include?: FilterPattern

    /**
     * 排除扫描目标的规则。
     *
     * @default [/node_modules/, /\.git/]
     */
    exclude?: FilterPattern

    /**
     * 扫描结果输出的文件地址，默认为控制台打印。
     */
    outputFilePath?: string

    /**
     * 当存在循环导入时是否抛出错误。
     *
     * @default true
     */
    circleImportThrowErr?: boolean

    /**
     * 格式化输出节点路径。
     * 默认情况下，会使用 vite.config 作为根路径生成相对路径。
     *
     * @default function
     */
    formatOutModulePath?: (path: string) => string

    /**
     * 格式化输出结果。
     * 这也会影响控制台打印或输出文件中的数据格式。
     *
     * @default (data: CircleData) => data
     */
    formatOut?: (data: CircleData) => any
}
```
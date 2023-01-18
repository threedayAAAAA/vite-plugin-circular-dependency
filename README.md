# vite-plugin-circular-dependency
Detect circular dependencies in vite projects

### Installation

Run

> npm i -D vite-plugin-circular-dependency

or  

> yarn add --dev vite-plugin-circular-dependency

or  

> pnpm i --dev vite-plugin-circular-dependency

### Usage

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
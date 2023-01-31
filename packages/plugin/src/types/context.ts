import type { ModuleNode } from '../module/moduleNode'
import type { initRootModuleNode } from '../util'
import type { Options } from './options'

export type Context = {
    filter: (id: string) => boolean,
    moduleIdNodeMap: Map<string, ModuleNode>
} 
& ReturnType<typeof initRootModuleNode> 
& Required<Options>
import type { ModuleNode } from '../module/moduleNode'
import type { initRootModuleId } from '../util'
import type { Options } from './options'

export type Context = {
    filter: (id: string) => boolean,
    moduleIdNodeMap: Map<string, ModuleNode>
} 
& ReturnType<typeof initRootModuleId> 
& Required<Options>
import type { ModuleInfo } from './util/moduleNode'
import type { Options } from "./types/options";
import type { Plugin } from 'vite';

import { 
    generateModuleTree, generateCircleNodeMap, processCircleNodes,
    generateModuleNode 
} from './util'
import { createContext }  from './context'

export default (options: Options) => {
    const ctx = createContext(options)
    const { 
        filter,
        getRootModuleNode,
        handleLoadModule,
        moduleIdNodeMap
     } = ctx
    return {
        name: 'vite-plugin-circular-dependency',
        load: (id: string) => {
            if(!filter(id)){
                return
            }

            handleLoadModule(id)
        },
        moduleParsed: (moduleInfo: ModuleInfo) => {
            const { id } = moduleInfo
            if(!filter(id)){
                return
            }
            const moduleNode = generateModuleNode(moduleInfo)
            moduleIdNodeMap.set(moduleInfo.id, moduleNode)
        },
        generateBundle(){
            const rootModuleNode = getRootModuleNode()
            if(!rootModuleNode){
                console.error('Failed to generate entry module');
                return
            }
            /** generate module dependency tree */
            generateModuleTree(rootModuleNode, moduleIdNodeMap)
            /** generate a map of circle nodes */
            const circleNodeMap = generateCircleNodeMap(rootModuleNode)
            processCircleNodes (ctx, circleNodeMap)
        }
    } as unknown as Plugin
}
import type { ModuleInfo } from './interface'
import type { Options } from "./types/options";

import { 
    generateModuleTree, generateCircleNodeMap, printCircleNodes,
    generateModuleNode 
} from './util'
import { createContext }  from './context'

export default (options: Options) => {
    const { 
        filter,
        getRootModuleNode,
        setRootModuleNode,
        moduleIdNodeMap
     } = createContext(options)
    return {
        name: 'vite-plugin-circular-dependency',
        moduleParsed: (moduleInfo: ModuleInfo) => {
            const { id } = moduleInfo
            if(!filter(id)){
                return
            }
            const moduleNode = generateModuleNode(moduleInfo)
            setRootModuleNode(moduleNode)
            moduleIdNodeMap.set(moduleInfo.id, moduleNode)
        },
        generateBundle(){
            const rootModuleNode = getRootModuleNode()
            if(!rootModuleNode){
                console.error('Failed to generate entry module');
                return
            }
            /** 生成模块的依赖树 */
            generateModuleTree(rootModuleNode, moduleIdNodeMap)
            /** 生成模块成环节点的map */
            const circleNodeMap = generateCircleNodeMap(rootModuleNode)
            /** 打印成环的节点 */
            printCircleNodes(circleNodeMap)
        }
    }
}
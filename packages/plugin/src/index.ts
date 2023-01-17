import type { ModuleInfo } from './interface'

import { 
    generateModuleTree, generateCircleNodeMap, printCircleNodes,
    initRootModuleNode, generateModuleNode 
} from './util'
import { ModuleNode } from './module/moduleNode'

const { getRootModuleNode, setRootModuleNode } = initRootModuleNode()
const moduleIdNodeMap = new Map<string, ModuleNode>()

export default () => {
    return {
        name: 'vite-plugin-circular-dependency',
        moduleParsed: (moduleInfo: ModuleInfo) => {
            const moduleNode = generateModuleNode(moduleInfo)
            setRootModuleNode(moduleNode)
            moduleIdNodeMap.set(moduleInfo.id, moduleNode)
        },
        generateBundle(){
            console.log('===================generateBundle================');
            
            const rootModuleNode = getRootModuleNode()
            if(!rootModuleNode){
                console.error('xxx 文案待定');
                return
            }
            /** 生成模块的依赖树 */
            generateModuleTree(rootModuleNode, moduleIdNodeMap)
            /** 生成模块成环节点的map */
            const circleNodeMap = generateCircleNodeMap(rootModuleNode)
            console.log('===================circleNodeMap================');
            console.log(circleNodeMap);
            /** 打印成环的节点 */
            printCircleNodes(circleNodeMap)
        }
    }
}
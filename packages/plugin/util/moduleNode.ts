import type { ModuleInfo } from '../interface'

import { ModuleNode } from '../module/moduleNode'

/** 获取模块所有引用的 模块id */
export function getModuleImportIds(moduleInfo: ModuleInfo): string[]{
    const { importedIds, dynamicallyImportedIds } = moduleInfo
    return [...importedIds, ...dynamicallyImportedIds]
}

/** 生产模块节点的工厂函数 */
export function generateModuleNode(moduleInfo: ModuleInfo){
    const importerModuleIds = getModuleImportIds(moduleInfo)
    const { id } = moduleInfo
    return new ModuleNode(id, importerModuleIds)
}

export function initRootModuleNode(){
    let rootModuleNode: ModuleNode | null
    return {
        getRootModuleNode(){
            return rootModuleNode
        },
        setRootModuleNode(moduleNode: ModuleNode){
            if(!rootModuleNode){
                rootModuleNode = moduleNode
            }
        }
    }
}
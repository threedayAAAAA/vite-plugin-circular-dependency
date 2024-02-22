import { ModuleNode } from '../module/moduleNode'

export type ModuleInfo = {
    id: string;
    importedIds: string[];
    dynamicallyImportedIds: string[]
}

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

export function initRootModuleId(){
    let rootModuleId: string
    return {
        getRootModuleId(){
            return rootModuleId
        },
        setRootModuleId(moduleId: string){
            if(!rootModuleId){
                rootModuleId = moduleId
            }
        }
    }
}
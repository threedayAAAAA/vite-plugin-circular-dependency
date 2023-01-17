export class ModuleNode{
    public moduleId: string;
    public importerModuleIds: string[]
    public children: Set<ModuleNode> | null

    constructor(moduleId: string, importerModuleIds: string[]){
        this.moduleId = moduleId
        this.importerModuleIds = importerModuleIds
    }
}
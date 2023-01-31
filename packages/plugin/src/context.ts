import type { Options } from "./types/options";
import type { ModuleNode } from './module/moduleNode'

import { createFilter } from '@rollup/pluginutils'
import { initRootModuleNode } from './util'

export function createContext(options: Options){
    const formatedOptions = formatOptions(options)
    
    const { include, exclude } = formatedOptions
    const filter = createFilter(include, exclude)

    const { getRootModuleNode, setRootModuleNode, moduleIdNodeMap } = initModule()
    return {
        filter,
        getRootModuleNode,
        setRootModuleNode,
        moduleIdNodeMap
    }
}

function formatOptions(options: Options): Options{
    const { 
        include = [/\.[jt]sx?$/, /\.vue$/, /\.vue\?vue/, /\.svelte$/], 
        exclude = [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/] 
    } = options
    return {
        include,
        exclude
    }
}

function initModule(){
    const { getRootModuleNode, setRootModuleNode } = initRootModuleNode()
    const moduleIdNodeMap = new Map<string, ModuleNode>()
    return {
        getRootModuleNode,
        setRootModuleNode,
        moduleIdNodeMap
    }
}

import type { Options, Context } from "./types";
import type { ModuleNode } from './module/moduleNode'

import { createFilter } from '@rollup/pluginutils'
import { initRootModuleNode } from './util'
import { join } from 'node:path'

export function createContext(options: Options): Context{
    const formatedOptions = formatOptions(options)
    
    const { include, exclude } = formatedOptions
    const filter = createFilter(include, exclude)

    const { getRootModuleNode, setRootModuleNode, moduleIdNodeMap } = initModule()
    return {
        ...formatedOptions,
        filter,
        getRootModuleNode,
        setRootModuleNode,
        moduleIdNodeMap
    }
}

function formatOptions(options: Options): Required<Options>{
    let { 
        include = [/\.[jt]sx?$/, /\.vue$/, /\.vue\?vue/, /\.svelte$/], 
        exclude = [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/],
        outputFilePath = '',
        moduleAbsolutePath = false,
        circleImportThrowErr = true
    } = options
    if(outputFilePath){
        outputFilePath = join(process.cwd(), outputFilePath)
    }
    return {
        include,
        exclude,
        outputFilePath,
        moduleAbsolutePath,
        circleImportThrowErr
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

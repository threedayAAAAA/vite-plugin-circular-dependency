import type { Options, Context, CircleData } from "./types";
import type { ModuleNode } from './module/moduleNode'

import { createFilter } from '@rollup/pluginutils'
import { initRootModuleNode } from './util'
import { join } from 'node:path'
import { relative } from 'node:path'

export function createContext(options: Options): Context{
    const formattedOptions = formatOptions(options)
    
    const { include, exclude } = formattedOptions
    const filter = createFilter(include, exclude)

    const { getRootModuleNode, setRootModuleNode, moduleIdNodeMap } = initModule()
    return {
        ...formattedOptions,
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
        circleImportThrowErr = true,
        formatOutModulePath,
        formatOut,
    } = options
    if(outputFilePath){
        outputFilePath = join(process.cwd(), outputFilePath)
    }
    return {
        include,
        exclude,
        outputFilePath,
        circleImportThrowErr,
        formatOutModulePath: formatOutModulePath ?? defaultFormatOutModulePath,
        formatOut: formatOut ?? defaultFormatOut 
    }
}

function defaultFormatOutModulePath(path: string){
    return relative(process.cwd(), path)
}

function defaultFormatOut(data: CircleData){
    return data
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

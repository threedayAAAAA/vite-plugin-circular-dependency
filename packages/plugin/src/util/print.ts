import type { ModuleNode } from '../module/moduleNode'
import type { Context } from '../types'

import chalk from 'chalk'
import { writeFileSync } from 'node:fs'

/** 打印成环的节点 */
export function printCircleNodes(ctx: Context, circleNodesMap: Map<string, ModuleNode[]>){
    const circleNodes = Array.from(circleNodesMap.values()).filter(item => item.length)
    const groupByEntry = circleNodes.reduce((pre, curNodes) => {
        const { moduleId: entryModuleId } = curNodes[0]
        if(!pre[entryModuleId]){
            pre[entryModuleId] = []
        }
        pre[entryModuleId].push(curNodes) 
        return pre
    }, {} as Record<string, ModuleNode[][]>)
    const entries = Object.entries(groupByEntry)
    if(!entries.length){
        return 
    }
    if(ctx.outputFilePath){ 
        outputToFile(ctx, entries)
    } else {
        consolePrint(ctx, entries)
    }
    if(ctx.circleImportThrowErr){
        throw new Error('has circular dependencies in this project')
    }
}

/** 输出至文件 */
export function outputToFile(ctx: Context, entries: [string, ModuleNode[][]][]){
    let result = ''
    entries.forEach(item => {
        const [entryModuleId, moduleNodes] = item
        result += `${getModulePath(ctx, entryModuleId)}\n`
        moduleNodes.forEach(currentCir => {
            result += currentCir.map(node => getModulePath(ctx, node.moduleId))
                        .map(item => `\t${item}`)
                        .join('->\n')
        })
        result += '\n\n'
    })
    writeFileSync(ctx.outputFilePath, result)
}

/** 控制台打印 */
export function consolePrint(ctx: Context, entries: [string, ModuleNode[][]][]){
    entries.forEach(item => {
        const [entryModuleId, moduleNodes] = item
        console.group()
        console.log('\n\n' + chalk.yellow(getModulePath(ctx, entryModuleId)))
        moduleNodes.forEach(currentCir => {
            console.log('\t' + currentCir.map(node => chalk.red(getModulePath(ctx, node.moduleId))).join(chalk.blue('->')))
        })
        console.groupEnd()
    })
}
const commonPre = process.cwd().replaceAll('\\','/')
/** 获取模块路径 */
function getModulePath(ctx: Context, path: string){
    return ctx.moduleAbsolutePath ? path : path.replace(commonPre, '')
}
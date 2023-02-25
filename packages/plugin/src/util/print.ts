import type { ModuleNode } from '../module/moduleNode'
import type { Context } from '../types'

import chalk from 'chalk'
import { writeFileSync } from 'node:fs'

type CircleData = Record<string, ModuleNode['moduleId'][][]>

/** 打印成环的节点 */
export function printCircleNodes(ctx: Context, circleNodesMap: Map<string, ModuleNode[]>){
    const data = formatData(ctx, circleNodesMap)
    print(ctx, data)
    validateCircleData(ctx, data)
}

function validateCircleData(ctx: Context, data: CircleData){
    if(ctx.circleImportThrowErr && data.length){
        throw new Error('has circular dependencies in this project')
    }
}

/** 格式化成环节点的数据 */
function formatData(ctx: Context, data: Map<string, ModuleNode[]>): CircleData{
    return ctx.formatOut(
        groupByFirstNodePath(
            transformNodeData(ctx, 
                filterNodes(data)
            )
        )
    )
}

function filterNodes(circleNodesMap: Map<string, ModuleNode[]>){
    return Array.from(circleNodesMap.values()).filter(item => item.length)
}

function transformNodeData(ctx: Context, data: ModuleNode[][]): ModuleNode['moduleId'][][]{
    return data.map(nodeArr => nodeArr.map(item => formateNodesPath(ctx, item)))
}

function formateNodesPath(ctx: Context, node: ModuleNode){
    return getModulePath(ctx, node.moduleId)
}

function groupByFirstNodePath(data: ModuleNode['moduleId'][][]){
    return data.reduce((pre, curNodes) => {
        const firstNodeId = curNodes[0]
        if(!pre[firstNodeId]){
            pre[firstNodeId] = []
        }
        pre[firstNodeId].push(curNodes)
        return pre
    }, {} as Record<string, ModuleNode['moduleId'][][]>)
}


function print(ctx: Context, data: CircleData){
    ctx.outputFilePath ? outputToFile(ctx, data): consolePrint(ctx, data)
}

/** 输出至文件 */
function outputToFile(ctx: Context, data: CircleData){
    writeFileSync(ctx.outputFilePath, JSON.stringify(data, null, '\t'))
}

/** 控制台打印 */
function consolePrint(ctx: Context, data: CircleData){
    Object.entries(data).forEach(item => {
        const [entryModuleId, moduleNodes] = item
        console.group()
        console.log('\n\n' + chalk.yellow(getModulePath(ctx, entryModuleId)))
        moduleNodes.forEach(currentCir => {
            console.log('\t' + currentCir.map(node => chalk.red(node)).join(chalk.blue('->')))
        })
        console.groupEnd()
    })
}

const commonPre = process.cwd().replaceAll('\\','/')
/** 获取模块路径 */
function getModulePath(ctx: Context, path: string){
    return ctx.moduleAbsolutePath ? path : path.replace(commonPre, '')
}
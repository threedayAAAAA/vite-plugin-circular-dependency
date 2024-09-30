import type { ModuleNode } from "../module/moduleNode";
import type { Context } from "../types";

import chalk from "chalk";
import { writeFileSync } from "node:fs";
import { writeDataToInteractiveFile } from "./interactive";

type CircleData = Record<string, ModuleNode["moduleId"][][]>;

/** handle circle nodes */
export function processCircleNodes(
  ctx: Context,
  circleNodesMap: Map<string, ModuleNode[]>
) {
  const data = formatData(ctx, circleNodesMap);
  outputCircleData(ctx, data);
  validateCircleData(ctx, data);
}

function validateCircleData(ctx: Context, data: CircleData) {
  if (ctx.circleImportThrowErr && Object.keys(data).length) {
    throw new Error("has circular dependencies in this project");
  }
}

function formatData(ctx: Context, data: Map<string, ModuleNode[]>): CircleData {
  const moduleNodeIDs = transformNodeData(ctx, filterNodes(data));
  const groupedNodeIDs = groupByFirstNodePath(moduleNodeIDs);
  return ctx.formatOut(groupedNodeIDs);
}

function filterNodes(circleNodesMap: Map<string, ModuleNode[]>) {
  return Array.from(circleNodesMap.values()).filter((item) => item.length);
}

function transformNodeData(
  ctx: Context,
  data: ModuleNode[][]
): ModuleNode["moduleId"][][] {
  return data.map((nodeArr) =>
    nodeArr.map((item) => ctx.formatOutModulePath(item.moduleId))
  );
}

function groupByFirstNodePath(data: ModuleNode["moduleId"][][]) {
  return data.reduce((pre, curNodes) => {
    const firstNodeId = curNodes[0];
    if (!pre[firstNodeId]) {
      pre[firstNodeId] = [];
    }
    pre[firstNodeId].push(curNodes);
    return pre;
  }, {} as Record<string, ModuleNode["moduleId"][][]>);
}

function outputCircleData(ctx: Context, data: CircleData) {
  const { outputFilePath, outputInteractiveFilePath } = ctx;
  outputFilePath ? outputToFile(ctx, data) : consolePrint(ctx, data);
  if (outputInteractiveFilePath) {
    writeDataToInteractiveFile(data, outputInteractiveFilePath);
  }
}

function outputToFile(ctx: Context, data: CircleData) {
  writeFileSync(ctx.outputFilePath, JSON.stringify(data, null, "\t"));
}

function consolePrint(ctx: Context, data: CircleData) {
  Object.entries(data).forEach((item) => {
    const [entryModuleId, moduleNodes] = item;
    console.group();
    console.log("\n\n" + chalk.yellow(ctx.formatOutModulePath(entryModuleId)));
    moduleNodes.forEach((currentCir) => {
      console.log(
        "\t" +
          currentCir.map((node) => chalk.red(node)).join(chalk.blue(" -> "))
      );
    });
    console.groupEnd();
  });
}

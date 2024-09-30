import type { Options, Context, CircleData } from "./types";
import type { ModuleNode } from "./module/moduleNode";

import { createFilter } from "@rollup/pluginutils";
import { initRootModuleId } from "./util";
import { join } from "node:path";
import { relative } from "node:path";

export function createContext(options?: Options): Context {
  const formattedOptions = formatOptions(options);

  const { ignoreModuleIdSet, processIgnore } = initIgnoreModule();
  const { include, exclude } = formattedOptions;
  const rollupFilter = createFilter(include, exclude);

  const filter = (id: string) => rollupFilter(id) && !ignoreModuleIdSet.has(id);
  const { getRootModuleNode, handleLoadModule, moduleIdNodeMap } = initModule();

  return {
    ...formattedOptions,
    filter,
    getRootModuleNode,
    handleLoadModule,
    processIgnore,
    moduleIdNodeMap,
  };
}

function formatOptions(options?: Options): Required<Options> {
  let {
    include = [/\.[jt]sx?$/, /\.vue$/, /\.vue\?vue/, /\.svelte$/],
    exclude = [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/],
    outputFilePath = "",
    circleImportThrowErr = true,
    formatOutModulePath,
    formatOut,
    ignoreDynamicImport = false,
  } = options ?? {};
  if (outputFilePath) {
    outputFilePath = join(process.cwd(), outputFilePath);
  }
  return {
    include,
    exclude,
    outputFilePath,
    circleImportThrowErr,
    ignoreDynamicImport,
    formatOutModulePath: formatOutModulePath ?? defaultFormatOutModulePath,
    formatOut: formatOut ?? defaultFormatOut,
  };
}

function defaultFormatOutModulePath(path: string) {
  return relative(process.cwd(), path);
}

function defaultFormatOut(data: CircleData) {
  return data;
}

function initModule() {
  const { getRootModuleId, setRootModuleId } = initRootModuleId();
  const moduleIdNodeMap = new Map<string, ModuleNode>();
  return {
    getRootModuleNode: () => moduleIdNodeMap.get(getRootModuleId()),
    handleLoadModule: setRootModuleId,
    moduleIdNodeMap,
  };
}

function initIgnoreModule() {
  const ignoreFileReg = /@circular-ignore/gi;
  const ignoreFilter = (code: string) => ignoreFileReg.test(code);

  const ignoreModuleIdSet = new Set<string>();
  const processIgnore = (moduleId: string, code: string) => {
    if (ignoreFilter(code)) {
      ignoreModuleIdSet.add(moduleId);
    }
  };

  return {
    ignoreModuleIdSet,
    processIgnore,
  };
}

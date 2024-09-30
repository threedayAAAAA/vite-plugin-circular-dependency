import type { Context } from "../types";

import { ModuleNode } from "../module/moduleNode";

export type ModuleInfo = {
  id: string;
  importedIds: string[];
  dynamicallyImportedIds: string[];
  code: string | null;
};

/** Get all imported module ids of the module */
export function getModuleImportIds(
  moduleInfo: ModuleInfo,
  ctx: Context
): string[] {
  const { importedIds, dynamicallyImportedIds } = moduleInfo;
  return ctx.ignoreDynamicImport
    ? importedIds
    : [...importedIds, ...dynamicallyImportedIds];
}

/** Factory function to generate module nodes */
export function generateModuleNode(moduleInfo: ModuleInfo, ctx: Context) {
  const importerModuleIds = getModuleImportIds(moduleInfo, ctx);
  const { id } = moduleInfo;
  return new ModuleNode(id, importerModuleIds);
}

export function initRootModuleId() {
  let rootModuleId: string;
  return {
    getRootModuleId() {
      return rootModuleId;
    },
    setRootModuleId(moduleId: string) {
      if (!rootModuleId) {
        rootModuleId = moduleId;
      }
    },
  };
}

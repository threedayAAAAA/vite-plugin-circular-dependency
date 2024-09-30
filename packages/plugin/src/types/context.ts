import type { ModuleNode } from "../module/moduleNode";
import type { Options } from "./options";

export type Context = {
  filter: (id: string) => boolean;
  getRootModuleNode: () => ModuleNode | undefined;
  handleLoadModule: (moduleId: string) => void;
  moduleIdNodeMap: Map<string, ModuleNode>;
  processIgnore: (id: string, code: string) => void;
} & Required<Options>;

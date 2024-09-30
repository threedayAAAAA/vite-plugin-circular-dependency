import type { FilterPattern } from "@rollup/pluginutils";
import type { ModuleNode } from "../module/moduleNode";

export type CircleData = Record<string, ModuleNode["moduleId"][][]>;

export interface Options {
  /**
   * Rules to include transforming target.
   *
   * @default [/\.[jt]sx?$/, /\.vue\??/]
   */
  include?: FilterPattern;

  /**
   * Rules to exclude scan target.
   *
   * @default [/node_modules/, /\.git/]
   */
  exclude?: FilterPattern;

  /**
   * The file address of the scan result output, the default console print
   */
  outputFilePath?: string;

  // If configured, will output the products of circular references as an interactive HTML application to the specified address
  outputInteractiveFilePath?: string;

  /**
   * Whether to throw an error when a circular import exists
   *
   * @default true
   */
  circleImportThrowErr?: boolean;

  /**
   * Format the path of the output node.
   * By default, vite.config will be used as the root path to generate a relative path
   *
   * @default function
   */
  formatOutModulePath?: (path: string) => string;

  /**
   * The result of formatted output
   * will also affect the data format in the console print or output file
   *
   * @default (data: CircleData) => data
   */
  formatOut?: (data: CircleData) => any;

  /**
   * Whether to ignore dynamic imports during the scan.
   *
   * @default false
   *
   * If the file has the @circular-ignore tag, the module will also be ignored for circular dependency scanning.
   * Example:
   * // @circular-ignore
   * import { example } from './exampleModule';
   */
  ignoreDynamicImport?: boolean;
}

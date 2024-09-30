import { writeFileSync } from "node:fs";
import Template from "./template.html";

export const replaceDataPlaceholder = (data: object) => {
  return Template.replace("{{DATA}}", JSON.stringify(data));
};

export const writeDataToInteractiveFile = (data: object, filePath: string) => {
  const result = replaceDataPlaceholder(data);
  writeFileSync(filePath, result, "utf-8");
};

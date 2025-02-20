import fs from "fs-extra";
import path from "path";

export const readFile = (path: string) => fs.readFileSync(path, "utf-8");

export function withCache<T extends (...args: any[]) => any>(fn: T): T {
  let cachedResult: ReturnType<T> | null = null;

  return ((...args: Parameters<T>) => {
    if (cachedResult !== null) {
      return cachedResult; // Return cached result if available
    }

    // Call the original function and cache its result
    cachedResult = fn(...args);
    return cachedResult;
  }) as T;
}

export function findTsFilesSync(dir: string, nested = false): string[] {
  const files: string[] = [];

  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (nested && stat.isDirectory()) {
      files.push(...findTsFilesSync(fullPath));
    } else if (stat.isFile() && path.extname(item) === ".ts") {
      files.push(fullPath);
    }
  }

  return files;
}

export function getFileNameWithoutExtension(filePath: string): string {
  const fileNameWithExtension = path.basename(filePath);
  const { name } = path.parse(fileNameWithExtension);
  return name;
}

export function getLine(text: string, lineNumber: number): string | null {
  const lines = text.split("\n");

  if (lineNumber < 1 || lineNumber > lines.length) {
    return null;
  }

  return lines[lineNumber - 1];
}

export function camelToKebabCase(str: string): string {
  return str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)
}

export function kebabToCamelCase(str: string): string {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

export function removeMDLinks(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1");
}

// console.log(findTsFilesSync("./hooks"));
// console.log(getFileNameWithoutExtension("hooks\\useTimeout.ts"));

import fs from "fs-extra";
import path from "path";

// Type Definitions
type FileType = { name: string; content: string };
type HookFile = FileType & { dependencies?: string[] };
type HookData = { title: string; files: HookFile[] };

// Cache Wrapper Utility
function withCache<T extends (...args: any[]) => any>(func: T) {
  const cache: Record<string, ReturnType<T>> = {};

  return async function (...args: Parameters<T>): Promise<ReturnType<T>> {
    const key = JSON.stringify(args);
    if (cache[key]) {
      return cache[key];
    }
    const result = await func(...args);
    cache[key] = result;
    return result;
  };
}

// Get all hook files in the folder
async function getHookFiles(hooksFolder: string): Promise<string[]> {
  const files = await fs.readdir(hooksFolder);
  return files.filter((file) => file.startsWith("use") && file.endsWith(".ts"));
}

// Parse a file to find internal and external dependencies
function getHookDependencies(hookPath: string): {
  internal: string[];
  external: string[];
} {
  const content = fs.readFileSync(hookPath, "utf-8");

  const importRegex =
    /^import(?:\s+type)?\s+([^\n]+?)\s+from\s+['"]([^'"]+)['"]/gm;
  const internalDependencies = new Set<string>();
  const externalDependencies = new Set<string>();

  let match: RegExpExecArray | null;

  while ((match = importRegex.exec(content)) !== null) {
    const moduleName = match[2];

    if (moduleName.startsWith("./") || moduleName.startsWith("../")) {
      const internalMatch = moduleName.match(/\.\/(use[a-zA-Z0-9]+)/);
      if (internalMatch) {
        internalDependencies.add(internalMatch[1]);
      }
    } else if (
      moduleName.startsWith("@/") ||
      moduleName.startsWith("~/") ||
      ["react", "react-dom"].includes(moduleName)
    ) {
      continue; // Ignore framework-level imports
    } else {
      externalDependencies.add(moduleName);
    }
  }

  return {
    internal: Array.from(internalDependencies),
    external: Array.from(externalDependencies),
  };
}

// Recursively gather all files and dependencies for a given hook
const getFullDependencyTreeWithFiles = withCache(async function (
  hookName: string,
  hooksFolder: string
): Promise<HookFile[]> {
  const hookPath = path.join(hooksFolder, `${hookName}.ts`);
  const fileContent =
    "https://raw.githubusercontent.com/programming-with-ia/vDocs/master/hooks/" +
    hookName +
    ".ts";
  const { internal: internalDeps, external: externalDeps } =
    getHookDependencies(hookPath);

  const files: HookFile[] = [
    {
      name: `${hookName}.ts`,
      content: fileContent,
      dependencies: externalDeps,
    },
  ];

  for (const dep of internalDeps) {
    const nestedFiles = await getFullDependencyTreeWithFiles(dep, hooksFolder);
    for (const file of nestedFiles) {
      if (!files.some((f) => f.name === file.name)) {
        files.push(file);
      }
    }
  }

  return files;
});

// Combine all dependencies into a single array for top-level
function collectAllDependencies(files: HookFile[]): string[] {
  const dependencies = new Set<string>();
  files.forEach((file) => {
    file.dependencies?.forEach((dep) => dependencies.add(dep));
  });
  return Array.from(dependencies);
}

// Main scanner for hooks folder, prints the final structured JSON
async function scanHooksWithFiles(hooksFolder: string) {
  const hookFiles = await getHookFiles(hooksFolder);
  const hookNames = hookFiles.map((file) => file.replace(".ts", ""));

  const hooksData: (HookData & { dependencies?: string[] })[] = [];

  for (const hookName of hookNames) {
    const files = await getFullDependencyTreeWithFiles(hookName, hooksFolder);
    const dependencies = collectAllDependencies(files);
    hooksData.push({
      title: hookName,
      files: files.map(({ name, content }) => ({ name, content })),
      dependencies: dependencies.length ? dependencies : undefined,
    });
  }

  fs.ensureDirSync(scafloOutputPath);
  for (const hookData of hooksData) {
    const scafloPath = path.join(scafloOutputPath, hookData.title + ".json");
    fs.writeJsonSync(scafloPath, hookData);
  }

  // console.dir(hookData);
  // console.log(JSON.stringify(hookData, null, 2));
}

// Usage
const hooksFolder = "hooks"; // Adjust path as needed
const scafloOutputPath = "scaflo/hooks";
scanHooksWithFiles(hooksFolder).catch(console.error);

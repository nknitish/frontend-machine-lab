#!/usr/bin/env node

import fs from "fs";
import path from "path";

const rootDir = process.cwd();
const componentsDir = path.join(rootDir, "app/components");
const outputFile = path.join(rootDir, "app/registery/playground.ts");

const extensions = [".tsx", ".jsx", ".ts", ".js"];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
      continue;
    }

    if (extensions.includes(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

function getComponentName(filePath) {
  const parsed = path.parse(filePath);

  if (parsed.name === "index") {
    return path.basename(parsed.dir);
  }

  return parsed.name;
}

function toTitle(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function toSlug(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[_\s]+/g, "-")
    .toLowerCase();
}

function toImportName(index) {
  return `component${index}`;
}

function toImportPath(filePath) {
  let relativePath = path
    .relative(path.dirname(outputFile), filePath)
    .replace(/\\/g, "/");

  relativePath = relativePath.replace(/\.(tsx|jsx|ts|js)$/, "");

  // Convert ".../Modal/index" -> ".../Modal"
  relativePath = relativePath.replace(/\/index$/, "");

  return relativePath;
}

function getLevel(filePath) {
  const relativePath = path.relative(componentsDir, filePath);

  const segments = relativePath.split(path.sep).filter(Boolean);

  const levelFromSegment = segments.find((segment) =>
    ["easy", "medium", "advance", "advanced", "hard"].includes(
      segment.toLowerCase(),
    ),
  );

  if (!levelFromSegment) {
    return "easy";
  }

  switch (levelFromSegment.toLowerCase()) {
    case "easy":
      return "easy";
    case "medium":
      return "medium";
    default:
      return "hard";
  }
}

const files = walk(componentsDir)
  .filter((file) => !file.includes(`${path.sep}registery${path.sep}`))
  .filter((file) => !file.endsWith(".d.ts"))
  .sort();

const lines = [];

lines.push('"use client";');
lines.push("");
lines.push('import type { ComponentType } from "react";');
lines.push("");
lines.push("type PlaygroundItem = {");
lines.push("  id: string;");
lines.push("  title: string;");
lines.push("  component: ComponentType<any>;");
lines.push('  level: "easy" | "medium" | "hard";');
lines.push("};");
lines.push("");

files.forEach((file, index) => {
  lines.push(`import ${toImportName(index)} from "${toImportPath(file)}";`);
});

lines.push("");
lines.push("export const playgroundItems: PlaygroundItem[] = [");

files.forEach((file, index) => {
  const componentName = getComponentName(file);

  lines.push("  {");
  lines.push(`    id: "${toSlug(componentName)}",`);
  lines.push(`    title: "${toTitle(componentName)}",`);
  lines.push(`    component: ${toImportName(index)},`);
  lines.push(`    level: "${getLevel(file)}",`);
  lines.push("  },");
});

lines.push("];");
lines.push("");

fs.writeFileSync(outputFile, lines.join("\n"));

console.log(
  `Generated ${path.relative(rootDir, outputFile)} from ${files.length} component files.`,
);

import fg from "fast-glob";
import fs from "node:fs";
import yaml from "yaml";
import path from "node:path";

function loadNovelYaml(novel: string): Record<string, any> | undefined {
  const dir = path.resolve(__dirname, "../content", novel);
  if (!fs.existsSync(dir)) return undefined;
  const files = fg.sync("_*.yaml", { cwd: dir, absolute: true });
  if (files.length === 0) return undefined;
  const result: Record<string, any> = {};

  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    const parsed = yaml.parse(content);
    Object.assign(result, parsed);
  }

  return Object.keys(result).length > 0 ? result : undefined;
}

export interface NameLookupResult {
  type: string; // e.g., "character", "location", etc.
  name: string; // The name of the entity
  description?: string; // Default description
  [key: string]: any; // Allow additional properties like "000", "001", etc.
}

export default function nameLookup(
  novel: string,
  name: string
): NameLookupResult | undefined {
  const data = loadNovelYaml(novel);
  if (!data) return undefined;

  // Directly look up the name in the merged object
  if (name in data) {
    return { name, ...data[name] };
  }

  return undefined;
}

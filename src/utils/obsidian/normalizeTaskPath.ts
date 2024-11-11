import { normalizePath } from "obsidian";

export default function normalizeTaskPath(path: string, dateFormat: string) {
  const filename = `${dateFormat}.md`;
  const parts = dateFormat.split("-");
  const folder = `${parts[0]}/${parts[1]}`;
  return normalizePath(`${path}/${folder}/${filename}`);
}

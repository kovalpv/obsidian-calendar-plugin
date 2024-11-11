import { TFile } from "obsidian";
import normalizeTaskPath from "./normalizeTaskPath";

export default async function openFileInObsidian(path: string, dateFormat: string) {
  const normalizedPath = normalizeTaskPath(path, dateFormat);
  const file = app.vault.getAbstractFileByPath(normalizedPath);
  if (file instanceof TFile) {
    const leaf = app.workspace.getLeaf(false);
    await leaf.openFile(file);
  }
}

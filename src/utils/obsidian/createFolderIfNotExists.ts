import { TFolder } from "obsidian";

export default async function createFolderIfNotExists(folderPath: string): Promise<TFolder> {
  const folder = app.vault.getAbstractFileByPath(folderPath);
  if (folder instanceof TFolder) {
    return folder;
  } else {
    return await app.vault.createFolder(folderPath);
  }
}

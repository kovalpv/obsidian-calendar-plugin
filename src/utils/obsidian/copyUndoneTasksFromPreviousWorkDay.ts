import { TaskWithSource } from "@src/AppTypes";
import { DateUtils } from "@utils/date";
import normalizeTaskPath from "./normalizeTaskPath";
import extractDirectoryPath from "./extractDirectoryPath";
import getTasksFromContent from "./getTasksFromContent";
import { parseTask } from "@utils/Task";
import isTask from "@utils/Task/isTask";
import createFolderIfNotExists from "./createFolderIfNotExists";

export default async function copyUndoneTasksFromPreviousWorkDay({
  path,
  from,
  to,
  dateUtils
}: {
  path: string;
  from: Date;
  to: Date;
  dateUtils: DateUtils;
}): Promise<TaskWithSource[]> {
  const fromFormat = normalizeTaskPath(path, dateUtils.formatDate(from));
  const toFormat = normalizeTaskPath(path, dateUtils.formatDate(to));
  const fromFile = app.vault.getFileByPath(fromFormat);
  if (fromFile === null) {
    return [];
  }
  const newPath = fromFile.path.replace(fromFormat, toFormat);
  const content = await app.vault.read(fromFile);
  const folder = extractDirectoryPath(newPath);

  await createFolderIfNotExists(folder);

  let modifyFile = app.vault.getFileByPath(newPath);
  const newContent = content
    .split("\n")
    .filter((x) => (isTask(x) ? !parseTask(x)?.done : true))
    .join("\n");

  if (!modifyFile) {
    modifyFile = await app.vault.create(newPath, newContent);
  } else {
    await app.vault.modify(modifyFile, newContent);
  }
  return getTasksFromContent(modifyFile)(newContent);
}

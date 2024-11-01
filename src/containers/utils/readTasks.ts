import globalPath from "path";

import { normalizePath, TFile, TFolder } from "obsidian";

import { DateUtils } from "../../DateUtils";
import { readTask } from "../../Task";
import { TaskFile } from "../../AppTypes";

interface ReadTasksProps {
  readonly path: string;
  readonly start: Date;
  readonly end: Date;
  readonly dateUtils: DateUtils;
}

export type FileTasks = Record<string, TaskFile[]>;

export function normalizeTaskPath(path: string, dateFormat: string) {
  const filename = `${dateFormat}.md`;
  const parts = dateFormat.split("-");
  const folder = `${parts[0]}/${parts[1]}`;
  return normalizePath(`${path}/${folder}/${filename}`);
}

export async function openFileInObsidian(path: string, dateFormat: string) {
  return new Promise((resolve, reject) => {
    const normalizedPath = normalizeTaskPath(path, dateFormat);
    const tFile = app.vault.getAbstractFileByPath(normalizedPath);
    if (tFile instanceof TFile) {
      const leaf = app.workspace.getLeaf(false);
      leaf
        .openFile(tFile)
        .then(() => {
          console.log("Opened file:", tFile.path);
          resolve(tFile);
        })
        .catch((error) => {
          console.error("Error opening file:", error);
          reject(error);
        });
    } else {
      console.error("File not found:", normalizedPath);
      reject(new Error("File not found"));
    }
  });
}

function readTasks({ path, start, end, dateUtils }: ReadTasksProps): Promise<FileTasks> {
  return Promise.all(
    dateUtils
      .eachDayOfInterval(start, end)
      .map((date) => {
        const dateFormat = dateUtils.formatDate(date);
        const filePath = normalizeTaskPath(path, dateFormat);

        const file = app.vault.getFileByPath(filePath);

        return file ? ([dateFormat, file] as [string, TFile]) : null;
      })
      .filter((x) => x !== null)
      .map(([dateFormat, file]) =>
        app.vault
          .read(file)
          .then(getTasksFromContent(file))
          .then((tasks) => {
            return tasks.length > 0 ? ([dateFormat, tasks] as [string, TaskFile[]]) : null;
          })
      )
  ).then((source) => {
    return source.reduce((prev, current) => {
      if (!current) {
        return prev;
      }
      return { ...prev, [current[0]]: current[1] };
    }, {});
  });
}

interface ReadTasks1Props {
  readonly path: string;
  readonly date: Date;
  readonly dateUtils: DateUtils;
}

function getTasksFromContent(file: TFile): (content: string) => TaskFile[] {
  return (content: string) => {
    const lines = content.split("\n");

    return lines
      .map((line) => {
        const task = readTask(line);
        if (!task) {
          return null;
        }

        return {
          source: file,
          description: task.description,
          task: task,
          sourceLine: line
        };
      })
      .filter((x) => x != null);
  };
}

export function readTask1({ path, date, dateUtils }: ReadTasks1Props): Promise<TaskFile[]> {
  const dateFormat = dateUtils.formatDate(date);
  const filePath = normalizeTaskPath(path, dateFormat);

  const file = app.vault.getFileByPath(filePath);

  return file ? app.vault.read(file).then(getTasksFromContent(file)) : Promise.resolve([]);
}

async function createFolderIfNotExists(folderPath: string) {
  return new Promise((resolve, reject) => {
    const folder = app.vault.getAbstractFileByPath(folderPath);
    if (folder instanceof TFolder) {
      console.log("Folder already exists:", folder.path);
      resolve(folder);
    } else {
      app.vault
        .createFolder(folderPath)
        .then((newFolder) => {
          console.log("Created new folder:", newFolder.path);
          resolve(newFolder);
        })
        .catch((error) => {
          console.error("Error creating folder:", error);
          reject(error);
        });
    }
  });
}

export function copyPreviousDayUndoneTask({
  path,
  from,
  to,
  dateUtils
}: {
  path: string;
  from: Date;
  to: Date;
  dateUtils: DateUtils;
}): Promise<TaskFile[]> {
  const fromFormat = normalizeTaskPath(path, dateUtils.formatDate(from));
  const toFormat = normalizeTaskPath(path, dateUtils.formatDate(to));

  const fromFile = app.vault.getFileByPath(fromFormat);
  if (fromFile === null) {
    return Promise.resolve([]);
  }
  const newPath = fromFile.path.replace(fromFormat, toFormat);
  return app.vault
    .read(fromFile)
    .then((content) => {
      const folder = globalPath.dirname(newPath);
      return createFolderIfNotExists(folder).then(() => content);
    })
    .then((content) => {
      const modifyFile = app.vault.getFileByPath(newPath);
      console.log(`create ${newPath}`);

      const newContent = content
        .split("\n")
        .filter((x) => {
          return !(x.startsWith("- [X]") || x.startsWith("- [x]"));
        })
        .join("\n");
      return modifyFile
        ? app.vault.modify(modifyFile, newContent).then(() => [modifyFile, newContent] as [TFile, string])
        : app.vault.create(newPath, newContent).then((file) => [file, newContent] as [TFile, string]);
    })
    .then(([file, content]) => {
      return getTasksFromContent(file)(content);
    });
}

export default readTasks;

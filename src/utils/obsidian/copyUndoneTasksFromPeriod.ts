import { DateUtils } from "@utils/date";
import { TaskWithSource } from "@src/AppTypes";
import normalizeTaskPath from "./normalizeTaskPath";
import extractDirectoryPath from "./extractDirectoryPath";
import createFolderIfNotExists from "./createFolderIfNotExists";
import getTasksFromContent from "./getTasksFromContent";
import { TFile } from "obsidian";
import { parseTask } from "@utils/Task";

type TaskFileInfo = {
  readonly date: string;
  readonly file: TFile;
  readonly content?: string;
};

export default async function copyUndoneTasksFromPeriod({
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
  const tasks = new Set<string>();
  const doneTasks = new Set<string>();

  const sortedDatesDesc = dateUtils
    .eachDayOfInterval(from, dateUtils.adjustDate(to, false, "day"))
    // @ts-ignore
    .sort((a, b) => b - a);

  const newContent = await Promise.all(
    sortedDatesDesc
      .map((date): TaskFileInfo | null => {
        const dateFormat = normalizeTaskPath(path, dateUtils.formatDate(date));
        const file = app.vault.getFileByPath(dateFormat);

        return file ? { date: dateFormat, file } : null;
      })
      .filter((file) => file !== null)
      .map(({ date, file }) =>
        app.vault.read(file).then((content) => ({
          content,
          date,
          file
        }))
      )
  ).then((contents) => {
    const result: Record<string, string[]> = contents
      .sort(({ date: a }, { date: b }) => b.localeCompare(a))
      .reduce((prev, { content }) => {
        if (content) {
          const section = splitSections(content, tasks, doneTasks);
          return mergeSections(prev, section);
        }
        return prev;
      }, {});

    return toString(result);
  });

  const newPath = normalizeTaskPath(path, dateUtils.formatDate(to));
  const folder = extractDirectoryPath(newPath);
  await createFolderIfNotExists(folder);
  let modifyFile = app.vault.getFileByPath(newPath);

  if (!modifyFile) {
    modifyFile = await app.vault.create(newPath, newContent);
  } else {
    await app.vault.modify(modifyFile, newContent);
  }
  return getTasksFromContent(modifyFile)(newContent);
}

function splitSections(content: string, tasks: Set<string>, doneTasks: Set<string>): Record<string, string[]> {
  const sections: Record<string, string[]> = {};
  const lines = content.split("\n");

  let currentHeader = "";

  for (const line of lines) {
    if (line.startsWith("#")) {
      currentHeader = line.trim();
      sections[currentHeader] = sections[currentHeader] || [];
    } else if (currentHeader) {
      const task = parseTask(line);

      if (task) {
        const taskId = task.id;

        if (!task.done && !tasks.has(taskId) && !doneTasks.has(taskId)) {
          sections[currentHeader].push(line.trim());
          tasks.add(taskId);
        }

        if (task.done) {
          doneTasks.add(taskId);
        }
        tasks.add(taskId);
      }
    }
  }

  return sections;
}

function mergeSections(
  sections1: Record<string, string[]>,
  sections2: Record<string, string[]>
): Record<string, string[]> {
  const mergedSections: Record<string, string[]> = {};

  for (const header of Object.keys(sections1)) {
    mergedSections[header] = [...sections1[header]];
  }

  for (const header of Object.keys(sections2)) {
    if (!mergedSections[header]) {
      mergedSections[header] = [];
    }
    mergedSections[header].push(...sections2[header]);
  }

  return mergedSections;
}

function toString(mergedSections: Record<string, string[]>) {
  let finalContent = "";
  for (const header of Object.keys(mergedSections)) {
    if (mergedSections[header].length === 0) {
      continue;
    }

    finalContent += `${header}\n\n${mergedSections[header].join("\n")}\n\n`;
  }

  return finalContent;
}

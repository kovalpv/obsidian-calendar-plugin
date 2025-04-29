import { TFile } from "obsidian";
import { TaskWithSource } from "@src/AppTypes";
import { parseTask } from "src/utils/Task";

export default function getTasksFromContent(file: TFile): (content: string) => TaskWithSource[] {
  return (content: string) => {
    const lines = content.split("\n");
    let group = "";

    return lines
      .map((line) => {
        if (line.startsWith("##")) {
          group = line.replace(/^#+/, "").trim();
          return null;
        }

        const task = parseTask(line);
        if (!task) {
          return null;
        }

        return {
          source: file,
          description: task.description,
          task: task,
          sourceLine: line,
          group
        };
      })
      .filter((x) => x != null);
  };
}

export async function readTasksFromFile(file: TFile | null) {
  if (!file) {
    return [];
  }
  const content = await app.vault.read(file);
  return getTasksFromContent(file)(content);
}

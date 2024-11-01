import { Task } from "./types";

const regex = new RegExp("^-\\s{1}\\[(?<isDone>.){1}\\]\\s*(?<id>[A-zА-я0-9]*)\\s(?<description>.*)$");

function readTask(str: string): Task | null {
  const m = regex.exec(str);

  if (m !== null) {
    return {
      // @ts-ignore
      id: m.groups["id"],
      // @ts-ignore
      done: m.groups["isDone"] === "x" || m.groups["isDone"] === "X",
      // @ts-ignore
      description: m.groups["description"]
    };
  }
  return null;
}

export default readTask;

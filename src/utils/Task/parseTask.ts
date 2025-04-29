import { Task } from "./types";

export const TASK_REGEX = new RegExp(
  "^(?<whitespaces>[\\s]*)-\\s{1}\\[(?<isDone>.){1}\\]\\s*(?<id>[A-zА-я0-9-\\[\\]\\(\\):\\/.]*)\\s(?<description>.*)$"
);

function parseTask(str: string): Task | null {
  const m = TASK_REGEX.exec(str);

  if (m !== null) {
    return {
      // @ts-ignore
      id: m.groups["id"],
      // @ts-ignore
      done: m.groups["isDone"] === "x" || m.groups["isDone"] === "X",
      // @ts-ignore
      description: m.groups["description"],
      // @ts-ignore
      whitespaces: m.groups["whitespaces"]
    };
  }
  return null;
}

export default parseTask;

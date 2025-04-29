import { Task } from "./types";

function formatTask({ id, done, description, whitespaces }: Task): string {
  return `${whitespaces}- [${done ? "x" : " "}] ${id} ${description}`;
}

export default formatTask;

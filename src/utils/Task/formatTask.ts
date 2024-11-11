import { Task } from "./types";

function formatTask({ id, done, description }: Task): string {
  return `- [${done ? "x" : " "}] ${id} ${description}`;
}

export default formatTask;

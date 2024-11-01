import { Task } from "./types";

function writeTask({ id, done, description }: Task): string {
  return `- [${done ? "x" : " "}] ${id} ${description}`;
}

export default writeTask;

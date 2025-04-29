import createTask from "./createTask";
import { Task } from "./types";
import formatTask from "./formatTask";

function toggleTaskDone({ id, done, description, whitespaces }: Task): string {
  return formatTask(createTask(id, !done, description, whitespaces));
}

export default toggleTaskDone;

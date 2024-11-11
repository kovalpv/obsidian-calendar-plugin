import createTask from "./createTask";
import { Task } from "./types";
import formatTask from "./formatTask";

function toggleTaskDone({ id, done, description }: Task): string {
  return formatTask(createTask(id, !done, description));
}

export default toggleTaskDone;

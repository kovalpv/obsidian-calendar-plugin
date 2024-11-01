import createTask from "./createTask";
import { Task } from "./types";
import writeTask from "./writeTask";

function toggleTaskDone({ id, done, description }: Task): string {
  return writeTask(createTask(id, !done, description));
}

export default toggleTaskDone;

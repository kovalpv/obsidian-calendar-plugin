import { Task } from "./types";

function createTask(id: string, done: boolean, description: string): Task {
  return {
    id,
    done,
    description
  };
}

export default createTask;

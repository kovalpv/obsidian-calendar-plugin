import { Task } from "./types";

function createTask(id: string, done: boolean, description: string, whitespaces: string | null | undefined = ""): Task {
  return {
    id,
    done,
    description,
    whitespaces: whitespaces ?? ""
  };
}

export default createTask;

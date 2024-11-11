import { TASK_REGEX } from "@utils/Task/parseTask";

export default function isTask(str: string): boolean {
  return TASK_REGEX.test(str);
}

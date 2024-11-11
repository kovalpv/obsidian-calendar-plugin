import { TaskWithSource } from "@src/AppTypes";
import { DateUtils } from "@utils/date";
import normalizeTaskPath from "./normalizeTaskPath";

import { readTasksFromFile } from "./getTasksFromContent";
import { toggleTaskDone } from "@utils/Task";

interface fetchTasksProps {
  readonly path: string;
  readonly date: Date;
  readonly dateUtils: DateUtils;
}

async function fetchTasks({ path, date, dateUtils }: fetchTasksProps): Promise<TaskWithSource[]> {
  const dateFormat = dateUtils.formatDate(date);
  const filePath = normalizeTaskPath(path, dateFormat);
  const file = app.vault.getFileByPath(filePath);
  return await readTasksFromFile(file);
}

type CreateTaskToggleHandlerProps = {
  readonly path: string;
  readonly date: Date;
  readonly dateUtils: DateUtils;
};

type TaskToggleHandler = (task: TaskWithSource) => Promise<TaskWithSource[]>;

export default function createTaskToggleHandler({
  date,
  path,
  dateUtils
}: CreateTaskToggleHandlerProps): TaskToggleHandler {
  return (d: TaskWithSource) => {
    const result = toggleTaskDone(d.task);
    return app.vault.read(d.source).then((content) => {
      const newContent = content.replace(d.sourceLine, result);

      return app.vault.modify(d.source, newContent).then(() =>
        fetchTasks({
          path,
          date,
          dateUtils
        })
      );
    });
  };
}

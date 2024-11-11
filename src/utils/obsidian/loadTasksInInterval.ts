import { TaskWithSource } from "@src/AppTypes";
import { DateUtils } from "@utils/date";
import { normalizeTaskPath } from "@utils/obsidian/index";
import { readTasksFromFile } from "./getTasksFromContent";

interface ReadTasksProps {
  readonly path: string;
  readonly start: Date;
  readonly end: Date;
  readonly dateUtils: DateUtils;
}

export type FileTasks = Record<string, TaskWithSource[]>;

type DayTasks = [string, TaskWithSource[]];

type ReadDayTasksProps = {
  readonly path: string;
  readonly date: Date;
  readonly dateUtils: DateUtils;
};

async function fetchDayTasks({ path, date, dateUtils }: ReadDayTasksProps): Promise<DayTasks | null> {
  const dateFormat = dateUtils.formatDate(date);
  const filePath = normalizeTaskPath(path, dateFormat);
  const file = app.vault.getFileByPath(filePath);
  const tasks = await readTasksFromFile(file);
  return [dateFormat, tasks];
}

function loadTasksInInterval({ path, start, end, dateUtils }: ReadTasksProps): Promise<FileTasks> {
  return Promise.all(
    dateUtils.eachDayOfInterval(start, end).map((date) => {
      return fetchDayTasks({ path, date, dateUtils });
    })
  ).then((source) => {
    return source
      .filter((x) => x !== null)
      .reduce((prev, current: DayTasks) => {
        if (!current) {
          return prev;
        }
        const [field, tasks]: [string, TaskWithSource[]] = current;
        return { ...prev, [field]: tasks };
      }, {});
  });
}

export default loadTasksInInterval;

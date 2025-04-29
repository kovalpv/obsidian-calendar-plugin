import { TaskWithSource } from "@src/AppTypes";
import loadTasksInInterval, { FileTasks, ReadTasksProps } from "./loadTasksInInterval";

export type TaskHistory = {
  readonly id: string;
  readonly done: boolean;
  readonly description: string;
  readonly firstDay: string;
  readonly lastDay: string;
  readonly group?: string;
  readonly source: (TaskWithSource & { day: string })[];
};

export type TasksSource = {
  readonly tasks: FileTasks;
  readonly history: TaskHistory[];
};

export function loadTaskHistory(props: ReadTasksProps): Promise<TasksSource> {
  return loadTasksInInterval(props).then((tasks: FileTasks) => {
    const allTasks: Record<string, (TaskWithSource & { day: string })[]> = {};

    Object.keys(tasks).forEach((day) => {
      tasks[day].forEach((tt) => {
        if (!(tt.task.id in allTasks)) {
          allTasks[tt.task.id] = [];
        }
        allTasks[tt.task.id].push({ ...tt, day });
      });
    });

    const history = Object.keys(allTasks)
      .map((taskId) => {
        const taskHistory = allTasks[taskId];
        const first = taskHistory[0];
        const last = taskHistory[taskHistory.length - 1];
        const group = [...taskHistory].reverse().find((x) => Boolean(x.group))?.group;
        return {
          id: taskId,
          done: taskHistory.some((x) => x.task.done),
          description: last.task.description,
          firstDay: first.day,
          lastDay: last.day,
          source: taskHistory,
          group
        };
      })
      .filter(Boolean);

    return {
      tasks,
      history
    };
  });
}

export default loadTaskHistory;

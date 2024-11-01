import { useCallback, useState } from "react";

import { useLocale } from "../LocaleContext";
import { TaskFile } from "../AppTypes";

type UseTaskResult = {
  getTasks: (date: Date) => TaskFile[];
  setDayTasks: (date: Date) => (tasks: TaskFile[]) => void;
  setTasks: (tasks: Record<string, TaskFile[]>) => void;
};

function useTasks(): UseTaskResult {
  const { dateUtils } = useLocale();
  const [tasks, setTasks] = useState<Record<string, TaskFile[]>>({});

  const getTasks = useCallback(
    (date: Date) => {
      return tasks[dateUtils.formatDate(date)] ?? [];
    },
    [tasks]
  );

  const setDayTasks = useCallback(
    (date: Date) => (tasks: TaskFile[]) => {
      setTasks((prev) => {
        return {
          ...prev,
          [dateUtils.formatDate(date)]: tasks
        };
      });
    },
    [tasks]
  );

  return { getTasks, setDayTasks, setTasks };
}

export default useTasks;

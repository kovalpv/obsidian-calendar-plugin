import { useCallback, useState } from "react";

import { useLocale } from "@src/LocaleContext";
import { TaskWithSource } from "@src/AppTypes";

type UseTaskResult = {
  getTasks: (date: Date) => TaskWithSource[];
  setDayTasks: (date: Date) => (tasks: TaskWithSource[]) => void;
  setTasks: (tasks: Record<string, TaskWithSource[]>) => void;
};

function useTasks(): UseTaskResult {
  const { dateUtils } = useLocale();
  const [tasks, setTasks] = useState<Record<string, TaskWithSource[]>>({});

  const getTasks = useCallback(
    (date: Date) => {
      return tasks[dateUtils.formatDate(date)] ?? [];
    },
    [tasks]
  );

  const setDayTasks = useCallback(
    (date: Date) => (tasks: TaskWithSource[]) => {
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

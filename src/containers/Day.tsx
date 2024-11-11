import { useCallback } from "react";

import { TaskWithSource } from "@src/AppTypes";
import { useLocale } from "@src/LocaleContext";
import { TaskList } from "@src/components";
import { createTaskToggleHandler } from "@utils/obsidian";

interface DayProps {
  readonly date: Date;
  readonly tasks: TaskWithSource[];
  readonly setTasks: (tasks: TaskWithSource[]) => void;
}

function Day({ date, tasks, setTasks }: DayProps) {
  const { dateUtils, config } = useLocale();
  const toggleTask = useCallback(
    (task: TaskWithSource) => {
      createTaskToggleHandler({
        path: config.folder,
        date,
        dateUtils
      })(task).then(setTasks);
    },
    [config.folder, date, dateUtils]
  );

  return <TaskList date={date} tasks={tasks} onTaskClick={toggleTask} />;
}

export default Day;

import { useCallback } from "react";

import { readTask1 } from "./utils/readTasks";
import { TaskFile } from "../AppTypes";
import { useLocale } from "../LocaleContext";
import { toggleTaskDone } from "../Task";
import { TaskList } from "../components";

interface DayProps {
  readonly date: Date;
  readonly tasks: TaskFile[];
  readonly setTasks: (tasks: TaskFile[]) => void;
}

function Day({ date, tasks, setTasks }: DayProps) {
  const { dateUtils, settings } = useLocale();

  const toggleTask = useCallback(
    (date: Date) => (d: TaskFile) => {
      const result = toggleTaskDone(d.task);

      app.vault
        .read(d.source)
        .then((content) => {
          const newContent = content.replace(d.sourceLine, result);

          return app.vault.modify(d.source, newContent).then(() =>
            readTask1({
              path: settings.folder,
              date: date,
              dateUtils
            })
          );
        })
        .then((updatedTasks) => {
          setTasks(updatedTasks);
        });
    },
    []
  );

  return <TaskList date={date} tasks={tasks} taskClick={toggleTask(date)} />;
}

export default Day;

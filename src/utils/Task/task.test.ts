import { Task } from "@utils/Task/types";
import parseTask from "@utils/Task/parseTask";
import toggleTaskDone from "@utils/Task/toggleTaskDone";

describe("Интеграционный тест: parseTask => toggleTaskDone", () => {
  it("Выполлняем переключение задачи", () => {
    const taskSources: string[] = [
      "- [ ]  TASK01 первая задача",
      "\t- [ ]  TASK02 вторая задача",
      "\t\t- [x]  TASK03 третья задача",
      " - [ ]  TASK04 четвертая задача",
      "  - [X]  TASK05 пятая задача"
    ];

    const expectedTasks: string[] = [
      "- [x] TASK01 первая задача",
      "\t- [x] TASK02 вторая задача",
      "\t\t- [ ] TASK03 третья задача",
      " - [x] TASK04 четвертая задача",
      "  - [ ] TASK05 пятая задача"
    ];

    taskSources.forEach((taskSource, index) => {
      const task: Task = <Task>parseTask(taskSource);
      expect(task).not.toBeNull();
      const actual = toggleTaskDone(task);
      const expected = expectedTasks[index];
      expect(actual).toEqual(expected);
    });
  });
});

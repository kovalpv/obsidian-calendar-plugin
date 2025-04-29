import createTask from "./createTask";
import parseTask from "./parseTask";

describe("getTask", () => {
  it("Создание задач незавершенной задачи", () => {
    const taskSources: string[] = [
      "- [ ]  TASK01 первая задача",
      "\t- [ ]  TASK02 вторая задача",
      "\t\t- [ ]  TASK03 третья задача",
      " - [ ]  TASK04 четвертая задача",
      "  - [ ]  TASK05 пятая задача"
    ];

    const expectedTasks = [
      createTask("TASK01", false, "первая задача"),
      createTask("TASK02", false, "вторая задача", "\t"),
      createTask("TASK03", false, "третья задача", "\t\t"),
      createTask("TASK04", false, "четвертая задача", " "),
      createTask("TASK05", false, "пятая задача", "  ")
    ];

    taskSources.forEach((taskSource, index) => {
      const actual = parseTask(taskSource);
      const expected = expectedTasks[index];
      expect(actual).toEqual(expected);
    });
  });

  it("Создание задач завершенной задачи", () => {
    // const taskSource = "- [X] TASK02 вторая";
    const taskSources: string[] = [
      "- [X]  TASK01 первая задача",
      "\t- [x]  TASK02 вторая задача",
      "\t\t- [x]  TASK03 третья задача",
      " - [X]  TASK04 четвертая задача",
      "  - [X]  TASK05 пятая задача"
    ];

    const expectedTasks = [
      createTask("TASK01", true, "первая задача"),
      createTask("TASK02", true, "вторая задача", "\t"),
      createTask("TASK03", true, "третья задача", "\t\t"),
      createTask("TASK04", true, "четвертая задача", " "),
      createTask("TASK05", true, "пятая задача", "  ")
    ];

    taskSources.forEach((taskSource, index) => {
      const actual = parseTask(taskSource);
      const expected = expectedTasks[index];

      expect(actual).toEqual(expected);
    });
  });

  it("Создание задач завершенной задачи с разными символами", () => {
    const taskSource = "- [x] TASK03 третья Task 02 # № 103 !?<>,.";

    const actual = parseTask(taskSource);
    const expected = createTask("TASK03", true, "третья Task 02 # № 103 !?<>,.");

    expect(actual).toEqual(expected);
  });

  it("Создание задач незавершенной задачи с разными символами", () => {
    const taskSource = "- [ ] TASK04 start test Task 12312.,123-?";

    const actual = parseTask(taskSource);
    const expected = createTask("TASK04", false, "start test Task 12312.,123-?");

    expect(actual).toEqual(expected);
  });

  it("Создание задач завершенной задачи", () => {
    const taskSource =
      '- [ ] [2105-3787](https://youtrack-dev.com/issue/2105-3787) Некорректное наименование колонки "Участок объекта ГТМ"';

    const actual = parseTask(taskSource);
    const expected = createTask(
      "[2105-3787](https://youtrack-dev.com/issue/2105-3787)",
      false,
      'Некорректное наименование колонки "Участок объекта ГТМ"'
    );

    expect(actual).toEqual(expected);
  });
});

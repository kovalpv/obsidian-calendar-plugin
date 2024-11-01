import createTask from "./createTask";
import readTask from "./readTask";

describe("getTask", () => {
  it("Создание задач незавершенной задачи", () => {
    const taskSource = "- [ ]  TASK01 первая задача";

    const actual = readTask(taskSource);
    const expected = createTask("TASK01", false, "первая задача");

    expect(actual).toEqual(expected);
  });

  it("Создание задач завершенной задачи", () => {
    const taskSource = "- [X] TASK02 вторая";

    const actual = readTask(taskSource);
    const expected = createTask("TASK02", true, "вторая");

    expect(actual).toEqual(expected);
  });

  it("Создание задач завершенной задачи с разными символами", () => {
    const taskSource = "- [x] TASK03 третья Task 02 # № 103 !?<>,.";

    const actual = readTask(taskSource);
    const expected = createTask("TASK03", true, "третья Task 02 # № 103 !?<>,.");

    expect(actual).toEqual(expected);
  });

  it("Создание задач незавершенной задачи с разными символами", () => {
    const taskSource = "- [ ] TASK04 start test Task 12312.,123-?";

    const actual = readTask(taskSource);
    const expected = createTask("TASK04", false, "start test Task 12312.,123-?");

    expect(actual).toEqual(expected);
  });
});

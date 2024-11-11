import createTask from "./createTask";
import toggleTaskDone from "./toggleTaskDone";
import { Task } from "./types";

describe("toggleTaskDone", () => {
  it("should toggle the Task done status and call formatTask with updated Task", () => {
    const task: Task = createTask("1", false, "Test Task");

    const actual = toggleTaskDone(task);

    const expected = "- [x] 1 Test Task";
    expect(actual).toEqual(expected);
  });

  it("should toggle the Task done status from true to false", () => {
    const task: Task = createTask("2", true, "Another test Task");

    const actual = toggleTaskDone(task);

    const expected = "- [ ] 2 Another test Task";
    expect(actual).toEqual(expected);
  });
});

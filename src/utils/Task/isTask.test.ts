import isTask from "@utils/Task/isTask";

describe("isTask", () => {
  it("должен вернуть true для строки `- [ ] CODE01 Task`", () => {
    const actual = isTask("- [ ] CODE01 Task");
    expect(actual).toBeTruthy();
  });

  it("должен вернуть true для строки `- [X] CODE01 Task`", () => {
    const actual = isTask("- [X] CODE01 Task");
    expect(actual).toBeTruthy();
  });

  it("должен вернуть true для строки `- [x] CODE01 Task`", () => {
    const actual = isTask("- [x] CODE01 Task");
    expect(actual).toBeTruthy();
  });

  it("должен вернуть true для строки `- [ ] CODE01`", () => {
    const actual = isTask("- [ ] CODE01");
    expect(actual).toBeTruthy();
  });

  it("должен вернуть true для строки `- [X] CODE01`", () => {
    const actual = isTask("- [X] CODE01");
    expect(actual).toBeTruthy();
  });

  it("должен вернуть true для строки `- [x] CODE01`", () => {
    const actual = isTask("- [x] CODE01");
    expect(actual).toBeTruthy();
  });
});

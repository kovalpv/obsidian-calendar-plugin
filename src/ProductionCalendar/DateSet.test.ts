import DateSet from "./DateSet";

describe("DateSet", () => {
  let dateSet: DateSet;

  beforeEach(() => {
    dateSet = new DateSet();
  });

  test("должен добавлять уникальные даты", () => {
    dateSet.add(new Date("2024-01-01"));
    dateSet.add(new Date("2024-01-02"));

    expect(dateSet.size()).toBe(2);
    expect(dateSet.values()).toEqual([new Date("2024-01-01T00:00:00.000Z"), new Date("2024-01-02T00:00:00.000Z")]);
  });

  test("не должен добавлять дублирующиеся даты", () => {
    dateSet.add(new Date("2024-01-01"));
    dateSet.add(new Date("2024-01-01T23:59:59"));

    expect(dateSet.size()).toBe(1);
    expect(dateSet.has(new Date("2024-01-01"))).toBe(true);
  });

  test("должен проверять существующие даты", () => {
    dateSet.add(new Date("2024-01-01"));

    expect(dateSet.has(new Date("2024-01-01"))).toBe(true);
    expect(dateSet.has(new Date("2024-01-02"))).toBe(false);
  });

  test("должен удалять даты", () => {
    dateSet.add(new Date("2024-01-01"));
    dateSet.delete(new Date("2024-01-01"));

    expect(dateSet.has(new Date("2024-01-01"))).toBe(false);
    expect(dateSet.size()).toBe(0);
  });

  test("должен очищать все даты", () => {
    dateSet.add(new Date("2024-01-01"));
    dateSet.clear();

    expect(dateSet.size()).toBe(0);
  });

  test("должен возвращать значения как объекты Date", () => {
    dateSet.add(new Date("2024-01-01"));
    const values = dateSet.values();

    expect(values.length).toBe(1);
    expect(values[0]).toEqual(new Date("2024-01-01T00:00:00.000Z"));
  });
});

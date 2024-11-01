import { startOfDay } from "date-fns";

import createDateUtils, { DateUtils } from "./DateUtils";
import DateSet from "./ProductionCalendar/DateSet";

describe("DateUtilsRu", () => {
  let dateUtils: DateUtils;

  beforeEach(() => {
    dateUtils = createDateUtils("ru");
  });

  test("formatDay", () => {
    expect(dateUtils.formatDay(new Date("2023-01-01"))).toEqual("01 январь 23");
    expect(dateUtils.formatDay(new Date("2023-01-02"))).toEqual("02 январь 23");
    expect(dateUtils.formatDay(new Date("2023-12-03"))).toEqual("03 декабрь 23");
  });

  test("formatDate", () => {
    expect(dateUtils.formatDate(new Date("2023-01-01"))).toEqual("2023-01-01");
    expect(dateUtils.formatDate(new Date("2023-01-02"))).toEqual("2023-01-02");
    expect(dateUtils.formatDate(new Date("2023-12-03"))).toEqual("2023-12-03");
  });

  test("formatMonth", () => {
    expect(dateUtils.formatMonth(new Date("2023-01-01"))).toEqual("январь 23");
    expect(dateUtils.formatMonth(new Date("2023-01-02"))).toEqual("январь 23");
    expect(dateUtils.formatMonth(new Date("2023-02-02"))).toEqual("февраль 23");
  });

  test("getWeekDays", () => {
    const actual = dateUtils.getWeekDays();
    expect(actual).toEqual(["пн", "вт", "ср", "чт", "пт", "сб", "вс"]);
  });

  test("formatDayShort", () => {
    const actual = dateUtils.formatDayShort(new Date("2023-06-30"));
    expect(actual).toEqual("30");
  });

  describe("getFormatter", () => {
    test("day", () => {
      const actual = dateUtils.getFormatter("day");
      expect(actual).toEqual(dateUtils.formatDay);
    });

    test("week", () => {
      const actual = dateUtils.getFormatter("week");
      expect(actual).toEqual(dateUtils.formatWeek);
    });

    test("month", () => {
      const actual = dateUtils.getFormatter("month");
      expect(actual).toEqual(dateUtils.formatMonth);
    });

    test("error", () => {
      expect(() => {
        // @ts-ignore
        dateUtils.getFormatter("");
      }).toThrow("Invalid period specified");
    });
  });

  describe("adjustDate", () => {
    test("day increment", () => {
      const actual = dateUtils.adjustDate(new Date("2022-05-01"), true, "day");
      expect(actual).toEqual(new Date("2022-05-02"));
    });

    test("day decrement", () => {
      const actual = dateUtils.adjustDate(new Date("2022-05-01"), false, "day");
      expect(actual).toEqual(new Date("2022-04-30"));
    });

    test("week increment", () => {
      const actual = dateUtils.adjustDate(new Date("2022-05-01"), true, "week");
      expect(actual).toEqual(new Date("2022-05-08"));
    });

    test("week decrement", () => {
      const actual = dateUtils.adjustDate(new Date("2022-05-01"), false, "week");
      expect(actual).toEqual(new Date("2022-04-24"));
    });

    test("month increment", () => {
      const actual = dateUtils.adjustDate(new Date("2022-05-01"), true, "month");
      expect(actual).toEqual(new Date("2022-06-01"));
    });

    test("month decrement", () => {
      const actual = dateUtils.adjustDate(new Date("2022-05-01"), false, "month");
      expect(actual).toEqual(new Date("2022-04-01"));
    });

    test("error increment", () => {
      expect(() => {
        // @ts-ignore
        dateUtils.adjustDate(new Date("2022-05-01"), true, null);
      }).toThrow("Invalid period specified");
    });

    test("error decrement", () => {
      expect(() => {
        // @ts-ignore
        dateUtils.adjustDate(new Date("2022-05-01"), false, null);
      }).toThrow("Invalid period specified");
    });
  });

  test("formatWeek", () => {
    const actual = dateUtils.formatWeek(new Date("2023-07-01"));
    expect(actual).toEqual("W26 23");
  });

  test("formatWeekShort", () => {
    const actual = dateUtils.formatWeekShort(new Date("2023-07-01"));
    expect(actual).toEqual("W26");
  });

  test("getMonthDays", () => {
    const actual = dateUtils.getMonthDays(new Date("2023-07-01T12:00:00Z"));
    const expected = [
      "2023-06-26",
      "2023-06-27",
      "2023-06-28",
      "2023-06-29",
      "2023-06-30",
      "2023-07-01",
      "2023-07-02",
      "2023-07-03",
      "2023-07-04",
      "2023-07-05",
      "2023-07-06",
      "2023-07-07",
      "2023-07-08",
      "2023-07-09",
      "2023-07-10",
      "2023-07-11",
      "2023-07-12",
      "2023-07-13",
      "2023-07-14",
      "2023-07-15",
      "2023-07-16",
      "2023-07-17",
      "2023-07-18",
      "2023-07-19",
      "2023-07-20",
      "2023-07-21",
      "2023-07-22",
      "2023-07-23",
      "2023-07-24",
      "2023-07-25",
      "2023-07-26",
      "2023-07-27",
      "2023-07-28",
      "2023-07-29",
      "2023-07-30",
      "2023-07-31",
      "2023-08-01",
      "2023-08-02",
      "2023-08-03",
      "2023-08-04",
      "2023-08-05",
      "2023-08-06"
    ].map((d) => startOfDay(new Date(d)));
    expect(actual).toEqual(expected);
  });

  it("getPreviousDay", () => {
    const currentDate = new Date("2023-08-06");
    const actual = dateUtils.getPreviousDay(
      currentDate,
      DateSet.ofDates(["2023-08-02", "2023-08-03", "2023-08-04", "2023-08-05"])
    );

    const expected = new Date("2023-08-01");
    expect(actual).toEqual(expected);
  });
});

describe("DateUtilsEn", () => {
  let dateUtils: DateUtils;

  beforeEach(() => {
    dateUtils = createDateUtils("en");
  });

  test("formatMonth", () => {
    expect(dateUtils.formatMonth(new Date("2023-01-01"))).toEqual("January 23");
    expect(dateUtils.formatMonth(new Date("2023-01-02"))).toEqual("January 23");
    expect(dateUtils.formatMonth(new Date("2023-02-02"))).toEqual("February 23");
  });

  test("getWeekDays", () => {
    const actual = dateUtils.getWeekDays();

    expect(actual).toEqual(["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]);
  });

  test("formatDayShort", () => {
    const actual = dateUtils.formatDayShort(new Date("2023-06-30"));
    expect(actual).toEqual("30");
  });

  test("formatWeek", () => {
    const actual = dateUtils.formatWeek(new Date("2023-07-01"));
    expect(actual).toEqual("W26 23");
  });

  test("formatWeekShort", () => {
    const actual = dateUtils.formatWeekShort(new Date("2023-07-01"));
    expect(actual).toEqual("W26");
  });
});

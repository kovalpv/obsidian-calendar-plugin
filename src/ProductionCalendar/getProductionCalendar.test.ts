import DateSet from "./DateSet";
import getProductionCalendarMonth from "./getProductionCalendar";

describe("getProductionCalendar", () => {
  it("должен сформировать выходные дни для мая 2022 года", () => {
    const { regularDaysOff, preHolidayDays } = getProductionCalendarMonth(2022, {
      month: 5,
      days: "1,2+,3+,7,8,9,10+,14,15,21,22,28,29"
    });

    const expectedRegularDaysOff = new DateSet();
    expectedRegularDaysOff.addAll(
      [
        "2022-05-01",
        "2022-05-01",
        "2022-05-02",
        "2022-05-03",
        "2022-05-07",
        "2022-05-08",
        "2022-05-09",
        "2022-05-10",
        "2022-05-14",
        "2022-05-15",
        "2022-05-21",
        "2022-05-22",
        "2022-05-28",
        "2022-05-29"
      ].map((d) => new Date(d))
    );

    const expectedPreHolidayDays = new DateSet();

    expect(regularDaysOff).toEqual(expectedRegularDaysOff);
    expect(preHolidayDays).toEqual(expectedPreHolidayDays);
  });

  it("должен сформировать выходные дни для мая 2024 года", () => {
    const { regularDaysOff, preHolidayDays } = getProductionCalendarMonth(2022, {
      month: 5,
      days: "1,4,5,8*,9,10+,11,12,18,19,25,26"
    });

    const expectedRegularDaysOff = DateSet.ofDates([
      "2022-05-01",
      "2022-05-01",
      "2022-05-04",
      "2022-05-05",
      "2022-05-09",
      "2022-05-10",
      "2022-05-11",
      "2022-05-12",
      "2022-05-18",
      "2022-05-19",
      "2022-05-25",
      "2022-05-26"
    ]);

    const expectedPreHolidayDays = DateSet.ofDates(["2022-05-08"]);

    expect(regularDaysOff).toEqual(expectedRegularDaysOff);
    expect(preHolidayDays).toEqual(expectedPreHolidayDays);
  });

  it("Должен сформировать пустый наборы", () => {
    const result = getProductionCalendarMonth(2024, {
      month: 5,
      days: ""
    });

    expect(result.regularDaysOff.size()).toEqual(0);
    expect(result.preHolidayDays.size()).toEqual(0);
  });

  it("должны все дни выходными", () => {
    const input = {
      month: 3,
      days: "1+, 2+, 3+"
    };

    const result = getProductionCalendarMonth(2023, input);

    expect(result.regularDaysOff).toEqual(DateSet.ofDates(["2023-03-01", "2023-03-02", "2023-03-03"]));
    expect(result.preHolidayDays).toEqual(new DateSet());
  });

  it("должны все дни сокращенными рабочими днями", () => {
    const input = {
      month: 3,
      days: "1*,2*,3*"
    };

    const result = getProductionCalendarMonth(2023, input);

    expect(result.regularDaysOff).toEqual(new DateSet());
    expect(result.preHolidayDays).toEqual(DateSet.ofDates(["2023-03-01", "2023-03-02", "2023-03-03"]));
  });

  it("should handle mixed input correctly", () => {
    const input = {
      month: 4,
      days: "1*, 2*, 3+, 4, 5"
    };

    const { regularDaysOff, preHolidayDays } = getProductionCalendarMonth(2025, input);

    expect(regularDaysOff).toEqual(DateSet.ofDates(["2025-04-03", "2025-04-04", "2025-04-05"]));
    expect(preHolidayDays).toEqual(DateSet.ofDates(["2025-04-01", "2025-04-02"]));
  });
});

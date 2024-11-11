import { DateSet } from "@utils/date";
import { MonthProductionCalendarSource } from "./types";

export type YearHolidays = {
  regularDaysOff: DateSet;
  preHolidayDays: DateSet;
};

function getProductionCalendarMonth(year: number, { days, month }: MonthProductionCalendarSource): YearHolidays {
  const allDays = days.split(",").map((day) => day.trim());

  const regularDaysOff = new DateSet();
  const preHolidayDays = new DateSet();

  allDays.forEach((day) => {
    const dayNumber = parseInt(day.replace(/[\\*+]/g, ""), 10);

    if (day.includes("+")) {
      // Это выходной день
      regularDaysOff.add(new Date(year, month - 1, dayNumber));
    } else if (day.includes("*")) {
      // Это предпраздничный день
      preHolidayDays.add(new Date(year, month - 1, dayNumber));
    } else if (dayNumber > 0) {
      regularDaysOff.add(new Date(year, month - 1, dayNumber));
    }
  });

  return { regularDaysOff, preHolidayDays };
}

export default getProductionCalendarMonth;

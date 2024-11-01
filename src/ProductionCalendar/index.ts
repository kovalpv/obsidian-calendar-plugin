import getCalendarSource from "./getCalendarSource";
import { YearHolidays } from "./getProductionCalendar";
import getProductionCalendarYear from "./getProductionCalendarYear";

export { MonthProductionCalendarSource } from "./types";

export async function getYearHolidays(date: Date): Promise<YearHolidays> {
  const year = date.getFullYear();
  const yearCalendarSource = await getCalendarSource(year);
  return getProductionCalendarYear(yearCalendarSource);
}

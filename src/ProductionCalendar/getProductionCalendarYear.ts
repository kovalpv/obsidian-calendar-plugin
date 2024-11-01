import DateSet from "./DateSet";
import getProductionCalendar from "./getProductionCalendar";
import { CalendarProductionCalendarSource } from "./types";

function getProductionCalendarYear({ year, months }: CalendarProductionCalendarSource) {
  const regularDaysOff = new DateSet();
  const preHolidayDays = new DateSet();
  for (let i = 0; i < 12; i++) {
    const monthData = months[i];
    const month = getProductionCalendar(year, monthData);
    regularDaysOff.addAll(month.regularDaysOff.values());
    preHolidayDays.addAll(month.preHolidayDays.values());
  }
  return { regularDaysOff, preHolidayDays };
}

export default getProductionCalendarYear;

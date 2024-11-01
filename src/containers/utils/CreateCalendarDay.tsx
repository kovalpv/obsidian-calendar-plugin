import DateSet from "../../ProductionCalendar/DateSet";

export type CalendarDay = {
  readonly date: Date;
  readonly classes: string;
};

function createCalendarDay(holidays: DateSet): (date: Date) => CalendarDay {
  return (date: Date) => {
    const isOut = date.getMonth() != date.getMonth();
    const isHoliday = date.getMonth() === date.getMonth() && holidays.has(date);

    const classes: string[] = ["calendar-day"];

    if (isOut) {
      classes.push("calendar-day__out");
    }
    classes.push(isHoliday ? "calendar-day__holiday" : "calendar-day__work");
    return { date, classes: classes.join(" ") };
  };
}

export default createCalendarDay;

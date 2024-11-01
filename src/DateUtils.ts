import {
  addDays,
  addMonths,
  addWeeks,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
  subDays
} from "date-fns";
import { enUS, ru } from "date-fns/locale";

import { LocaleType, Period } from "./AppTypes";
import DateSet from "./ProductionCalendar/DateSet";

export type DateUtils = {
  formatDate(date: Date): string;
  formatMonth(date: Date): string;
  formatWeek(date: Date): string;
  formatWeekDay(date: Date): string;
  formatWeekShort(date: Date): string;
  formatDay(date: Date): string;
  formatDayShort(date: Date): string;
  getWeekDays(): string[];
  getWeekAllDays(date: Date): Date[];
  getFormatter(period: Period): Formatter;
  adjustDate(date: Date, increment: boolean, period: Period): Date;
  getMonthDays(date: Date): Date[];
  getPreviousDay(currentDate: Date, holidays: DateSet): Date;
  eachDayOfInterval(start: Date, end: Date): Date[];
};

export type Formatter = (date: Date) => string;

function createDateUtils(alocale: LocaleType) {
  const locale = alocale === "ru" ? ru : enUS;

  function formatMonth(date: Date): string {
    return format(date, "LLLL yy", { locale });
  }

  function formatWeek(date: Date): string {
    return `W${format(date, "II yy", { locale })}`;
  }

  function formatWeekShort(date: Date): string {
    return `W${format(date, "II", { locale })}`;
  }

  function formatDay(date: Date): string {
    return format(date, "dd LLLL yy", { locale });
  }

  function formatDate(date: Date): string {
    return format(date, "yyyy-MM-dd", { locale });
  }

  function formatWeekDay(date: Date): string {
    return format(date, "EEEEEE", { locale });
  }

  return {
    formatMonth,
    formatWeek,
    formatWeekShort,
    formatDay,
    formatDate,
    adjustDate(date: Date, increment: boolean, period: Period) {
      const amount = increment ? 1 : -1;
      switch (period) {
        case "day":
          return addDays(date, amount);
        case "daily":
          return addDays(date, amount);
        case "week":
          return addWeeks(date, amount);
        case "month":
          return addMonths(date, amount);
        default:
          throw new Error("Invalid period specified");
      }
    },
    getFormatter(period: Period): Formatter {
      if (period === "day") {
        return formatDay;
      }

      if (period === "daily") {
        return formatDay;
      }

      if (period === "week") {
        return formatWeek;
      }
      if (period === "month") {
        return formatMonth;
      }

      throw new Error("Invalid period specified");
    },
    formatDayShort(date: Date) {
      return format(date, "dd");
    },
    getWeekAllDays(date: Date): Date[] {
      const start = startOfWeek(date, { locale, weekStartsOn: 1 });
      const end = endOfWeek(date, { locale, weekStartsOn: 1 });
      return eachDayOfInterval({ start, end });
    },
    formatWeekDay,
    getWeekDays(): string[] {
      const now = new Date();
      const weekDays: string[] = [];
      const start = startOfWeek(now, { locale, weekStartsOn: 1 });
      const end = endOfWeek(now, { locale, weekStartsOn: 1 });
      eachDayOfInterval({ start, end }).forEach((day) => {
        weekDays.push(formatWeekDay(day));
      });
      return weekDays;
    },
    getMonthDays(date: Date) {
      const start = startOfWeek(startOfMonth(date), { weekStartsOn: 1 });
      const end = endOfWeek(endOfMonth(date), { weekStartsOn: 1 });
      return eachDayOfInterval({ start, end });
    },
    getPreviousDay(currentDate: Date, holidays: DateSet): Date {
      let previousDate = subDays(currentDate, 1);
      while (holidays.has(previousDate)) {
        previousDate = subDays(previousDate, 1);
      }
      return previousDate;
    },
    eachDayOfInterval(start: Date, end: Date): Date[] {
      return eachDayOfInterval({ start, end });
    }
  };
}

export default createDateUtils;

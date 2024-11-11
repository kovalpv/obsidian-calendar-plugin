export type MonthProductionCalendarSource = {
  readonly month: number;
  readonly days: string;
};

export type TransitionProductionCalendarSource = {
  readonly from: string;
  readonly to: string;
};

export type StatisticProductionCalendarSource = {
  readonly workdays: number;
  readonly holidays: number;
  readonly hours40: number;
  readonly hours36: number;
  readonly hours24: number;
};

export type CalendarProductionCalendarSource = {
  readonly year: number;
  readonly months: MonthProductionCalendarSource[];
  readonly transitions: TransitionProductionCalendarSource[];
  readonly statistic: StatisticProductionCalendarSource;
};

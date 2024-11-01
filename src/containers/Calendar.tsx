import { Notice } from "obsidian";
import { useEffect, useReducer } from "react";
import { useTranslation } from "react-i18next";

import { initialState, reducer } from "./CalendarState";
import { Period } from "../AppTypes";
import { DateNavigator, PeriodSelector } from "../components";
import i18n from "../i18n";
import { DailyCalendar, DayCalendar, MonthCalendar, WeekCalendar } from "./view";
import { useLocale } from "../LocaleContext";
import { getYearHolidays } from "../ProductionCalendar";
import DateSet from "../ProductionCalendar/DateSet";
import "./Calendar.css";

interface CalendarProps {
  readonly date: Date;
  readonly period: Period;
}

export default function Calendar({ date: initialDate, period: initialPeriod }: CalendarProps) {
  const { t } = useTranslation();
  const { locale, dateUtils } = useLocale();
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    date: initialDate,
    holidays: new DateSet(),
    period: initialPeriod
  });

  useEffect(() => {
    i18n.changeLanguage(locale).then(() => {
      new Notice(`loaded: ${locale}`);
    });
  }, [locale]);

  const changeDate = (increment: boolean) => {
    dispatch({
      type: "DATE_CHANGE",
      payload: dateUtils.adjustDate(state.date, increment, state.period)
    });
  };

  useEffect(() => {
    console.log("state.date", state.date.getFullYear());
    getYearHolidays(state.date)
      .then((d) => {
        dispatch({
          type: "ADD_HOLIDAYS",
          payload: d.regularDaysOff
        });
      })
      .catch(() => {
        new Notice(t("Calendar.failed-load-holidays", { year: state.date.getFullYear() }));
      });
  }, [state.date.getFullYear()]);

  const changeCurrentPeriod = (newPeriod: Period) => {
    dispatch({ type: "PERIOD_CHANGE", payload: newPeriod });
  };

  const periodFormat = dateUtils.getFormatter(state.period);

  return (
    <div className={"calendar"}>
      <PeriodSelector currentPeriod={state.period} onSelect={changeCurrentPeriod} />
      <DateNavigator title={periodFormat(state.date)} onChange={changeDate} />
      {state.period === "month" && <MonthCalendar date={state.date} holidays={state.holidays} />}
      {state.period === "week" && <WeekCalendar date={state.date} holidays={state.holidays} />}
      {state.period === "day" && <DayCalendar date={state.date} holidays={state.holidays} />}
      {state.period === "daily" && <DailyCalendar date={state.date} holidays={state.holidays} />}
    </div>
  );
}

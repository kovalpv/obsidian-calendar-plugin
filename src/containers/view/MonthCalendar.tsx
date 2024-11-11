import { useEffect, useMemo } from "react";

import { Actions } from "@src/components";
import createCalendarDay from "./CreateCalendarDay";
import Day from "../Day";
import { useLocale } from "@src/LocaleContext";
import { loadTasksInInterval } from "@utils/obsidian";
import useTasks from "../useTasks";
import { DateSet } from "@utils/date";
import { CopyPreviousDaysTasksAction, CopyPreviousDayTasksAction, OpenNote } from "../actions";

import "./MonthCalendar.css";

interface MonthCalendarProps {
  readonly date: Date;
  readonly holidays: DateSet;
}

function MonthCalendar({ date, holidays }: MonthCalendarProps) {
  const { dateUtils, config } = useLocale();
  const { getTasks, setDayTasks, setTasks } = useTasks();

  const weekDays = dateUtils.getWeekDays();
  const { weeks, start, end } = useMemo(() => {
    const daysInMonth = dateUtils.getMonthDays(date).map(createCalendarDay(holidays));
    const start = daysInMonth[0].date;
    const end = daysInMonth[daysInMonth.length - 1].date;
    const aWeeks = [];
    for (let i = 0; i < daysInMonth.length; i += 7) {
      aWeeks.push(daysInMonth.slice(i, i + 7));
    }
    return { weeks: aWeeks, start, end };
  }, [date, holidays]);

  useEffect(() => {
    loadTasksInInterval({
      path: config.folder,
      start,
      end,
      dateUtils
    }).then((tasks) => {
      setTasks(tasks);
    });
  }, [start, end, dateUtils, config.folder]);

  return (
    <table className="month-calendar">
      <thead>
        <tr>
          {weekDays.map((day) => (
            <th key={day}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {weeks.map((week, index) => (
          <tr key={index}>
            {week.map((day) => (
              <td key={day.date.toString()} className={day.classes}>
                <div className="month-calendar__day-title">{dateUtils.formatDayShort(day.date)}</div>
                <Actions
                  className="month-calendar__actions"
                  date={day.date}
                  tasks={getTasks(day.date)}
                  setTasks={setDayTasks(day.date)}
                  holidays={holidays}
                >
                  <CopyPreviousDayTasksAction
                    className="actions__action"
                    date={day.date}
                    setTasks={setDayTasks(day.date)}
                    holidays={holidays}
                  />
                  <CopyPreviousDaysTasksAction
                    className="actions__action"
                    date={day.date}
                    setTasks={setDayTasks(day.date)}
                    holidays={holidays}
                  />
                  <OpenNote className="actions__action" date={day.date} />
                </Actions>
                <Day date={day.date} tasks={getTasks(day.date)} setTasks={setDayTasks(day.date)} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MonthCalendar;

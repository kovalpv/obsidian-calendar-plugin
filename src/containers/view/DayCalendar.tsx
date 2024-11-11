import { useEffect, useMemo } from "react";

import { Actions } from "@src/components";
import { useLocale } from "@src/LocaleContext";
import createCalendarDay from "./CreateCalendarDay";
import Day from "../Day";

import useTasks from "../useTasks";
import { DateSet } from "@utils/date";
import { CopyPreviousDaysTasksAction, CopyPreviousDayTasksAction, OpenNote } from "../actions";
import "./WeekCalendar.css";
import { loadTasksInInterval } from "@utils/obsidian";

interface DayCalendarProps {
  readonly date: Date;
  readonly holidays: DateSet;
}

function DayCalendar({ date, holidays }: DayCalendarProps) {
  const { dateUtils, config } = useLocale();
  const { getTasks, setDayTasks, setTasks } = useTasks();
  const weekDays = [dateUtils.formatWeekDay(date)];
  const { weeks, start, end } = useMemo(() => {
    const weekDays = [date].map(createCalendarDay(holidays));
    const start = weekDays[0].date;
    const end = weekDays[weekDays.length - 1].date;
    return {
      weeks: weekDays,
      start,
      end
    };
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
    <table className="week-calendar">
      <thead>
        <tr>
          {weekDays.map((day) => (
            <th key={day}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {weeks.map((day) => (
            <td key={day.date.toString()} className={day.classes}>
              <div className="week-calendar__day-title">{dateUtils.formatDayShort(day.date)}</div>
              <Actions
                className="week-calendar__actions"
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
      </tbody>
    </table>
  );
}

export default DayCalendar;

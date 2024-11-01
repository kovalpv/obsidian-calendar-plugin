import { useEffect, useMemo } from "react";

import { Actions } from "../../components";
import { useLocale } from "../../LocaleContext";
import createCalendarDay from "../utils/CreateCalendarDay";
import Day from "../Day";
import readTasks from "../utils/readTasks";
import useTasks from "../useTasks";
import DateSet from "../../ProductionCalendar/DateSet";
import { CopyPreviousDayTasksAction, OpenNote } from "../actions";
import "./WeekCalendar.css";

interface DayCalendarProps {
  readonly date: Date;
  readonly holidays: DateSet;
}

function DayCalendar({ date, holidays }: DayCalendarProps) {
  const { dateUtils, settings } = useLocale();
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
    readTasks({
      path: settings.folder,
      start,
      end,
      dateUtils
    }).then((tasks) => {
      setTasks(tasks);
    });
  }, [start, end, dateUtils, settings.folder]);

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
          {/*<td>{dateUtils.formatWeekShort(weeks[0].date)}</td>*/}
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

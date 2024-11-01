import DateSet from "../../ProductionCalendar/DateSet";
import { copyPreviousDayUndoneTask } from "../utils/readTasks";
import { useLocale } from "../../LocaleContext";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { ClipboardCopy } from "lucide-react";
import { TaskFile } from "../../AppTypes";

interface CopyPreviousDayTasksActionProps {
  readonly className?: string;
  readonly date: Date;
  readonly holidays: DateSet;
  readonly setTasks: (tasks: TaskFile[]) => void;
}

function CopyPreviousDayTasksAction({ className, date, holidays, setTasks }: CopyPreviousDayTasksActionProps) {
  const { dateUtils, settings } = useLocale();
  const { t } = useTranslation();
  return (
    <button
      className={classNames("actions", className)}
      title={t("Calendar.day.action.copy-prev-day.title")}
      onClick={() => {
        const prevDay = dateUtils.getPreviousDay(date, holidays);
        const { folder } = settings;
        copyPreviousDayUndoneTask({
          path: folder,
          dateUtils: dateUtils,
          from: prevDay,
          to: date
        }).then(setTasks);
      }}
    >
      <ClipboardCopy size="1rem" />
    </button>
  );
}

export default CopyPreviousDayTasksAction;

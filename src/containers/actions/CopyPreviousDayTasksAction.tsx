import { DateSet } from "@utils/date";
import { copyUndoneTasksFromPreviousWorkDay } from "@utils/obsidian";
import { useLocale } from "@src/LocaleContext";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { ClipboardCopy } from "lucide-react";
import { TaskWithSource } from "@src/AppTypes";

interface CopyPreviousDayTasksActionProps {
  readonly className?: string;
  readonly date: Date;
  readonly holidays: DateSet;
  readonly setTasks: (tasks: TaskWithSource[]) => void;
}

function CopyPreviousDayTasksAction({ className, date, holidays, setTasks }: CopyPreviousDayTasksActionProps) {
  const { dateUtils, config } = useLocale();
  const { t } = useTranslation();
  return (
    <button
      className={classNames("actions", className)}
      title={t("Calendar.day.action.copy-prev-day.title")}
      onClick={() => {
        const prevDay = dateUtils.getPreviousDay(date, holidays);
        const { folder } = config;
        copyUndoneTasksFromPreviousWorkDay({
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

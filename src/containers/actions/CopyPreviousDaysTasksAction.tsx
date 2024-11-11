import { DateSet } from "@utils/date";
import { useLocale } from "@src/LocaleContext";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { ClipboardList } from "lucide-react";
import { TaskWithSource } from "@src/AppTypes";
import React from "react";
import { copyUndoneTasksFromPeriod } from "@utils/obsidian";

interface CopyPreviousDayTasksActionProps {
  readonly className?: string;
  readonly date: Date;
  readonly holidays: DateSet;
  readonly setTasks: (tasks: TaskWithSource[]) => void;
}

function CopyPreviousDaysTasksAction({ className, date, setTasks }: CopyPreviousDayTasksActionProps) {
  const { dateUtils, config } = useLocale();
  const { t } = useTranslation();
  return (
    <button
      className={classNames("actions", className)}
      title={t("Calendar.day.action.copy-month.title")}
      onClick={() => {
        const prevDay = dateUtils.adjustDate(date, false, "month");
        const { folder } = config;
        copyUndoneTasksFromPeriod({
          path: folder,
          dateUtils: dateUtils,
          from: prevDay,
          to: date
        }).then(setTasks);
      }}
    >
      <ClipboardList size="1rem" />
    </button>
  );
}

export default CopyPreviousDaysTasksAction;

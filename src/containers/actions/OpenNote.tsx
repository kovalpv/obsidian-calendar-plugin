import { useLocale } from "../../LocaleContext";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { openFileInObsidian } from "../utils/readTasks";
import { Notice } from "obsidian";
import { NotebookText } from "lucide-react";

interface OpenNoteProps {
  readonly className?: string;
  readonly date: Date;
}

function OpenNote({ className, date }: OpenNoteProps) {
  const { dateUtils, settings } = useLocale();
  const { t } = useTranslation();
  return (
    <button
      className={classNames("actions", className)}
      title={t("Calendar.day.action.open-note.title")}
      onClick={() => {
        openFileInObsidian(settings.folder, dateUtils.formatDate(date)).catch(() => {
          new Notice(t("Calendar.day.action.open-note.error", { day: dateUtils.formatDate(date) }));
        });
      }}
    >
      <NotebookText size="1rem" />
    </button>
  );
}

export default OpenNote;

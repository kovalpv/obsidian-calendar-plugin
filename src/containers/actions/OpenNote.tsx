import { useLocale } from "@src/LocaleContext";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { openFileInObsidian } from "@utils/obsidian";
import { Notice } from "obsidian";
import { NotebookText } from "lucide-react";

interface OpenNoteProps {
  readonly className?: string;
  readonly date: Date;
}

function OpenNote({ className, date }: OpenNoteProps) {
  const { dateUtils, config } = useLocale();
  const { t } = useTranslation();
  return (
    <button
      className={classNames("actions", className)}
      title={t("Calendar.day.action.open-note.title")}
      onClick={() => {
        openFileInObsidian(config.folder, dateUtils.formatDate(date)).catch(() => {
          new Notice(t("Calendar.day.action.open-note.error", { day: dateUtils.formatDate(date) }));
        });
      }}
    >
      <NotebookText size="1rem" />
    </button>
  );
}

export default OpenNote;

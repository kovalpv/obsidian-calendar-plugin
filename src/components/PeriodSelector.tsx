import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { Period } from "../AppTypes";

interface PeriodSelectorProps {
  readonly currentPeriod: Period;
  readonly onSelect: (period: Period) => void;
}

type View = {
  title: string;
  period: Period;
};

const PeriodSelector = ({ currentPeriod, onSelect }: PeriodSelectorProps) => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const views: View[] = useMemo(() => {
    return [
      { title: t("PeriodSelector.month.title"), period: "month" },
      { title: t("PeriodSelector.week.title"), period: "week" },
      { title: t("PeriodSelector.day.title"), period: "day" },
      { title: t("PeriodSelector.daily.title"), period: "daily" }
    ];
  }, [i18n.language]);

  return (
    <>
      {views.map(({ title, period }: View) => (
        <button
          key={period}
          onClick={() => onSelect(period)}
          disabled={currentPeriod === period}
          aria-pressed={currentPeriod === period}
          aria-label={title}
        >
          {title.charAt(0).toUpperCase()}
        </button>
      ))}
    </>
  );
};

export default PeriodSelector;

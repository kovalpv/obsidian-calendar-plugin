import { useTranslation } from "react-i18next";
import "./DateNavigator.css";

interface DateNavigatorProps {
  readonly title: string;
  readonly onChange: (inc: boolean) => void;
}

const DateNavigator = ({ title, onChange }: DateNavigatorProps) => {
  const { t } = useTranslation();
  return (
    <span className="calendar-nav">
      <span className="calendar-nav__title">{title}</span>
      <button onClick={() => onChange(false)} aria-label={t("DateNavigator.Decrement.button.aria-label")}>
        ←
      </button>
      <button onClick={() => onChange(true)} aria-label={t("DateNavigator.Increment.button.aria-label")}>
        →
      </button>
    </span>
  );
};

export default DateNavigator;

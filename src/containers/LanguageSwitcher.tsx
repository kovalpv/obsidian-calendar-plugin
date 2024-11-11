import { FC } from "react";

import { useLocale } from "@src/LocaleContext";

import "./LanguageSwitcher.css";

const LanguageSwitcher: FC = () => {
  const { localeChange } = useLocale();

  return (
    <div className="language-switcher">
      <button onClick={() => localeChange("en")}>🇬‍🇧</button>
      <button onClick={() => localeChange("ru")}>🇷‍🇺</button>
    </div>
  );
};

export default LanguageSwitcher;

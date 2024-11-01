import { PluginManifest } from "obsidian";
import { createContext, FC, PropsWithChildren, useContext, useState } from "react";

import { CalendarSettings, LocaleType } from "./AppTypes";
import createDateUtils, { DateUtils } from "./DateUtils";
import i18n from "./i18n";

interface LocaleContextType {
  locale: LocaleType;
  localeChange: (locale: LocaleType) => void;
  manifest: PluginManifest;
  dateUtils: DateUtils;
  settings: CalendarSettings;
}

export const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

interface LocaleProviderProps {
  readonly settings: CalendarSettings;
  readonly manifest: PluginManifest;
}

export const LocaleProvider: FC<LocaleProviderProps & PropsWithChildren> = ({ settings, manifest, children }) => {
  const [locale, setLocale] = useState<LocaleType>("ru");
  const [dateUtils, setDateUtils] = useState<DateUtils>(createDateUtils("ru"));

  const changeLocale = (newLocale: LocaleType) => {
    switch (newLocale) {
      case "ru":
        setLocale(newLocale);
        i18n.changeLanguage(newLocale);
        setDateUtils(createDateUtils(newLocale));
        break;
      case "en":
        setLocale(newLocale);
        i18n.changeLanguage(newLocale);
        setDateUtils(createDateUtils(newLocale));
        break;
      default:
        setLocale("ru");
    }
  };

  return (
    <LocaleContext.Provider
      value={{
        localeChange: changeLocale,
        locale,
        dateUtils,
        manifest,
        settings
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
};

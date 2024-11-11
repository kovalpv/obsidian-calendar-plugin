import { PluginManifest } from "obsidian";
import { createContext, FC, PropsWithChildren, useContext, useState } from "react";

import { CalendarConfig, LocaleType } from "./AppTypes";
import { createDateUtils, DateUtils } from "@utils/date";
import i18n from "./i18n";

interface LocaleContextType {
  locale: LocaleType;
  localeChange: (locale: LocaleType) => void;
  manifest: PluginManifest;
  dateUtils: DateUtils;
  config: CalendarConfig;
}

export const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

interface LocaleProviderProps {
  readonly config: CalendarConfig;
  readonly manifest: PluginManifest;
}

export const LocaleProvider: FC<LocaleProviderProps & PropsWithChildren> = ({ config, manifest, children }) => {
  const [locale, setLocale] = useState<LocaleType>(config.locale ?? "ru");
  const [dateUtils, setDateUtils] = useState<DateUtils>(createDateUtils(config.locale ?? "ru"));

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
        config
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

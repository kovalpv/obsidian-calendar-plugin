import { Plugin, PluginManifest } from "obsidian";
import { createContext, FC, PropsWithChildren, useContext, useState } from "react";

import { CalendarConfig, LocaleType } from "./AppTypes";
import { createDateUtils, DateUtils } from "@utils/date";
import i18n from "./i18n";

interface LocaleContextType {
  readonly locale: LocaleType;
  readonly localeChange: (locale: LocaleType) => void;
  readonly manifest: PluginManifest;
  readonly dateUtils: DateUtils;
  readonly config: CalendarConfig;
  readonly configChanged?: (config: CalendarConfig) => void;
}

export const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

interface LocaleProviderProps {
  readonly plugin: Plugin;
  readonly config: CalendarConfig;
  readonly manifest: PluginManifest;
  readonly configChanged?: (config: CalendarConfig, plugin: Plugin) => void;
}

export const LocaleProvider: FC<LocaleProviderProps & PropsWithChildren> = ({
  plugin,
  config,
  manifest,
  children,
  configChanged
}) => {
  const [locale, setLocale] = useState<LocaleType>(config.locale ?? "ru");
  const [dateUtils, setDateUtils] = useState<DateUtils>(createDateUtils(config.locale ?? "ru"));
  const [privateConfig, privateSetConfig] = useState(config);

  const setConfig = (aConfig: CalendarConfig) => {
    privateSetConfig(aConfig);
    configChanged?.(aConfig, plugin);
  };

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
    setConfig({ ...config, locale: newLocale });
  };

  return (
    <LocaleContext.Provider
      value={{
        localeChange: changeLocale,
        locale,
        dateUtils,
        manifest,
        config: privateConfig,
        configChanged: setConfig
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

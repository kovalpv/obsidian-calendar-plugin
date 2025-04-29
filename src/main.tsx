import { Plugin } from "obsidian";
import { createRoot } from "react-dom/client";

import { CalendarConfig } from "./AppTypes";
import { Calendar } from "./containers";
import { LocaleProvider } from "./LocaleContext";
import { createDateUtils } from "@utils/date";
import { buildPieChart, generateTable } from "src/utils/statistic";
import loadTaskHistory from "@utils/obsidian/loadTaskHistory";
import { getTaskIcon } from "@src/components";

export default class CustomCalendar extends Plugin {
  onload() {
    // @ts-ignore
    window.renderCalendar = (
      el: HTMLElement,
      getConfig: () => CalendarConfig,
      configChanged: (config: CalendarConfig, plugin: Plugin) => void
    ): void => {
      const root = createRoot(el);
      const config: CalendarConfig = getConfig();
      root.render(
        <LocaleProvider plugin={this} manifest={this.manifest} config={config} configChanged={configChanged}>
          <Calendar date={config?.date ?? new Date()} period={config?.period ?? "month"} />
        </LocaleProvider>
      );
    };

    // @ts-ignore
    window.loadTasks = async (path: string, start: Date, end: Date) =>
      await loadTaskHistory({ path, start, end, dateUtils: createDateUtils("en") });

    // @ts-ignore
    window.getTaskIcon = getTaskIcon;

    // @ts-ignore
    window.calendar = {
      buildPieChart,
      generateTable
    };
  }
}

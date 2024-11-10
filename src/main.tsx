import { Plugin } from "obsidian";
import { createRoot } from "react-dom/client";

import { CalendarSettings } from "./AppTypes";
import { Calendar } from "./containers";
import { LocaleProvider } from "./LocaleContext";

const DEFAULT_SETTINGS = {};

export default class CustomCalendar extends Plugin {
  // @ts-ignore
  data: CalendarSettings = {};

  async onload() {
    await this.loadSettings();

    // @ts-ignore
    window.renderCalendar = (el: HTMLElement, settings: CalendarSettings): void => {
      const root = createRoot(el);
      root.render(
        <LocaleProvider manifest={this.manifest} settings={settings}>
          <Calendar date={settings?.date ?? new Date()} period={settings?.period ?? "month"} />
        </LocaleProvider>
      );
    };
  }

  async loadSettings() {
    this.data = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
}

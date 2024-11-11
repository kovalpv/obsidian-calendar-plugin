import { Plugin } from "obsidian";
import { createRoot } from "react-dom/client";

import { CalendarConfig } from "./AppTypes";
import { Calendar } from "./containers";
import { LocaleProvider } from "./LocaleContext";

export default class CustomCalendar extends Plugin {
  onload() {
    // @ts-ignore
    window.renderCalendar = (el: HTMLElement, config: CalendarConfig): void => {
      const root = createRoot(el);
      root.render(
        <LocaleProvider manifest={this.manifest} config={config}>
          <Calendar date={config?.date ?? new Date()} period={config?.period ?? "month"} />
        </LocaleProvider>
      );
    };
  }
}

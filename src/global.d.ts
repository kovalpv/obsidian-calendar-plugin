import { App } from "obsidian";

declare global {
  interface Window {
    app: App;
  }

  const app: App;
}

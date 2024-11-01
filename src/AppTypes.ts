import { TFile } from "obsidian";
import { Task as SourceTask } from "./Task";

export type LocaleType = "en" | "ru";
export type Period = "month" | "week" | "day" | "daily";

export type CalendarSettings = {
  locale?: LocaleType;
  date?: Date;
  folder: string;
  period?: Period;
};

export type TaskFile = {
  source: TFile;
  task: SourceTask;
  description: string;
  sourceLine: string;
};

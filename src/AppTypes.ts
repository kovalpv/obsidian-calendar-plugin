import { TFile } from "obsidian";
import { Task as SourceTask } from "@utils/Task";

export type LocaleType = "en" | "ru";
export type Period = "month" | "week" | "day" | "daily";

export type CalendarConfig = {
  locale?: LocaleType;
  date?: Date;
  folder: string;
  period?: Period;
};

export type TaskWithSource = {
  source: TFile;
  task: SourceTask;
  description: string;
  sourceLine: string;
};

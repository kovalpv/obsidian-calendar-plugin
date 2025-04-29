import { TFile } from "obsidian";
import { Task as SourceTask } from "@utils/Task";

export type LocaleType = "en" | "ru";
export type Period = "month" | "week" | "day" | "daily";

export type CalendarConfig = {
  readonly locale?: LocaleType;
  readonly date?: Date;
  readonly folder: string;
  readonly period?: Period;
};

export type TaskWithSource = {
  readonly source: TFile;
  readonly task: SourceTask;
  readonly description: string;
  readonly sourceLine: string;
  readonly group?: string;
};

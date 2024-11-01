import fs from "fs";
import path from "path";

import { requestUrl } from "obsidian";

import { CalendarProductionCalendarSource } from "./types";

async function fetchData(url: string) {
  const options = {
    url: url,
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  };

  const response = await requestUrl(options);
  if (response.status === 200) {
    return response.json;
  }
  throw new Error(`Error fetching data: ${response.status} ${response}`);
}

async function getCalendarSourceSource(year: number): Promise<CalendarProductionCalendarSource> {
  return await fetchData(`https://xmlcalendar.ru/data/ru/${year}/calendar.json`);
}

function getPath(filename: string): string {
  // @ts-ignore
  const vaultPath = app.vault.adapter.getBasePath();
  const pluginPath = ".obsidian/plugins/obsidian-calendar-plugin";

  return path.join(vaultPath, pluginPath, filename);
}

async function getCalendarSource(year: number): Promise<CalendarProductionCalendarSource> {
  const cacheFilePath = getPath(`${year}.json`);
  fs.existsSync(cacheFilePath);
  if (fs.existsSync(cacheFilePath)) {
    const cachedData = fs.readFileSync(cacheFilePath, "utf8");
    return await JSON.parse(cachedData);
  }

  const response = await getCalendarSourceSource(year);
  fs.writeFileSync(cacheFilePath, JSON.stringify(response), "utf-8");
  return response;
}

export default getCalendarSource;

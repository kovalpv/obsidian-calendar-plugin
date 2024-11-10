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

async function getCalendarSource(year: number): Promise<CalendarProductionCalendarSource> {
  try {
    return await getCalendarSourceSource(year);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default getCalendarSource;

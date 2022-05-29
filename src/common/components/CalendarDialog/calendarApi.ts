import { calendarUrl } from "app/config";
import http from "services/http";
import { CalendarData } from ".";

export const getCalendar: (date: string) => Promise<CalendarData> = (date) => {
  const url = `${calendarUrl}?date=${date}`;
  return http(url);
};

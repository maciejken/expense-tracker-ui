import { locale } from "app/config";

export enum Interval {
  Year = "year",
  Month = "month",
  Day = "day",
}

export enum DateString {
  Long = "long",
  Short = "short",
}

export enum DateNumber {
  Numeric = "numeric",
  TwoDigit = "2-digit",
}

export interface DateOptions {
  day?: DateNumber;
  hour12?: boolean;
  month?: DateString | DateNumber;
  timeZone?: string;
  timeZoneName?: DateString;
  year?: DateNumber;
}

export const getYearMonthDay = (date: string) => {
  const newDate = new Date(date);
  const year = "" + newDate.getFullYear();
  let month = "" + (newDate.getMonth() + 1);
  month = month.padStart(2, "0");
  let day = "" + newDate.getDate();
  day = day.padStart(2, "0");
  return [year, month, day];
};

export const getLocaleYearMonthDay = (date: string) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = newDate.toLocaleString(locale, { month: 'long' });
  const day = newDate.toLocaleString(locale, { day: 'numeric' });
  return { year, month, day };
};

export const getCurrentDate = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  return [currentYear, currentMonth, currentDay];
};


export enum Month {
  January = "0",
  February = "1",
  March = "2",
  April = "3",
  May = "4",
  June = "5",
  July = "6",
  August = "7",
  September = "8",
  October = "9",
  November = "10",
  December = "11",
};

export const months = {
  "0": "styczeń",
  "1": "luty",
  "2": "marzec",
  "3": "kwiecień",
  "4": "maj",
  "5": "czerwiec",
  "6": "lipiec",
  "7": "sierpień",
  "8": "wrzesień",
  "9": "październik",
  "10": "listopad",
  "11": "grudzień",
};

export const getMonths = () => {
  const year = new Array(12);
  return Array.from(year).map((month, index) => ({
    id: "" + index,
    label: months["" + index as Month]
  }))
};

export const getLocalDate = (date: Date, opts: DateOptions) => {
  return date.toLocaleDateString(locale, opts);
};

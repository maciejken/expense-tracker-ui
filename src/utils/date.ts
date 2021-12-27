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

interface DateFormat {
  day?: DateNumber;
  hour12?: boolean;
  month?: DateString | DateNumber;
  dateStyle?: "full" | "short";
  timeZone?: string;
  timeZoneName?: DateString;
  year?: DateNumber;
}

interface DateOptions extends DateFormat {
  interval: Interval;
}

export const getStartDate = (d: Date, { interval }: DateOptions) => {
  const year = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  switch (interval) {
    case Interval.Year:
      return `${year}-01-01`;
    case Interval.Month:
      return `${year}-${mm}-01`;
    default:
      return `${year}-${mm}-${dd}`;
  }
};

export const getLocaleYearMonthDay = (date: string) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = newDate.toLocaleString(locale, { month: 'long' });
  const day = newDate.toLocaleString(locale, { day: 'numeric' });
  return { year, month, day };
};

export const formatDate = (date: Date, options?: DateFormat) =>
  new Intl.DateTimeFormat(locale, options).format(date);

export const getLocalDate = (date: Date) => {
  return formatDate(date, { dateStyle: 'full' });
};

const intervals = [Interval.Day, Interval.Month, Interval.Year];

export const getRelativeInterval = (interval: Interval, step: number) => {
  const index = intervals.indexOf(interval);
  return intervals[index + step];
};

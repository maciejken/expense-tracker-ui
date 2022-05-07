import { locale } from "app/config";

export enum DatePrecision {
  None = "0",
  Year = "1",
  Month = "2",
  Day = "3",
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

export const formatDate = (date: Date, options?: DateFormat) =>
  new Intl.DateTimeFormat(locale, options).format(date);

export const getLocalDate = (date: Date) => {
  return formatDate(date, { dateStyle: "full" });
};

export const getCurrentDateString = (precision?: DatePrecision) => {
  const date = new Date();
  const isoString = date.toISOString();
  const [dateString] = isoString.split("T");
  if (!precision) {
    return dateString;
  }
  const numPrecision = +precision;
  return dateString.split("-").slice(0, numPrecision).join("-");
};

interface DateOptions {
  date: string;
  precision: DatePrecision;
}

const ValueDateMap = {
  [DatePrecision.None]: (value: string) => value,
  [DatePrecision.Year]: (value: string, date: string) =>
    `${date}-${value.padStart(2, "0")}`,
  [DatePrecision.Month]: (value: string, date: string) =>
    `${date}-${value.padStart(2, "0")}`,
  [DatePrecision.Day]: (value: string, date: string) =>
    `${date.slice(0, 8)}-${value.padStart(2, "0")}`,
};

export const getNewDate = (value: string, { date, precision }: DateOptions) => {
  const mapperFn = ValueDateMap[precision];
  return mapperFn(value, date);
};

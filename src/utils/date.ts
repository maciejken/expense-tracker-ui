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

const indexToMapperFn = {
  0: (value: string) => value,
  1: (value: string) => String(+value + 1).padStart(2, "0"),
  2: (value: string) => value.padStart(2, "0"),
};

export const dateValueMap = (value: string | undefined, index: number) => {
  let result = null;
  if (index === 0 || index === 1 || index === 2) {
    const mapperFn = indexToMapperFn[index];
    result = mapperFn(value as string);
  }
  return result as string | null;
};

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

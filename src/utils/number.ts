import { currency, locale } from "app/config";

export const getLocalFloat = (value: string) =>
  parseFloat(String(value).replace(",", ".")).toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export const getLocalAmount = (amount: string) =>
  parseFloat(amount).toLocaleString(locale, {
    style: "currency",
    currency,
  });

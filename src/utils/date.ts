export const getYearMonthDay = (date: string) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  return { year, month, day };
};

export const getLocaleYearMonthDay = (date: string, locale: string) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = newDate.toLocaleString(locale, { month: 'long' });
  const day = newDate.toLocaleString(locale, { day: 'numeric' });
  return { year, month, day };
};
export const apiUrl = String(process.env.REACT_APP_API_URL);
export const currency = String(process.env.REACT_APP_CURRENCY);
export const locale = String(process.env.REACT_APP_LOCALE);
export const timezone = String(process.env.REACT_APP_TIMEZONE);

export const expensesUrl = `${apiUrl}/expenses`;
export const authUrl = `${apiUrl}/auth`;
export const calendarUrl = `${apiUrl}/calendar`;

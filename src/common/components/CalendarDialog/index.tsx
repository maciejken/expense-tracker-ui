import { locale } from "app/config";
import { FC, useCallback, useEffect, useState } from "react";
import { getCalendar } from "./calendarApi";
import CalendarDialog from "./CalendarDialog";

interface CalendarWrapperProps {
  month: string;
  selectedDate: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

interface Interval {
  id: string;
  day: number;
  week: number;
  timestamp: number;
}

export interface CalendarData {
  date: string;
  intervals: Interval[];
  prevDate: string;
  nextDate: string;
}

const CalendarWrapper: FC<CalendarWrapperProps> = ({
  month,
  selectedDate,
  onChange,
  onClose,
}) => {
  const [isCalendarLoading, setCalendarLoading] = useState<boolean>(true);
  const [calendarData, setCalendarData] = useState<CalendarData>();
  const activeDate =
    calendarData && new Date(calendarData.intervals[0].timestamp);
  const activeDateString = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
  }).format(activeDate);
  const isCurrentMonth = activeDate?.toISOString().startsWith(month);
  const selectedDayOfMonth = isCurrentMonth ? selectedDate : undefined;

  const getCalendarAsync = useCallback(async () => {
    const data = await getCalendar(month);
    setCalendarData(data);
    setCalendarLoading(false);
  }, [month]);

  useEffect(() => {
    getCalendarAsync();
  }, [getCalendarAsync]);

  const handleClickNext = async () => {
    if (calendarData?.nextDate) {
      setCalendarLoading(true);
      const data = await getCalendar(calendarData?.nextDate);
      setCalendarData(data);
      setCalendarLoading(false);
    }
  };

  const handleClickPrev = async () => {
    if (calendarData?.prevDate) {
      setCalendarLoading(true);
      const data = await getCalendar(calendarData?.prevDate);
      setCalendarData(data);
      setCalendarLoading(false);
    }
  };

  const weekNums = calendarData?.intervals.reduce((nums, d) => {
    const week = d.week;
    if (!nums.includes(week)) {
      nums.push(week);
    }
    return nums;
  }, [] as number[]);
  const weeks = (weekNums || []).map((num) =>
    (calendarData?.intervals || [])
      .map((data) => ({
        date: data.id,
        day: data.day,
        week: data.week,
      }))
      .filter((d) => d.week === num)
  );

  return (
    <CalendarDialog
      calendarTitle={activeDateString}
      dialogTitle="Wybierz datę"
      onClose={onClose}
      isLoading={isCalendarLoading}
      weeks={weeks}
      selectedDate={selectedDayOfMonth}
      onChange={onChange}
      onNext={handleClickNext}
      onPrev={handleClickPrev}
    />
  );
};

export default CalendarWrapper;

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

  const getCalendarAsync = useCallback(async () => {
    const data = await getCalendar(month);
    setCalendarData(data);
    setCalendarLoading(false);
  }, [month]);

  useEffect(() => {
    getCalendarAsync();
  }, [getCalendarAsync]);

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
      title="Wybierz datę"
      onClose={onClose}
      isLoading={isCalendarLoading}
      weeks={weeks}
      selectedDate={selectedDate}
      onChange={onChange}
    />
  );
};

export default CalendarWrapper;

import { FC, useState } from "react";
import { Day } from "../Calendar/types";
import CalendarDialog from "./CalendarDialog";

interface CalendarWrapperProps {
  month: string;
  selectedDate: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

const CalendarWrapper: FC<CalendarWrapperProps> = ({
  month,
  selectedDate,
  onChange,
  onClose,
}) => {
  const [isCalendarLoading, setCalendarLoading] = useState<boolean>(true);
  const [calendarData, setCalendarData] = useState<Day[][]>([]);

  return (
    <CalendarDialog
      title="Wybierz datę"
      onClose={onClose}
      isLoading={isCalendarLoading}
      calendarData={calendarData}
      selectedDate={selectedDate}
      onChange={onChange}
    />
  );
};

export default CalendarWrapper;

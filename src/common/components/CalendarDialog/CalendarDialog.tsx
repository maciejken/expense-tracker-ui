import Month from "common/components/Calendar/Month";
import { Day } from "common/components/Calendar/types";
import Dialog from "common/components/Dialog/Dialog";
import Loader from "../Loader/Loader";
import { FC, MouseEventHandler } from "react";
import styles from "./CalendarDialog.module.css";

interface CalendarDialogProps {
  title: string;
  weeks: Day[][];
  selectedDate: string;
  isLoading: boolean;
  onClose: MouseEventHandler<HTMLButtonElement>;
  onNext?: () => void;
  onPrev?: () => void;
  onChange: (value: string) => void;
}

const CalendarDialog: FC<CalendarDialogProps> = ({
  title,
  weeks,
  selectedDate,
  isLoading,
  onClose,
  onChange,
  onNext,
  onPrev,
}) => {
  const getCalendar = () => (
    <Month
      weeks={weeks}
      inputName="calendar"
      selectedDate={selectedDate}
      onDateChange={onChange}
    />
  );
  return (
    <Dialog title={title} onClose={onClose}>
      <div className={styles.calendar}>
        {isLoading ? <Loader /> : getCalendar()}
      </div>
    </Dialog>
  );
};

export default CalendarDialog;

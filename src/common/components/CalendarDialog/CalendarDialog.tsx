import Month from "common/components/Calendar/Month";
import { Day } from "common/components/Calendar/types";
import Dialog from "common/components/Dialog/Dialog";
import Loader from "../Loader/Loader";
import { FC, MouseEventHandler } from "react";
import styles from "./CalendarDialog.module.css";

interface CalendarDialogProps {
  calendarTitle: string;
  dialogTitle: string;
  weeks: Day[][];
  selectedDate?: string;
  isLoading: boolean;
  onClose: MouseEventHandler<HTMLButtonElement>;
  onNext?: () => void;
  onPrev?: () => void;
  onChange: (value: string) => void;
}

const CalendarDialog: FC<CalendarDialogProps> = ({
  calendarTitle,
  dialogTitle,
  weeks,
  selectedDate,
  isLoading,
  onClose,
  onChange,
  onNext,
  onPrev,
}) => {
  const handleClickPrev = () => {
    "function" === typeof onPrev && onPrev();
  };
  const handleClickNext = () => {
    "function" === typeof onNext && onNext();
  };
  const getCalendar = () => (
    <div>
      <nav className={styles.calendarNav}>
        <button className={styles.calendarNavBtn} onClick={handleClickPrev}>
          &lt;
        </button>
        <span>{calendarTitle}</span>
        <button className={styles.calendarNavBtn} onClick={handleClickNext}>
          &gt;
        </button>
      </nav>
      <Month
        weeks={weeks}
        inputName="calendar"
        selectedDate={selectedDate}
        onDateChange={onChange}
      />
    </div>
  );
  return (
    <Dialog title={dialogTitle} onClose={onClose}>
      <div className={styles.calendar}>
        {isLoading ? <Loader /> : getCalendar()}
      </div>
    </Dialog>
  );
};

export default CalendarDialog;

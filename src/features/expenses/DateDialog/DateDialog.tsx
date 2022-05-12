import Month from "common/components/Calendar/Month";
import { Day } from "common/components/Calendar/types";
import Dialog from "common/components/Dialog/Dialog";
import { FC, MouseEventHandler } from "react";
import styles from "./DateDialog.module.css";

interface DateDialogProps {
  title: string;
  calendarData: Day[][];
  selectedDate: string;
  isLoading: boolean;
  onDialogClose: MouseEventHandler<HTMLButtonElement>;
  onDialogOpen: () => void;
  onNext: () => void;
  onPrev: () => void;
  onChange: (value: string) => void;
}

const DateDialog: FC<DateDialogProps> = ({
  title,
  calendarData,
  selectedDate,
  isLoading,
  onDialogClose,
  onDialogOpen,
  onChange,
  onNext,
  onPrev,
}) => {
  const getLoader = () => <span className="fa fa-spinner fa-pulse"></span>;
  const getCalendar = () => (
    <Month
      weeks={calendarData}
      inputName="calendar"
      selectedDate={selectedDate}
      onDateChange={onChange}
    />
  );
  return (
    <Dialog title={title} onClose={onDialogClose} onOpen={onDialogOpen}>
      <div className={styles.calendar}>
        {isLoading ? getLoader() : getCalendar()}
      </div>
    </Dialog>
  );
};

export default DateDialog;

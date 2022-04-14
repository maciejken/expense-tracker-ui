import { ChangeEventHandler, FC } from "react";
import { Day } from "./types";
import Week from "./Week";
import styles from "./Calendar.module.css";

interface MonthProps {
  weeks: Day[][];
  inputName: string;
  selectedDate?: string;
  onDateChange?: (date: string) => void;
}

const Month: FC<MonthProps> = ({
  weeks,
  inputName,
  selectedDate,
  onDateChange,
}) => {
  const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (typeof onDateChange === "function") {
      onDateChange(e.target.value);
    }
  };
  return (
    <div className={styles.month}>
      {weeks.map((week, index) => {
        const offset = index === 0 ? 7 - week.length : undefined;
        return (
          <Week
            key={`week-of-the-year-${week[0].week}`}
            days={week}
            inputName={inputName}
            offset={offset}
            selectedDate={selectedDate}
            onChange={changeHandler}
          />
        );
      })}
    </div>
  );
};

export default Month;

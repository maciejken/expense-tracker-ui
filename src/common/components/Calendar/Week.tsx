import classNames from "classnames";
import { InputType } from "common/types";
import { ChangeEventHandler, FC } from "react";
import styles from "./Calendar.module.css";
import { Day } from "./types";

interface WeekProps {
  days: Day[];
  inputName: string;
  selectedDate?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Week: FC<WeekProps> = ({ days, inputName, selectedDate, onChange }) => {
  return (
    <div className={styles.week}>
      {days.map((d) => {
        const isChecked = d.date === selectedDate;
        return (
          <label
            key={`day-of-the-month-${d.date}`}
            className={classNames(styles.day, {
              [styles.selected]: isChecked,
            })}
            style={{ left: `${(+d.day - 1) * 3}rem` }}
          >
            {d.date}
            <input
              type={InputType.Radio}
              checked={isChecked}
              value={d.date}
              className={styles.dayInput}
              name={inputName}
              onChange={onChange}
            />
          </label>          
        );
      })}
    </div>
  );
};

export default Week;

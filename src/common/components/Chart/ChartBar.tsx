import React, { FC, ChangeEventHandler } from "react";
import classNames from "classnames";
import { InputType } from "common/types";
import styles from "./ChartBar.module.css";

interface ChartBarProps {
  height: string;
  info?: string;
  active: boolean;
  label?: string;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
}

const ChartBar: FC<ChartBarProps> = ({
  active,
  height,
  info,
  label,
  name,
  onChange,
  value,
}) => {
  return (
    <div className={styles.chartBar} title={info}>
      <label
        className={classNames(styles.chartBar__bar, {
          [styles.chartBar__barActive]: active,
        })}
      >
        <div
          className={classNames(styles.chartBar__fill, {
            [styles.chartBar__fillActive]: active,
          })}
          style={{ height }}
        >
          <input
            type={InputType.Radio}
            name={name}
            value={value}
            checked={active}
            onChange={onChange}
            className={styles.chartBar__radioInput}
          />
        </div>
      </label>
      <div className={classNames(styles.chartBar__label, {
        [styles.chartBar__labelActive]: active
      })}>{label}</div>
    </div>
  );
};

export default ChartBar;

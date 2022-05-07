import React, { ChangeEventHandler, FC, MouseEventHandler } from "react";
import styles from "./Chart.module.css";
import ChartBar from "./ChartBar";

export interface DataPoint {
  id: string;
  amount: number;
  label?: string;
  info?: string;
  week: string;
  day: string;
  timestamp: number;
}

export interface ChartData {
  date: string;
  intervals: DataPoint[] | null;
  nextDate?: string;
  prevDate?: string;
}

interface ChartProps {
  data: DataPoint[] | null;
  inputName: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBarClick?: MouseEventHandler<HTMLInputElement>;
  onDrop?: (id: string, value: string) => void;
  value?: string;
}

const Chart: FC<ChartProps> = ({
  data,
  inputName,
  onBarClick,
  onChange,
  onDrop,
  value,
}) => {
  if (!data) {
    return null;
  }

  const values = data.map((d) => d.amount);
  const maxValue = Math.max(...values);

  return (
    <div className={styles.chart}>
      {data.map((d) => {
        let barFillHeight = "0%";
        if (maxValue > 0) {
          barFillHeight = `${Math.round((d.amount / maxValue) * 100)}%`;
        }
        return (
          <ChartBar
            height={barFillHeight}
            info={d.info}
            active={d.id === value}
            key={`chart-bar-${d.id}`}
            label={d.label}
            inputName={inputName}
            onChange={onChange}
            onClick={onBarClick}
            onDrop={onDrop}
            value={d.id}
          />
        );
      })}
    </div>
  );
};

export default Chart;

import React, { ChangeEventHandler, FC, MouseEventHandler } from "react";
import styles from "./Chart.module.css";
import ChartBar from "./ChartBar";

export interface DataPoint {
  x: string;
  y: number;
  label?: string;
  info?: string;
}

export interface ChartData {
  name: string;
  values: DataPoint[];
}

interface ChartProps {
  data: DataPoint[];
  interval: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBarClick?: MouseEventHandler<HTMLInputElement>;
  onDrop?: (id: string, value: string) => void;
  value?: string;
}

const Chart: FC<ChartProps> = ({
  data,
  interval,
  onBarClick,
  onChange,
  onDrop,
  value,
}) => {
  const values = data.map((d) => d.y);
  const maxValue = Math.max(...values);

  return (
    <div className={styles.chart}>
      {data.map((d) => {
        let barFillHeight = "0%";
        if (maxValue > 0) {
          barFillHeight = `${Math.round((d.y / maxValue) * 100)}%`;
        }
        return (
          <ChartBar
            height={barFillHeight}
            info={d.info}
            active={d.x === value}
            key={`chart-bar-${d.x}`}
            label={d.label}
            name={interval}
            onChange={onChange}
            onClick={onBarClick}
            onDrop={onDrop}
            value={d.x}
          />
        );
      })}
    </div>
  );
};

export default Chart;

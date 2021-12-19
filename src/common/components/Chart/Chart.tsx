import React, { ChangeEventHandler, FC } from "react";
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
  onChange: ChangeEventHandler<HTMLInputElement>;
  value?: string;
}

const Chart: FC<ChartProps> = ({ data, interval, onChange, value }) => {
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
            value={d.x}
          />
        );
      })}
    </div>
  );
};

export default Chart;

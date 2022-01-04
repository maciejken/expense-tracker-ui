import React, { ChangeEventHandler, FC, MouseEventHandler } from "react";
import styles from "./ExpensesChart.module.css";
import Chart, { DataPoint } from "common/components/Chart/Chart";
import {
  ChevronLeft,
  ChevronRight,
  ExpandLess,
  ExpandMore,
} from "@material-ui/icons";
import classNames from "classnames";
import { Interval } from "utils/date";

interface ExpensesChartProps {
  chartData: DataPoint[];
  chartInfo?: string;
  chartInterval: string;
  chartValue: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onChartUp: MouseEventHandler<HTMLButtonElement>;
  onChartDown: MouseEventHandler<HTMLButtonElement>;
  onChartNext: MouseEventHandler<HTMLButtonElement>;
  onChartPrev: MouseEventHandler<HTMLButtonElement>;
  onDrop: (id: string, value: string) => void;
}

const ExpensesChart: FC<ExpensesChartProps> = ({
  chartData,
  chartInfo,
  chartInterval,
  chartValue,
  onChange,
  onChartUp,
  onChartDown,
  onChartNext,
  onChartPrev,
  onDrop,
}) => {
  return (
    <div className={styles.chart}>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          {chartInterval !== Interval.Year && (
            <button
              className={classNames(styles.button, styles.up)}
              onClick={onChartUp}
            >
              <ExpandLess />
            </button>
          )}
          {chartInterval !== Interval.Day && (
            <button
              className={classNames(styles.button, styles.down)}
              onClick={onChartDown}
            >
              <ExpandMore />
            </button>
          )}
        </div>
        <span>{chartInfo}</span>
        {chartInterval !== Interval.Year && (
          <div className={styles.navRight}>
            <button
              className={classNames(styles.button, styles.prev)}
              onClick={onChartPrev}
            >
              <ChevronLeft />
            </button>
            <button className={styles.button} onClick={onChartNext}>
              <ChevronRight className={styles.next} />
            </button>
          </div>
        )}
      </nav>
      <Chart
        data={chartData}
        interval={chartInterval}
        onChange={onChange}
        onDrop={onDrop}
        value={chartValue}
      />
    </div>
  );
};

export default ExpensesChart;

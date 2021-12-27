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
}) => {
  return (
    <div className={styles.chart}>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <button
            className={classNames(styles.button, styles.up, {
              [styles.disabled]: chartInterval === Interval.Year
            })}
            disabled={chartInterval === Interval.Year}
            onClick={onChartUp}
          >
            <ExpandLess />
          </button>
          <button
            className={classNames(styles.button, styles.down, {
              [styles.disabled]: chartInterval === Interval.Day
            })}
            disabled={chartInterval === Interval.Day}
            onClick={onChartDown}
          >
            <ExpandMore />
          </button>
        </div>
        <span>{chartInfo}</span>
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
      </nav>
      <Chart
        data={chartData}
        interval={chartInterval}
        onChange={onChange}
        value={chartValue}
      />
    </div>
  );
};

export default ExpensesChart;

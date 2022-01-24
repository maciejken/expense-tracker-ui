import React, { ChangeEventHandler, FC, MouseEventHandler } from "react";
import styles from "./ExpensesChart.module.css";
import Chart, { DataPoint } from "common/components/Chart/Chart";
import classNames from "classnames";
import { Interval } from "utils/date";

interface ExpensesChartProps {
  chartData: DataPoint[];
  chartInfo?: string;
  chartInterval: string;
  chartValue: string;
  isLoading?: boolean;
  onBarClick?: MouseEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onChartUp: MouseEventHandler<HTMLButtonElement>;
  onChartNext: MouseEventHandler<HTMLButtonElement>;
  onChartPrev: MouseEventHandler<HTMLButtonElement>;
  onDrop: (id: string, value: string) => void;
}

const ExpensesChart: FC<ExpensesChartProps> = ({
  chartData,
  chartInfo,
  chartInterval,
  chartValue,
  isLoading,
  onChange,
  onChartUp,
  onChartNext,
  onChartPrev,
  onBarClick,
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
              <i className="fa fa-chevron-up" />
            </button>
          )}
        </div>
        <span>
          {isLoading ? (
            <i className="fa fa-spinner fa-pulse" />
          ) : (
            chartInfo
          )}
        </span>
        {chartInterval !== Interval.Year && (
          <div className={styles.navRight}>
            <button
              className={classNames(styles.button, styles.prev)}
              onClick={onChartPrev}
            >
              <i className="fa fa-chevron-left" />
            </button>
            <button
              className={classNames(styles.button, styles.next)}
              onClick={onChartNext}
            >
              <i className="fa fa-chevron-right" />
            </button>
          </div>
        )}
      </nav>
      <Chart
        data={chartData}
        interval={chartInterval}
        onChange={onChange}
        onBarClick={onBarClick}
        onDrop={onDrop}
        value={chartValue}
      />
    </div>
  );
};

export default ExpensesChart;

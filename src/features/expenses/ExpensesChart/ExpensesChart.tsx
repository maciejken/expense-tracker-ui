import React, { ChangeEventHandler, FC, MouseEventHandler } from "react";
import styles from "./ExpensesChart.module.css";
import Chart, { DataPoint } from "common/components/Chart/Chart";
import classNames from "classnames";
import { DatePrecision } from "utils/date";
import classnames from "classnames";

interface ExpensesChartProps {
  chartData: DataPoint[] | null;
  chartInfo?: string;
  chartValue?: string;
  datePrecision: DatePrecision;
  isLoading?: boolean;
  onBarClick?: MouseEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onClickView: MouseEventHandler<HTMLInputElement>;
  onChartNext: MouseEventHandler<HTMLButtonElement>;
  onChartPrev: MouseEventHandler<HTMLButtonElement>;
  onDrop: (id: string, value: string) => void;
}

const ExpensesChart: FC<ExpensesChartProps> = ({
  chartData,
  chartInfo,
  chartValue,
  datePrecision,
  isLoading,
  onChange,
  onClickView,
  onChartNext,
  onChartPrev,
  onBarClick,
  onDrop,
}) => {
  return (
    <div className={styles.chart}>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <div className={styles.timeframeTabs}>
            <label
              className={classnames(styles.button, {
                [styles.active]: datePrecision < DatePrecision.Year,
              })}
            >
              wszystko
              <input
                type="radio"
                name="chartView"
                className={styles.radio}
                onClick={onClickView}
                value={DatePrecision.None}
              />
            </label>
            <label
              className={classnames(styles.button, {
                [styles.active]: datePrecision === DatePrecision.Year,
              })}
            >
              rok
              <input
                type="radio"
                name="chartView"
                className={styles.radio}
                onClick={onClickView}
                value={DatePrecision.Year}
              />
            </label>
            <label
              className={classnames(styles.button, {
                [styles.active]: datePrecision > DatePrecision.Year,
              })}
            >
              miesiąc
              <input
                type="radio"
                name="chartView"
                className={styles.radio}
                onClick={onClickView}
                value={DatePrecision.Month}
              />
            </label>
          </div>
          {datePrecision > DatePrecision.None && (
            <div className={styles.chevrons}>
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
        </div>
        <div className={styles.navRight}>
          <span>
            {isLoading ? <i className="fa fa-spinner fa-pulse" /> : chartInfo}
          </span>
        </div>
      </nav>
      <Chart
        data={chartData}
        inputName="date"
        onChange={onChange}
        onBarClick={onBarClick}
        onDrop={onDrop}
        value={chartValue}
      />
    </div>
  );
};

export default ExpensesChart;

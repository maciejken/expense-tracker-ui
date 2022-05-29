import { ChangeEventHandler, FC, MouseEventHandler } from "react";
import styles from "./ExpensesChart.module.css";
import Chart, { ChartData } from "common/components/Chart/Chart";
import classNames from "classnames";
import { DatePrecision } from "utils/date";
import classnames from "classnames";
import Month from "common/components/Calendar/Month";
import Loader from "common/components/Loader/Loader";
import { Size } from "common/types";

interface ExpensesChartProps {
  chartData: ChartData;
  chartInfo?: string;
  selectedDate?: string;
  datePrecision: DatePrecision;
  isLoading?: boolean;
  onBarClick?: MouseEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onDateChange?: (date: string) => void;
  onClickView: MouseEventHandler<HTMLInputElement>;
  onChartNext: MouseEventHandler<HTMLButtonElement>;
  onChartPrev: MouseEventHandler<HTMLButtonElement>;
  onDrop: (id: string, value: string) => void;
}

const ExpensesChart: FC<ExpensesChartProps> = ({
  chartData,
  chartInfo,
  selectedDate,
  datePrecision,
  isLoading,
  onChange,
  onDateChange,
  onClickView,
  onChartNext,
  onChartPrev,
  onBarClick,
  onDrop,
}) => {
  const isMonth = [DatePrecision.Month, DatePrecision.Day].includes(
    datePrecision
  );
  const hasPages = !!(chartData.nextDate && chartData.prevDate);
  const getChart = () => {
    if (isLoading) {
      return (
        <div className={styles.loader}>
          <Loader size={Size.Medium} />
        </div>
      );
    }
    if (!chartData.intervals) {
      return null;
    }
    if (isMonth) {
      const weekNums = chartData.intervals.reduce((nums, d) => {
        const week = d.week;
        if (!nums.includes(week)) {
          nums.push(week);
        }
        return nums;
      }, [] as number[]);
      const weeks = weekNums.map((num) =>
        chartData.intervals
          ? chartData.intervals
              .map((data) => ({
                date: data.id,
                day: data.day,
                week: data.week,
              }))
              .filter((d) => d.week === num)
          : []
      );
      return (
        <Month
          weeks={weeks}
          inputName="date"
          selectedDate={selectedDate}
          onDateChange={onDateChange}
        />
      );
    }
    const chartValue = selectedDate?.split("-")[+datePrecision - 1];
    return (
      <div className={styles.barChart}>
        <Chart
          data={chartData.intervals}
          inputName="date"
          onChange={onChange}
          onBarClick={onBarClick}
          onDrop={onDrop}
          value={chartValue}
        />
      </div>
    );
  };

  return (
    <div className={styles.chart}>
      <nav className={styles.nav}>
        <div className={styles.timeframeTabs}>
          <label
            className={classnames(styles.button, {
              [styles.active]: datePrecision === DatePrecision.None,
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
              [styles.active]: isMonth,
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
        {hasPages && (
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
      </nav>
      {getChart()}
      <div className={styles.chartInfo}>{chartInfo}</div>
    </div>
  );
};

export default ExpensesChart;

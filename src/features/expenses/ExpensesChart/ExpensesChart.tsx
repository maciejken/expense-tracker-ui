import { ChangeEventHandler, FC, MouseEventHandler } from "react";
import styles from "./ExpensesChart.module.css";
import Chart, { DataPoint } from "common/components/Chart/Chart";
import classNames from "classnames";
import { DatePrecision } from "utils/date";
import classnames from "classnames";
import Month from "common/components/Calendar/Month";

interface ExpensesChartProps {
  chartData: DataPoint[] | null;
  chartInfo?: string;
  chartValue?: string;
  selectedYear?: string;
  selectedMonth?: string;
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
  chartValue,
  selectedYear,
  selectedMonth,
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
  const getCal = () => {
    if (!chartData?.length) {
      return null;
    }
    const weekNums = chartData.reduce((nums, d) => {
      const week = d.week as string;
      if (!nums.includes(week)) {
        nums.push(week);
      }
      return nums;
    }, [] as string[]);
    const weeks = weekNums.map((num) =>
      chartData
        .map((data) => ({
          date: data.id,
          day: data.day,
          week: data.week,
        }))
        .filter((d) => d.week === num)
    );
    return (
      <Month
        weeks={weeks}
        inputName="date"
        selectedDate={selectedDate}
        onDateChange={onDateChange}
      />
    );
  };
  return (
    <div className={styles.chart}>
      <nav className={styles.nav}>
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
        {isLoading && <i className="fa fa-spinner fa-pulse" />}
      </nav>
      {datePrecision === DatePrecision.Day || datePrecision === DatePrecision.Month ? (
        getCal()
      ) : (
        <Chart
          data={chartData}
          inputName="date"
          onChange={onChange}
          onBarClick={onBarClick}
          onDrop={onDrop}
          value={chartValue}
        />
      )}
      <div className={styles.chartInfo}>{chartInfo}</div>
    </div>
  );
};

export default ExpensesChart;

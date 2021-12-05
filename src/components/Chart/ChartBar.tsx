import React, { FC } from "react";
import { ChartBarProps } from "./types";
import styles from "./ChartBar.module.scss";

const ChartBar: FC<ChartBarProps> = ({ value, maxValue, label }) => {
  let barFillHeight = "0%";

  if (maxValue > 0) {
    barFillHeight = `${Math.round((value / maxValue) * 100)}%`;
  }

  const truncatedLabel = label.slice(0, 3);

  return (
    <div className={styles.chartBar} title={`${label} - ${value} zł`}>
      <div className={styles.chartBar__inner}>
        <div
          className={styles.chartBar__fill}
          style={{ height: barFillHeight }}
        ></div>
      </div>
      <div className={styles.chartBar__label}>{truncatedLabel}</div>
    </div>
  );
};

export default ChartBar;

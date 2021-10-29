import styles from './ChartBar.module.scss';

const ChartBar = ({ value, maxValue, label }) => {
	let barFillHeight = '0%';

	if (maxValue > 0) {
		barFillHeight = `${Math.round((value / maxValue) * 100)}%`;
	}

	return (
    <div className={styles.chartBar}>
			<div className={styles.chartBar__inner}>
				<div
					className={styles.chartBar__fill}
					style={{ height: barFillHeight }}
				></div>
			</div>
			<div className={styles.chartBar__label}>{label}</div>
		</div>
  );
};

export default ChartBar;

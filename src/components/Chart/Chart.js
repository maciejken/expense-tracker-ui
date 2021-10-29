import styles from './Chart.module.css';
import ChartBar from './ChartBar';

const Chart = ({ data }) => {
  const values = data.map(d => d.value);
  const maxValue = Math.max(...values);

  return (
    <div className={styles.chart}>
      {data.map(d => (
        <ChartBar
          key={d.label}
          value={d.value}
          maxValue={maxValue}
          label={d.label}
        />
      ))}
    </div>
  );
};

export default Chart;

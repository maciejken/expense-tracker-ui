export interface ChartDataPoint {
  value: number;
  label: string;
}

export interface ChartBarProps extends ChartDataPoint {
  maxValue: number;
}

export interface ChartProps {
  data: ChartDataPoint[];
}

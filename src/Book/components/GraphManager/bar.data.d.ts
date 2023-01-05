export interface BarData {
  labels: Array<String>;
  datasets: Array<datasets>;
}

interface datasets {
  label: String;
  data: Array<number>;
  backgroundColor: Array<String>;
  borderColor: Array<String>;
  borderWidth: number;
}

export default BarData;
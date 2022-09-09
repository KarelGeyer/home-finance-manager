import { Line } from "react-chartjs-2";

export interface IProps {
  data: number[];
  labels: string[];
}

export const LineGraph: React.FC<IProps> = ({ data, labels }) => {
  return (
    <Line
      height={300}
      width={800}
      data={{
        labels: labels,
        datasets: [
          {
            label: "Dataset",
            data: data,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      }}
      options={{
        maintainAspectRatio: false,
      }}
    />
  );
};

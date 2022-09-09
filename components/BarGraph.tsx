import { Bar } from "react-chartjs-2";

export interface IProps {
  data: { label: string; datasets: number[] };
  labels: string[];
}

export const BarGraph: React.FC<IProps> = ({ data, labels }) => {
  return (
    <Bar
      data={{
        labels: labels,
        datasets: [
          {
            label: data.label,
            data: data.datasets,
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)",
              "rgba(75, 192, 192, 0.5)",
              "rgba(153, 102, 255, 0.5)",
              "rgba(255, 159, 64, 0.5)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 2,
          },
        ],
      }}
    />
  );
};

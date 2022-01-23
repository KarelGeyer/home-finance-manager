import { Line } from 'react-chartjs-2';

interface IProps {
  data: number[],
  labels: string[]
}

const LineGraph: React.FC<IProps> = ({data, labels}) => {
  return (
    <Line
      className='lineGraph'
      height={300}
      width={800}
      data={{
        labels: labels,
        datasets: [{
          label: 'Dataset',
          data: data,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }}
      options={{
        maintainAspectRatio: false,
      }}
    />
  )
}

export default LineGraph

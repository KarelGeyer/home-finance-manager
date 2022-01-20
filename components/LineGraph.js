import { Line } from 'react-chartjs-2';

const LineGraph = ({data, labels}) => {
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
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            }
          }],
          yAxes: [{
            gridLines: {
              display: false
            }
          }]
        }
      }}
    />
  )
}

export default LineGraph

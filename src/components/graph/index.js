import React from 'react';
import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
  Filler,
  CategoryScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import moment from 'moment';
import styles from './styles.module.css';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
  Title
);

const GraphView = (props) => {
  // PROPS
  const { labels, dataPoints } = props;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        color: '#333',
        font: { size: 16 },
      },
    },
    elements: {
      point: {
        hoverBackgroundColor: '#00be5f',
        hoverBorderColor: '#fff',
        hoverBorderWidth: 2,
        hoverRadius: 7,
      },
    },
    onHover: (event, chartElement) => {
      const pointHovered = chartElement[0];
      event.native.target.style.cursor = pointHovered ? 'pointer' : 'default';
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: true,
        },
        ticks: {
          display: false,
          autoSkip: true,
          maxTicksLimit: 10,
          callback: function (value, index, values) {
            return moment(labels[index]).format('MMM D');
          },
        },
      },
      y: {
        position: 'right',
        grid: {
          display: false,
          drawBorder: true,
        },
        ticks: {
          display: true,
        },
        beginAtZero: true,
        suggestedMin: 0,
        suggestedMax: Math.max(...dataPoints, 0),
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Views',
        data: dataPoints,
        fill: true,
        backgroundColor: 'rgba(0, 190, 95, 0.1)',
        borderColor: '#00be5f',
        pointBackgroundColor: '#00be5f',
        pointBorderColor: '#fff',
        pointRadius: 2,
        pointHoverRadius: 7,
        tension: 0,
      },
    ],
  };

  return (
    <div className={styles.graphContainer}>
      <Line data={data} options={options} />
    </div>
  );
};

GraphView.propTypes = {
  labels: PropTypes.array,
  dataPoints: PropTypes.array,
};

export default GraphView;

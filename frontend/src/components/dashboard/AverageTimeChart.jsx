import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useTheme } from '@mui/material/styles';

const AverageTimeChart = ({ tasks }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const calculateAverageTime = (status) => {
    const filteredTasks = tasks.filter(task => task.status === status);
    if (filteredTasks.length === 0) return 0;
    const totalTime = filteredTasks.reduce((acc, task) => {
      const timeInState = (new Date() - new Date(task.last_status_change)) / (1000 * 60 * 60);
      return acc + timeInState;
    }, 0);
    return Math.round(totalTime / filteredTasks.length);
  };

  const data = {
    labels: ['Por Hacer', 'En Progreso', 'Completada'],
    datasets: [
      {
        label: 'Tiempo Promedio (horas)',
        data: [
          calculateAverageTime('por hacer'),
          calculateAverageTime('en progreso'),
          calculateAverageTime('completada'),
        ],
        backgroundColor: '#36A2EB',
        borderColor: isDarkMode ? theme.palette.background.paper : '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: theme.palette.divider
        },
        ticks: {
          color: theme.palette.text.primary
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: theme.palette.text.primary
        }
      }
    }
  };

  return (
    <div style={{ height: 300 }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default AverageTimeChart;
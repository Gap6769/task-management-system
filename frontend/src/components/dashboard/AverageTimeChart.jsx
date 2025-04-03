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
    return totalTime / filteredTasks.length;
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
        backgroundColor: isDarkMode ? '#4CAF50' : '#36A2EB',
      },
    ],
  };

  return <Bar data={data} />;
};

export default AverageTimeChart;
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useTheme } from '@mui/material/styles';
import '@/config/chartConfig';

const TaskStatusChart = ({ tasks }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const data = {
    labels: ['Por Hacer', 'En Progreso', 'Completada'],
    datasets: [
      {
        data: [
          tasks.filter(task => task.status === 'por hacer').length,
          tasks.filter(task => task.status === 'en progreso').length,
          tasks.filter(task => task.status === 'completada').length,
        ],
        backgroundColor: isDarkMode 
          ? ['#BB86FC', '#03DAC6', '#CF6679'] 
          : ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: isDarkMode 
          ? ['#BB86FC', '#03DAC6', '#CF6679'] 
          : ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return <Pie data={data} />;
};

export default TaskStatusChart;
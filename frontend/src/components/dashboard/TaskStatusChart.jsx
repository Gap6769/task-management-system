import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useTheme } from '@mui/material/styles';

const TaskStatusChart = ({ tasks, id }) => {
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
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ],
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
        position: 'right',
        labels: {
          color: theme.palette.text.primary,
          font: {
            size: 12
          }
        }
      }
    }
  };

  return (
    <div style={{ height: 300 }}>
      <Pie id={id} data={data} options={options} />
    </div>
  );
};

export default TaskStatusChart;
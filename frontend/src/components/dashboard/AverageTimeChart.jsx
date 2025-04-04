import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { useTheme } from '@mui/material/styles';
import '@/config/chartConfig';

const AverageTimeChart = ({ tasks }) => {
  const chartRef = useRef(null);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

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
      },
      tooltip: {
        backgroundColor: theme.palette.background.paper,
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: theme.palette.divider
        },
        ticks: {
          color: theme.palette.text.primary,
          callback: (value) => `${value}h`
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
      <Bar 
        ref={chartRef}
        data={data} 
        options={options}
      />
    </div>
  );
};

export default AverageTimeChart;
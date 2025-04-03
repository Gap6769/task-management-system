import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { useTheme } from '@mui/material/styles';

const TaskChart = ({ tasks }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const completedTasks = tasks.filter(task => task.status === 'completada');

  const taskCountsByDate = completedTasks.reduce((acc, task) => {
    const date = new Date(task.last_status_change).toISOString().split('T')[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const sortedDates = Object.keys(taskCountsByDate).sort();
  const data = sortedDates.map(date => ({
    date,
    count: taskCountsByDate[date],
  }));

  const chartData = {
    labels: data.map(d => d.date),
    datasets: [
      {
        label: 'Tareas Completadas',
        data: data.map(d => d.count),
        fill: false,
        backgroundColor: isDarkMode ? '#FFD700' : '#FF6384',
        borderColor: isDarkMode ? '#FFD700' : '#FF6384',
      },
    ],
  };

  return <Line data={chartData} />;
};

export default TaskChart;
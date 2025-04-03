import React from 'react';
import { Pie } from 'react-chartjs-2';
import '@/config/chartConfig'; 

const TaskStatusChart = ({ tasks }) => {
  const data = {
    labels: ['Por Hacer', 'En Progreso', 'Completada'],
    datasets: [
      {
        data: [
          tasks.filter(task => task.status === 'por hacer').length,
          tasks.filter(task => task.status === 'en progreso').length,
          tasks.filter(task => task.status === 'completada').length,
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return <Pie data={data} />;
};

export default TaskStatusChart;
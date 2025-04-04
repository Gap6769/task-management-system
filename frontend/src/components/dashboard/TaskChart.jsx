import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { useTheme } from '@mui/material/styles';
import '@/config/chartConfig';

const TaskChart = ({ tasks }) => {
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

  const completedTasks = tasks
    .filter(task => task.status === 'completada' && task.last_status_change)
    .reduce((acc, task) => {
      const date = task.last_status_change.split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

  const sortedData = Object.entries(completedTasks)
    .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB));

  const data = {
    labels: sortedData.map(([date]) => date.split('-').slice(1).join('/')),
    datasets: [
      {
        label: 'Tareas Completadas',
        data: sortedData.map(([_, count]) => count),
        fill: true,
        borderColor: '#FF6384',
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        tension: 0.4,
        pointBackgroundColor: '#FF6384',
        pointBorderColor: isDarkMode ? theme.palette.background.paper : '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
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
        mode: 'index',
        intersect: false,
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
          stepSize: 1,
          precision: 0
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
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    elements: {
      line: {
        tension: 0.4
      }
    }
  };

  return (
    <div style={{ height: 300 }}>
      <Line 
        ref={chartRef}
        data={data} 
        options={options}
      />
    </div>
  );
};

export default TaskChart;
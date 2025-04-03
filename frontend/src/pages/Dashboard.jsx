import React from 'react';
import { useTheme } from '@mui/material/styles';
import { useTasks } from '@/context/TaskContext';
import { Container, Typography, Grid, Card } from '@mui/material';
import AverageTimeChart from '../components/dashboard/AverageTimeChart';
import TaskStatusChart from '../components/dashboard/TaskStatusChart';
import TaskChart from '../components/dashboard/TaskChart';

const Dashboard = () => {
  const { tasks } = useTasks();
  const { theme } = useTheme();

  return (
    <Container
      sx={{
        marginTop: 4,
        padding: 3,
        borderRadius: 2,

        boxShadow: theme === 'dark' ? '0 4px 10px rgba(255, 255, 255, 0.1)' : '0 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontSize: 28,
          fontWeight: 'bold',
          textAlign: 'center',
          color: theme === 'dark' ? '#ffffff' : '#333333',
        }}
      >
        Task Dashboard
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {[TaskStatusChart, AverageTimeChart, TaskChart].map((ChartComponent, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card
              sx={{
                padding: 3,

                boxShadow: theme === 'dark' ? '0 4px 10px rgba(255, 255, 255, 0.1)' : '0 4px 10px rgba(0, 0, 0, 0.1)',
                borderRadius: 2,
              }}
            >
              <ChartComponent tasks={tasks} />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;

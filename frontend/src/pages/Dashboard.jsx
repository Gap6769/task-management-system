import React from 'react';
import { useTasks } from '@/context/TaskContext';
import { Container, Typography, Grid } from '@mui/material';
import AverageTimeChart from '../components/dashboard/AverageTimeChart';
import TaskStatusChart from '../components/dashboard/TaskStatusChart';
import TaskChart from '../components/dashboard/TaskChart';

const Dashboard = () => {
  const { tasks } = useTasks();

  return (
    <Container sx={{ marginTop: '20px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <Typography variant="h4" gutterBottom sx={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
        Task Dashboard
      </Typography>
      <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        <Grid item sx={{ margin: '20px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', flex: '1 1 45%', maxWidth: '45%' }}>
          <TaskStatusChart tasks={tasks} />
        </Grid>
        <Grid item sx={{ margin: '20px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', flex: '1 1 45%', maxWidth: '45%' }}>
          <AverageTimeChart tasks={tasks} />
        </Grid>
        <Grid item sx={{ margin: '20px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', flex: '1 1 45%', maxWidth: '45%' }}>
          <TaskChart tasks={tasks} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
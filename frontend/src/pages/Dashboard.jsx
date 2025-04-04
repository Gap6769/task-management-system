import React from 'react';
import { useTheme } from '@mui/material/styles';
import { useTasks } from '@/context/TaskContext';
import { Container, Typography, Grid, Card, Box } from '@mui/material';
import AverageTimeChart from '../components/dashboard/AverageTimeChart';
import TaskStatusChart from '../components/dashboard/TaskStatusChart';
import TaskChart from '../components/dashboard/TaskChart';

const Dashboard = () => {
  const { tasks } = useTasks();
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
        py: 4,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontSize: 32,
            fontWeight: 'bold',
            textAlign: 'center',
            color: theme.palette.text.primary,
            mb: 4,
          }}
        >
          Task Dashboard
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card
              elevation={2}
              sx={{
                p: 3,
                height: '100%',
                borderRadius: 3,
                backgroundColor: theme.palette.background.paper,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[4],
                },
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  textAlign: 'center',
                  mb: 2,
                }}
              >
                Distribución de Tareas
              </Typography>
              <TaskStatusChart tasks={tasks} id="status-chart" />
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card
              elevation={2}
              sx={{
                p: 3,
                height: '100%',
                borderRadius: 3,
                backgroundColor: theme.palette.background.paper,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[4],
                },
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  textAlign: 'center',
                  mb: 2,
                }}
              >
                Tiempo Promedio por Estado
              </Typography>
              <AverageTimeChart tasks={tasks} id="average-time-chart" />
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card
              elevation={2}
              sx={{
                p: 3,
                height: '100%',
                borderRadius: 3,
                backgroundColor: theme.palette.background.paper,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[4],
                },
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  textAlign: 'center',
                  mb: 2,
                }}
              >
                Tareas Completadas por Fecha
              </Typography>
              <TaskChart tasks={tasks} id="tasks-chart" />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
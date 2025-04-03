import React from 'react';
import TaskBoard from '../components/tasks/TaskBoard';
import { Container } from '@mui/material';

const HomePage = () => {
  return (
    <Container
      sx={{
        width: '100%',
        padding: '20px',
        borderRadius: '8px',
        overflowY: 'auto',
      }}
    >
      <TaskBoard />
    </Container>
  );
};

export default HomePage;
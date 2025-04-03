import React from 'react';
import { useDrop } from 'react-dnd';
import { Paper, Typography, IconButton } from '@mui/material';
import TaskCard from './TaskCard';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

const TaskColumn = ({ status, tasks, onTaskMove, onDeleteTask, onEditTask }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => onTaskMove(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <Paper
      ref={drop}
      sx={{
        padding: 2,
        backgroundColor: isOver ? 'action.hover' : 'background.paper',
        height: '74vh',
        overflowY: 'auto',
        margin: 1,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: 'bold' }}>
        {status.replace('_', ' ').toUpperCase()}
      </Typography>
      {tasks.map(task => (
        <TaskCard 
          key={task.id} 
          task={task} 
          onDeleteTask={onDeleteTask} 
          onEditTask={onEditTask} 
        />
      ))}
      <IconButton
        variant="contained"
        color="primary"
        onClick={() => onEditTask(null)} 
        sx={{ mt: 2, width: '100%' }}
      >
        <ControlPointIcon />
      </IconButton>
    </Paper>
  );
};

export default TaskColumn;

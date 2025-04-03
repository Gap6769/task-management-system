import React from 'react';
import { useDrag } from 'react-dnd';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskCard = ({ task, onDeleteTask, onEditTask }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <Card
      ref={drag}
      sx={{
        margin: '8px 0',
        opacity: isDragging ? 0.5 : 1,
        boxShadow: 1,
        borderRadius: 2,
        backgroundColor: 'background.default',
        color: 'text.primary',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
        },
      }}
      onClick={() => onEditTask(task)} 
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>{task.title}</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>{task.description}</Typography>
        <IconButton onClick={(e) => {e.stopPropagation(); onDeleteTask(task.id)}} sx={{ color: 'error.main' }}>
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default TaskCard;

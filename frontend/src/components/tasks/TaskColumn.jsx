import React, { useState, useRef, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { Paper, Typography, Box, Button } from '@mui/material';
import TaskCard from './TaskCard';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const TaskColumn = ({ status, tasks, onTaskMove, onDeleteTask, onEditTask }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => onTaskMove(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const [hover, setHover] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);
  const columnRef = useRef(null);

  useEffect(() => {
    const checkIfScrollable = () => {
      if (columnRef.current) {
        setIsScrollable(columnRef.current.scrollHeight > columnRef.current.clientHeight);
      }
    };

    checkIfScrollable();
    window.addEventListener('resize', checkIfScrollable);

    return () => window.removeEventListener('resize', checkIfScrollable);
  }, [tasks]);

  return (
    <Paper
      ref={(node) => {
        drop(node);
        columnRef.current = node;
      }}
      sx={{
        padding: 2,
        backgroundColor: isOver ? 'action.hover' : 'background.paper',
        height: '74vh',
        overflowY: 'auto',
        margin: 1,
        boxShadow: 3,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: 'bold', textTransform: 'uppercase', color: 'primary.main' }}>
        {status.replace('_', ' ').toUpperCase()}
      </Typography>
      <Box sx={{ flex: 1 }}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDeleteTask={onDeleteTask} onEditTask={onEditTask} />
        ))}
      </Box>
      {/* El botón aparece al final si es scrolleable, o al hacer hover si no lo es */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        {(isScrollable || hover) && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => onEditTask({ status })}
            sx={{
              width: '100%',
              maxWidth: 200,
              py: 1.5,
              backgroundColor: 'primary.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
              fontWeight: 'bold',
              textTransform: 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>Add Task</span>
            <AddCircleOutlineIcon sx={{ ml: 1 }} />
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default TaskColumn;

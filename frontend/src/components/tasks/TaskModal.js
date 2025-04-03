import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Modal } from '@mui/material';

const TaskModal = ({ open, onClose, onSave, task = {} }) => {
  const [newTask, setNewTask] = useState({
    id: task?.id || '',  
    title: task?.title || '',
    description: task?.description || '',
    status: task?.status || 'por hacer',
  });

  useEffect(() => {
    if (task) {
      setNewTask({
        id: task.id || '', 
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'por hacer',
      });
    }
  }, [task]);

  const handleSave = () => {
    const validStatuses = ['por hacer', 'en progreso', 'completada'];
    const normalizedStatus = newTask.status.replace('_', ' '); 
  
    if (!validStatuses.includes(normalizedStatus)) {
      console.error(`Invalid status: ${newTask.status}`);
      return; // O maneja el error de alguna otra forma
    }
  
    
    const normalizedTask = {
      ...newTask,
      status: normalizedStatus,  
    };
  
    onSave(normalizedTask);
  };
  

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          padding: 4,
          backgroundColor: '#2e2e2e',
          margin: 'auto',
          marginTop: '10%',
          width: 400,
          borderRadius: '8px',
        }}
      >
        <Typography variant="h6" style={{ color: '#fff' }}>
          {task?.id ? 'Edit Task' : 'Create New Task'}
        </Typography>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          InputLabelProps={{ style: { color: '#fff' } }}
          InputProps={{ style: { color: '#fff' } }}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          InputLabelProps={{ style: { color: '#fff' } }}
          InputProps={{ style: { color: '#fff' } }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          style={{ marginTop: '16px' }}
        >
          {task?.id ? 'Save Changes' : 'Create'}
        </Button>
      </Box>
    </Modal>
  );
};

export default TaskModal;

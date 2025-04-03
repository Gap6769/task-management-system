import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Modal, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNotification } from '@/providers/NotificationProvider'; 

const TaskModal = ({ open, onClose, onSave, task = {} }) => {
  const theme = useTheme();
  const { showMessage } = useNotification(); 
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
      showMessage('Estado inválido', 'error');
      return;
    }

    try {
      onSave({ ...newTask, status: normalizedStatus });
      showMessage('Tarea guardada correctamente', 'success');
    } catch (error) {
      console.error('Error al guardar tarea:', error);
      showMessage('Error al guardar tarea', 'error');
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          padding: 4,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          margin: 'auto',
          marginTop: '10%',
          width: 400,
          borderRadius: '8px',
        }}
      >
        <Typography variant="h6">
          {task?.id ? 'Editar Tarea' : 'Crear Nueva Tarea'}
        </Typography>
        <TextField
          label="Título"
          fullWidth
          margin="normal"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          InputLabelProps={{ style: { color: theme.palette.text.primary } }}
          InputProps={{ style: { color: theme.palette.text.primary } }}
        />
        <TextField
          label="Descripción"
          fullWidth
          margin="normal"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          InputLabelProps={{ style: { color: theme.palette.text.primary } }}
          InputProps={{ style: { color: theme.palette.text.primary } }}
        />
        
        {/* Dropdown para el estado */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Estado</InputLabel>
          <Select
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            label="Estado"
            inputProps={{ style: { color: theme.palette.text.primary } }}
          >
            <MenuItem value="por hacer">Por hacer</MenuItem>
            <MenuItem value="en progreso">En progreso</MenuItem>
            <MenuItem value="completada">Completada</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{ marginTop: '16px' }}
        >
          {task?.id ? 'Guardar Cambios' : 'Crear'}
        </Button>
      </Box>
    </Modal>
  );
};

export default TaskModal;

import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { getTasks, updateTask, createTask, deleteTask } from '@/api';
import { Container, Grid } from '@mui/material';
import TaskColumn from './TaskColumn';
import TaskModal from './TaskModal'; 

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null); 

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await getTasks(token);
        const normalizedTasks = response.data.map(task => ({
          ...task,
          status: task.status
        }));
        setTasks(normalizedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleCreateTask = async (newTask) => {
    try {
      const token = localStorage.getItem('token');
      const response = await createTask(newTask, token);
      setTasks([...tasks, response.data]);
      setOpen(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleEditTask = async (updatedTask) => {
    try {
      const token = localStorage.getItem('token');
      const response = await updateTask(updatedTask.id, updatedTask, token);
      setTasks(tasks.map(task => task.id === updatedTask.id ? response.data : task));
      setOpen(false);
      setTaskToEdit(null);
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      await deleteTask(taskId, token);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleTaskMove = async (taskId, newStatus) => {
    try {
    
      const updatedTasks = tasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      );
      setTasks(updatedTasks);
  
      const token = localStorage.getItem('token');
      const response = await updateTask(taskId, { ...updatedTasks.find(task => task.id === taskId), status: newStatus }, token);
  
      const updatedTask = response.data;
      setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };
  

  return (
    <DndProvider backend={HTML5Backend}>
      <Container sx={{ width: '100%', padding: '20px', borderRadius: '8px', overflowX: 'auto' }}>
        <Grid container spacing={3} sx={{ minWidth: '800px' }} wrap="nowrap"> {/* Evitar que las columnas se rompan */}
          {['por hacer', 'en progreso', 'completada'].map(status => (
            <Grid item key={status} sx={{ minWidth: '300px' }}>
              <TaskColumn
                status={status}
                tasks={tasks.filter(task => task.status === status)}
                onTaskMove={handleTaskMove}
                onDeleteTask={handleDeleteTask}
                onOpenModal={() => { setOpen(true); setTaskToEdit(null); }}
                onEditTask={(task) => { setOpen(true); setTaskToEdit(task); }}
              />
            </Grid>
          ))}
        </Grid>
        <TaskModal
          open={open}
          onClose={() => setOpen(false)}
          onSave={taskToEdit ? handleEditTask : handleCreateTask}
          task={taskToEdit} // Pasa la tarea a editar si está en modo edición
        />
      </Container>
    </DndProvider>
  );
};

export default TaskBoard;

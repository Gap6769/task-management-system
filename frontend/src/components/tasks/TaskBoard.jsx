import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useTasks } from '@/context/TaskContext';
import { Container, Grid } from '@mui/material';
import TaskColumn from './TaskColumn';
import TaskModal from './TaskModal';
import { useNotification } from '@/providers/NotificationProvider';
import { createTask, updateTask, deleteTask } from '@/api';

const TaskBoard = () => {
  const { tasks, setTasks } = useTasks();
  const [open, setOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const { showMessage } = useNotification();

  const handleCreateTask = async (newTask) => {
    try {
      const token = localStorage.getItem('token');
      const response = await createTask(newTask, token);
      setTasks([...tasks, response.data]);
      setOpen(false);
      showMessage('Task created successfully', 'success');
    } catch (error) {
      showMessage('Error creating task: ' + error.message, 'error');
    }
  };

  const handleEditTask = async (updatedTask) => {
    try {
      const token = localStorage.getItem('token');
      const response = await updateTask(updatedTask.id, updatedTask, token);
      setTasks(tasks.map(task => task.id === updatedTask.id ? response.data : task));
      setOpen(false);
      setTaskToEdit(null);
      showMessage('Task updated successfully', 'success');
    } catch (error) {
      showMessage('Error editing task: ' + error.message, 'error');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      await deleteTask(taskId, token);
      setTasks(tasks.filter(task => task.id !== taskId));
      showMessage('Task deleted successfully', 'success');
    } catch (error) {
      showMessage('Error deleting task: ' + error.message, 'error');
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
      showMessage('Error updating task status: ' + error.message, 'error');
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Container sx={{ width: '100%', padding: '20px', borderRadius: '8px', overflowX: 'auto' }}>
        <Grid container spacing={3} sx={{ minWidth: '800px' }} wrap="nowrap">
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
          onSave={taskToEdit?.id ? handleEditTask : handleCreateTask}
          task={taskToEdit}
        />
      </Container>
    </DndProvider>
  );
};

export default TaskBoard;
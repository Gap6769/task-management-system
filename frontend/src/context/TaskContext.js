import React, { createContext, useContext, useState, useEffect } from 'react';
import { getTasks } from '@/api';
import { useNotification } from '@/providers/NotificationProvider';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const { showMessage } = useNotification();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await getTasks(token);
        setTasks(response.data);
      } catch (error) {
        showMessage('Error fetching tasks: ' + error.message, 'error');
      }
    };
    fetchTasks();
  }, [showMessage]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};
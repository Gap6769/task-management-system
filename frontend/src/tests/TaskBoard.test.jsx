import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskBoard from '../components/tasks/TaskBoard';
import { TaskProvider } from '@/context/TaskContext';
import { NotificationProvider } from '@/providers/NotificationProvider';

jest.mock('@/api', () => ({
  createTask: jest.fn(),
  updateTask: jest.fn(),
  deleteTask: jest.fn(),
}));

test('renders TaskBoard component', () => {
  render(
    <TaskProvider>
      <NotificationProvider>
        <TaskBoard />
      </NotificationProvider>
    </TaskProvider>
  );
  const addButton = screen.getByText(/Add Task/i);
  expect(addButton).toBeInTheDocument();
});

test('adds a new task', async () => {
  render(
    <TaskProvider>
      <NotificationProvider>
        <TaskBoard />
      </NotificationProvider>
    </TaskProvider>
  );
  const addButton = screen.getByText(/Add Task/i);
  fireEvent.click(addButton);
  const titleInput = screen.getByLabelText(/Title/i);
  fireEvent.change(titleInput, { target: { value: 'New Task' } });
  const saveButton = screen.getByText(/Create/i);
  fireEvent.click(saveButton);
  const newTask = await screen.findByText(/New Task/i);
  expect(newTask).toBeInTheDocument();
});
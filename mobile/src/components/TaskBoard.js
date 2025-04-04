import React, { useState } from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  Text,
  TouchableOpacity 
} from 'react-native';
import { useTasks } from '../context/TaskContext';
import TaskColumn from './TaskColumn';
import TaskModal from './TaskModal';
import { createTask, updateTask, deleteTask } from '../api';

const TaskBoard = () => {
  const { tasks, setTasks } = useTasks();
  const [modalVisible, setModalVisible] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleCreateTask = async (newTask) => {
    try {
      const response = await createTask(newTask);
      setTasks([...tasks, response.data]);
      setModalVisible(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleEditTask = async (updatedTask) => {
    try {
      const response = await updateTask(updatedTask.id, updatedTask);
      setTasks(tasks.map(task => task.id === updatedTask.id ? response.data : task));
      setModalVisible(false);
      setTaskToEdit(null);
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const sections = [
    { title: 'POR HACER', status: 'por hacer' },
    { title: 'EN PROGRESO', status: 'en progreso' },
    { title: 'COMPLETADA', status: 'completada' }
  ];

  return (
    <ScrollView style={styles.container}>
      {sections.map(({ title, status }) => (
        <View key={status} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {title} ({tasks.filter(task => task.status === status).length})
            </Text>
            <TouchableOpacity onPress={() => {
              setTaskToEdit(null);
              setModalVisible(true);
            }}>
              <Text style={styles.addButton}>+</Text>
            </TouchableOpacity>
          </View>
          <TaskColumn
            status={status}
            tasks={tasks.filter(task => task.status === status)}
            onDeleteTask={handleDeleteTask}
            onEditTask={(task) => {
              setTaskToEdit(task);
              setModalVisible(true);
            }}
          />
        </View>
      ))}
      
      <TaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={taskToEdit ? handleEditTask : handleCreateTask}
        task={taskToEdit}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  }
});

export default TaskBoard;
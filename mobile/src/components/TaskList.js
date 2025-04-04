import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import TaskCard from './TaskCard';
import { useTasks } from '../context/TaskContext';

const TaskList = () => {
  const { tasks } = useTasks();

  const renderItem = ({ item }) => (
    <TaskCard 
      task={item}
      onDeleteTask={(id) => {
        // Implementar delete
      }}
      onEditTask={(task) => {
        // Implementar edit
      }}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  list: {
    padding: 16
  }
});

export default TaskList;
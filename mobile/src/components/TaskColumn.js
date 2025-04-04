// src/components/TaskColumn.js
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import TaskCard from './TaskCard';

const TaskColumn = ({ tasks, onDeleteTask, onEditTask }) => {
  return (
    <ScrollView 
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onDeleteTask={onDeleteTask}
          onEditTask={onEditTask}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
  },
  contentContainer: {
    paddingHorizontal: 16,
  }
});

export default TaskColumn;

import React from 'react';
import { View, StyleSheet } from 'react-native';
import TaskBoard from '../components/TaskBoard';

const TasksScreen = () => {
  return (
    <View style={styles.container}>
      <TaskBoard />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
});

export default TasksScreen;
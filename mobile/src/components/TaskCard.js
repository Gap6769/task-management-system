// src/components/TaskCard.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const TaskCard = ({ task, onDeleteTask, onEditTask }) => {
  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => onEditTask(task)}
    >
      <View style={styles.cardContent}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.description}>{task.description}</Text>
        <View style={styles.footer}>
          <Text style={styles.taskId}>{task.id}</Text>
          <TouchableOpacity 
            onPress={() => onDeleteTask(task.id)}
            style={styles.deleteButton}
          >
            <MaterialIcons name="delete" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    marginRight: 12,
    width: 280,
    padding: 16,
    marginVertical: 8,
  },
  cardContent: {
    flex: 1,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    color: '#AAAAAA',
    fontSize: 14,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskId: {
    color: '#666666',
    fontSize: 12,
  },
  deleteButton: {
    padding: 4,
  }
});

export default TaskCard;
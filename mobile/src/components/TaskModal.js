// src/components/TaskModal.js
import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const TaskModal = ({ visible, onClose, onSave, task = {} }) => {
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
    try {
      onSave(newTask);
    } catch (error) {
      console.error('Error al guardar tarea:', error);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>
            {task?.id ? 'Editar Tarea' : 'Crear Nueva Tarea'}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Título"
            placeholderTextColor="#666"
            value={newTask.title}
            onChangeText={(text) => setNewTask({ ...newTask, title: text })}
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descripción"
            placeholderTextColor="#666"
            value={newTask.description}
            onChangeText={(text) => setNewTask({ ...newTask, description: text })}
            multiline
            numberOfLines={4}
          />

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={newTask.status}
              style={styles.picker}
              onValueChange={(itemValue) =>
                setNewTask({ ...newTask, status: itemValue })
              }
              dropdownIconColor="#FFFFFF"
            >
              <Picker.Item label="Por hacer" value="por hacer" color="#FFFFFF" />
              <Picker.Item label="En progreso" value="en progreso" color="#FFFFFF" />
              <Picker.Item label="Completada" value="completada" color="#FFFFFF" />
            </Picker>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>
                {task?.id ? 'Guardar Cambios' : 'Crear'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF',
    textAlign: 'center'
  },
  input: {
    backgroundColor: '#2C2C2C',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#3F3F3F'
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top'
  },
  pickerContainer: {
    backgroundColor: '#2C2C2C',
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#3F3F3F'
  },
  picker: {
    color: '#FFFFFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5
  },
  cancelButton: {
    backgroundColor: '#3F3F3F'
  },
  saveButton: {
    backgroundColor: '#007AFF'
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

export default TaskModal;
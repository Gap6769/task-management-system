import React from 'react';
import { ScrollView, StyleSheet, useColorScheme } from 'react-native';
import { useTasks } from '../context/TaskContext';
import PieTaskChart from '../components/charts/PieTaskChart';
import BarTaskChart from '../components/charts/BarTaskChart';
import LineTaskChart from '../components/charts/LineTaskChart';

const DashboardScreen = () => {
  const { tasks } = useTasks();
  const isDarkMode = useColorScheme() === 'dark';

  const chartConfig = {
    backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    backgroundGradientFrom: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    backgroundGradientTo: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    decimalPlaces: 0,
    color: (opacity = 1) => isDarkMode ? 
      `rgba(255, 255, 255, ${opacity})` : 
      `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => isDarkMode ? 
      `rgba(255, 255, 255, ${opacity})` : 
      `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForLabels: {
      fontSize: 12
    }
  };

  return (
    <ScrollView style={[styles.container, {
      backgroundColor: isDarkMode ? '#121212' : '#F5F5F5'
    }]}>
      <PieTaskChart tasks={tasks} isDarkMode={isDarkMode} chartConfig={chartConfig} />
      <BarTaskChart tasks={tasks} isDarkMode={isDarkMode} chartConfig={chartConfig} />
      <LineTaskChart tasks={tasks} isDarkMode={isDarkMode} chartConfig={chartConfig} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default DashboardScreen;
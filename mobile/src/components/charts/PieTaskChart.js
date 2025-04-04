import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const PieTaskChart = ({ tasks, isDarkMode, chartConfig }) => {
  const tasksByStatus = {
    'por hacer': tasks.filter(task => task.status === 'por hacer').length,
    'en progreso': tasks.filter(task => task.status === 'en progreso').length,
    'completada': tasks.filter(task => task.status === 'completada').length,
  };

  const pieChartData = [
    {
      name: 'Por Hacer',
      count: tasksByStatus['por hacer'],
      color: '#FF6384',
      legendFontColor: isDarkMode ? '#FFF' : '#7F7F7F',
      legendFontSize: 12
    },
    {
      name: 'En Progreso',
      count: tasksByStatus['en progreso'],
      color: '#36A2EB',
      legendFontColor: isDarkMode ? '#FFF' : '#7F7F7F',
      legendFontSize: 12
    },
    {
      name: 'Completada',
      count: tasksByStatus['completada'],
      color: '#FFCE56',
      legendFontColor: isDarkMode ? '#FFF' : '#7F7F7F',
      legendFontSize: 12
    }
  ];

  return (
    <View style={[styles.chartContainer, {
      backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF'
    }]}>
      <Text style={[styles.chartTitle, {
        color: isDarkMode ? '#FFFFFF' : '#333333'
      }]}>
        Distribución de Tareas
      </Text>
      <PieChart
        data={pieChartData}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        accessor="count"
        backgroundColor="transparent"
        paddingLeft="15"
        center={[10, 0]}
        absolute
        hasLegend={true}
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  }
});

export default PieTaskChart;
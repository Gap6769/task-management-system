// src/components/charts/BarTaskChart.js
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const BarTaskChart = ({ tasks, isDarkMode, chartConfig }) => {
  const calculateAverageTime = (status) => {
    const filteredTasks = tasks.filter(task => task.status === status);
    if (filteredTasks.length === 0) return 0;
    const totalTime = filteredTasks.reduce((acc, task) => {
      const timeInState = (new Date() - new Date(task.last_status_change)) / (1000 * 60 * 60);
      return acc + timeInState;
    }, 0);
    return Math.round(totalTime / filteredTasks.length);
  };

  const data = {
    labels: ['Por Hacer', 'En Prog.', 'Compl.'],
    datasets: [{
      data: [
        calculateAverageTime('por hacer'),
        calculateAverageTime('en progreso'),
        calculateAverageTime('completada')
      ]
    }]
  };

  return (
    <View style={[styles.chartContainer, {
      backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF'
    }]}>
      <Text style={[styles.chartTitle, {
        color: isDarkMode ? '#FFFFFF' : '#333333'
      }]}>
        Tiempo Promedio por Estado (horas)
      </Text>
      <BarChart
        data={data}
        width={screenWidth - 32}
        height={220}
        yAxisSuffix="h"
        chartConfig={{
          ...chartConfig,
          barPercentage: 0.5,
          backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
          backgroundGradientFrom: isDarkMode ? '#1E1E1E' : '#FFFFFF',
          backgroundGradientTo: isDarkMode ? '#1E1E1E' : '#FFFFFF',
          decimalPlaces: 0,
          color: (opacity = 1) => isDarkMode ? 
            `rgba(255, 255, 255, ${opacity})` : 
            `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForBackgroundLines: {
            strokeWidth: 1,
            strokeDasharray: '',
          },
          propsForLabels: {
            fontSize: 12,
          },
        }}
        style={styles.chart}
        showValuesOnTopOfBars={true}
        fromZero={true}
        withInnerLines={true}
        withVerticalLabels={true}
        withHorizontalLabels={true}
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

export default BarTaskChart;
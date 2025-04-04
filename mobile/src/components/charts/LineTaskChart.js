// src/components/charts/LineTaskChart.js
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

// src/components/charts/LineTaskChart.js
// ... imports se mantienen igual

const LineTaskChart = ({ tasks, isDarkMode, chartConfig }) => {
    // Agrupar tareas completadas por fecha
    const completedTasks = tasks
      .filter(task => task.status === 'completada' && task.last_status_change)
      .reduce((acc, task) => {
        const date = task.last_status_change.split('T')[0];
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});
  
    // Convertir a array y ordenar por fecha
    const sortedData = Object.entries(completedTasks)
      .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB));
  
    const labels = sortedData.map(([date]) => 
      date.split('-').slice(1).join('/')
    );
    
    const data = sortedData.map(([_, count]) => count);
  
    // Encontrar el valor máximo para el eje Y
    const maxValue = Math.max(...data, 1);
    
    // Generar valores del eje Y
    const yAxisValues = Array.from(
      { length: maxValue + 1 }, 
      (_, i) => i
    );
  
    return (
      <View style={[styles.chartContainer, {
        backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
        marginBottom: 20
      }]}>
        <Text style={[styles.chartTitle, {
          color: isDarkMode ? '#FFFFFF' : '#333333'
        }]}>
          Tareas Completadas por Fecha
        </Text>
        <LineChart
          data={{
            labels,
            datasets: [{
              data: data.length > 0 ? data : [0]
            }]
          }}
          width={screenWidth - 32}
          height={220}
          chartConfig={{
            ...chartConfig,
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: isDarkMode ? "#36A2EB" : "#1E88E5"
            },
            propsForLabels: {
              fontSize: 10,
              rotation: -45
            },
            propsForBackgroundLines: {
              strokeDasharray: "",
            },
            count: yAxisValues.length, // Número de líneas en el eje Y
          }}
          bezier
          style={styles.chart}
          withInnerLines={true}
          withOuterLines={true}
          withVerticalLines={false}
          withHorizontalLines={true}
          withVerticalLabels={true}
          withHorizontalLabels={true}
          fromZero={true}
          yAxisInterval={1} // Asegura que los intervalos sean de 1 en 1
          yLabelsOffset={5}
          segments={maxValue} // Número de segmentos en el eje Y
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

export default LineTaskChart;
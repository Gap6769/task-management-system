import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StatusBar, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Screens
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import TasksScreen from './src/screens/TasksScreen';
import DashboardScreen from './src/screens/DashboardScreen';

// Providers
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { TaskProvider } from './src/context/TaskContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  const { logout } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerRight: () => (
          <TouchableOpacity 
            onPress={logout} 
            style={{ marginRight: 15 }}
          >
            <Text style={{ color: 'white' }}>Logout</Text>
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#1E1E1E',
        },
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#1E1E1E',
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#666',
      }}
    >
      <Tab.Screen 
        name="Tasks" 
        component={TasksScreen} 
        options={{
          title: 'Tareas',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="list" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="dashboard" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const { token, loading } = useAuth();

  if (loading) return null;

  return (
    <Stack.Navigator>
      {!token ? (
        <>
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Register" 
            component={RegisterScreen} 
            options={{ headerShown: false }} 
          />
        </>
      ) : (
        <Stack.Screen 
          name="MainApp" 
          component={MainTabs} 
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <AuthProvider>
      <TaskProvider>
        <NavigationContainer>
          <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
          <View style={[styles.container, { backgroundColor: darkMode ? '#121212' : '#f5f5f5' }]}>
            <AppNavigator />
          </View>
        </NavigationContainer>
      </TaskProvider>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

const MainTabs = () => {
  const { logout } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Tasks') {
            iconName = 'list';
          } else if (route.name === 'Dashboard') {
            iconName = 'dashboard';
          }
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        headerRight: () => (
          <TouchableOpacity 
            onPress={logout}
            style={{ marginRight: 16 }}
          >
            <MaterialIcons name="logout" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        ),
        // Estilo del header
        headerStyle: {
          backgroundColor: '#1E1E1E',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Tasks" 
        component={TasksScreen}
        options={{
          title: 'Mis Tareas'
        }}
      />
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{
          title: 'Dashboard'
        }}
      />
    </Tab.Navigator>
  );
};
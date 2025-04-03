// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import Navigation from './components/Navigation';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext'; // Importa el TaskProvider

const PrivateRoute = ({ element }) => {
  const { token, loading } = useAuth();

  if (loading) return null;

  return token ? element : <Navigate to="/login" replace />;
};

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: darkMode ? '#121212' : '#f5f5f5',
          },
        },
      },
    },
  });

  return (
    <AuthProvider>
      <TaskProvider> {/* Envuelve la aplicación con TaskProvider */}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Navigation onThemeChange={setDarkMode} />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/" element={<PrivateRoute element={<HomePage />} />} />
              <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </TaskProvider>
    </AuthProvider>
  );
};

export default App;
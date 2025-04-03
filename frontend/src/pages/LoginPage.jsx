import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { TextField, Button, Container, Typography, Stack, Box, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';


const LoginPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { token, login, loading } = useAuth();
  const navigate = useNavigate();

  // Redirigir a Home si el usuario ya está logueado
  useEffect(() => {
    if (token) {
      navigate('/'); // Si el token existe, redirige al Home
    }
  }, [token, navigate]);

  const handleLogin = async () => {
    try {
      await login({ identifier, password }); 
      navigate('/'); // Redirige al Home después del login exitoso
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
          Login
        </Typography>
        
        <TextField
          label="Username or email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        {error && <Typography color="error" sx={{ marginBottom: 2 }}>{error}</Typography>}
        
        <Stack direction="column" spacing={2} sx={{ width: '100%' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            fullWidth
            disabled={loading}
            sx={{
              backgroundColor: '#3f51b5',
              '&:hover': {
                backgroundColor: '#303f9f',
              },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
          
          <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
            <Typography variant="body2">Don't have an account?</Typography>
            <Button
              variant="text"
              color="secondary"
              component={Link}
              to="/register"
              sx={{ textTransform: 'none' }}
            >
              Register
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
};

export default LoginPage;

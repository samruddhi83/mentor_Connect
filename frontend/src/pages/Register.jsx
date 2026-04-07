import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Paper, CircularProgress, Alert, MenuItem } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

function Register() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', role: 'learner' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/register', {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });
      if (res.data.success) {
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 4 }}>
        <Typography variant="h4" textAlign="center" fontWeight="bold" gutterBottom color="primary">
          Join Us Today
        </Typography>
        <Typography variant="body2" textAlign="center" color="text.secondary" sx={{ mb: 3 }}>
          Create an account to start your journey.
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleRegister}>
          <TextField margin="normal" required fullWidth label="First Name" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
          <TextField margin="normal" required fullWidth label="Last Name" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
          <TextField margin="normal" required fullWidth label="Email Address" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
          <TextField margin="normal" required fullWidth label="Password" type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
          <TextField select margin="normal" required fullWidth label="I am a..." value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
            <MenuItem value="learner">Learner</MenuItem>
            <MenuItem value="tutor">Tutor</MenuItem>
          </TextField>
          <Button type="submit" fullWidth variant="contained" color="secondary" size="large" disabled={loading} sx={{ mt: 3, mb: 2, borderRadius: 2 }}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
          </Button>
          <Typography textAlign="center" variant="body2">
            Already have an account? <Link to="/login" style={{ textDecoration: 'none' }}>Log In</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Register;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Alert } from '@mui/material';

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      localStorage.setItem('loggedIn', 'true'); // ✅ Save login
      navigate('/menu'); // ✅ Redirect
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container sx={{ mt: 4, maxWidth: 400 }}>
      <Typography variant="h5">Login</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Username" margin="normal"
          value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <TextField fullWidth label="Password" type="password" margin="normal"
          value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>Login</Button>
      </form>
    </Container>
  );
}

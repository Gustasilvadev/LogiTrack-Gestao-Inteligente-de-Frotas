'use client';

import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { Box, Paper, Typography, TextField, Button, Container, Link, Alert } from '@mui/material';
import { authService } from '@/src/services/auth/auth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Faz o login e recebe os dados (Token, Nome, Email, Role)
      const response = await authService.login({ email, password });

      // 2. Persistência: Guardamos o objeto completo para usar no Dashboard
      localStorage.setItem('@LogiTrack:user', JSON.stringify({
        name: response.name,
        email: response.email,
        roleName: response.roleName 
      }));

      // 3. Lógica  de Redirecionamento
      // SE for o email específico E for ADMIN -> Vai para o Painel Administrativo
      if (response.email === 'admin@logitrack.com' && response.roleName === 'ADMIN') {
        router.push('/dashboardAdmin/dashCarriers');
      } else if (response.roleName === 'MANAGER' || response.roleName === 'OPERADOR') {
        router.push('/dashboard/home');
      }

    } catch (err: any) {
      setError('E-mail ou senha inválidos.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f5f5f5',
        py: 4
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={10}
          sx={{
            display: 'flex',
            overflow: 'hidden',
            borderRadius: 4,
          }}
        >
          <Grid container sx={{ flexGrow: 1 }}>
            
            {/* --- LADO ESQUERDO: FORMULÁRIO --- */}
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{
                p: { xs: 3, md: 8 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <Box sx={{ mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1A237E' }}>
                  LogiTrack
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Bem-vindo de volta! Faça login na sua conta.
                </Typography>
              </Box>

              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

              <form onSubmit={handleLogin}>
                <Grid container spacing={2}>
                  <Grid size={12}>
                    <TextField 
                      fullWidth 
                      label="E-mail" 
                      variant="outlined" 
                      size="small"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </Grid>
                  <Grid size={12}>
                    <TextField 
                      fullWidth 
                      label="Senha" 
                      type="password" 
                      variant="outlined" 
                      size="small"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required 
                    />
                  </Grid>

                  <Grid size={12}>
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={loading}
                      sx={{ mt: 2, height: 48, fontWeight: 'bold', bgcolor: '#1A237E' }}
                    >
                      {loading ? 'Entrando...' : 'Entrar'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>

            {/* --- LADO DIREITO: IMAGEM --- */}
            <Grid
              size={{ xs: 0, md: 6 }}
              sx={{
                display: { xs: 'none', md: 'block' },
                position: 'relative',
                backgroundImage: 'url("/BannerLogin.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center 15%',
                minHeight: '700px',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0, left: 0, width: '100%', height: '100%',
                  background: 'linear-gradient(to top, rgba(26, 35, 126, 0.8), rgba(26, 35, 126, 0.2))'
                }
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 60,
                  left: 40,
                  zIndex: 2,
                  color: 'white',
                  maxWidth: '80%'
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Gerencie sua frota
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'light', opacity: 0.9 }}>
                  Acompanhe seus veículos em tempo real e otimize seus resultados.
                </Typography>
              </Box>
            </Grid>

          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
'use client';

import React from 'react';
import { Box, Paper, Typography, TextField, Button, Grid, Container, Link } from '@mui/material';

export default function LoginPage() {
  return (
    <Box 
      sx={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        bgcolor: '#f5f5f5' 
      }}
    >
      <Container maxWidth="lg">
        <Paper 
          elevation={10} 
          sx={{ 
            display: 'flex', 
            overflow: 'hidden', 
            borderRadius: 4,
            minHeight: '550px' 
          }}
        >
          <Grid container sx={{ flexGrow: 1 }}>
            
            {/* LADO ESQUERDO: FORMULÁRIO */}
            <Grid size={{ xs: 12, md: 6 }} sx={{ p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1A237E', mb: 1 }}>
                LogiTrack
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Bem-vindo de volta! Faça login na sua conta.
              </Typography>

              <TextField fullWidth label="E-mail" margin="normal" variant="outlined" />
              <TextField fullWidth label="Senha" type="password" margin="normal" variant="outlined" />

              <Button 
                fullWidth 
                variant="contained" 
                size="large" 
                sx={{ mt: 3, height: 50, bgcolor: '#1A237E', fontWeight: 'bold' }}
              >
                Entrar
              </Button>

             <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2">
                Não possui o cadastro?{' '}
                <Link href="/auth/register" sx={{ fontWeight: 'bold', color: '#1A237E', textDecoration: 'none', cursor: 'pointer' }}>
                    Fazer Cadastro
                </Link>
                </Typography>
            </Box>
            </Grid>

            {/* LADO DIREITO */}
            <Grid 
              size={{ xs: 0, md: 6 }} 
              sx={{ 
                display: { xs: 'none', md: 'block' },
                position: 'relative',
                backgroundImage: 'url("/BannerLogin.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0, left: 0, width: '100%', height: '100%',
                  backgroundColor: 'rgba(26, 35, 126, 0.4)'
                }
              }}
            >
              <Box 
                sx={{ 
                  position: 'absolute', 
                  bottom: 40, 
                  left: 40, 
                  zIndex: 2, 
                  color: 'white' 
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  Gerencie sua frota
                </Typography>
                <Typography variant="body1">
                  Acompanhe seus veículos em tempo real.
                </Typography>
              </Box>
            </Grid>

          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
'use client';

import { TextField, Button, Typography, Paper, Box, Divider, Link, Container } from '@mui/material';
import Grid from '@mui/material/Grid';

export default function RegisterPage() {
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
                p: { xs: 3, md: 5 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <Box sx={{ mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1A237E' }}>
                  Crie sua conta
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Cadastre sua transportadora e comece a gerir sua frota no LogiTrack.
                </Typography>
              </Box>

              <Grid container spacing={2}>
                {/* SEÇÃO: DADOS DO GESTOR */}
                <Grid size={12}>
                  <Typography variant="subtitle2" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                    Dados do Usuário Master
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Seu Nome" variant="outlined" size="small" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Sobrenome" variant="outlined" size="small" />
                </Grid>
                <Grid size={12}>
                  <TextField fullWidth label="E-mail Corporativo" type="email" variant="outlined" size="small" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Senha" type="password" size="small" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Confirmar Senha" type="password" size="small" />
                </Grid>

                <Grid size={12} sx={{ my: 1 }}>
                  <Divider />
                </Grid>

                {/* SEÇÃO: DADOS DA EMPRESA */}
                <Grid size={12}>
                  <Typography variant="subtitle2" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                    Dados da Transportadora
                  </Typography>
                </Grid>
                <Grid size={12}>
                  <TextField fullWidth label="Razão Social" variant="outlined" size="small" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="CNPJ" variant="outlined" placeholder="00.000.000/0000-00" size="small" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Telefone" variant="outlined" size="small" />
                </Grid>

                <Grid size={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{ mt: 3, height: 48, fontWeight: 'bold', bgcolor: '#1A237E' }}
                  >
                    Criar Conta da Empresa
                  </Button>
                </Grid>
              </Grid>

              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2">
                  Já possui uma conta?{' '}
                  <Link href="/" sx={{ fontWeight: 'bold', color: '#1A237E', textDecoration: 'none', cursor: 'pointer' }}>
                    Fazer Login
                  </Link>
                </Typography>
              </Box>
            </Grid>

            {/* --- LADO DIREITO: IMAGEM  --- */}
            <Grid
              size={{ xs: 0, md: 6 }}
              sx={{
                display: { xs: 'none', md: 'block' },
                position: 'relative',
                backgroundImage: 'url("/BannerCadastro.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'end',
                minHeight: '600px',
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
                  Junte-se ao LogiTrack
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'light', opacity: 0.9 }}>
                  Otimize sua operação logística e tenha controle total da sua frota em uma única plataforma.
                </Typography>
              </Box>
            </Grid>

          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
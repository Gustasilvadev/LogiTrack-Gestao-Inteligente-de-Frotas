'use client';

import TabelaFrota from "@/src/components/dashboard/TabelaFrota";
import { frotaMock } from "@/src/mocks/frotamocks";
import { Typography, Paper, Box } from "@mui/material";
import { Grid } from '@mui/material';

export default function Home() {
    
  const totalDisponivel = frotaMock.filter(v => v.status === 'DISPONIVEL').length;
  const totalEmRota = frotaMock.filter(v => v.status === 'EM_ROTA').length;
  const totalManutencao = frotaMock.filter(v => v.status === 'MANUTENCAO').length;

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', mb: 4 }}>
        Painel Logístico
      </Typography>

      <Grid container spacing={3}>
        {/* Card: Disponíveis */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Paper sx={{ p: 3, textAlign: 'center', borderLeft: '6px solid #2e7d32' }}>
            <Typography variant="h6" color="text.secondary">Veículos Disponíveis</Typography>
            <Typography variant="h3">{totalDisponivel}</Typography> 
          </Paper>
        </Grid>
        
        {/* Card: Em Rota */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Paper sx={{ p: 3, textAlign: 'center', borderLeft: '6px solid #ed6c02' }}>
            <Typography variant="h6" color="text.secondary">Em Rota</Typography>
            <Typography variant="h3">{totalEmRota}</Typography>
          </Paper>
        </Grid>

        {/* Card: Manutenção */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Paper sx={{ p: 3, textAlign: 'center', borderLeft: '6px solid #d32f2f' }}>
            <Typography variant="h6" color="text.secondary">Em Manutenção</Typography>
            <Typography variant="h3">{totalManutencao}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* A Tabela */}
      <TabelaFrota />
    </Box>
  );
}
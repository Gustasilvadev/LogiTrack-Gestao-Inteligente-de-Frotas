'use client';

import React from 'react';
import TabelaFrota from "@/src/components/dashboard/TabelaFrota";
import { Typography, Paper, Box } from "@mui/material";
import { Grid } from '@mui/material';

export default function Home() {
//   const totalDisponivel = frotaMock.filter(v => v.statusVehicle === 'DISPONIVEL').length;
//   const totalEmRota = frotaMock.filter(v => v.statusVehicle === 'EM_ROTA').length;
//   const totalManutencao = frotaMock.filter(v => v.statusVehicle === 'MANUTENCAO').length;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', mb: 4 }}>
        Painel Logístico
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Card: Disponíveis */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center', borderLeft: '6px solid #2e7d32' }}>
            <Typography variant="h6" color="text.secondary">Veículos Disponíveis</Typography>
            {/* <Typography variant="h3" sx={{ fontWeight: 'bold' }}>{totalDisponivel}</Typography>  */}
          </Paper>
        </Grid>
        
        {/* Card: Em Rota */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center', borderLeft: '6px solid #ed6c02' }}>
            <Typography variant="h6" color="text.secondary">Em Rota</Typography>
            {/* <Typography variant="h3" sx={{ fontWeight: 'bold' }}>{totalEmRota}</Typography> */}
          </Paper>
        </Grid>

        {/* Card: Manutenção */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center', borderLeft: '6px solid #d32f2f' }}>
            <Typography variant="h6" color="text.secondary">Em Manutenção</Typography>
            {/* <Typography variant="h3" sx={{ fontWeight: 'bold' }}>{totalManutencao}</Typography> */}
          </Paper>
        </Grid>
      </Grid>

      {/* A Tabela */}
      <TabelaFrota />
    </Box>
  );
}
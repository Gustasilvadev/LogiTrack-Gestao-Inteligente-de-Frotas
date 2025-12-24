'use client';

import * as React from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Paper, Chip, Typography 
} from '@mui/material';
import { frotaMock } from '@/src/mocks/frotamocks';
import { VeiculoStatus } from '@/src/types/frota';

const getStatusStyles = (status: VeiculoStatus) => {
  switch (status) {
    case 'DISPONIVEL':
      return { color: 'success' as const, label: 'Disponível' };
    case 'EM_ROTA':
      return { color: 'warning' as const, label: 'Em Rota' };
    case 'MANUTENCAO':
      return { color: 'error' as const, label: 'Manutenção' };
    default:
      return { color: 'default' as const, label: status };
  }
};

export default function TabelaFrota() {
  return (
    <TableContainer component={Paper} sx={{ mt: 4, borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h6" sx={{ p: 2, fontWeight: 'bold' }}>
        Listagem de Frota Atual
      </Typography>
      <Table sx={{ minWidth: 650 }} aria-label="tabela de frota">
        <TableHead sx={{ bgcolor: 'grey.100' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Placa</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Modelo</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Motorista</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="center">Status</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="right">Capacidade</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="right">Última Manutenção</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {frotaMock.map((veiculo) => {
            const statusStyle = getStatusStyles(veiculo.status);
            
            return (
              <TableRow
                key={veiculo.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: 'grey.50' } }}
              >
                <TableCell component="th" scope="row" sx={{ fontWeight: 'medium' }}>
                  {veiculo.placa}
                </TableCell>
                <TableCell>{veiculo.modelo}</TableCell>
                <TableCell>{veiculo.motorista}</TableCell>
                <TableCell align="center">
                  <Chip 
                    label={statusStyle.label} 
                    color={statusStyle.color} 
                    size="small" 
                    sx={{ fontWeight: 'bold', minWidth: '100px' }}
                  />
                </TableCell>
                <TableCell align="right">{veiculo.capacidade}</TableCell>
                <TableCell align="right">{veiculo.ultimaManutencao}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
'use client';

import * as React from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Paper, Chip, Typography, CircularProgress, Box 
} from '@mui/material';

import { VehicleResponse, StatusVehicle } from '@/src/types/vehicle';
import { vehicleService } from '@/src/services/vehicleService/vehicleService';

// Helper atualizado para receber apenas o status (string)
const getStatusStyles = (status: StatusVehicle) => {
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
  const [vehicles, setVehicles] = React.useState<VehicleResponse[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      setLoading(true);
      const data = await vehicleService.listAll();
      setVehicles(data);
    } catch (error) {
      console.error("Erro ao carregar frota:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

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
            <TableCell sx={{ fontWeight: 'bold' }} align="right">Capacidade (T)</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="right">Última Manutenção</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicles.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                Nenhum veículo cadastrado.
              </TableCell>
            </TableRow>
          ) : (
            vehicles.map((veiculo) => {
              const statusStyle = getStatusStyles(veiculo.statusVehicle);
              return (
                <TableRow
                  key={veiculo.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: 'grey.50' } }}
                >
                  <TableCell component="th" scope="row" sx={{ fontWeight: 'medium' }}>
                    {veiculo.plate}
                  </TableCell>
                  <TableCell>{veiculo.model}</TableCell>
                  <TableCell>{veiculo.driverName}</TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={statusStyle.label} 
                      color={statusStyle.color} 
                      size="small" 
                      sx={{ fontWeight: 'bold', minWidth: '100px' }}
                    />
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
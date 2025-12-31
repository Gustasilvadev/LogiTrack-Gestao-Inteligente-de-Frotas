"use client";

import { useEffect, useState } from "react";
import { Box, Paper, Typography, Stack, Chip, Divider, CircularProgress } from "@mui/material";
import BusinessIcon from '@mui/icons-material/Business';
import { CarrierResponse } from "@/src/types/carrier";
import { carrierService } from "@/src/services/carrierService/carrierService";

export default function CarrierPage() {
  const [carrier, setCarrier] = useState<CarrierResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCarrier() {
      try {
        const data = await carrierService.getMyCarrier();
        setCarrier(data);
      } catch (error) {
        console.error("Erro ao carregar transportadora:", error);
      } finally {
        setLoading(false);
      }
    }
    loadCarrier();
  }, []);

  if (loading) return <CircularProgress sx={{ m: 5 }} />;
  if (!carrier) return <Typography>Transportadora não encontrada.</Typography>;

  return (
    <Box sx={{ p: 4, maxWidth: 900 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Dados da Transportadora
      </Typography>

      <Paper elevation={0} sx={{ p: 4, border: '1px solid #e0e0e0', borderRadius: 3 }}>
        <Stack direction="row" spacing={3} alignItems="center" sx={{ mb: 4 }}>
          <Box sx={{ p: 2, bgcolor: '#1a237e', color: 'white', borderRadius: 2 }}>
            <BusinessIcon fontSize="large" />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{carrier.name}</Typography>
            <Typography variant="body2" color="text.secondary">ID do Registro: #{carrier.id}</Typography>
          </Box>
          <Chip 
            label={carrier.logicalStatus} 
            color={carrier.logicalStatus === 'ATIVO' ? 'success' : 'warning'}
            sx={{ fontWeight: 'bold', px: 2 }}
          />
        </Stack>

        <Divider sx={{ mb: 4 }} />

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 4 }}>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
              CNPJ CADASTRADO
            </Typography>
            <Typography variant="h6" sx={{ mt: 0.5 }}>{carrier.cnpj}</Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
              TIPO DE ACESSO
            </Typography>
            <Typography variant="h6" sx={{ mt: 0.5 }}>Gestão de Frota Integral</Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
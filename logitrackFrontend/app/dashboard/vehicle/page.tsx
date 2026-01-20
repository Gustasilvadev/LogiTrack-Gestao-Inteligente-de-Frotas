"use client";

import { vehicleService } from "@/src/services/vehicleService/vehicleService";
import { VehicleResponse } from "@/src/types/vehicle";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

export default function VehiclePage() {

    const [rows, setRows] = useState<VehicleResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const fetchTeam = useCallback(async () => {
        try {
          setLoading(true);
          const data = await vehicleService.listAll();
          setRows(data);
        } catch (error) {
          console.error("Erro ao buscar o veiculo:", error);
        } finally {
          setLoading(false);
        }
    }, []);
    
    useEffect(() => {
      fetchTeam();
    }, [fetchTeam]);

  return (
        <Box sx={{ width: '100%', p: 2 }}>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            justifyContent="space-between" 
            alignItems={{ xs: 'flex-start', sm: 'center' }} 
            spacing={2}
            sx={{ mb: 3 }}
          >
            <Typography variant="h5" sx={{ fontWeight: 'bold'}}>
              Gestão de veículos
            </Typography>
  
            <Button 
              variant="contained"
              color="primary" 
              onClick={() => setIsModalOpen(true)} 
              sx={{ 
                borderRadius: 0, 
                fontWeight: 'bold', 
                px: 4, 
                py: 1.5,
              }}
            >
              ADICIONAR VEÍCULO
            </Button>
          </Stack>
          <Box sx={{ width: '100%', mb: 4 }}>
            {/* Adicionar cards estatisticos do veiculo */}
          </Box>
        </Box>
  );
}
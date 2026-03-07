"use client";

import { useVehicles } from "@/src/hooks/useVehicles";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";

export default function VehiclePage() {

    const { data: rows = [], isLoading: loading } = useVehicles();
    const [isModalOpen, setIsModalOpen] = useState(false);

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
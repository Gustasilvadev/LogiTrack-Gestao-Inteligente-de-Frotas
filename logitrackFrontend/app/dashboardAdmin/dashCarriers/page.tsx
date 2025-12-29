"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Box, Button, Chip, Paper, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { carrierService } from "@/src/services/carrierService/carrierService";
import { CarrierResponse } from "@/src/types/carrier";

export default function AdminPageCarriers() {
  const [rows, setRows] = useState<CarrierResponse[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Função para carregar os dados (reutilizável)
  const fetchCarriers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await carrierService.listAll();
      setRows(data);
    } catch (error) {
      console.error("Erro ao buscar transportadoras:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCarriers();
  }, [fetchCarriers]);

  // 2. Definição das colunas usando useMemo para performance e acesso ao fetchCarriers
  const columns = useMemo<GridColDef<CarrierResponse>[]>(() => [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'NOME', flex: 1 },
    { field: 'cnpj', headerName: 'CNPJ', width: 200 },
    {
      field: 'logicalStatus',
      headerName: 'STATUS',
      width: 120,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams<CarrierResponse, string>) => {
        const status = String(params.value || '').toUpperCase();
        return (
          <Chip
            label={status || "DESCONHECIDO"}
            size="small"
            sx={{ borderRadius: 0, fontWeight: 'bold', minWidth: '90px', color: '#fff' }}
            color={
              status === 'ATIVO' ? 'success' : 
              status === 'INATIVO' ? 'warning' : 
              status === 'APAGADO' ? 'error' : 'default'
            }
          />
        );
      },
    },
    {
      field: 'actions',
      headerName: 'AÇÕES',
      width: 320,
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams<CarrierResponse>) => {
        const handleStatusChange = async (newStatus: string) => {
          try {
            await carrierService.updateStatusLogical(params.row.id, newStatus);
            fetchCarriers(); // Atualiza a lista sem recarregar a página
          } catch (error) {
            console.error("Erro ao atualizar status:", error);
            alert("Não foi possível atualizar o status.");
          }
        };

        return (
          <Stack direction="row" spacing={1} sx={{ height: '100%', alignItems: 'center' }}>
            <Button 
              variant="outlined" size="medium" color="success"
              onClick={() => handleStatusChange('ATIVO')}
              sx={{ borderRadius: 0, fontSize: '12px', fontWeight: 'bold' }}
            >
              Ativar
            </Button>
            <Button 
              variant="outlined" size="medium" color="warning"
              onClick={() => handleStatusChange('INATIVO')}
              sx={{ borderRadius: 0, fontSize: '12px', fontWeight: 'bold' }}
            >
              Inativar
            </Button>
            <Button 
              variant="outlined" size="medium" color="error"
              onClick={() => handleStatusChange('APAGADO')}
              sx={{ borderRadius: 0, fontSize: '12px', fontWeight: 'bold' }}
            >
              Apagar
            </Button>
          </Stack>
        );
      }
    }
  ], [fetchCarriers]);

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
        Gestão de Transportadoras
      </Typography>
      
      <Paper 
        sx={{ 
          height: 600, 
          width: '100%', 
          borderRadius: 0, 
          boxShadow: 'none', 
          border: '1px solid #e0e0e0',
          overflow: 'hidden'
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          disableRowSelectionOnClick
          getRowId={(row) => row.id} 
          sx={{
            border: 0,
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f5f5f5',
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              borderBottom: '2px solid #e0e0e0',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #f0f0f0',
            },
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
          }}
        />
      </Paper>
    </Box>
  );
}
"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Alert, Box, Button, Chip, Paper, Snackbar, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { carrierService } from "@/src/services/carrierService/carrierService";
import { CarrierResponse } from "@/src/types/carrier";
import CreateCarrierModal from "@/src/components/forms/CreateCarrierModal";

export default function AdminPageCarriers() {
  const [rows, setRows] = useState<CarrierResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleSuccess = () => {
    fetchCarriers();
    setToast({
      open: true,
      message: "Transportadora cadastrada com sucesso!",
      severity: "success",
    });
  };

  // Função para carregar os dados
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

  const columns = useMemo<GridColDef<CarrierResponse>[]>(() => [
    { field: 'id', headerName: 'ID', width: 250, align: 'center', headerAlign: 'center' },
    { field: 'name', headerName: 'NOME', width: 350, align: 'center', headerAlign: 'center' },
    { field: 'cnpj', headerName: 'CNPJ', width: 350, align: 'center', headerAlign: 'center'  },
    {
      field: 'logicalStatus',
      headerName: 'STATUS',
      width: 350,
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
      width: 350,
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams<CarrierResponse>) => {
        const handleStatusChange = async (newStatus: string) => {
          try {
            await carrierService.updateStatusLogical(params.row.id, newStatus);
            fetchCarriers();
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
              sx={{ borderRadius: 0, fontSize: '12px', fontWeight: 'bold', '&:hover':{backgroundColor:"green", color:"white"} }}
            >
              Ativar
            </Button>
            <Button 
              variant="outlined" size="medium" color="warning"
              onClick={() => handleStatusChange('INATIVO')}
              sx={{ borderRadius: 0, fontSize: '12px', fontWeight: 'bold', '&:hover':{backgroundColor:"orange", color:"white"} }}
            >
              Inativar
            </Button>
            <Button 
              variant="outlined" size="medium" color="error"
              onClick={() => handleStatusChange('APAGADO')}
              sx={{ borderRadius: 0, fontSize: '12px', fontWeight: 'bold', '&:hover':{backgroundColor:"red", color:"white"} }}
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
      <Stack 
        direction="row" 
        justifyContent="space-between" 
        alignItems="center" 
        sx={{ mb: 3 }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold', m: 0 }}>
          Gestão de Transportadoras
        </Typography>

        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setIsModalOpen(true)} 
          sx={{ 
            borderRadius: 0, 
            fontWeight: 'bold', 
            px: 4, 
            py: 1.2
          }}
        >
          CRIAR TRANSPORTADORA
        </Button>
      </Stack>

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
        {/* COMPONENTE DO MODAL */}
        <CreateCarrierModal 
        open={isModalOpen} 
        handleClose={() => setIsModalOpen(false)} 
        onSuccess={handleSuccess} 
      />

      {/* TOAST */}
      <Snackbar 
        open={toast.open} 
        autoHideDuration={4000} 
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert variant="filled" severity={toast.severity} sx={{ borderRadius: 0 }}>
          {toast.message}
        </Alert>
      </Snackbar>
      
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
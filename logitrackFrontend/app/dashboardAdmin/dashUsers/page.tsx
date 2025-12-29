"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Box, Chip, Paper, Typography, Stack, Button } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { userService } from "@/src/services/userService/userService";
import { UserResponse } from "@/src/types/user";

export default function AdminPageUsers() {
  const [rows, setRows] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await userService.listAllManagerOperators();
      setRows(data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const columns: GridColDef<UserResponse>[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'name', headerName: 'NOME', flex: 1, minWidth: 100 },
    { field: 'email', headerName: 'EMAIL', flex: 1, minWidth: 200 },
    { 
      field: 'roleName', 
      headerName: 'CARGO', 
      width: 150,
      renderCell: (params) => (
        <Typography sx={{ fontSize: '0.875rem' }}>
          {params.value?.replace('ROLE_', '')}
        </Typography>
      )
    },
    { field: 'carrierName', headerName: 'TRANSPORTADORA', flex: 1, minWidth: 180 },
    {
      field: 'logicalStatus',
      headerName: 'STATUS',
      width: 120,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams<UserResponse, string>) => {
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
      renderCell: (params: GridRenderCellParams<UserResponse>) => {
        const onStatusChange = async (newStatus: string) => {
          try {
            await userService.updateStatusLogical(params.row.id, newStatus);
            fetchUsers(); 
          } catch (error) {
            console.error("Erro ao atualizar status", error);
            alert("Não foi possível atualizar o status.");
          }
        };

        return (
          <Stack direction="row" spacing={1} sx={{ height: '100%', alignItems: 'center' }}>
            <Button 
              variant="outlined" size="medium" color="success"
              onClick={() => onStatusChange('ATIVO')}
              sx={{ borderRadius: 0, fontSize: '12px', fontWeight: 'bold' }}
            >
              Ativar
            </Button>
            <Button 
              variant="outlined" size="medium" color="warning"
              onClick={() => onStatusChange('INATIVO')}
              sx={{ borderRadius: 0, fontSize: '12px', fontWeight: 'bold' }}
            >
              Inativar
            </Button>
            <Button 
              variant="outlined" size="medium" color="error"
              onClick={() => onStatusChange('APAGADO')}
              sx={{ borderRadius: 0, fontSize: '12px', fontWeight: 'bold' }}
            >
              Apagar
            </Button>
          </Stack>
        );
      }
    }
  ];

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
        Gestão de Usuários
      </Typography>
      
      <Paper sx={{ height: 600, width: '100%', borderRadius: 0, boxShadow: 'none', border: '1px solid #e0e0e0', overflow: 'hidden' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10, 20]}
          disableRowSelectionOnClick
          getRowId={(row) => row.id} 
          sx={{
            border: 0,
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f8f9fa',
              borderBottom: '2px solid #e0e0e0',
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              fontWeight: 'bold',
            },
            '& .MuiDataGrid-cell:focus': { outline: 'none' },
          }}
        />
      </Paper>
    </Box>
  );
}
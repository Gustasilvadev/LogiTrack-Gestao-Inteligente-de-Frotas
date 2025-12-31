"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Box, Chip, Paper, Typography, Stack, Button, Snackbar, Alert } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { userService } from "@/src/services/userService/userService";
import { UserResponse } from "@/src/types/user";
import CreateUserModal from "@/src/components/forms/CreateUserModal";

export default function AdminPageUsers() {
  const [rows, setRows] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleSuccess = () => {
    fetchUsers();
    setToast({
      open: true,
      message: "Usuário cadastrado com sucesso!",
      severity: "success",
    });
  };

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
    { field: 'id', headerName: 'ID', width: 80, align: 'center', headerAlign: 'center' },
    { field: 'name', headerName: 'NOME', flex: 1, minWidth: 100, align: 'center',headerAlign: 'center'},
    { field: 'email', headerName: 'EMAIL', flex: 1, minWidth: 200, align: 'center', headerAlign: 'center'},
    { 
      field: 'roleName', 
      headerName: 'CARGO', 
      width: 200,
      align: 'center',
      display: 'flex',
      headerAlign: 'center',
      renderCell: (params) => (
        <Typography sx={{ fontSize: '0.9rem' }}>
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
              sx={{ borderRadius: 0, fontSize: '12px', fontWeight: 'bold', '&:hover':{backgroundColor:"green", color:"white"} }}
            >
              Ativar
            </Button>
            <Button 
              variant="outlined" size="medium" color="warning"
              onClick={() => onStatusChange('INATIVO')}
              sx={{ borderRadius: 0, fontSize: '12px', fontWeight: 'bold', '&:hover':{backgroundColor:"orange", color:"white"} }}
            >
              Inativar
            </Button>
            <Button 
              variant="outlined" size="medium" color="error"
              onClick={() => onStatusChange('APAGADO')}
              sx={{ borderRadius: 0, fontSize: '12px', fontWeight: 'bold', '&:hover':{backgroundColor:"red", color:"white"} }}
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
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Gestão de Usuários</Typography>
          <Button sx={{ width:200,borderRadius: 0, }} variant="contained" onClick={() => setIsModalOpen(true)}>CRIAR USUÁRIO</Button>
        </Stack>

        {/* Tabela */}
        <Paper sx={{ height: 600, width: '100%', borderRadius: 0, border: '1px solid #e0e0e0', overflow: 'hidden' }}>
          <DataGrid rows={rows} columns={columns} loading={loading} getRowId={(row) => row.id} />
        </Paper>

        {/* Modal */}
        <CreateUserModal 
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
          <Alert 
            onClose={() => setToast({ ...toast, open: false })} 
            severity={toast.severity} 
            variant="filled" 
            sx={{ width: '100%', borderRadius: 0 }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      </Box>
  );
}
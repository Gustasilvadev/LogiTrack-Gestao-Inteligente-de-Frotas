"use client";

import CreateOperatorModal from "@/src/components/forms/CreateOperatorModal";
import TeamStats from "@/src/components/stats/TeamStats";
import { userService } from "@/src/services/userService/userService";
import { UserResponse } from "@/src/types/user";
import { Alert, Box, Button, Checkbox, Chip, FormControlLabel, FormGroup, IconButton, Paper, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import EditUserModal from "@/src/components/forms/EditUserModal";

export default function TeamPage() {

  const [rows, setRows] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [showActive, setShowActive] = useState(true);
  const [showInactive, setShowInactive] = useState(true);

  const [userToEdit, setUserToEdit] = useState<UserResponse | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

   const [toast, setToast] = useState({
      open: false,
      message: "",
      severity: "success" as "success" | "error",
    });
  
    const handleSuccess = () => {
      fetchTeam();
      setToast({
        open: true,
        message: "Operador cadastrado com sucesso!",
        severity: "success",
      });
    };

  // Função para carregar os dados
  const fetchTeam = useCallback(async () => {
    try {
      setLoading(true);
      const data = await userService.listTeam();
      setRows(data);
    } catch (error) {
      console.error("Erro ao buscar equipe:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeam();
  }, [fetchTeam]);

  const filteredRows = useMemo(() => {
    return rows.filter((user) => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = 
        (showActive && user.logicalStatus === 'ATIVO') || 
        (showInactive && user.logicalStatus === 'INATIVO');

      return matchesSearch && matchesStatus;
    });
  }, [rows, searchTerm, showActive, showInactive]);

   const columns = useMemo<GridColDef<UserResponse>[]>(() => [
      { field: 'name', headerName: 'NOME', width: 300, align: 'center', headerAlign: 'center' },
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
      { field: 'carrierName', headerName: 'TRANSPORTADORA', width: 350, align: 'center', headerAlign: 'center'  },
      {
        field: 'logicalStatus',
        headerName: 'STATUS',
        width: 350,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params: GridRenderCellParams<UserResponse, string>) => {
          const status = String(params.value || '').toUpperCase();
          return (
            <Chip
              label={status} 
              size="small"
              sx={{ borderRadius: 0, fontWeight: 'bold', minWidth: '90px', color: '#fff' }}
              color={status === 'ATIVO' ? 'success' : 'warning'}
            />
          );
        },
      },
      {
        field: 'actions',
        headerName: 'AÇÕES',
        width: 300,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params: GridRenderCellParams<UserResponse>) => {
          const handleStatusChange = async (newStatus: string) => {
            try {
              await userService.updateStatusLogical(params.row.id, newStatus);
              fetchTeam();
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

              <IconButton onClick={() => {
                setUserToEdit(params.row);
                setIsEditModalOpen(true);
              }}>
                <EditIcon color="primary" />
              </IconButton>
            </Stack>
          );
        }
      }
    ], [fetchTeam]);

  return (
       <Box sx={{ width: '100%', p: 2 }}>
        <Stack 
          direction="row" 
          justifyContent="space-between" 
          alignItems="center" 
          sx={{ mb: 3 }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold', m: 0 }}>
            Gestão de equipe
          </Typography>

          <TeamStats users={rows} />

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
            CRIAR OPERADOR
          </Button>
        </Stack>

        <Paper elevation={0} sx={{ p: 2, mb: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="center">
    
            {/* Barra de Pesquisa */}
            <TextField
              fullWidth
              size="small"
              label="Pesquisar por nome ou e-mail"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Checkboxes de Status */}
            <FormGroup row sx={{ minWidth: 'fit-content' }}>
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={showActive} 
                    onChange={(e) => setShowActive(e.target.checked)} 
                    color="success"
                  />
                }
                label="Ativos"
              />
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={showInactive} 
                    onChange={(e) => setShowInactive(e.target.checked)} 
                    color="warning"
                  />
                }
                label="Inativos"
              />
            </FormGroup>
          </Stack>
        </Paper>

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
          <CreateOperatorModal 
          open={isModalOpen} 
          handleClose={() => setIsModalOpen(false)} 
          onSuccess={handleSuccess} 
          />

          <EditUserModal 
            open={isEditModalOpen} 
            user={userToEdit} // Passa o usuário selecionado na linha
            handleClose={() => {
              setIsEditModalOpen(false);
              setUserToEdit(null);
            }} 
            onSuccess={() => {
              fetchTeam(); // Atualiza a tabela
              setToast({
                open: true,
                message: "Operador atualizado com sucesso!",
                severity: "success",
              });
            }} 
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
            rows={filteredRows}
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
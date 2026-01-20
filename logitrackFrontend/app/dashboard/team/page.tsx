"use client";

import CreateOperatorModal from "@/src/components/forms/CreateOperatorModal";
import TeamStats from "@/src/components/stats/TeamStats";
import TeamTable from "@/src/components/table/TeamTable";
import { userService } from "@/src/services/userService/userService";
import { UserResponse } from "@/src/types/user";
import { Alert, Box, Button, Checkbox, FormControlLabel, FormGroup, Paper, Snackbar, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
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
            Gestão de equipe
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
            CRIAR OPERADOR
          </Button>
        </Stack>
        <Box sx={{ width: '100%', mb: 4 }}>
          <TeamStats users={rows} />
        </Box>
        <Paper elevation={0} sx={{ p: 2, mb: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="center">
    
            <TextField
              fullWidth
              size="small"
              label="Pesquisar por nome ou e-mail"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

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
          <CreateOperatorModal 
          open={isModalOpen} 
          handleClose={() => setIsModalOpen(false)} 
          onSuccess={handleSuccess} 
        />

        <EditUserModal 
          open={isEditModalOpen} 
          user={userToEdit}
          handleClose={() => {
            setIsEditModalOpen(false);
            setUserToEdit(null);
          }} 
          onSuccess={() => {
            fetchTeam();
            setToast({
              open: true,
              message: "Operador atualizado com sucesso!",
              severity: "success",
            });
          }} 
        />

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

        <TeamTable
          filteredRows={filteredRows}
          loading={loading}
          onEditClick={(user) => {
            setUserToEdit(user);
            setIsEditModalOpen(true);
          }}
          onFetchTeam={fetchTeam}
        />
      </Paper>
    </Box>
  );
}
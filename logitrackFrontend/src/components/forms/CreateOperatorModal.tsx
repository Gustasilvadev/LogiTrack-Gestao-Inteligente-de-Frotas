"use client";

import React, { useState } from 'react';
import { Box, Button, Typography, Modal, TextField, Stack, Alert } from '@mui/material';
import { carrierService } from "@/src/services/carrierService/carrierService";
import { CarrierRequest } from '@/src/types/carrier';
import { UserRequest } from '@/src/types/user';
import { userService } from '@/src/services/userService/userService';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 0,
};

const formatCNPJ = (value: string) => {
  const digits = value.replace(/\D/g, "");
  return digits
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d{3})(\d)/, ".$1/$2$3")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .substring(0, 18);
};

interface CreateOperatorModalProps {
  open: boolean;
  handleClose: () => void;
  onSuccess: () => void;
}
export default function CreateOperatorModal({ open, handleClose, onSuccess }: CreateOperatorModalProps) {

  const initialForm: UserRequest = { 
          name: '', 
          email: '', 
          password: '', 
          carrierCnpj: '', 
          roleName: 'ROLE_OPERATOR' 
    };

  const [formData, setFormData] = useState<UserRequest>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

 const handleSubmit = async () => {
        try {
            setLoading(true);
            setError(null);
            const payload = {
            ...formData,
            roleName: formData.roleName 
            };

            await userService.createOperator(payload);
            onSuccess();
            setFormData(initialForm);
            handleClose();
        } catch (err: any) {
            const apiError = err.response?.data?.message || "Erro ao salvar operador.";
            setError(apiError); 
            console.error("Erro detalhado:", err.response?.data);
        } finally {
            setLoading(false);
        }
    };


  return (
          <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
              Novo Usuário (Operador)
              </Typography>
  
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
  
              <Stack spacing={2}>
                  <TextField
                      fullWidth label="Nome Completo" size="small"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
  
                  <TextField
                      fullWidth label="E-mail" size="small" type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
  
                  <TextField
                      fullWidth label="Senha" size="small" type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
  
                  {/* CAMPO DE ROLE */}
                  <TextField
                      fullWidth label="Cargo" size="small"
                      value="OPERADOR"
                      disabled // O Gestor não pode mudar
                  />
  
                  <Stack spacing={2} sx={{ mt: 2 }}>
                      <Button
                          fullWidth variant="contained"
                          onClick={handleSubmit}
                          disabled={loading}
                      >
                          {loading ? "Salvando..." : "Confirmar Cadastro"}
                      </Button>
                      
                      <Button 
                          fullWidth variant="outlined" color="inherit"
                          onClick={handleClose}
                      >
                          Cancelar
                      </Button>
                  </Stack>
              </Stack>
          </Box>
      </Modal>
    );
  }
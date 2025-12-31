"use client";

import React, { useState } from 'react';
import { Box, Button, Typography, Modal, TextField, Stack, Alert } from '@mui/material';
import { UserRequest } from '@/src/types/user';
import { userService } from '@/src/services/userService/userService';

const formatCNPJ = (value: string) => {
  const digits = value.replace(/\D/g, "");
  return digits
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d{3})(\d)/, ".$1/$2$3")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .substring(0, 18);
};

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

interface CreateUserModalProps {
  open: boolean;
  handleClose: () => void;
  onSuccess: () => void;
}
  
  export default function CreateUserModal({ open, handleClose, onSuccess }: CreateUserModalProps) {

    const initialForm: UserRequest = { 
        name: '', 
        email: '', 
        password: '', 
        carrierCnpj: '', 
        roleName: 'ROLE_MANAGER' 
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

            await userService.createManager(payload);
            onSuccess();
            setFormData(initialForm);
            handleClose();
        } catch (err: any) {
            const apiError = err.response?.data?.message || "Erro ao salvar usuário.";
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
            Novo Usuário (Gerente)
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

                <TextField
                    fullWidth label="CNPJ da Transportadora" size="small"
                    value={formData.carrierCnpj}
                    onChange={(e) => setFormData({ ...formData, carrierCnpj: formatCNPJ(e.target.value) })}
                />

                {/* CAMPO DE ROLE */}
                <TextField
                    fullWidth label="Cargo" size="small"
                    value="GERENTE"
                    disabled // O Admin não pode mudar
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
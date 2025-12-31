"use client";

import { userService } from "@/src/services/userService/userService";
import { UserRequest, UserResponse } from "@/src/types/user";
import { Alert, Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

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

interface EditUserModalProps {
  open: boolean;
  handleClose: () => void;
  onSuccess: () => void;
  user: UserResponse | null;
}

export default function EditUserModal({ open, handleClose, onSuccess, user }: EditUserModalProps){

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
    

    useEffect(() => {
        if (user && open) {
        setFormData({
            name: user.name,
            email: user.email,
            carrierCnpj: user.carrierName || '',
            roleName: "ROLE_OPERATOR",
            password: ''
        });
        }
    }, [user, open]);

    const handleSubmit = async () => {
        if (!user) return;
        try {
        setLoading(true);
        setError(null);
        
        await userService.updateUser(user.id, formData);
    
        onSuccess();
        handleClose();
        } catch (err: any) {
            const apiError = err.response?.data?.message || "Erro ao atualizar operador.";
        setError(apiError);
        } finally {
            setLoading(false);
        }
    };

    return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
          Editar Usuário: {user?.name}
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
            fullWidth label="Nova Senha (deixe em branco para manter)" 
            size="small" type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />

          <Stack spacing={2} sx={{ mt: 2 }}>
            <Button
              fullWidth variant="contained"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Salvando..." : "Salvar Alterações"}
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
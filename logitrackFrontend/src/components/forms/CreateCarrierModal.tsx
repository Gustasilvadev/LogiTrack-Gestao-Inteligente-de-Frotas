"use client";

import React, { useState } from 'react';
import { Box, Button, Typography, Modal, TextField, Stack, Alert } from '@mui/material';
import { carrierService } from "@/src/services/carrierService/carrierService";
import { CarrierRequest } from '@/src/types/carrier';

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

interface CreateCarrierModalProps {
  open: boolean;
  handleClose: () => void;
  onSuccess: () => void;
}

  const formatCNPJ = (value: string) => {
    const digits = value.replace(/\D/g, "");
        return digits
            .replace(/^(\d{2})(\d)/, "$1.$2")
            .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
            .replace(/\.(\d{3})(\d{3})(\d)/, ".$1/$2$3")
            .replace(/(\d{4})(\d)/, "$1-$2")
            .substring(0, 18);
  };

export default function CreateCarrierModal({ open, handleClose, onSuccess }: CreateCarrierModalProps) {
  const initialForm: CarrierRequest = { name: '', cnpj: '' };
  const [formData, setFormData] = useState<CarrierRequest>(initialForm);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

 const handleSubmit = async () => {
    if (formData.name.trim().length < 3) {
      setError("O nome deve ter pelo menos 3 caracteres.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      await carrierService.create(formData);
      onSuccess();
      setFormData(initialForm);
      onSuccess();
      handleClose();
    } catch (err) {
      console.error("Erro ao criar transportadora", err);
      setError("Falha ao salvar. Verifique se o CNPJ já está cadastrado.");
    } finally {
      setLoading(false);
    }
  };

  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = formatCNPJ(e.target.value);
    setFormData({ ...formData, cnpj: maskedValue });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
          Nova Transportadora
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Stack spacing={2.5}>
          <TextField
            fullWidth
            label="Nome da Empresa"
            variant="outlined"
            size="small"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          
          <TextField
            fullWidth
            label="CNPJ"
            placeholder="00.000.000/0000-00"
            variant="outlined"
            size="small"
            value={formData.cnpj}
            onChange={handleCNPJChange}
          />

          <Stack spacing={2} sx={{ mt: 1 }}>
            <Button 
                fullWidth
                variant="contained" 
                onClick={handleSubmit}
                disabled={formData.name.length < 3 || formData.cnpj.length < 18}
            >
                Confirmar Cadastro
            </Button>
            
            <Button 
                fullWidth
                variant="outlined" 
                color="inherit"
                onClick={handleClose}
            >
                Cancelar Cadastro
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}
import { UserResponse } from "@/src/types/user";
import { userService } from "@/src/services/userService/userService";
import { Chip, IconButton, Stack, Typography, Button, Paper } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import React, { useMemo } from "react";
import EditIcon from '@mui/icons-material/Edit';

interface TeamTableProps {
  filteredRows: UserResponse[];
  loading: boolean;
  onEditClick: (user: UserResponse) => void;
  onFetchTeam: () => Promise<void>;
}

export default function TeamTable({ 
  filteredRows, 
  loading, 
  onEditClick, 
  onFetchTeam 
}: TeamTableProps) {

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
            await onFetchTeam();
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
              onEditClick(params.row);
            }}>
              <EditIcon color="primary" />
            </IconButton>
          </Stack>
        );
      }
    }
  ], [onFetchTeam, onEditClick]);

  return (
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
  );
}

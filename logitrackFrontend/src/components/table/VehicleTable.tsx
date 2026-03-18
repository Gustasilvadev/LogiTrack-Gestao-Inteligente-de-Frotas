import { useUpdateVehicleLogicalStatus } from "@/src/hooks/useVehicles";
import { Chip, IconButton, Stack, Typography, Button, Paper } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import React, { useMemo } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { VehicleResponse } from "@/src/types/vehicle";

interface VehicleTableProps {
  filteredRows: VehicleResponse[];
  loading: boolean;
  onEditClick: (vehicle: VehicleResponse) => void;
}

export default function VehicleTable({ 
  filteredRows, 
  loading, 
  onEditClick
}: VehicleTableProps) {

  const { mutate: updateVehicleLogicalStatus } = useUpdateVehicleLogicalStatus();

  const columns = useMemo<GridColDef<VehicleResponse>[]>(() => [
    { field: 'plate', headerName: 'PLACA', width: 300, align: 'center', headerAlign: 'center' },
    { 
      field: 'model', 
      headerName: 'MODELO', 
      width: 200,
      align: 'center',
      display: 'flex',
      headerAlign: 'center',
    },
    { field: 'driverName', headerName: 'MOTORISTA', width: 350, align: 'center', headerAlign: 'center'  },
    { field: 'capacity', headerName: 'CAPACIDADE', width: 350, align: 'center', headerAlign: 'center'  },
    {
    field: 'statusVehicle', 
    headerName: 'STATUS DO VEÍCULO',
    width: 200,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params: GridRenderCellParams<VehicleResponse>) => {
        const status = String(params.value || '').toUpperCase();

        let config = { label: 'DESCONHECIDO', color: 'default' as any };

        if (status === 'DISPONIVEL' || status === '1') {
        config = { label: 'DISPONÍVEL', color: 'success' };
        } else if (status === 'EM_ROTA' || status === '0') {
        config = { label: 'EM ROTA', color: 'info' };
        } else if (status === 'MANUTENCAO' || status === '-1') {
        config = { label: 'MANUTENÇÃO', color: 'error' };
        }

        return (
        <Chip
            label={config.label}
            size="small"
            sx={{ 
            borderRadius: 0, 
            fontWeight: 'bold', 
            minWidth: '110px', 
            color: '#fff',
            textTransform: 'uppercase'
            }}
            color={config.color}
        />
        );
    },

    },
    {
      field: 'logicalStatus',
      headerName: 'STATUS',
      width: 350,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams<VehicleResponse, string>) => {
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
      renderCell: (params: GridRenderCellParams<VehicleResponse>) => {
        const handleStatusChange = (newStatus: string) => {
          updateVehicleLogicalStatus({ id: Number(params.row.id), status: newStatus });
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
  ], [updateVehicleLogicalStatus, onEditClick]);

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

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { vehicleService } from '@/src/services/vehicleService';
import { VehicleRequest, VehicleResponse, StatusVehicle } from '@/src/types/vehicle';

// Query Keys
const vehicleKeys = {
  all: ['vehicles'] as const,
  list: () => [...vehicleKeys.all, 'list'] as const,
  detail: (id: number) => [...vehicleKeys.all, 'detail', id] as const,
};

// Queries
export function useVehicles(enabled: boolean = true) {
  return useQuery({
    queryKey: vehicleKeys.list(),
    queryFn: () => vehicleService.listAll(),
    enabled,
  });
}

export function useVehicleById(id: number, enabled: boolean = true) {
  return useQuery({
    queryKey: vehicleKeys.detail(id),
    queryFn: () => vehicleService.getById(id),
    enabled,
  });
}

// Mutations
export function useCreateVehicle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vehicle: VehicleRequest) => vehicleService.create(vehicle),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: vehicleKeys.list() });
    },
  });
}

export function useUpdateVehicleStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: StatusVehicle }) =>
      vehicleService.updateStatusVehicle(id, status),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: vehicleKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: vehicleKeys.list() });
    },
  });
}

export function useDeleteVehicle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => vehicleService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: vehicleKeys.list() });
    },
  });
}

export function useUpdateVehicleLogicalStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      vehicleService.updateStatusLogical(id, status),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: vehicleKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: vehicleKeys.list() });
    },
  });
}

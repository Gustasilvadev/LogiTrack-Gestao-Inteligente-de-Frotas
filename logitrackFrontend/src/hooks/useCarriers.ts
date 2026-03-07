import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { carrierService } from '@/src/services/carrierService';
import { CarrierRequest, CarrierResponse } from '@/src/types/carrier';

// Query Keys
const carrierKeys = {
  all: ['carriers'] as const,
  active: () => [...carrierKeys.all, 'active'] as const,
  list: () => [...carrierKeys.all, 'list'] as const,
  detail: (id: number) => [...carrierKeys.all, 'detail', id] as const,
  myCarrier: () => [...carrierKeys.all, 'myCarrier'] as const,
};

// Queries
export function useCarriersActive(enabled: boolean = true) {
  return useQuery({
    queryKey: carrierKeys.active(),
    queryFn: () => carrierService.listAllActive(),
    enabled,
  });
}

export function useCarriers(enabled: boolean = true) {
  return useQuery({
    queryKey: carrierKeys.list(),
    queryFn: () => carrierService.listAll(),
    enabled,
  });
}

export function useCarrierById(id: number, enabled: boolean = true) {
  return useQuery({
    queryKey: carrierKeys.detail(id),
    queryFn: () => carrierService.getById(id),
    enabled,
  });
}

export function useMyCarrier(enabled: boolean = true) {
  return useQuery({
    queryKey: carrierKeys.myCarrier(),
    queryFn: () => carrierService.getMyCarrier(),
    enabled,
  });
}

// Mutations
export function useCreateCarrier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (carrier: CarrierRequest) => carrierService.create(carrier),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: carrierKeys.active() });
      queryClient.invalidateQueries({ queryKey: carrierKeys.list() });
    },
  });
}

export function useUpdateCarrier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, carrier }: { id: number; carrier: CarrierRequest }) =>
      carrierService.update(id, carrier),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: carrierKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: carrierKeys.list() });
      queryClient.invalidateQueries({ queryKey: carrierKeys.active() });
    },
  });
}

export function useDeleteCarrier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => carrierService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: carrierKeys.list() });
      queryClient.invalidateQueries({ queryKey: carrierKeys.active() });
    },
  });
}

export function useUpdateCarrierStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      carrierService.updateStatusLogical(id, status),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: carrierKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: carrierKeys.list() });
      queryClient.invalidateQueries({ queryKey: carrierKeys.active() });
      queryClient.invalidateQueries({ queryKey: carrierKeys.myCarrier() });
    },
  });
}

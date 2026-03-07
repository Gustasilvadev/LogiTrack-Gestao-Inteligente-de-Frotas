import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { statusHistoryService } from '@/src/services/statusHistoryService';
import { StatusHistoryResponse } from '@/src/types/statusHistory';

// Query Keys
const statusHistoryKeys = {
  all: ['statusHistory'] as const,
  byCarrier: (carrierId: number) => [...statusHistoryKeys.all, 'carrier', carrierId] as const,
};

// Queries
export function useStatusHistoryByCarrier(carrierId: number, enabled: boolean = true) {
  return useQuery({
    queryKey: statusHistoryKeys.byCarrier(carrierId),
    queryFn: () => statusHistoryService.listByCarrier(carrierId),
    enabled,
  });
}

// Mutations
export function useDeleteStatusHistory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => statusHistoryService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: statusHistoryKeys.all });
    },
  });
}

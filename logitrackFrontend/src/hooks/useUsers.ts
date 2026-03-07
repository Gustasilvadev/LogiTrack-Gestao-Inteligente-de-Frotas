import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/src/services/userService';
import { UserRequest, UserResponse } from '@/src/types/user';
import { LoginUserRequest, JwtTokenResponse } from '@/src/types/login';

// Query Keys
const userKeys = {
  all: ['users'] as const,
  team: () => [...userKeys.all, 'team'] as const,
  allOperators: () => [...userKeys.all, 'allOperators'] as const,
};

// Queries
export function useUserTeam(enabled: boolean = true) {
  return useQuery({
    queryKey: userKeys.team(),
    queryFn: () => userService.listTeam(),
    enabled,
  });
}

export function useAllManagerOperators(enabled: boolean = true) {
  return useQuery({
    queryKey: userKeys.allOperators(),
    queryFn: () => userService.listAllManagerOperators(),
    enabled,
  });
}

// Mutations
export function useCreateOperator() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: UserRequest) => userService.createOperator(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.team() });
      queryClient.invalidateQueries({ queryKey: userKeys.allOperators() });
    },
  });
}

export function useCreateManager() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: UserRequest) => userService.createManager(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.allOperators() });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => userService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.team() });
      queryClient.invalidateQueries({ queryKey: userKeys.allOperators() });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, userData }: { id: number; userData: UserRequest }) =>
      userService.updateUser(id, userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.team() });
      queryClient.invalidateQueries({ queryKey: userKeys.allOperators() });
    },
  });
}

export function useUpdateUserStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      userService.updateStatusLogical(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.team() });
      queryClient.invalidateQueries({ queryKey: userKeys.allOperators() });
    },
  });
}

// Login mutation
export function useLogin() {
  return useMutation({
    mutationFn: (credentials: LoginUserRequest) => userService.login(credentials),
  });
}

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/src/services/auth';
import { LoginUserRequest, JwtTokenResponse } from '@/src/types/login';
import { useRouter } from 'next/navigation';

// Query Keys
const authKeys = {
  all: ['auth'] as const,
  currentUser: () => [...authKeys.all, 'currentUser'] as const,
};


const getCurrentUser = () => {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem('@LogiTrack:user');
  return userStr ? JSON.parse(userStr) : null;
};

// Query
export function useCurrentUser(enabled: boolean = true) {
  return useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: () => getCurrentUser(),
    enabled,
    staleTime: Infinity, // User data doesn't become stale
  });
}

// Mutations
export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (credentials: LoginUserRequest) => authService.login(credentials),
    onSuccess: (data) => {
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
      // Optionally redirect to dashboard
      router.push('/dashboard/home');
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => {
      authService.logout();
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.clear();
      router.push('/auth/login');
    },
  });
}

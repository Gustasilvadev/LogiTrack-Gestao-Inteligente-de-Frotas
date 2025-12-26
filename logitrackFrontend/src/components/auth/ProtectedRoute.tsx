'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) {
  const router = useRouter();

  useEffect(() => {
    const userJson = localStorage.getItem('@LogiTrack:user');
    const user = userJson ? JSON.parse(userJson) : null;

    if (!user || !allowedRoles.includes(user.roleName)) {
      router.push('/');
    }
  }, [allowedRoles, router]);

  return <>{children}</>;
}
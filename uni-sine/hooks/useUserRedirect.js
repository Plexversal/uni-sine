import { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';

export function useUserRedirect() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user && !isLoading) {
      router.push('/api/auth/login');
    }
  }, [user, isLoading, router]);

  return { user, isLoading };
}

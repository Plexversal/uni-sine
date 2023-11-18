import { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';

export default function useUserRedirect() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user && !isLoading) {
      router.push('/api/auth/login');
    } else if (user && !user.email_verified) { // Add this condition
      router.push('/unverified');
    }
  }, [user, isLoading, router]);

  return { user, isLoading };
}

import { useToast } from '@chakra-ui/react';
import { auth } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export function useAuth() {
  const [user, loading, error] = useAuthState(auth);
  console.log('user->', user, 'loading->', loading);
  const toast = useToast();
  if (error) {
    toast({
      description: error.message,
      position: 'top-right',
      status: 'error',
      isClosable: true,
      duration: 3000,
    });
  }
  return { isAuth: !!user, user, loading, error };
}

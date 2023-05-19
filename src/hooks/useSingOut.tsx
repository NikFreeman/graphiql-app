// not use
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../utils/firebase';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const SignOut = async () => {
  console.log('signOut');
  const [signOut, loading, error] = useSignOut(auth);
  const toast = useToast();
  const navigate = useNavigate();

  if (error) {
    return toast({
      description: error.message,
      position: 'top-right',
      status: 'error',
      isClosable: true,
      duration: 3000,
    });
  }

  if (loading) {
    return toast({
      description: 'Loading',
      position: 'top-right',
      status: 'info',
      isClosable: true,
      duration: 2000,
    });
  }

  await signOut();
  navigate('/');
  return toast({
    description: 'Sign Out',
    position: 'top-right',
    status: 'info',
    isClosable: true,
    duration: 3000,
  });
};

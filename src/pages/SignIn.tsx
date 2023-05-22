import { auth } from '../utils/firebase';
import { AuthError, signInWithEmailAndPassword } from 'firebase/auth';
import LoginForm from '../components/loginForm';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function SignIn() {
  const toast = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSignIn = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        navigate('/editor');
        toast({
          description: `${user.email} is logged in`,
          position: 'top-right',
          status: 'info',
          isClosable: true,
          duration: 3000,
        });
      })
      .catch((err: AuthError) => {
        toast({
          description: err.message,
          position: 'top-right',
          status: 'error',
          isClosable: true,
          duration: 5000,
        });
      });
  };

  return (
    <LoginForm handleClick={handleSignIn} title={t('signIn')} btnTitle={t('signIn')}></LoginForm>
  );
}

export default SignIn;

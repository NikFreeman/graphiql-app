import { auth } from '../utils/firebase';
import { AuthError, createUserWithEmailAndPassword } from 'firebase/auth';
import LoginForm from '../components/loginForm';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function SignUp() {
  const toast = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSignUp = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        navigate('/editor');
        toast({
          description: `${user.email} is logged`,
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
    <LoginForm handleClick={handleSignUp} title={t('signUp')} btnTitle={t('signUp')}></LoginForm>
  );
}

export default SignUp;

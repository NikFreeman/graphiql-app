import { auth } from '../utils/firebase';
import { AuthError, createUserWithEmailAndPassword } from 'firebase/auth';
import LoginForm from '../components/loginForm';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const toast = useToast();
  const navigate = useNavigate();
  const handleSignUp = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        navigate('/editor');
        return toast({
          description: `${user.email} is logged`,
          position: 'top-right',
          status: 'info',
          isClosable: true,
          duration: 3000,
        });
      })
      .catch((err: AuthError) => {
        return toast({
          description: err.message,
          position: 'top-right',
          status: 'error',
          isClosable: true,
          duration: 5000,
        });
      });
  };
  return <LoginForm handleClick={handleSignUp} title="Sign Up" btnTitle="Sign Up"></LoginForm>;
}

export default SignUp;

import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../store/slices/userSlice';
import LoginForm from '../components/loginForm';
import { useTranslation } from 'react-i18next';

function SignUp() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  console.log('auth->', auth.currentUser);
  const handleSignUp = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log('user->', user);
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          })
        );
      })
      .catch(console.error);
  };
  return (
    <LoginForm handleClick={handleSignUp} title={t('signUp')} btnTitle={t('signUp')}></LoginForm>
  );
}

export default SignUp;

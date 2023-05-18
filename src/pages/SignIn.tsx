import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../store/slices/userSlice';
import LoginForm from '../components/loginForm';
import { useTranslation } from 'react-i18next';

function SignIn() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleSignIn = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
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
      .catch((error) => console.log('error=>', error));
  };
  return (
    <LoginForm handleClick={handleSignIn} title={t('signIn')} btnTitle={t('signIn')}></LoginForm>
  );
}

export default SignIn;

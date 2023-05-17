import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../store/slices/userSlice';
import LoginForm from '../components/loginForm';
import ErrorBoundary from '../utils/ErrorBoundarry';

function SignIn() {
  const dispatch = useDispatch();
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
    <ErrorBoundary>
      <LoginForm handleClick={handleSignIn} title="Sign In" btnTitle="Sign In"></LoginForm>
    </ErrorBoundary>
  );
}

export default SignIn;

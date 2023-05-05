import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../store/slices/userSlice';
import LoginForm from '../components/loginForm';

function SignUp() {
  const dispatch = useDispatch();
  const handleSignUp = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
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
  return <LoginForm handleClick={handleSignUp}></LoginForm>;
}

export default SignUp;

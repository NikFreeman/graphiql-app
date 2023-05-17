// import { useSelector } from '../store/index';

// export function useAuth() {
//   const { email, token, id } = useSelector((state) => state.user);
//   return {
//     isAuth: !!email,
//     email,
//     token,
//     id,
//   };
// }

import { auth } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export function useAuth() {
  const [user, loading, error] = useAuthState(auth);
  return { isAuth: !!user, user, loading, error };
}

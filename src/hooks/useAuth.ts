import { useSelector } from '../store/index';

export function useAuth() {
  const { email, token, id } = useSelector((state) => state.user);
  return {
    isAuth: !!email,
    email,
    token,
    id,
  };
}

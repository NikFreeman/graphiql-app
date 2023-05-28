import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Loading from './loading';

interface ProtectedRouteProps {
  children: JSX.Element;
}
function DefaultAuthRoute({ children }: ProtectedRouteProps) {
  const { isAuth, loading } = useAuth();
  if (loading) {
    return <Loading />;
  }
  if (!isAuth) {
    return children;
  }
  return <Navigate to="/editor" replace />;
}
export default DefaultAuthRoute;

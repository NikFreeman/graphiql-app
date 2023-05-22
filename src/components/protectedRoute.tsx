import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Loading from './loading';

interface ProtectedRouteProps {
  children: JSX.Element;
}
function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuth, loading } = useAuth();
  if (loading) {
    return <Loading />;
  }
  if (isAuth) {
    return children;
  }
  return <Navigate to="/sign-in" replace />;
}
export default ProtectedRoute;

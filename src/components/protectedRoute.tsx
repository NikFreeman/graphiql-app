import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: JSX.Element;
}
function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuth } = useAuth();
  if (isAuth) {
    return children;
  }
  return <Navigate to="/sign-in" replace />;
}
export default ProtectedRoute;

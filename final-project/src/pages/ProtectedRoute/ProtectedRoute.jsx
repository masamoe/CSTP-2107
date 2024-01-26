import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ requireAdmin, children }) {
  const { user, loading } = useAuth();
  if (!loading) {
    if (!user) {
      return <Navigate to={requireAdmin ? '/' : '/login'} />;
    }
    if (requireAdmin && !user.isAdmin) {
      return <Navigate to='/' />;
    }
    return children;
  }
}

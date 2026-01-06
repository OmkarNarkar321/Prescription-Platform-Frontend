import { Navigate } from 'react-router-dom'
import { isAuthenticated, getUserRole } from '../utils/auth'

function ProtectedRoute({ children, role }) {
  const authenticated = isAuthenticated()
  const userRole = getUserRole()

  if (!authenticated) {
    return <Navigate to="/" replace />
  }

  if (role && userRole !== role) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
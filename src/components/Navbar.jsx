import { Link } from 'react-router-dom'
import { isAuthenticated, getUserRole, logout } from '../utils/auth'
import { ROLES } from '../utils/constants'

function Navbar() {
  const authenticated = isAuthenticated()
  const role = getUserRole()

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-primary">
            MediScript
          </Link>
          
          <div className="flex items-center gap-6">
            {!authenticated ? (
              <>
                <Link to="/doctor/login" className="text-gray-700 hover:text-primary">
                  Doctor Login
                </Link>
                <Link to="/patient/login" className="text-gray-700 hover:text-primary">
                  Patient Login
                </Link>
                <Link to="/doctor/signup" className="btn-primary">
                  Join as Doctor
                </Link>
              </>
            ) : (
              <>
                {role === ROLES.DOCTOR && (
                  <Link to="/doctor/dashboard" className="text-gray-700 hover:text-primary">
                    Dashboard
                  </Link>
                )}
                
                {role === ROLES.PATIENT && (
                  <Link to="/patient/dashboard" className="text-gray-700 hover:text-primary">
                    Find Doctors
                  </Link>
                )}
                
                <button 
                  onClick={logout}
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
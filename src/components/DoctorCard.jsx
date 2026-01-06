import { useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../utils/constants'

function DoctorCard({ doctor }) {
  const navigate = useNavigate()

  const handleConsult = () => {
    navigate(`/consultation/${doctor._id}`)
  }

  return (
    <div className="card">
      <div className="flex items-start gap-4">
        <img 
          src={`${API_BASE_URL.replace('/api', '')}/uploads/profiles/${doctor.profilePicture}`}
          alt={doctor.name}
          className="w-20 h-20 rounded-full object-cover"
        />
        
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800">{doctor.name}</h3>
          <p className="text-primary font-medium">{doctor.specialty}</p>
          <p className="text-sm text-gray-600 mt-1">
            {doctor.yearsOfExperience} years of experience
          </p>
          
          <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {doctor.phoneNumber}
          </div>
          
          <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {doctor.email}
          </div>
        </div>
      </div>
      
      <button 
        onClick={handleConsult}
        className="w-full mt-4 btn-primary"
      >
        Consult Now
      </button>
    </div>
  )
}

export default DoctorCard
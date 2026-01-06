import { useState, useEffect } from 'react'
import { getAllDoctors } from '../services/api'
import DoctorCard from '../components/DoctorCard'
import Loader from '../components/Loader'

function PatientDashboard() {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchDoctors()
  }, [])

  const fetchDoctors = async () => {
    try {
      const response = await getAllDoctors()
      setDoctors(response.data.doctors)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load doctors')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loader />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Find a Doctor
      </h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {doctors.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No doctors available at the moment</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map(doctor => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      )}
    </div>
  )
}

export default PatientDashboard
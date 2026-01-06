import { useState, useEffect } from 'react'
import { getDoctorConsultations } from '../services/api'
import ConsultationCard from '../components/ConsultationCard'
import Loader from '../components/Loader'

function DoctorDashboard() {
  const [consultations, setConsultations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchConsultations()
  }, [])

  const fetchConsultations = async () => {
    try {
      const response = await getDoctorConsultations()
      setConsultations(response.data.consultations)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load consultations')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loader />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        My Consultations
      </h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {consultations.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No consultations yet</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {consultations.map(consultation => (
            <ConsultationCard key={consultation._id} consultation={consultation} />
          ))}
        </div>
      )}
    </div>
  )
}

export default DoctorDashboard
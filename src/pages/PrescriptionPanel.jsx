import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  getConsultationById,
  createPrescription,
  updatePrescription,
  generatePrescriptionPDF
} from '../services/api'
import Loader from '../components/Loader'

function PrescriptionPanel() {
  const { consultationId } = useParams()
  const navigate = useNavigate()

  const [consultation, setConsultation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    careToBeTaken: '',
    medicines: ''
  })

  // ✅ FIXED: fetchConsultation moved inside useEffect
  useEffect(() => {
    const fetchConsultation = async () => {
      try {
        const response = await getConsultationById(consultationId)
        const data = response.data.consultation
        setConsultation(data)

        if (data.prescription) {
          setFormData({
            careToBeTaken: data.prescription.careToBeTaken || '',
            medicines: data.prescription.medicines || ''
          })
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load consultation')
      } finally {
        setLoading(false)
      }
    }

    fetchConsultation()
  }, [consultationId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.careToBeTaken) {
      setError('Care to be taken is required')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      if (consultation.prescription) {
        await updatePrescription(consultationId, formData)
        alert('Prescription updated successfully!')
      } else {
        await createPrescription(consultationId, formData)
        alert('Prescription created successfully!')
      }

      // refresh data
      const response = await getConsultationById(consultationId)
      setConsultation(response.data.consultation)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save prescription')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDownloadPDF = async () => {
    try {
      const response = await generatePrescriptionPDF(consultationId)
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `prescription_${consultationId}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (err) {
      console.error(err)
      alert('Failed to generate PDF')
    }
  }

  if (loading) return <Loader />

  if (!consultation) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center text-red-600">
          Consultation not found
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <button
        onClick={() => navigate('/doctor/dashboard')}
        className="mb-6 text-primary hover:underline flex items-center gap-2"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Dashboard
      </button>

      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Prescription Panel
        </h2>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-gray-800 mb-4">
            Patient Information
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Name:</span>{' '}
              {consultation.patientId.name}
            </div>
            <div>
              <span className="font-medium">Age:</span>{' '}
              {consultation.patientId.age} years
            </div>
            <div>
              <span className="font-medium">Current Illness:</span>{' '}
              {consultation.currentIllness}
            </div>
            <div>
              <span className="font-medium">Diabetic:</span>{' '}
              {consultation.isDiabetic ? 'Yes' : 'No'}
            </div>
            {consultation.allergies && (
              <div className="md:col-span-2">
                <span className="font-medium">Allergies:</span>{' '}
                {consultation.allergies}
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="label">Care to be Taken *</label>
            <textarea
              name="careToBeTaken"
              value={formData.careToBeTaken}
              onChange={handleChange}
              className="input-field"
              rows="6"
              required
            />
          </div>

          <div>
            <label className="label">Medicines</label>
            <textarea
              name="medicines"
              value={formData.medicines}
              onChange={handleChange}
              className="input-field"
              rows="6"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 btn-primary disabled:opacity-50"
            >
              {submitting
                ? 'Saving...'
                : consultation.prescription
                ? 'Update Prescription'
                : 'Save Prescription'}
            </button>

            {consultation.prescription && (
              <button
                type="button"
                onClick={handleDownloadPDF}
                className="flex-1 btn-secondary"
              >
                Download PDF
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default PrescriptionPanel

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { patientSignup } from '../services/api'
import { setToken, setUser } from '../utils/auth'

function PatientSignup() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    age: '',
    historyOfSurgery: '',
    historyOfIllness: '',
    profilePicture: null
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, profilePicture: e.target.files[0] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const data = new FormData()
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key])
      })

      const response = await patientSignup(data)
      setToken(response.data.token)
      setUser(response.data.patient)
      navigate('/patient/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Patient Registration
          </h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="label">Profile Picture *</label>
              <input 
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="label">Full Name *</label>
              <input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="label">Email *</label>
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="label">Password *</label>
              <input 
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-field"
                minLength={6}
                required
              />
            </div>

            <div>
              <label className="label">Phone Number *</label>
              <input 
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="label">Age *</label>
              <input 
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="input-field"
                min="1"
                max="120"
                required
              />
            </div>

            <div>
              <label className="label">History of Surgery</label>
              <textarea 
                name="historyOfSurgery"
                value={formData.historyOfSurgery}
                onChange={handleChange}
                className="input-field"
                rows="3"
                placeholder="Describe any previous surgeries"
              />
            </div>

            <div>
              <label className="label">History of Illness</label>
              <input 
                type="text"
                name="historyOfIllness"
                value={formData.historyOfIllness}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., Hypertension, Asthma, Diabetes (comma-separated)"
              />
              <p className="text-sm text-gray-500 mt-1">
                Separate multiple conditions with commas
              </p>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{' '}
            <Link to="/patient/login" className="text-primary font-medium hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default PatientSignup
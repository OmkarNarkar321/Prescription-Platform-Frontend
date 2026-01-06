import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { createConsultation } from '../services/api'

function ConsultationForm() {
  const { doctorId } = useParams()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    currentIllness: '',
    recentSurgery: '',
    surgeryTimeSpan: '',
    isDiabetic: false,
    allergies: '',
    others: '',
    transactionId: '',
    consent: false
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleNext = () => {
    if (step === 1 && !formData.currentIllness) {
      setError('Please describe your current illness')
      return
    }
    setError('')
    setStep(step + 1)
  }

  const handleBack = () => {
    setError('')
    setStep(step - 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.transactionId) {
      setError('Please enter transaction ID')
      return
    }

    if (!formData.consent) {
      setError('Please accept the consent for online consultation')
      return
    }

    setLoading(true)
    setError('')

    try {
      await createConsultation({
        doctorId,
        ...formData
      })
      alert('Consultation booked successfully! Doctor will review and prescribe.')
      navigate('/patient/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit consultation')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              {[1, 2, 3].map(num => (
                <div key={num} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= num ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {num}
                  </div>
                  {num < 3 && <div className={`w-24 h-1 ${step > num ? 'bg-primary' : 'bg-gray-200'}`} />}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Medical History</span>
              <span>Health Status</span>
              <span>Payment</span>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Step 1: Medical History
                </h3>

                <div>
                  <label className="label">Current Illness *</label>
                  <textarea 
                    name="currentIllness"
                    value={formData.currentIllness}
                    onChange={handleChange}
                    className="input-field"
                    rows="4"
                    placeholder="Describe your symptoms and current health concerns"
                    required
                  />
                </div>

                <div>
                  <label className="label">Recent Surgery</label>
                  <textarea 
                    name="recentSurgery"
                    value={formData.recentSurgery}
                    onChange={handleChange}
                    className="input-field"
                    rows="3"
                    placeholder="Details of any recent surgical procedures"
                  />
                </div>

                <div>
                  <label className="label">Surgery Time Span</label>
                  <input 
                    type="text"
                    name="surgeryTimeSpan"
                    value={formData.surgeryTimeSpan}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="e.g., 3 months ago, 1 year ago"
                  />
                </div>

                <button type="button" onClick={handleNext} className="w-full btn-primary">
                  Next Step
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Step 2: Health Status
                </h3>

                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox"
                      name="isDiabetic"
                      checked={formData.isDiabetic}
                      onChange={handleChange}
                      className="w-5 h-5 text-primary"
                    />
                    <span className="text-gray-700 font-medium">I am Diabetic</span>
                  </label>
                </div>

                <div>
                  <label className="label">Allergies</label>
                  <textarea 
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleChange}
                    className="input-field"
                    rows="3"
                    placeholder="List any known allergies to medications, foods, etc."
                  />
                </div>

                <div>
                  <label className="label">Other Medical Conditions</label>
                  <textarea 
                    name="others"
                    value={formData.others}
                    onChange={handleChange}
                    className="input-field"
                    rows="3"
                    placeholder="Any other relevant medical information"
                  />
                </div>

                <div className="flex gap-4">
                  <button type="button" onClick={handleBack} className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Back
                  </button>
                  <button type="button" onClick={handleNext} className="flex-1 btn-primary">
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Step 3: Payment Confirmation
                </h3>

                <div className="card bg-blue-50 border border-blue-200">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Scan and Pay using UPI App
                      </h4>
                      <div className="bg-red-500 w-40 h-40 flex items-center justify-center text-white text-sm mb-4">
                        QR CODE
                      </div>
                      <p className="text-sm text-gray-600">
                        or<br/>
                        UPI ID: <span className="font-mono text-red-600">xxxxxxxxxxxxxx</span>
                      </p>
                    </div>

                    <div className="flex-1">
                      <p className="text-gray-700 mb-2">Pay Using Any App</p>
                      <p className="text-3xl font-bold text-gray-800 mb-2">₹ 600</p>
                      <p className="text-sm text-gray-600 mb-4">(After Payment)</p>
                      
                      <label className="label">Enter Transaction ID *</label>
                      <input 
                        type="text"
                        name="transactionId"
                        value={formData.transactionId}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Enter transaction ID"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    CONSENT FOR ONLINE CONSULTATION
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    I have understood that this is an online consultation without a physical checkup of my symptoms. 
                    The doctor hence relies on my description of the problem or scanned reports provided by me. 
                    With this understanding, I hereby give my consent for online consultation.
                  </p>
                  
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input 
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      className="w-5 h-5 text-primary mt-1"
                      required
                    />
                    <span className="text-gray-700 font-medium">YES, I ACCEPT</span>
                  </label>
                </div>

                <div className="flex gap-4">
                  <button type="button" onClick={handleBack} className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Back
                  </button>
                  <button 
                    type="submit"
                    disabled={loading}
                    className="flex-1 btn-secondary disabled:opacity-50"
                  >
                    {loading ? 'Submitting...' : 'Submit Appointment'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default ConsultationForm
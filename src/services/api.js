import axios from 'axios'
import { API_BASE_URL } from '../utils/constants'
import { getToken } from '../utils/auth'

// Create axios instance - baseURL should NOT have trailing slash
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000,
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // Debug logs
    console.log('📤 API Request:', {
      method: config.method.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      fullURL: config.baseURL + config.url
    })
    
    return config
  },
  (error) => {
    console.error('❌ Request Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    })
    return response
  },
  (error) => {
    console.error('❌ API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      statusText: error.response?.statusText,
      message: error.response?.data?.message || error.message,
      fullError: error.response?.data
    })
    
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/'
    }
    
    return Promise.reject(error)
  }
)

// Auth APIs
export const doctorSignup = (formData) => 
  api.post('/auth/doctor/signup', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })

export const doctorLogin = (data) => 
  api.post('/auth/doctor/login', data)

export const patientSignup = (formData) => 
  api.post('/auth/patient/signup', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })

export const patientLogin = (data) => 
  api.post('/auth/patient/login', data)

// Patient APIs
export const getAllDoctors = () => 
  api.get('/patients/doctors')

// Consultation APIs
export const createConsultation = (data) => 
  api.post('/consultations', data)

export const getPatientConsultations = () => 
  api.get('/consultations/patient')

export const getDoctorConsultations = () => 
  api.get('/consultations/doctor')

export const getConsultationById = (id) => 
  api.get(`/consultations/${id}`)

// Prescription APIs
export const createPrescription = (consultationId, data) => 
  api.post(`/prescriptions/${consultationId}`, data)

export const updatePrescription = (consultationId, data) => 
  api.put(`/prescriptions/${consultationId}`, data)

export const generatePrescriptionPDF = (consultationId) => 
  api.get(`/prescriptions/${consultationId}/pdf`, { responseType: 'blob' })

export default api
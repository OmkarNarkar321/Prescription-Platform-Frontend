import axios from 'axios'
import { API_BASE_URL } from '../utils/constants'
import { getToken } from '../utils/auth'

// Create axios instance with /api base path
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000, // 30 second timeout
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    console.log('API Request:', config.method.toUpperCase(), config.url)
    return config
  },
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url)
    return response
  },
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.message || error.message
    })
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/'
    }
    
    return Promise.reject(error)
  }
)

// Auth APIs
export const doctorSignup = (formData) => api.post('/auth/doctor/signup', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
})

export const doctorLogin = (data) => api.post('/auth/doctor/login', data)

export const patientSignup = (formData) => api.post('/auth/patient/signup', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
})

export const patientLogin = (data) => api.post('/auth/patient/login', data)

// Patient APIs
export const getAllDoctors = () => api.get('/patients/doctors')

// Consultation APIs
export const createConsultation = (data) => api.post('/consultations', data)

export const getPatientConsultations = () => api.get('/consultations/patient')

export const getDoctorConsultations = () => api.get('/consultations/doctor')

export const getConsultationById = (id) => api.get(`/consultations/${id}`)

// Prescription APIs
export const createPrescription = (consultationId, data) => 
  api.post(`/prescriptions/${consultationId}`, data)

export const updatePrescription = (consultationId, data) => 
  api.put(`/prescriptions/${consultationId}`, data)

export const generatePrescriptionPDF = (consultationId) => 
  api.get(`/prescriptions/${consultationId}/pdf`, { responseType: 'blob' })

export default api
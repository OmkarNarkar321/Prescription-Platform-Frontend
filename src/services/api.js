import axios from 'axios'
import { API_BASE_URL } from '../utils/constants'
import { getToken } from '../utils/auth'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

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
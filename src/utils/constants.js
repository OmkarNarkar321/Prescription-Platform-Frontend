// ⚠️ CRITICAL FIX: Removed /api from here since it's already in api.js baseURL
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const ROLES = {
  DOCTOR: 'DOCTOR',
  PATIENT: 'PATIENT'
}

export const SPECIALTIES = [
  'General Physician',
  'Cardiologist',
  'Dermatologist',
  'Pediatrician',
  'Orthopedic',
  'Neurologist',
  'Gynecologist',
  'Psychiatrist',
  'ENT Specialist',
  'Ophthalmologist'
]
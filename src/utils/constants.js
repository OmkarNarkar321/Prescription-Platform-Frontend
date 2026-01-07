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

// Debug logs (remove after testing)
if (typeof window !== 'undefined') {
  console.log('🔍 API_BASE_URL:', API_BASE_URL)
  console.log('🔍 VITE_API_URL:', import.meta.env.VITE_API_URL)
  console.log('🔍 Mode:', import.meta.env.MODE)
}
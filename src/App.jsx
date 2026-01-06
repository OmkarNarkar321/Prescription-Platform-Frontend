import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import DoctorSignup from './pages/DoctorSignup'
import DoctorLogin from './pages/DoctorLogin'
import PatientSignup from './pages/PatientSignup'
import PatientLogin from './pages/PatientLogin'
import PatientDashboard from './pages/PatientDashboard'
import ConsultationForm from './pages/ConsultationForm'
import DoctorDashboard from './pages/DoctorDashboard'
import PrescriptionPanel from './pages/PrescriptionPanel'

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctor/signup" element={<DoctorSignup />} />
        <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route path="/patient/signup" element={<PatientSignup />} />
        <Route path="/patient/login" element={<PatientLogin />} />
        
        <Route path="/patient/dashboard" element={
          <ProtectedRoute role="PATIENT">
            <PatientDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/consultation/:doctorId" element={
          <ProtectedRoute role="PATIENT">
            <ConsultationForm />
          </ProtectedRoute>
        } />
        
        <Route path="/doctor/dashboard" element={
          <ProtectedRoute role="DOCTOR">
            <DoctorDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/prescription/:consultationId" element={
          <ProtectedRoute role="DOCTOR">
            <PrescriptionPanel />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  )
}

export default App
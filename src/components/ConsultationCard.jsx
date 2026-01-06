import { useNavigate } from 'react-router-dom'

function ConsultationCard({ consultation }) {
  const navigate = useNavigate()

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {consultation.patientId.name}
          </h3>
          <p className="text-sm text-gray-600">
            Age: {consultation.patientId.age} years
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(consultation.status)}`}>
          {consultation.status}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="text-sm">
          <span className="font-medium text-gray-700">Current Illness:</span>
          <p className="text-gray-600 mt-1">{consultation.currentIllness}</p>
        </div>
        
        {consultation.recentSurgery && (
          <div className="text-sm">
            <span className="font-medium text-gray-700">Recent Surgery:</span>
            <p className="text-gray-600 mt-1">
              {consultation.recentSurgery} ({consultation.surgeryTimeSpan})
            </p>
          </div>
        )}
        
        <div className="text-sm">
          <span className="font-medium text-gray-700">Medical Status:</span>
          <p className="text-gray-600 mt-1">
            {consultation.isDiabetic ? 'Diabetic' : 'Non-Diabetic'}
          </p>
        </div>
        
        {consultation.allergies && (
          <div className="text-sm">
            <span className="font-medium text-gray-700">Allergies:</span>
            <p className="text-gray-600 mt-1">{consultation.allergies}</p>
          </div>
        )}
      </div>

      <div className="text-xs text-gray-500 mb-3">
        Transaction ID: {consultation.transactionId}
      </div>

      <button 
        onClick={() => navigate(`/prescription/${consultation._id}`)}
        className="w-full btn-primary"
      >
        {consultation.status === 'pending' ? 'Write Prescription' : 'View Prescription'}
      </button>
    </div>
  )
}

export default ConsultationCard
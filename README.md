**📘 Frontend – Online Prescription Platform**
🩺 Project Overview

This is the frontend application for the Online Prescription Platform, built using React.js (Vite) and Tailwind CSS.
It provides a clean, responsive, and role-based UI for Doctors and Patients to manage consultations and prescriptions.

🚀 Tech Stack

React.js (Vite)
Tailwind CSS (PostCSS configured)
React Router DOM
Axios
JWT-based Authentication
Responsive Medical UI

📁 Folder Structure
frontend/
├─ index.html
├─ vite.config.js
├─ tailwind.config.js
├─ postcss.config.js
├─ package.json
└─ src/
   ├─ main.jsx          # App entry point
   ├─ App.jsx           # Routes wrapper
   ├─ index.css         # Tailwind imports
   ├─ assets/           # Images & icons
   ├─ components/       # Reusable UI components
   ├─ pages/            # Page-level screens
   ├─ routes/           # Protected routes
   ├─ services/         # Axios API services
   └─ utils/            # Helpers & constants

🔐 Authentication & Roles

Doctor
Patient
JWT stored securely on login
Role-based route protection

🌐 Frontend Routes / Pages
🔑 Authentication
Route	Description
/doctor/signup	Doctor registration
/doctor/login	Doctor login
/patient/signup	Patient registration
/patient/login	Patient login
👨‍⚕️ Doctor
Route	Description
/doctor/dashboard	View consultations
/doctor/prescription/:id	Write & generate prescription PDF
🧑‍🦱 Patient
Route	Description
/patient/dashboard	Doctors list
/consult/:doctorId	Multi-step consultation form
💳 Consultation Flow

Select Doctor
Multi-step medical form
QR-based payment
Submit consultation
Doctor generates prescription PDF

⚙️ Environment Variables

Create .env in /frontend:
VITE_API_BASE_URL=http://localhost:5000/api

▶️ Setup Instructions
cd frontend
npm install
npm run dev

📱 UI Highlights

Soft medical color palette
Fully responsive design
Tailwind utility-only styling
Reusable components
No external UI libraries

✅ Production Ready

API base URL configured
Secure JWT handling
Modular and scalable architecture

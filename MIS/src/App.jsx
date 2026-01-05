import { AuthProvider, useAuth } from './context/AuthContext'
import { LoginPage } from './components/LoginPage'
import { Dashboard } from './components/Dashboard'
import './App.css'

function AppContent() {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? <Dashboard /> : <LoginPage />
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App

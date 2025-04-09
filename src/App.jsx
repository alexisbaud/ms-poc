import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from './features/auth/authSlice'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Style from './pages/Style'
import AuthRoutes from './pages/auth'
import Profile from './pages/Profile'
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  return (
    <Router>
      <Routes>
        {/* Routes protégées - accessibles uniquement si authentifié */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/auth" replace />
            )
          } 
        />
        
        {/* Page Home */}
        <Route 
          path="/home" 
          element={
            isAuthenticated ? (
              <Home />
            ) : (
              <Navigate to="/auth" replace />
            )
          } 
        />
        
        {/* Page Profil */}
        <Route 
          path="/profile" 
          element={
            isAuthenticated ? (
              <Profile />
            ) : (
              <Navigate to="/auth" replace />
            )
          } 
        />
        
        {/* Route du Design System */}
        <Route path="/ds" element={<Style />} />
        
        {/* Routes d'authentification */}
        <Route path="/auth/*" element={<AuthRoutes />} />
        
        {/* Redirection par défaut */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App

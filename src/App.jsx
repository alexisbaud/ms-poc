import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from './features/auth/authSlice'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Style from './pages/Style'
import AuthRoutes from './pages/auth'

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
              <div className="home-page">
                <div>
                  <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                  </a>
                  <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                  </a>
                </div>
                <h1>Microstory - Page d'accueil</h1>
                <div className="card">
                  <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                  </button>
                  <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                  </p>
                  <p>
                    <Link to="/ds">Voir le Design System</Link>
                  </p>
                </div>
                <p className="read-the-docs">
                  Bienvenue sur Microstory!
                </p>
              </div>
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

import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from './features/auth/authSlice'
import './App.css'

// Pages
import Style from './pages/Style'
import AuthRoutes from './pages/Auth'
import Profile from './pages/Profile'
import HomePage from './pages/HomePage'
import PostDetailPage from './pages/PostDetailPage'
import { WritePostPage, CustomizePostPage, CreatePostProvider } from './pages/Create'

function App() {
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
        
        {/* Page Home avec le fil d'actualité */}
        <Route 
          path="/home" 
          element={
            isAuthenticated ? (
              <HomePage />
            ) : (
              <Navigate to="/auth" replace />
            )
          } 
        />
        
        {/* Pages Création de post */}
        <Route
          path="/create"
          element={
            isAuthenticated ? (
              <CreatePostProvider>
                <WritePostPage />
              </CreatePostProvider>
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
        
        <Route
          path="/create/customize"
          element={
            isAuthenticated ? (
              <CreatePostProvider>
                <CustomizePostPage />
              </CreatePostProvider>
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
        
        {/* Page Détail d'un post */}
        <Route 
          path="/post/:id" 
          element={
            isAuthenticated ? (
              <PostDetailPage />
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

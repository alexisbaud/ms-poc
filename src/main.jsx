import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './store.js'
import './index.css'
import App from './App.jsx'
import Logger from './logger'

// Initialiser le logger pour capturer toutes les erreurs
Logger.init()

// Ajouter une gestion des erreurs non capturées au niveau global
window.addEventListener('error', (event) => {
  console.error('Erreur globale non capturée:', event.error?.message || event.message)
  console.error('Source:', event.filename)
  console.error('Ligne:', event.lineno, 'Colonne:', event.colno)
  
  // Stocker les détails de l'erreur pour débogage
  localStorage.setItem('lastFatalError', JSON.stringify({
    timestamp: new Date().toISOString(),
    message: event.error?.message || event.message,
    file: event.filename,
    line: event.lineno,
    column: event.colno,
    stack: event.error?.stack,
    type: event.error?.name || 'Error'
  }))
})

// Journaliser la configuration de l'environnement
console.log('🔍 Environnement:', import.meta.env.MODE)
console.log('🔍 API URL:', import.meta.env.VITE_API_URL)
console.log('🔍 URL origine actuelle:', window.location.origin)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)

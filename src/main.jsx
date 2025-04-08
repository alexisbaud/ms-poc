import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initFocusVisible } from './utils/focusVisible'

// Composant d'initialisation - initialise le focus visible lors du montage
function AppWithFocusVisible() {
  useEffect(() => {
    // Initialiser la détection du focus au clavier
    initFocusVisible();
  }, []);

  return <App />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWithFocusVisible />
  </StrictMode>,
)

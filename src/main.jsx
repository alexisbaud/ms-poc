import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './features/store'
import './index.css'
import App from './App.jsx'
import { initFocusVisible } from './utils/focusVisible'
import Logger from './logger'

// Importer et initialiser le logger en premier
Logger.init()

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
    <Provider store={store}>
      <AppWithFocusVisible />
    </Provider>
  </StrictMode>,
)

import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './features/store'
import './index.css'
import App from './App.jsx'
import { initFocusVisible } from './utils/focusVisible'
import Logger from './logger'
import * as debugHelper from './utils/debugHelper'

// Importer et initialiser le logger en premier
Logger.init()

// Journaliser les informations d'environnement au démarrage
console.info('====== INFORMATIONS DE DÉMARRAGE ======')
debugHelper.logEnvironmentInfo()
debugHelper.debugAuthState()

// Vérifier l'état du serveur Render (veille/activité)
debugHelper.testRenderWakeup()
  .then(result => {
    console.info('[STARTUP] Test de réveil Render:', 
      result.success ? 'OK' : 'ÉCHEC',
      result.success ? `Temps de réponse: ${result.wakeupTime.toFixed(0)}ms` : '',
      result.success && result.wasAsleep ? '⚠️ Serveur probablement en cours de réveil' : ''
    );
  })
  .catch(err => {
    console.error('[STARTUP] Erreur lors du test de réveil Render:', err.message)
  });

// Tester la connexion API au démarrage
debugHelper.testApiConnection()
  .then(result => {
    if (result.success) {
      console.info('[STARTUP] Connexion API réussie:', `${result.status} (${result.responseTime.toFixed(0)}ms)`);
    } else {
      console.error('[STARTUP] Échec connexion API:', result.error);
      // Si le test échoue, essayer de diagnostiquer le problème réseau
      console.info('[STARTUP] Lancement du diagnostic réseau complet...');
      
      // Tester la connectivité aux services essentiels
      Promise.all([
        fetch('https://www.google.com', { mode: 'no-cors' }).catch(e => ({ error: e })),
        fetch('https://vercel.com', { mode: 'no-cors' }).catch(e => ({ error: e })),
        fetch('https://render.com', { mode: 'no-cors' }).catch(e => ({ error: e }))
      ]).then(results => {
        const connectivity = {
          google: !results[0].error,
          vercel: !results[1].error,
          render: !results[2].error
        };
        
        console.info('[NETWORK DIAGNOSTIC] Connectivité générale:', 
          'Google:', connectivity.google ? '✓' : '✗',
          'Vercel:', connectivity.vercel ? '✓' : '✗',
          'Render:', connectivity.render ? '✓' : '✗'
        );
        
        if (connectivity.google && connectivity.vercel && !connectivity.render) {
          console.warn('[DIAGNOSTIC] Problème spécifique avec Render - Vérifiez le statut du service');
        }
      });
    }
  })
  .catch(err => {
    console.error('[STARTUP] Erreur lors du test API:', err.message)
  });

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

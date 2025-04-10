/**
 * Utilitaire de débogage pour tracer les opérations importantes
 */

// Fonction pour afficher l'environnement actuel
export const logEnvironmentInfo = () => {
  console.info(
    '[ENV INFO]',
    'API URL:',
    import.meta.env.VITE_API_URL || 'non définie',
    'Mode:',
    import.meta.env.MODE,
    'Navigator:',
    navigator.userAgent
  );
  
  // Informations de connectivité réseau
  if (navigator.connection) {
    console.info(
      '[NETWORK INFO]',
      'Type:', navigator.connection.effectiveType,
      'Downlink:', navigator.connection.downlink, 'Mbps',
      'RTT:', navigator.connection.rtt, 'ms',
      'Save-Data:', navigator.connection.saveData ? 'Activé' : 'Désactivé'
    );
  }
  
  // Vérifier le service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      console.info('[SERVICE WORKER] Nombre de SW actifs:', registrations.length);
    });
  }
};

// Fonction pour tester la connexion API avec détails avancés
export const testApiConnection = async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
    console.info('[API TEST] Tentative de connexion à l\'API:', apiUrl);
    
    // Enregistrer le temps de départ
    const startTime = performance.now();
    
    // Ajouter un paramètre pour éviter le cache
    const testUrl = `${apiUrl}?_=${Date.now()}`;
    console.info('[API TEST] URL complète:', testUrl);
    
    // Test avec timeout manuellement limité à 5 secondes pour diagnostiquer les temps de réponse
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    try {
      const response = await fetch(testUrl, { 
        signal: controller.signal,
        headers: { 'Cache-Control': 'no-cache' }
      });
      
      // Calculer le temps de réponse
      const responseTime = performance.now() - startTime;
      
      clearTimeout(timeoutId);
      
      console.info(
        '[API TEST] Résultat:',
        'Status:', response.status,
        'OK:', response.ok,
        'Temps:', responseTime.toFixed(0), 'ms'
      );
      
      // Tester aussi avec pingdom (sans attendre le résultat)
      fetch(`https://tools.pingdom.com/ping/?pingUrl=${encodeURIComponent(apiUrl)}&pingCommand=ping`)
        .then(() => console.info('[API TEST] Test Pingdom lancé'))
        .catch(err => console.error('[API TEST] Erreur Pingdom:', err.message));
      
      return { success: response.ok, status: response.status, responseTime };
    } catch (abortError) {
      clearTimeout(timeoutId);
      if (abortError.name === 'AbortError') {
        console.error('[API TEST] Délai d\'attente de 5 secondes dépassé (pré-timeout)');
        throw new Error('Test timeout (5s)');
      }
      throw abortError;
    }
  } catch (error) {
    console.error('[API TEST] Erreur de connexion:', error.message);
    console.error('[API TEST] Type d\'erreur:', error.name);
    console.error('[API TEST] Stack trace:', error.stack);
    
    // Test d'autres domaines pour vérifier si le réseau fonctionne globalement
    try {
      console.info('[NETWORK TEST] Test de connectivité générale...');
      const googleTest = await fetch('https://www.google.com', { mode: 'no-cors' });
      console.info('[NETWORK TEST] Google accessible');
    } catch (netError) {
      console.error('[NETWORK TEST] Problème de connexion internet général:', netError.message);
    }
    
    return { success: false, error: error.message };
  }
};

// Fonction pour tester spécifiquement si Render est en veille
export const testRenderWakeup = async () => {
  console.info('[RENDER TEST] Tentative de réveil du serveur Render...');
  try {
    const serverUrl = (import.meta.env.VITE_API_URL || 'http://localhost:3000/api').replace(/\/api$/, '');
    
    // Mesure du temps de démarrage
    const startTime = performance.now();
    const response = await fetch(`${serverUrl}?wakeup=true&_=${Date.now()}`, {
      headers: { 'Cache-Control': 'no-cache' }
    });
    const wakeupTime = performance.now() - startTime;
    
    console.info(
      '[RENDER TEST] Réponse réveil:',
      'Status:', response.status,
      'Temps:', wakeupTime.toFixed(0), 'ms',
      'Réponse rapide:', wakeupTime < 2000 ? 'Oui (déjà éveillé)' : 'Non (probablement en cours de démarrage)'
    );
    
    return { 
      success: response.ok, 
      status: response.status, 
      wakeupTime,
      wasAsleep: wakeupTime > 2000
    };
  } catch (error) {
    console.error('[RENDER TEST] Erreur lors du réveil:', error.message);
    return { success: false, error: error.message };
  }
};

// Fonction pour déboguer les problèmes d'authentification
export const debugAuthState = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  
  console.info(
    '[AUTH DEBUG]',
    'Token présent:', !!token,
    'User présent:', !!user,
    'Token format:', token ? `${token.substring(0, 15)}...` : 'null'
  );
  
  if (token) {
    try {
      // Vérifie si le token est au format JWT (sans validation complète)
      const parts = token.split('.');
      console.info('[JWT DEBUG] Nombre de segments JWT:', parts.length);
      
      if (parts.length === 3) {
        try {
          // Tente de décoder l'en-tête et la charge utile
          const header = JSON.parse(atob(parts[0]));
          console.info('[JWT DEBUG] En-tête:', header);
          
          const payload = JSON.parse(atob(parts[1]));
          const expiration = payload.exp ? new Date(payload.exp * 1000) : null;
          const now = new Date();
          
          console.info(
            '[JWT DEBUG] Payload:',
            'ID utilisateur:', payload.id || payload.userId || payload.sub || 'non trouvé',
            'Expiration:', expiration ? expiration.toISOString() : 'non définie',
            'Expiré:', expiration && expiration < now ? 'Oui' : 'Non',
            'Temps restant:', expiration ? ((expiration - now) / 1000 / 60).toFixed(1) + ' minutes' : 'inconnu'
          );
        } catch (e) {
          console.error('[JWT DEBUG] Erreur lors du décodage JWT:', e.message);
        }
      }
    } catch (e) {
      console.error('[JWT DEBUG] Erreur lors de l\'analyse du token:', e.message);
    }
  }
};

export default {
  logEnvironmentInfo,
  testApiConnection,
  testRenderWakeup,
  debugAuthState
};

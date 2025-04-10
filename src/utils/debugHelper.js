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
};

// Fonction pour tester la connexion API
export const testApiConnection = async () => {
  try {
    console.info('[API TEST] Tentative de connexion à l\'API...');
    
    // Essaie de faire une requête simple pour vérifier la connectivité
    const response = await fetch(import.meta.env.VITE_API_URL || 'http://localhost:3000/api');
    
    console.info(
      '[API TEST] Résultat:',
      'Status:', response.status,
      'OK:', response.ok
    );
    
    return response.ok;
  } catch (error) {
    console.error('[API TEST] Erreur de connexion:', error.message);
    return false;
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
        } catch (e) {
          console.error('[JWT DEBUG] Erreur lors du décodage de l\'en-tête JWT:', e.message);
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
  debugAuthState
};

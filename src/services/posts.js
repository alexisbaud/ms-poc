import api from './api';

/**
 * Service pour gérer les posts via l'API
 */
const PostsService = {
  /**
   * Récupère la liste des posts pour le fil d'actualité
   * @param {number} page - Page à récupérer
   * @param {number} limit - Nombre de posts par page
   * @returns {Promise} Promesse avec les posts
   */
  getPosts: async (page = 1, limit = 10) => {
    try {
      const response = await api.get('/posts', {
        params: { page, limit }
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Récupère un post spécifique par son ID
   * @param {string|number} id - ID du post
   * @returns {Promise} Promesse avec le post
   */
  getPostById: async (id) => {
    try {
      const response = await api.get(`/posts/${id}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Récupère les posts de l'utilisateur connecté
   * @returns {Promise} Promesse avec les posts de l'utilisateur
   */
  getUserPosts: async () => {
    try {
      const response = await api.get('/posts/user/me');
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Crée un nouveau post
   * @param {Object} postData - Données du post à créer
   * @returns {Promise} Promesse avec le post créé
   */
  createPost: async (postData) => {
    console.log('🔍 DEBUG - Début de createPost avec les données:', JSON.stringify(postData, null, 2));
    
    // S'assurer que les hashtags sont au bon format avant l'envoi
    let formattedPostData = { ...postData };
    
    // Traitement simplifié des hashtags - ne prendre que le premier hashtag
    let singleHashtag = null;
    
    if (formattedPostData.hashtags) {
      if (Array.isArray(formattedPostData.hashtags) && formattedPostData.hashtags.length > 0) {
        // Prendre juste le premier élément du tableau
        singleHashtag = formattedPostData.hashtags[0].toString();
        console.log('🔍 DEBUG - Extrait le premier hashtag du tableau:', singleHashtag);
      } else if (typeof formattedPostData.hashtags === 'string') {
        // Si c'est déjà une chaîne, on la prend directement
        singleHashtag = formattedPostData.hashtags;
        console.log('🔍 DEBUG - Utilisation directe du hashtag chaîne:', singleHashtag);
      } else {
        // Pour tout autre type, conversion en chaîne
        singleHashtag = String(formattedPostData.hashtags);
        console.log('🔍 DEBUG - Conversion en chaîne du hashtag:', singleHashtag);
      }
      
      // S'assurer que le hashtag commence par #
      if (singleHashtag && !singleHashtag.startsWith('#')) {
        singleHashtag = '#' + singleHashtag;
      }
    }
    
    console.log('🔍 DEBUG - Hashtag final:', singleHashtag);
    
    // Remplacer le tableau par un hashtag simple
    formattedPostData.hashtags = singleHashtag;
    
    try {
      // Vérification détaillée du token
      const token = localStorage.getItem('token');
      console.log('🔍 DEBUG - Token présent:', !!token);
      
      // Vérifications supplémentaires
      if (!token) {
        console.log('🔍 DEBUG - Pas de token, erreur d\'authentification');
        throw new Error('Authentication required. Please login to create a post.');
      }
      
      console.log('🔍 DEBUG - Données formatées avant envoi:', JSON.stringify(formattedPostData, null, 2));
      const response = await api.post('/posts', formattedPostData);
      console.log('🔍 DEBUG - Réponse reçue:', response.status);
      return response.data.data;
    } catch (error) {
      console.log('🔍 DEBUG - Erreur capturée:', error.message);
      if (error.response) {
        console.log('🔍 DEBUG - Status de l\'erreur:', error.response.status);
        console.log('🔍 DEBUG - Données d\'erreur:', JSON.stringify(error.response.data, null, 2));
        
        // Analyse détaillée des erreurs 401
        if (error.response.status === 401) {
          // Vérification du token actuel
          const currentToken = localStorage.getItem('token');
          console.log('🔍 DEBUG - Erreur 401, token présent:', !!currentToken);
          
          // Stocker l'erreur pour référence
          localStorage.setItem('lastPostError', JSON.stringify({
            timestamp: new Date().toISOString(),
            tokenPresent: !!currentToken,
            errorData: error.response.data
          }));
          
          throw new Error('Authentication required. Please login to create a post.');
        } else if (error.response.status === 500) {
          console.log('🔍 DEBUG - Erreur 500 serveur');
          throw new Error('Erreur serveur. Veuillez réessayer plus tard.');
        } else {
          throw new Error(error.response.data.message || 'Failed to create post. Please try again.');
        }
      } else {
        console.log('🔍 DEBUG - Erreur réseau sans réponse du serveur');
        throw new Error('Network error or server not responding. Please try again.');
      }
    }
  },

  /**
   * Met à jour un post existant
   * @param {string|number} id - ID du post
   * @param {Object} postData - Nouvelles données du post
   * @returns {Promise} Promesse avec le post mis à jour
   */
  updatePost: async (id, postData) => {
    try {
      // Cloner les données pour éviter de modifier l'original
      const formattedPostData = { ...postData };
      
      // Traiter le hashtag de la même façon que pour createPost
      if (formattedPostData.hashtags) {
        let singleHashtag = null;
        
        if (Array.isArray(formattedPostData.hashtags) && formattedPostData.hashtags.length > 0) {
          // Prendre juste le premier élément du tableau
          singleHashtag = formattedPostData.hashtags[0].toString();
        } else if (typeof formattedPostData.hashtags === 'string') {
          // Si c'est déjà une chaîne, on la prend directement
          singleHashtag = formattedPostData.hashtags;
        } else {
          // Pour tout autre type, conversion en chaîne
          singleHashtag = String(formattedPostData.hashtags);
        }
        
        // S'assurer que le hashtag commence par #
        if (singleHashtag && !singleHashtag.startsWith('#')) {
          singleHashtag = '#' + singleHashtag;
        }
        
        // Remplacer par le hashtag unique
        formattedPostData.hashtags = singleHashtag;
      }
      
      const response = await api.put(`/posts/${id}`, formattedPostData);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Supprime un post
   * @param {string|number} id - ID du post à supprimer
   * @returns {Promise} Promesse avec le résultat de la suppression
   */
  deletePost: async (id) => {
    try {
      const response = await api.delete(`/posts/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Recherche des posts par mot-clé ou hashtag
   * @param {string} query - Terme de recherche
   * @returns {Promise} Promesse avec les résultats de recherche
   */
  searchPosts: async (query) => {
    try {
      const response = await api.get('/posts/search', {
        params: { query }
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Demande des suggestions de hashtags basées sur le contenu
   * @param {string} text - Texte du post
   * @returns {Promise} Promesse avec les hashtags suggérés
   */
  getHashtagSuggestions: async (text) => {
    // En attendant l'implémentation des routes API, retourne un tableau vide
    return [];
  },

  /**
   * Demande des suggestions d'instructions TTS basées sur le contenu
   * @param {string} text - Texte du post
   * @returns {Promise} Promesse avec les instructions TTS suggérées
   */
  getTtsSuggestions: async (text) => {
    // En attendant l'implémentation des routes API, retourne une chaîne vide
    return '';
  },

  /**
   * Génère un fichier audio pour un post
   * @param {string|number} id - ID du post
   * @param {string} content - Contenu du post à convertir en audio
   * @returns {Promise} Promesse avec l'URL du fichier audio généré
   */
  generateAudio: async (id, content) => {
    try {
      // Supprimer le préfixe /api car il est déjà inclus dans baseURL
      const response = await api.post('generate-audio', {
        id,
        content
      });
      
      if (response.data.success) {
        // Créer l'URL correcte pour l'audio
        // Extraire la base URL sans le chemin /api
        const serverBaseUrl = api.defaults.baseURL.replace(/\/api$/, '');
        // Combiner avec le chemin du fichier audio
        const audioUrl = `${serverBaseUrl}/${response.data.file}`;
        
        console.log('URL audio générée:', audioUrl);
        
        // Mettre à jour automatiquement l'URL audio du post
        await PostsService.updatePostAudio(id, audioUrl);
        
        return {
          success: true,
          audioUrl
        };
      } else {
        return {
          success: false,
          message: response.data.message || 'Échec de la génération audio'
        };
      }
    } catch (error) {
      console.error('Erreur lors de la génération audio:', error);
      throw error;
    }
  },

  /**
   * Met à jour l'URL audio d'un post
   * @param {string|number} id - ID du post
   * @param {string} audioUrl - URL du fichier audio
   * @returns {Promise} Promesse avec le résultat de la mise à jour
   */
  updatePostAudio: async (id, audioUrl) => {
    try {
      // Supprimer le préfixe /api car il est déjà inclus dans baseURL
      const response = await api.put(`posts/${id}/audio`, { audioUrl });
      return {
        success: true,
        message: response.data.message || 'URL audio mise à jour avec succès'
      };
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'audio:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Échec de la mise à jour de l\'audio'
      };
    }
  }
};

export default PostsService; 
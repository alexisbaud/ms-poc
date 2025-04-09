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
      console.error('Error fetching posts:', error);
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
      console.error(`Error fetching post ${id}:`, error);
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
      console.error('Error fetching user posts:', error);
      throw error;
    }
  },

  /**
   * Crée un nouveau post
   * @param {Object} postData - Données du post à créer
   * @returns {Promise} Promesse avec le post créé
   */
  createPost: async (postData) => {
    try {
      const response = await api.post('/posts', postData);
      return response.data.data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
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
      const response = await api.put(`/posts/${id}`, postData);
      return response.data.data;
    } catch (error) {
      console.error(`Error updating post ${id}:`, error);
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
      console.error(`Error deleting post ${id}:`, error);
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
      console.error(`Error searching posts with query "${query}":`, error);
      throw error;
    }
  }
};

export default PostsService; 
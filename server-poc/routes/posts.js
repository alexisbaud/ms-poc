const express = require('express');
const router = express.Router();
const PostController = require('../controllers/posts');
const { verifyToken } = require('../middleware/auth');

/**
 * @route   GET /api/posts
 * @desc    Récupère tous les posts publics (fil d'actualité)
 * @access  Public
 */
router.get('/', PostController.getPosts);

/**
 * @route   GET /api/posts/:id
 * @desc    Récupère un post spécifique par son ID
 * @access  Public
 */
router.get('/:id', PostController.getPostById);

/**
 * @route   POST /api/posts
 * @desc    Crée un nouveau post
 * @access  Private
 */
router.post('/', verifyToken, PostController.createPost);

/**
 * @route   PUT /api/posts/:id
 * @desc    Met à jour un post existant
 * @access  Private (propriétaire du post uniquement)
 */
router.put('/:id', verifyToken, PostController.updatePost);

/**
 * @route   DELETE /api/posts/:id
 * @desc    Supprime un post
 * @access  Private (propriétaire du post uniquement)
 */
router.delete('/:id', verifyToken, PostController.deletePost);

/**
 * @route   GET /api/posts/user/me
 * @desc    Récupère tous les posts de l'utilisateur connecté
 * @access  Private
 */
router.get('/user/me', verifyToken, PostController.getUserPosts);

/**
 * @route   GET /api/posts/user/:userId
 * @desc    Récupère tous les posts d'un utilisateur spécifique
 * @access  Public
 */
router.get('/user/:userId', PostController.getUserPosts);

/**
 * @route   GET /api/posts/search
 * @desc    Recherche des posts par mots-clés
 * @access  Public
 */
router.get('/search', PostController.searchPosts);

module.exports = router; 
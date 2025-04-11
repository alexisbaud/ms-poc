import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './PostDetailPage.css';

// Import components
import ExpandedPostA from '../../components/organisms/ExpandedPostA';
import ExpandedPostB from '../../components/organisms/ExpandedPostB';
import Loader from '../../components/atoms/Loader';

// Mock data - remplacer par des appels API dans une version production
import { mockComments } from './mockData';

/**
 * Page de détail d'un post (affiche ExpandedPostA ou ExpandedPostB selon le type)
 * @returns {JSX.Element}
 */
const PostDetailPage = () => {
  const { postId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [error, setError] = useState(null);
  
  // Récupère le post depuis les query params ou fait un appel API
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        
        // Si la donnée est disponible via la navigation
        if (location.state?.post) {
          setPost(location.state.post);
          setIsLoading(false);
          return;
        }
        
        // Sinon, simuler un appel API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simuler une réponse d'API
        // En production, remplacer par un vrai appel fetch
        setError('Post non trouvé');
        setIsLoading(false);
      } catch (err) {
        console.error('Erreur lors du chargement du post:', err);
        setError('Une erreur est survenue lors du chargement du post.');
        setIsLoading(false);
      }
    };
    
    fetchPost();
  }, [postId, location.state]);
  
  // Charge les commentaires
  useEffect(() => {
    const fetchComments = async () => {
      if (!post) return;
      
      try {
        setIsLoadingComments(true);
        
        // Simule un appel API avec délai
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Récupération des données mockées
        setComments(mockComments);
      } catch (err) {
        console.error('Erreur lors du chargement des commentaires:', err);
      } finally {
        setIsLoadingComments(false);
      }
    };
    
    fetchComments();
  }, [post]);
  
  // Gestionnaires d'événements
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleHashtagClick = (tag) => {
    console.log(`Recherche par hashtag: ${tag}`);
    navigate(`/tags/${tag}`);
  };
  
  const handleUserClick = (userId) => {
    console.log(`Voir profil utilisateur: ${userId}`);
    navigate(`/profile/${userId}`);
  };
  
  const handleLike = (postId) => {
    console.log(`Like post: ${postId}`);
    // Mettre à jour l'état local du post
    setPost(prevPost => ({
      ...prevPost,
      isLiked: !prevPost.isLiked,
      likeCount: prevPost.isLiked ? prevPost.likeCount - 1 : prevPost.likeCount + 1
    }));
  };
  
  const handleAddComment = (postId, commentText) => {
    console.log(`Nouveau commentaire sur post ${postId}: ${commentText}`);
    
    // Simuler l'ajout d'un commentaire
    const newComment = {
      id: `comment-${Date.now()}`,
      content: commentText,
      createdAt: new Date().toISOString(),
      author: {
        id: 'current-user',
        username: 'vous',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
      }
    };
    
    setComments(prevComments => [newComment, ...prevComments]);
    
    // Mettre à jour le compteur de commentaires
    setPost(prevPost => ({
      ...prevPost,
      commentCount: prevPost.commentCount + 1
    }));
  };
  
  const handlePlayAudio = () => {
    // Simuler le chargement d'audio
    setIsLoadingAudio(true);
    
    setTimeout(() => {
      setIsLoadingAudio(false);
      setIsPlaying(true);
    }, 1500);
  };
  
  const handlePauseAudio = () => {
    setIsPlaying(false);
  };
  
  // Fonction pour générer l'audio d'un post
  const handleGenerateAudio = async (postId) => {
    try {
      setIsLoadingAudio(true);
      
      // Appel à l'API pour générer l'audio
      // En production, remplacer par l'appel réel à votre service API
      const PostsService = await import('../../services/posts').then(module => module.default);
      
      const result = await PostsService.generateAudio(postId, post.content);
      
      // Vérifier le résultat
      if (result.success) {
        // Mettre à jour l'URL audio du post
        setPost(prevPost => ({
          ...prevPost,
          audioUrl: result.audioUrl,
          ttsGenerated: true
        }));
        
        setIsPlaying(true);
      } else {
        console.error('Échec de la génération audio:', result.message);
        // Afficher un message d'erreur à l'utilisateur
        setError(`Échec de la génération audio: ${result.message}`);
      }
    } catch (error) {
      console.error('Erreur lors de la génération audio:', error);
      setError('Une erreur est survenue lors de la génération audio.');
    } finally {
      setIsLoadingAudio(false);
    }
  };
  
  // Affiche un loader pendant le chargement
  if (isLoading) {
    return (
      <div className="post-detail-page__loading">
        <Loader size="lg" />
        <p className="post-detail-page__loading-text">Chargement de la publication...</p>
      </div>
    );
  }
  
  // Affiche un message d'erreur si le post n'est pas trouvé
  if (!post && !isLoading) {
    return (
      <div className="post-detail-page__error">
        <h2 className="post-detail-page__error-title">Publication introuvable</h2>
        <p className="post-detail-page__error-text">{error || "Cette publication n'existe pas ou a été supprimée."}</p>
        <button 
          className="post-detail-page__back-button" 
          onClick={handleBack}
        >
          Retour
        </button>
      </div>
    );
  }
  
  return (
    <div className="post-detail-page">
      {post.type === 'short' ? (
        <ExpandedPostA 
          post={post}
          comments={comments}
          onHashtagClick={handleHashtagClick}
          onUserClick={handleUserClick}
          onLike={handleLike}
          onAddComment={handleAddComment}
          onBack={handleBack}
          isLoadingComments={isLoadingComments}
        />
      ) : (
        <ExpandedPostB 
          post={post}
          comments={comments}
          onHashtagClick={handleHashtagClick}
          onUserClick={handleUserClick}
          onLike={handleLike}
          onAddComment={handleAddComment}
          onBack={handleBack}
          isLoadingComments={isLoadingComments}
          isPlaying={isPlaying}
          isLoadingAudio={isLoadingAudio}
          onPlayAudio={handlePlayAudio}
          onPauseAudio={handlePauseAudio}
          onGenerateAudio={handleGenerateAudio}
        />
      )}
    </div>
  );
};

export default PostDetailPage; 
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

// Import components
import PostFeed from '../../components/organisms/PostFeed';
import Icon from '../../components/atoms/Icon';
import Avatar from '../../components/atoms/Avatar';
import Loader from '../../components/atoms/Loader';
import NavBar from '../../components/molecules/NavBar';

// Import services
import PostsService from '../../services/posts';

/**
 * Page d'accueil avec fil d'actualité et header sticky
 * @returns {JSX.Element}
 */
const HomePage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [playingPostId, setPlayingPostId] = useState(null);
  const [loadingAudioPostId, setLoadingAudioPostId] = useState(null);
  const [error, setError] = useState(null);
  
  // Chargement des posts depuis l'API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        
        const response = await PostsService.getPosts(page, 5);
        
        // Transformer les posts pour les adapter au format attendu par les composants
        const formattedPosts = response.posts.map(post => ({
          id: post.id.toString(),
          type: post.type === 'Post A' ? 'short' : 'long',
          title: post.title,
          content: post.content,
          hashtags: post.hashtags,
          createdAt: post.createdAt,
          author: {
            id: post.authorId.toString(),
            username: post.authorName,
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg', // Avatar par défaut
            verified: false
          },
          likeCount: 0, // Ces données viendront d'autres endpoints dans une version future
          commentCount: 0,
          shareCount: 0,
          isLiked: false,
          ttsAudioUrl: post.ttsAudioUrl,
          ttsGenerated: post.ttsGenerated
        }));
        
        // Si c'est la première page, on remplace les posts, sinon on les ajoute
        setPosts(prevPosts => (page === 1 ? formattedPosts : [...prevPosts, ...formattedPosts]));
        
        // Détermine s'il y a plus de posts à charger
        setHasMore(response.hasMore);
      } catch (err) {
        console.error('Erreur lors du chargement des posts:', err);
        setError('Une erreur est survenue lors du chargement des publications.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPosts();
  }, [page]);
  
  // Gestionnaires d'événements
  const handleLoadMore = async () => {
    if (!isLoading && hasMore) {
      setPage(prevPage => prevPage + 1);
      // Retourne une promesse qui sera résolue quand le chargement des nouveaux posts sera terminé
      return new Promise(resolve => {
        const checkInterval = setInterval(() => {
          if (!isLoading) {
            clearInterval(checkInterval);
            resolve();
          }
        }, 100);
      });
    }
    return Promise.resolve();
  };
  
  const handlePostClick = (postId) => {
    // Trouve le post cliqué
    const post = posts.find(p => p.id === postId);
    
    if (post) {
      // Naviguer vers le détail du post approprié selon son type
      navigate(`/post/${postId}`, { state: { post } });
    }
  };
  
  const handleHashtagClick = (tag) => {
    console.log(`Recherche par hashtag: ${tag}`);
    // Naviguer vers une page de résultats filtrée par hashtag
    navigate(`/tags/${tag}`);
  };
  
  const handleUserClick = (userId) => {
    console.log(`Voir profil utilisateur: ${userId}`);
    // Naviguer vers le profil de l'utilisateur
    navigate(`/profile/${userId}`);
  };
  
  const handleReadMore = (postId) => {
    // Similaire à handlePostClick mais spécifique aux boutons "Lire la suite"
    handlePostClick(postId);
  };
  
  const handlePlay = (postId) => {
    // Si le post est déjà en cours de lecture, on l'arrête
    if (playingPostId === postId) {
      setPlayingPostId(null);
      return;
    }
    
    // Post à lire
    const post = posts.find(p => p.id === postId);
    
    // Si le TTS est déjà généré, on lance la lecture immédiatement
    if (post && post.ttsGenerated) {
      setPlayingPostId(postId);
    } else {
      // Sinon, on doit d'abord générer l'audio
      handleGenerateAudio(postId);
    }
  };
  
  // Gestion de la génération audio
  const handleGenerateAudio = async (postId) => {
    try {
      // Trouver le post concerné
      const post = posts.find(p => p.id === postId);
      if (!post) return;
      
      // Marquer comme en cours de chargement
      setLoadingAudioPostId(postId);
      
      // Appel à l'API pour générer l'audio
      const result = await PostsService.generateAudio(postId, post.content);
      
      // Vérifier le résultat
      if (result.success) {
        // Mettre à jour le post avec l'URL audio
        setPosts(prevPosts => prevPosts.map(p => 
          p.id === postId ? { 
            ...p, 
            ttsGenerated: true, 
            audioUrl: result.audioUrl 
          } : p
        ));
        
        // Démarrer la lecture
        setPlayingPostId(postId);
      } else {
        console.error('Échec de la génération audio:', result.message);
        // Afficher un message d'erreur à l'utilisateur
        setError(`Échec de la génération audio: ${result.message}`);
      }
    } catch (error) {
      console.error('Erreur lors de la génération audio:', error);
      setError('Une erreur est survenue lors de la génération audio.');
    } finally {
      setLoadingAudioPostId(null);
    }
  };
  
  // Gestion de la navigation via la NavBar
  const handleNavigation = (pageId) => {
    switch(pageId) {
      case 'home':
        // Déjà sur la page d'accueil, ne rien faire ou rafraîchir le feed
        setPage(1); // Rafraîchir le feed en revenant à la première page
        break;
      case 'profile':
        navigate('/profile');
        break;
      case 'create':
        navigate('/create');
        break;
      default:
        // Pour les autres pages non implémentées, rester sur la page actuelle
        break;
    }
  };
  
  return (
    <div className="home-page">
      <header className="home-page__header">
        <div className="home-page__header-inner">
          <h1 className="home-page__title">Micro Story</h1>
        </div>
      </header>
      
      <main className="home-page__content">
        <PostFeed 
          posts={posts}
          hasMore={hasMore}
          isLoading={isLoading}
          onLoadMore={handleLoadMore}
          onPostClick={handlePostClick}
          onHashtagClick={handleHashtagClick}
          onUserClick={handleUserClick}
          onReadMore={handleReadMore}
          onPlay={handlePlay}
          onGenerateAudio={handleGenerateAudio}
          playingPostId={playingPostId}
          loadingAudioPostId={loadingAudioPostId}
          error={error}
        />
      </main>
      
      <NavBar 
        activePage="home"
        onNavigate={handleNavigation}
      />
    </div>
  );
};

export default HomePage; 
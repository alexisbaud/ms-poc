import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

// Import components
import PostFeed from '../../components/organisms/PostFeed';
import Icon from '../../components/atoms/Icon';
import Avatar from '../../components/atoms/Avatar';
import Loader from '../../components/atoms/Loader';

// Mock data - remplacer par des appels API dans une version production
import { mockPosts } from './mockData';

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
  
  // Simulation chargement des posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        
        // Simule un appel API avec délai
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Récupération des données mockées
        const newPosts = mockPosts.slice(0, page * 5);
        setPosts(newPosts);
        
        // Indique si il y a plus de posts à charger
        setHasMore(newPosts.length < mockPosts.length);
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
      return new Promise(resolve => setTimeout(resolve, 1000));
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
    // Simule le chargement audio et la lecture
    setLoadingAudioPostId(postId);
    
    // Simule un délai de chargement
    setTimeout(() => {
      setLoadingAudioPostId(null);
      setPlayingPostId(postId === playingPostId ? null : postId);
    }, 1500);
  };
  
  return (
    <div className="home-page">
      <header className="home-page__header">
        <div className="home-page__header-inner">
          <h1 className="home-page__title">Micro Story</h1>
          
          <div className="home-page__actions">
            <button className="home-page__action-button">
              <Icon name="search" size="md" />
            </button>
            <button className="home-page__action-button">
              <Icon name="notifications" size="md" />
            </button>
            <button className="home-page__profile-button">
              <Avatar 
                src="https://randomuser.me/api/portraits/women/44.jpg" 
                alt="Profil" 
                size="sm" 
              />
            </button>
          </div>
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
          playingPostId={playingPostId}
          loadingAudioPostId={loadingAudioPostId}
          error={error}
        />
      </main>
    </div>
  );
};

export default HomePage; 
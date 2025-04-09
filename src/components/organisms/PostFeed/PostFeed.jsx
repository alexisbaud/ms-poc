import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import './PostFeed.css';

// Import required components
import PostCardA from '../PostCardA';
import PostCardB from '../PostCardB';
import Loader from '../../atoms/Loader';
import Button from '../../atoms/Button';

/**
 * Composant de fil d'actualité avec scroll infini
 * @param {Object} props - Les propriétés du composant
 * @returns {JSX.Element}
 */
const PostFeed = ({ 
  posts = [], 
  hasMore = false,
  isLoading = false,
  onLoadMore,
  onPostClick,
  onHashtagClick,
  onUserClick,
  onReadMore,
  onLike,
  onComment,
  onShare,
  onPlay,
  playingPostId = null,
  loadingAudioPostId = null,
  error = null
}) => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observer = useRef();
  const loadMoreRef = useRef(null);
  
  // Configuration de l'Intersection Observer pour le scroll infini
  const lastPostElementRef = useCallback(node => {
    if (isLoading) return;
    
    if (observer.current) {
      observer.current.disconnect();
    }
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
        handleLoadMore();
      }
    }, { threshold: 0.5 });
    
    if (node) {
      observer.current.observe(node);
    }
  }, [isLoading, hasMore, isLoadingMore]);
  
  // Fonction pour charger plus de posts
  const handleLoadMore = () => {
    if (!isLoading && hasMore && onLoadMore) {
      setIsLoadingMore(true);
      onLoadMore().finally(() => {
        setIsLoadingMore(false);
      });
    }
  };
  
  // Reset loading state when parent loading state changes
  useEffect(() => {
    if (!isLoading) {
      setIsLoadingMore(false);
    }
  }, [isLoading]);
  
  // Détermine si un post doit afficher l'état audio en cours
  const isPostPlaying = (postId) => playingPostId === postId;
  const isPostLoadingAudio = (postId) => loadingAudioPostId === postId;
  
  return (
    <div className="post-feed">
      {posts.length === 0 && isLoading ? (
        <div className="post-feed__loading">
          <Loader size="lg" />
          <p className="post-feed__loading-text">Chargement des publications...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="post-feed__empty">
          <h3 className="post-feed__empty-title">Aucune publication disponible</h3>
          <p className="post-feed__empty-text">
            {error || "Il n'y a pas encore de publications à afficher."}
          </p>
        </div>
      ) : (
        <>
          <div className="post-feed__list">
            {posts.map((post, index) => {
              // Détermine si c'est le dernier élément pour le référencer
              const isLastElement = index === posts.length - 1;
              const ref = isLastElement ? lastPostElementRef : null;
              
              return (
                <div 
                  key={post.id} 
                  ref={ref} 
                  className="post-feed__item"
                >
                  {/* Affiche PostCardA pour les posts courts et PostCardB pour les longs */}
                  {post.type === 'short' ? (
                    <PostCardA 
                      post={post}
                      onHashtagClick={onHashtagClick}
                      onUserClick={onUserClick}
                      onPostClick={onPostClick}
                      onLike={onLike}
                      onComment={onComment}
                      onShare={onShare}
                    />
                  ) : (
                    <PostCardB 
                      post={post}
                      onHashtagClick={onHashtagClick}
                      onUserClick={onUserClick}
                      onPostClick={onPostClick}
                      onReadMore={onReadMore}
                      onLike={onLike}
                      onComment={onComment}
                      onShare={onShare}
                      onPlay={onPlay}
                      isPlaying={isPostPlaying(post.id)}
                      isLoadingAudio={isPostLoadingAudio(post.id)}
                    />
                  )}
                </div>
              );
            })}
          </div>
          
          {hasMore && (
            <div className="post-feed__load-more" ref={loadMoreRef}>
              {isLoadingMore ? (
                <Loader size="md" />
              ) : (
                <Button 
                  onClick={handleLoadMore}
                  variant="secondary"
                  disabled={isLoading}
                  className="post-feed__load-more-button"
                >
                  Charger plus
                </Button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

PostFeed.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['short', 'long']).isRequired,
      // Other post properties as defined in PostCardA and PostCardB
    })
  ),
  hasMore: PropTypes.bool,
  isLoading: PropTypes.bool,
  onLoadMore: PropTypes.func,
  onPostClick: PropTypes.func,
  onHashtagClick: PropTypes.func,
  onUserClick: PropTypes.func,
  onReadMore: PropTypes.func,
  onLike: PropTypes.func,
  onComment: PropTypes.func,
  onShare: PropTypes.func,
  onPlay: PropTypes.func,
  playingPostId: PropTypes.string,
  loadingAudioPostId: PropTypes.string,
  error: PropTypes.string
};

export default PostFeed; 
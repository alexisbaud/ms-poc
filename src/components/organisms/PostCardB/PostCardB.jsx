import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './PostCardB.css';

// Import required components
import Text from '../../atoms/Text';
import Hashtag from '../../atoms/Hashtag';
import InteractionBar from '../../molecules/InteractionBar';
import PostHeader from '../../molecules/PostHeader';
import PostPreviewText from '../../molecules/PostPreviewText';
import PostTTSButton from '../../molecules/PostTTSButton';

/**
 * Carte pour post long (aperçu + bouton TTS)
 * @param {Object} props - Les propriétés du composant
 * @returns {JSX.Element}
 */
const PostCardB = ({ 
  post, 
  onHashtagClick,
  onUserClick,
  onPostClick,
  onReadMore,
  onLike,
  onComment,
  onShare,
  onPlay,
  isPlaying = false,
  isLoadingAudio = false,
  disabled = false 
}) => {
  const [isPressed, setIsPressed] = useState(false);
  
  const handleCardClick = (e) => {
    // Ne pas déclencher le clic si l'utilisateur a cliqué sur un bouton interne
    if (
      e.target.closest('.post-tts-button') || 
      e.target.closest('.post-preview-text__read-more') ||
      disabled
    ) {
      return;
    }
    
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
    
    if (onPostClick) {
      onPostClick(post.id);
    }
  };
  
  let cardClass = 'post-card-b';
  if (isPressed) cardClass += ' post-card-b--pressed';
  if (disabled) cardClass += ' post-card-b--disabled';
  
  // Limite le nombre de hashtags affichés
  const displayHashtags = post.hashtags ? post.hashtags.slice(0, 2) : [];
  const hasMoreHashtags = post.hashtags && post.hashtags.length > 2;
  
  return (
    <article className={cardClass}>
      <div className="post-card-b__inner" onClick={handleCardClick}>
        <PostHeader 
          avatar={post.author.avatar}
          username={post.author.username}
          timestamp={post.createdAt}
          onClick={onUserClick}
          userId={post.author.id}
          verified={post.author.verified}
        />
        
        <div className="post-card-b__content">
          <Text variant="title" className="post-card-b__title">
            {post.title}
          </Text>
          
          <PostPreviewText 
            text={post.content}
            maxChars={180}
            postId={post.id}
            onReadMore={onReadMore}
            disabled={disabled}
          />
        </div>
        
        <div className="post-card-b__footer">
          <div className="post-card-b__hashtags">
            {displayHashtags.map((tag, index) => (
              <Hashtag 
                key={`${post.id}-tag-${index}`}
                tag={tag}
                size="sm"
                onClick={onHashtagClick}
              />
            ))}
            {hasMoreHashtags && (
              <span className="post-card-b__more-hashtags">+{post.hashtags.length - 2}</span>
            )}
          </div>
          
          <PostTTSButton 
            postId={post.id}
            onPlay={onPlay}
            isPlaying={isPlaying}
            isLoading={isLoadingAudio}
            disabled={disabled}
          />
        </div>
      </div>
      
      <InteractionBar 
        postId={post.id}
        likeCount={post.likeCount}
        commentCount={post.commentCount}
        shareCount={post.shareCount}
        isLiked={post.isLiked}
        onLike={onLike}
        onComment={onComment}
        onShare={onShare}
        disabled={disabled}
      />
    </article>
  );
};

PostCardB.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    author: PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      verified: PropTypes.bool
    }).isRequired,
    hashtags: PropTypes.arrayOf(PropTypes.string),
    likeCount: PropTypes.number,
    commentCount: PropTypes.number,
    shareCount: PropTypes.number,
    isLiked: PropTypes.bool
  }).isRequired,
  onHashtagClick: PropTypes.func,
  onUserClick: PropTypes.func,
  onPostClick: PropTypes.func,
  onReadMore: PropTypes.func,
  onLike: PropTypes.func,
  onComment: PropTypes.func,
  onShare: PropTypes.func,
  onPlay: PropTypes.func,
  isPlaying: PropTypes.bool,
  isLoadingAudio: PropTypes.bool,
  disabled: PropTypes.bool
};

export default PostCardB; 
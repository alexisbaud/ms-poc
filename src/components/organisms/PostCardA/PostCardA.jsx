import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './PostCardA.css';

// Import required components
import Avatar from '../../atoms/Avatar';
import Text from '../../atoms/Text';
import Hashtag from '../../atoms/Hashtag';
import InteractionBar from '../../molecules/InteractionBar';
import PostHeader from '../../molecules/PostHeader';

/**
 * Carte pour post court (texte direct, pas de TTS)
 * @param {Object} props - Les propriétés du composant
 * @returns {JSX.Element}
 */
const PostCardA = ({ 
  post, 
  onHashtagClick,
  onUserClick,
  onPostClick,
  onLike,
  onComment,
  onShare,
  disabled = false 
}) => {
  const [isPressed, setIsPressed] = useState(false);
  
  const handleCardClick = () => {
    if (disabled) return;
    
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
    
    if (onPostClick) {
      onPostClick(post.id);
    }
  };
  
  let cardClass = 'post-card-a';
  if (isPressed) cardClass += ' post-card-a--pressed';
  if (disabled) cardClass += ' post-card-a--disabled';
  
  // Limite le nombre de hashtags affichés
  const displayHashtags = post.hashtags ? post.hashtags.slice(0, 3) : [];
  const hasMoreHashtags = post.hashtags && post.hashtags.length > 3;
  
  return (
    <article className={cardClass}>
      <div className="post-card-a__inner" onClick={handleCardClick}>
        <PostHeader 
          avatar={post.author.avatar}
          username={post.author.username}
          timestamp={post.createdAt}
          onClick={onUserClick}
          userId={post.author.id}
          verified={post.author.verified}
        />
        
        <div className="post-card-a__content">
          <Text variant="body" className="post-card-a__text">
            {post.content}
          </Text>
        </div>
        
        {displayHashtags.length > 0 && (
          <div className="post-card-a__hashtags">
            {displayHashtags.map((tag, index) => (
              <Hashtag 
                key={`${post.id}-tag-${index}`}
                tag={tag}
                size="sm"
                onClick={onHashtagClick}
              />
            ))}
            {hasMoreHashtags && (
              <span className="post-card-a__more-hashtags">+{post.hashtags.length - 3}</span>
            )}
          </div>
        )}
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

PostCardA.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
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
  onLike: PropTypes.func,
  onComment: PropTypes.func,
  onShare: PropTypes.func,
  disabled: PropTypes.bool
};

export default PostCardA; 
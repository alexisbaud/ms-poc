import React from 'react';
import PropTypes from 'prop-types';
import './ExpandedPostA.css';

// Import required components
import Avatar from '../../atoms/Avatar';
import Text from '../../atoms/Text';
import Hashtag from '../../atoms/Hashtag';
import Divider from '../../atoms/Divider';
import Icon from '../../atoms/Icon';
import Button from '../../atoms/Button';
import InteractionBar from '../../molecules/InteractionBar';
import PostHeader from '../../molecules/PostHeader';
import CommentSection from '../CommentSection';

/**
 * Vue détaillée du Post A avec tous les hashtags + commentaires
 * @param {Object} props - Les propriétés du composant
 * @returns {JSX.Element}
 */
const ExpandedPostA = ({ 
  post, 
  comments = [],
  onHashtagClick,
  onUserClick,
  onLike,
  onComment,
  onShare,
  onBack,
  onAddComment,
  isLoadingComments = false,
  disabled = false 
}) => {
  const handleBackClick = () => {
    if (onBack) {
      onBack();
    }
  };
  
  return (
    <article className="expanded-post-a">
      <div className="expanded-post-a__header">
        <button 
          className="expanded-post-a__back-button" 
          onClick={handleBackClick}
          aria-label="Retour"
        >
          <Icon name="arrow-left" size="md" />
        </button>
        <h1 className="expanded-post-a__title">Publication</h1>
      </div>
      
      <div className="expanded-post-a__content">
        <PostHeader 
          avatar={post.author.avatar}
          username={post.author.username}
          timestamp={post.createdAt}
          onClick={onUserClick}
          userId={post.author.id}
          verified={post.author.verified}
          size="lg"
        />
        
        <div className="expanded-post-a__post-content">
          <Text variant="body-lg" className="expanded-post-a__text">
            {post.content}
          </Text>
        </div>
        
        {post.hashtags && post.hashtags.length > 0 && (
          <div className="expanded-post-a__hashtags">
            {post.hashtags.map((tag, index) => (
              <Hashtag 
                key={`${post.id}-tag-${index}`}
                tag={tag}
                size="md"
                onClick={onHashtagClick}
              />
            ))}
          </div>
        )}
        
        <div className="expanded-post-a__post-meta">
          <Text variant="caption" className="expanded-post-a__timestamp">
            {new Date(post.createdAt).toLocaleString()}
          </Text>
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
          size="lg"
          disabled={disabled}
        />
        
        <Divider />
        
        <CommentSection 
          postId={post.id}
          comments={comments}
          onAddComment={onAddComment}
          isLoading={isLoadingComments}
          onUserClick={onUserClick}
          disabled={disabled}
        />
      </div>
    </article>
  );
};

ExpandedPostA.propTypes = {
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
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      author: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        avatar: PropTypes.string
      }).isRequired
    })
  ),
  onHashtagClick: PropTypes.func,
  onUserClick: PropTypes.func,
  onLike: PropTypes.func,
  onComment: PropTypes.func,
  onShare: PropTypes.func,
  onBack: PropTypes.func,
  onAddComment: PropTypes.func,
  isLoadingComments: PropTypes.bool,
  disabled: PropTypes.bool
};

export default ExpandedPostA; 
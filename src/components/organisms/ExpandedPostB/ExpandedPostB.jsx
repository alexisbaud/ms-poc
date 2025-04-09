import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ExpandedPostB.css';

// Import required components
import Text from '../../atoms/Text';
import Hashtag from '../../atoms/Hashtag';
import Divider from '../../atoms/Divider';
import Icon from '../../atoms/Icon';
import AudioPlayerMini from '../../atoms/AudioPlayerMini';
import InteractionBar from '../../molecules/InteractionBar';
import PostHeader from '../../molecules/PostHeader';
import CommentSection from '../CommentSection';

/**
 * Vue détaillée du Post B avec texte intégral + lecteur audio + commentaires
 * @param {Object} props - Les propriétés du composant
 * @returns {JSX.Element}
 */
const ExpandedPostB = ({ 
  post, 
  comments = [],
  onHashtagClick,
  onUserClick,
  onLike,
  onComment,
  onShare,
  onBack,
  onAddComment,
  audioUrl,
  isPlaying = false,
  onPlayAudio,
  onPauseAudio,
  isLoadingAudio = false,
  isLoadingComments = false,
  disabled = false 
}) => {
  const [audioProgress, setAudioProgress] = useState(0);
  
  const handleBackClick = () => {
    if (onBack) {
      onBack();
    }
  };
  
  const handleAudioProgressChange = (progress) => {
    setAudioProgress(progress);
  };
  
  return (
    <article className="expanded-post-b">
      <div className="expanded-post-b__header">
        <button 
          className="expanded-post-b__back-button" 
          onClick={handleBackClick}
          aria-label="Retour"
        >
          <Icon name="arrow-left" size="md" />
        </button>
        <h1 className="expanded-post-b__title">Publication</h1>
      </div>
      
      <div className="expanded-post-b__content">
        <PostHeader 
          avatar={post.author.avatar}
          username={post.author.username}
          timestamp={post.createdAt}
          onClick={onUserClick}
          userId={post.author.id}
          verified={post.author.verified}
          size="lg"
        />
        
        <div className="expanded-post-b__post-header">
          <h2 className="expanded-post-b__post-title">{post.title}</h2>
        </div>
        
        {post.audioUrl && (
          <div className="expanded-post-b__audio-player">
            <AudioPlayerMini 
              audioUrl={audioUrl || post.audioUrl}
              isPlaying={isPlaying}
              isLoading={isLoadingAudio}
              onPlay={onPlayAudio}
              onPause={onPauseAudio}
              onProgressChange={handleAudioProgressChange}
              disabled={disabled}
            />
          </div>
        )}
        
        <div className="expanded-post-b__post-content">
          <Text variant="body-lg" className="expanded-post-b__text">
            {post.content}
          </Text>
        </div>
        
        {post.hashtags && post.hashtags.length > 0 && (
          <div className="expanded-post-b__hashtags">
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
        
        <div className="expanded-post-b__post-meta">
          <Text variant="caption" className="expanded-post-b__timestamp">
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

ExpandedPostB.propTypes = {
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
    isLiked: PropTypes.bool,
    audioUrl: PropTypes.string
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
  audioUrl: PropTypes.string,
  isPlaying: PropTypes.bool,
  onPlayAudio: PropTypes.func,
  onPauseAudio: PropTypes.func,
  isLoadingAudio: PropTypes.bool,
  isLoadingComments: PropTypes.bool,
  disabled: PropTypes.bool
};

export default ExpandedPostB; 
import React from 'react';
import PropTypes from 'prop-types';
import './PostCard.css';
import PostHeader from '../../molecules/PostHeader';
import Content from '../../atoms/Content';
import AudioPlayer from '../../molecules/AudioPlayer';
import Divider from '../../atoms/Divider';
import InteractionBar from '../../molecules/InteractionBar';

/**
 * PostCard component that combines all post elements
 */
const PostCard = ({
  variant = 'A',
  username,
  date,
  hashtags = [],
  title = '',
  content,
  audioSrc = '',
  emojis = ['❤️', '😂', '😮', '👏'],
  selectedEmoji = null,
  onReact = () => {},
  onComment = () => {},
  onShare = () => {},
  className = '',
  ...props
}) => {
  const cardClasses = [
    'post-card',
    `post-card--${variant.toLowerCase()}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} {...props}>
      <PostHeader
        username={username}
        date={date}
        hashtags={hashtags}
      />
      
      <Content
        variant={variant}
        title={title}
        content={content}
      />
      
      {variant === 'B' && audioSrc && (
        <AudioPlayer
          audioSrc={audioSrc}
        />
      )}
      
      <Divider />
      
      <InteractionBar
        emojis={emojis}
        selectedEmoji={selectedEmoji}
        onReact={onReact}
        onComment={onComment}
        onShare={onShare}
      />
    </div>
  );
};

PostCard.propTypes = {
  /** Card variant ('A' for text only, 'B' for title/excerpt with audio) */
  variant: PropTypes.oneOf(['A', 'B']),
  /** Username of the post author */
  username: PropTypes.string.isRequired,
  /** Formatted date string */
  date: PropTypes.string.isRequired,
  /** Array of hashtag strings */
  hashtags: PropTypes.arrayOf(PropTypes.string),
  /** Post title (for variant B) */
  title: PropTypes.string,
  /** Post content/excerpt */
  content: PropTypes.string.isRequired,
  /** Audio source URL (for variant B) */
  audioSrc: PropTypes.string,
  /** Array of emoji characters to display */
  emojis: PropTypes.arrayOf(PropTypes.string),
  /** Currently selected emoji */
  selectedEmoji: PropTypes.string,
  /** Handler for reaction clicks */
  onReact: PropTypes.func,
  /** Handler for comment button click */
  onComment: PropTypes.func,
  /** Handler for share button click */
  onShare: PropTypes.func,
  /** Additional CSS classes */
  className: PropTypes.string
};

export default PostCard; 
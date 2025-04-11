import React from 'react';
import PropTypes from 'prop-types';
import './InteractionBar.css';
import EmojiReactions from '../EmojiReactions';
import PostInteractions from '../PostInteractions';

/**
 * InteractionBar component containing emoji reactions and post action buttons
 */
const InteractionBar = ({
  emojis = ['❤️', '😂', '😮', '👏'],
  selectedEmoji = null,
  onReact = () => {},
  onComment = () => {},
  onShare = () => {},
  className = '',
  postId,
  likeCount,
  commentCount,
  shareCount,
  isLiked,
  onLike,
  disabled = true,
  ...rest
}) => {
  const barClasses = [
    'interaction-bar',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={barClasses} {...rest}>
      <div className="interaction-bar__reactions-container">
        <EmojiReactions 
          emojis={emojis}
          selectedEmoji={selectedEmoji}
          onReact={onReact}
        />
      </div>
      <PostInteractions
        onComment={onComment}
        onShare={onShare}
        commentCount={commentCount}
        shareCount={shareCount}
        likeCount={likeCount}
        isLiked={isLiked}
        onLike={onLike}
        disabled={true}
        postId={postId}
        className="interaction-bar__post-interactions--centered"
      />
    </div>
  );
};

InteractionBar.propTypes = {
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
  className: PropTypes.string,
  /** Post ID */
  postId: PropTypes.string,
  /** Number of likes */
  likeCount: PropTypes.number,
  /** Number of comments */
  commentCount: PropTypes.number,
  /** Number of shares */
  shareCount: PropTypes.number,
  /** Whether the current user has liked the post */
  isLiked: PropTypes.bool,
  /** Handler for like button click */
  onLike: PropTypes.func,
  /** Whether interactions are disabled */
  disabled: PropTypes.bool
};

export default InteractionBar; 
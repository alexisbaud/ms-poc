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
  ...props
}) => {
  const barClasses = [
    'interaction-bar',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={barClasses} {...props}>
      <EmojiReactions 
        emojis={emojis}
        selectedEmoji={selectedEmoji}
        onReact={onReact}
      />
      <PostInteractions
        onComment={onComment}
        onShare={onShare}
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
  className: PropTypes.string
};

export default InteractionBar; 
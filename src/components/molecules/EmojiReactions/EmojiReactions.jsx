import React from 'react';
import PropTypes from 'prop-types';
import './EmojiReactions.css';
import EmojiButton from '../../atoms/EmojiButton';

/**
 * Component for emoji reactions bar containing 4 emoji buttons
 */
const EmojiReactions = ({
  emojis = ['❤️', '😂', '😮', '👏'],
  selectedEmoji = null,
  onReact = () => {},
  className = '',
  ...props
}) => {
  const reactionsClasses = [
    'emoji-reactions',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={reactionsClasses} {...props}>
      {emojis.map((emoji) => (
        <EmojiButton
          key={emoji}
          emoji={emoji}
          isSelected={emoji === selectedEmoji}
          onClick={onReact}
        />
      ))}
    </div>
  );
};

EmojiReactions.propTypes = {
  /** Array of emoji characters to display */
  emojis: PropTypes.arrayOf(PropTypes.string),
  /** Currently selected emoji */
  selectedEmoji: PropTypes.string,
  /** Handler for reaction clicks */
  onReact: PropTypes.func,
  /** Additional CSS classes */
  className: PropTypes.string
};

export default EmojiReactions; 
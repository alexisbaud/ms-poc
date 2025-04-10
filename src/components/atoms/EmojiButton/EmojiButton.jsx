import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './EmojiButton.css';

/**
 * Component for emoji reaction buttons
 */
const EmojiButton = ({
  emoji = '👍',
  onClick = null,
  isSelected = false,
  className = '',
  ...props
}) => {
  // Local state
  const [isPressedInternal, setIsPressedInternal] = useState(false);
  
  // Handlers for pressed state
  const handleMouseDown = () => {
    if (onClick) {
      setIsPressedInternal(true);
    }
  };

  const handleMouseUp = () => {
    if (onClick) {
      setIsPressedInternal(false);
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick(emoji);
    }
  };
  
  // CSS classes
  const buttonClasses = [
    'emoji-button',
    isSelected ? 'emoji-button--selected' : '',
    isPressedInternal ? 'emoji-button--pressed' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onTouchCancel={handleMouseUp}
      aria-label={`React with ${emoji}`}
      aria-pressed={isSelected}
      type="button"
      {...props}
    >
      <span className="emoji-button__emoji" role="img" aria-hidden="true">{emoji}</span>
    </button>
  );
};

EmojiButton.propTypes = {
  /** Emoji character to display */
  emoji: PropTypes.string.isRequired,
  /** Click handler */
  onClick: PropTypes.func,
  /** Selected state */
  isSelected: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string
};

export default EmojiButton; 
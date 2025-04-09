import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './EmojiButton.css';
import { colors } from '../../../styles';

/**
 * Composant bouton avec emoji pour les réactions
 * @param {Object} props - Les propriétés du composant
 * @returns {JSX.Element}
 */
const EmojiButton = ({
  emoji = '👍',
  label = '',
  count = 0,
  size = 'md',
  isSelected = false,
  isPressed = false,
  isDisabled = false,
  onClick = null,
  className = '',
  showCount = true,
  ...props
}) => {
  // État local
  const [isPressedInternal, setIsPressedInternal] = useState(false);
  
  // Handlers pour l'état pressed
  const handleMouseDown = (e) => {
    if (onClick && !isDisabled) {
      setIsPressedInternal(true);
    }
  };

  const handleMouseUp = (e) => {
    if (onClick && !isDisabled) {
      setIsPressedInternal(false);
    }
  };

  const handleClick = (e) => {
    if (onClick && !isDisabled) {
      onClick(e);
    }
  };
  
  // Classes CSS
  const buttonClasses = [
    'emoji-button',
    `emoji-button--${size}`,
    isSelected ? 'emoji-button--selected' : '',
    (isPressed || isPressedInternal) ? 'emoji-button--pressed' : '',
    isDisabled ? 'emoji-button--disabled' : '',
    className
  ].filter(Boolean).join(' ');

  // Format du compteur
  const formattedCount = count > 999 ? `${Math.floor(count / 1000)}k` : count.toString();

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
      aria-label={label || `Réagir avec ${emoji}`}
      aria-pressed={isSelected}
      disabled={isDisabled}
      type="button"
      {...props}
    >
      <span className="emoji-button__emoji" role="img" aria-hidden="true">{emoji}</span>
      {showCount && count > 0 && (
        <span className="emoji-button__count">{formattedCount}</span>
      )}
    </button>
  );
};

EmojiButton.propTypes = {
  /** Emoji à afficher (Unicode) */
  emoji: PropTypes.string,
  /** Label accessible (aria-label) */
  label: PropTypes.string,
  /** Nombre de réactions */
  count: PropTypes.number,
  /** Taille du bouton */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  /** Si le bouton est sélectionné (l'utilisateur a déjà réagi) */
  isSelected: PropTypes.bool,
  /** État pressé (contrôlé depuis l'extérieur) */
  isPressed: PropTypes.bool,
  /** État désactivé */
  isDisabled: PropTypes.bool,
  /** Fonction appelée lors du clic */
  onClick: PropTypes.func,
  /** Afficher le compteur ou non */
  showCount: PropTypes.bool,
  /** Classes CSS additionnelles */
  className: PropTypes.string,
};

export default EmojiButton; 
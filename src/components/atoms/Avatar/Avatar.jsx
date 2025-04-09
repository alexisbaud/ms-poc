import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Avatar.css';
import { colors } from '../../../styles';

/**
 * Composant Avatar pour afficher l'image d'un utilisateur ou ses initiales
 * @param {Object} props - Les propriétés du composant
 * @returns {JSX.Element}
 */
const Avatar = ({
  src = '',
  alt = 'Avatar',
  size = 'md',
  username = '',
  isPressed = false,
  isDisabled = false,
  onClick = null,
  isVerified = false,
  fallbackText = '',
  className = '',
  ...props
}) => {
  // État local pour gérer l'état pressed
  const [isPressedInternal, setIsPressedInternal] = useState(false);
  // État pour gérer les erreurs de chargement d'image
  const [hasError, setHasError] = useState(false);

  // Obtenir les initiales à partir du nom d'utilisateur ou utiliser fallbackText
  const getInitials = () => {
    if (fallbackText) return fallbackText;
    if (!username) return '?';
    
    const nameParts = username.trim().split(/\s+/);
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }
    
    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
  };

  // Définir une couleur de fond basée sur le nom d'utilisateur
  const getBackgroundColor = () => {
    if (!username) return '#ABABAB'; // Default color
    
    const hash = username.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    
    const hue = Math.abs(hash % 360);
    return `hsl(${hue}, 70%, 60%)`;
  };

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

  const handleImageError = () => {
    setHasError(true);
  };

  // Classes CSS
  const avatarClasses = [
    'avatar',
    `avatar--${size}`,
    (isPressed || isPressedInternal) ? 'avatar--pressed' : '',
    isDisabled ? 'avatar--disabled' : '',
    isVerified ? 'avatar--verified' : '',
    onClick ? 'avatar--clickable' : '',
    className
  ].filter(Boolean).join(' ');

  // Style pour le cas où on affiche les initiales
  const initialsStyle = {
    backgroundColor: getBackgroundColor()
  };

  // Attributes that should not be passed to DOM
  const { 
    // eslint-disable-next-line no-unused-vars
    isVerified: _isVerified, 
    // eslint-disable-next-line no-unused-vars
    fallbackText: _fallbackText, 
    ...domProps 
  } = props;

  return (
    <div
      className={avatarClasses}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onTouchCancel={handleMouseUp}
      {...domProps}
    >
      {src && !hasError ? (
        <img 
          src={src} 
          alt={alt} 
          className="avatar__image"
          onError={handleImageError}
        />
      ) : (
        <div className="avatar__initials" style={initialsStyle}>
          {getInitials()}
        </div>
      )}
      
      {isVerified && (
        <div className="avatar__verified-badge" title="Compte vérifié">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor" />
          </svg>
        </div>
      )}
    </div>
  );
};

Avatar.propTypes = {
  /** URL de l'image (optionnel) */
  src: PropTypes.string,
  /** Texte alternatif pour l'image */
  alt: PropTypes.string,
  /** Taille de l'avatar */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  /** Nom d'utilisateur pour générer des initiales et une couleur */
  username: PropTypes.string,
  /** État pressé (contrôlé depuis l'extérieur) */
  isPressed: PropTypes.bool,
  /** État désactivé */
  isDisabled: PropTypes.bool,
  /** Si le compte est vérifié */
  isVerified: PropTypes.bool,
  /** Texte de secours si pas d'image ni username */
  fallbackText: PropTypes.string,
  /** Fonction appelée lors du clic */
  onClick: PropTypes.func,
  /** Classes CSS additionnelles */
  className: PropTypes.string,
};

export default Avatar; 
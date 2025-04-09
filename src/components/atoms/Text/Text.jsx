import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Text.css';
import { colors } from '../../../styles';

/**
 * Composant Text pour afficher du texte stylisé selon le design system
 * @param {Object} props - Les propriétés du composant
 * @returns {JSX.Element}
 */
const Text = ({
  children,
  variant = 'body-l',
  color = 'content-00',
  weight = null,
  align = 'left',
  truncate = false,
  lines = 0,
  className = '',
  isPressed = false,
  isDisabled = false,
  onClick = null,
  ...props
}) => {
  // État local pour le state pressed (utilisé uniquement si onClick est fourni)
  const [isPressedInternal, setIsPressedInternal] = useState(false);
  
  // Classs CSS en fonction des props
  const textClasses = [
    'text',
    `text-${variant}`,
    `text-${color}`,
    weight ? `text-weight-${weight}` : '',
    `text-align-${align}`,
    truncate ? 'text-truncate' : '',
    lines > 0 ? 'text-multiline' : '',
    (isPressed || isPressedInternal) ? 'text-pressed' : '',
    isDisabled ? 'text-disabled' : '',
    onClick ? 'text-clickable' : '',
    className
  ].filter(Boolean).join(' ');

  // Styles inline pour limiter le nombre de lignes si nécessaire
  const textStyle = lines > 0 ? {
    WebkitLineClamp: lines,
  } : {};

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

  return (
    <span
      className={textClasses}
      style={textStyle}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onTouchCancel={handleMouseUp}
      {...props}
    >
      {children}
    </span>
  );
};

Text.propTypes = {
  /** Contenu du texte */
  children: PropTypes.node.isRequired,
  /** Style de texte à appliquer */
  variant: PropTypes.oneOf(['title', 'h1', 'h2', 'h3', 'h4', 'body-l', 'body-m', 'caption', 'button']),
  /** Couleur du texte */
  color: PropTypes.string,
  /** Graisse de la police (optionnel) */
  weight: PropTypes.oneOf(['light', 'regular', 'medium', 'semibold', 'bold', null]),
  /** Alignement du texte */
  align: PropTypes.oneOf(['left', 'center', 'right']),
  /** Tronquer le texte avec ellipsis si trop long */
  truncate: PropTypes.bool,
  /** Nombre max de lignes (0 = pas de limite) */
  lines: PropTypes.number,
  /** Classes CSS additionnelles */
  className: PropTypes.string,
  /** État pressé (contrôlé depuis l'extérieur) */
  isPressed: PropTypes.bool,
  /** État désactivé */
  isDisabled: PropTypes.bool,
  /** Fonction appelée lors du clic */
  onClick: PropTypes.func,
};

export default Text; 
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Icon.css';
import { colors } from '../../../styles';

/**
 * Composant générique pour afficher des icônes SVG
 * Gère le chargement des icônes depuis des fichiers ou directement via la prop svgContent
 * @param {Object} props - Les propriétés du composant
 * @returns {JSX.Element}
 */
const Icon = ({
  src = '',
  svgContent = '',
  size = 'md',
  color = null,
  label = '',
  isPressed = false,
  isDisabled = false,
  onClick = null,
  className = '',
  ...props
}) => {
  // État local
  const [svgString, setSvgString] = useState(svgContent);
  const [isPressedInternal, setIsPressedInternal] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Charger le SVG depuis src si nécessaire
  useEffect(() => {
    if (src && !svgContent) {
      const loadSvg = async () => {
        try {
          const response = await fetch(src);
          const text = await response.text();
          // Ajouter style="pointer-events: none;" à l'élément SVG
          const modifiedSvg = text.replace('<svg', '<svg style="pointer-events: none;"');
          setSvgString(modifiedSvg);
        } catch (error) {
          console.error('Erreur lors du chargement de l\'icône SVG:', error);
          setHasError(true);
        }
      };
      
      loadSvg();
    }
  }, [src, svgContent]);

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

  // Déterminer si l'icône est pressée
  const isPressedFinal = isPressed || isPressedInternal;

  // Classes CSS
  const iconClasses = [
    'icon',
    `icon--${size}`,
    color ? `icon--${color}` : '',
    isPressedFinal ? 'icon--pressed' : '',
    isDisabled ? 'icon--disabled' : '',
    onClick ? 'icon--clickable' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={iconClasses}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onTouchCancel={handleMouseUp}
      aria-label={label}
      role={label ? 'img' : undefined}
      aria-disabled={isDisabled}
      {...props}
    >
      {svgString ? (
        <div dangerouslySetInnerHTML={{ __html: svgString }} className="icon__content" />
      ) : hasError ? (
        <div className="icon__error">!</div>
      ) : null}
      
      {/* Élément caché pour l'accessibilité si nécessaire */}
      {label && <span className="visually-hidden">{label}</span>}
    </div>
  );
};

Icon.propTypes = {
  /** URL du fichier SVG (optionnel si svgContent est fourni) */
  src: PropTypes.string,
  /** Contenu SVG direct (optionnel si src est fourni) */
  svgContent: PropTypes.string,
  /** Taille de l'icône */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  /** Couleur de l'icône (utilise les classes prédéfinies) */
  color: PropTypes.string,
  /** Texte alternatif pour l'accessibilité */
  label: PropTypes.string,
  /** État pressé (contrôlé depuis l'extérieur) */
  isPressed: PropTypes.bool,
  /** État désactivé */
  isDisabled: PropTypes.bool,
  /** Fonction appelée lors du clic */
  onClick: PropTypes.func,
  /** Classes CSS additionnelles */
  className: PropTypes.string,
};

export default Icon; 
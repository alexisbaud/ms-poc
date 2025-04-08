import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Button.css';
import { colors } from '../../../styles';

/**
 * Composant Button
 */
const Button = ({
  children,
  // Nouvelles props
  variant = 'primary',
  // Props de compatibilité avec l'ancienne version
  importance,
  style: styleProp,
  isDisabled,
  isFullWidth,
  // Props actuelles
  size = 'md',
  icon = null,
  iconVariant = 'left',
  iconSize = null,
  disabled = false,
  fullWidth = false,
  square = false,
  onClick,
  style,
  className = '',
  type = 'button',
  loading = false,
  ...props
}) => {
  // État pour gérer l'état pressé
  const [isPressed, setIsPressed] = useState(false);

  // Gestionnaires d'événements pour l'état pressé
  const handlePressStart = () => {
    if (!disabled && !isDisabled && !loading) {
      setIsPressed(true);
    }
  };

  const handlePressEnd = () => {
    setIsPressed(false);
  };

  // Gérer la rétrocompatibilité
  // Si importance est défini, l'utiliser comme variant
  const finalVariant = importance || variant;
  // Si styleProp est une chaîne, c'est l'ancien format (style="color")
  const isLegacyStyle = typeof styleProp === 'string';
  // Styles CSS inline (seulement si ce n'est pas un legacy style)
  const inlineStyle = isLegacyStyle ? {} : style;
  // Valeur pour les classes CSS
  const styleValue = isLegacyStyle ? styleProp : 'primary'; // default
  // Flags d'état
  const isDisabledFinal = isDisabled || disabled;
  const isFullWidthFinal = isFullWidth || fullWidth;
  
  // Taille de l'icône en fonction de la taille du bouton, si non spécifiée
  const computedIconSize = iconSize || (size === 'sm' ? 16 : size === 'md' ? 20 : 24);
  
  // Construction des classes CSS
  const buttonClass = [
    'button',
    isLegacyStyle ? `button--${styleValue}` : '',
    `button--${finalVariant}`,
    `button--${size}`,
    isFullWidthFinal ? 'button--full-width' : '',
    isDisabledFinal ? 'button--disabled' : '',
    square ? 'button--square' : '',
    loading ? 'button--loading' : '',
    isPressed ? 'button--pressed' : '',
    icon && iconVariant === 'only' ? 'button--icon-only' : '',
    icon && iconVariant !== 'only' ? `button--icon-${iconVariant}` : '',
    className
  ].filter(Boolean).join(' ');

  // Rendu de l'icône
  const renderIcon = (position) => {
    if (!icon) return null;

    // Si l'icône est une chaîne (SVG string), utiliser dangerouslySetInnerHTML
    if (typeof icon === 'string') {
      return (
        <span
          className={`button__icon button__icon--${position}`}
          dangerouslySetInnerHTML={{ __html: icon }}
          style={{ width: computedIconSize, height: computedIconSize }}
        />
      );
    }
    
    // Sinon, c'est un ReactNode, on le rend directement
    return (
      <span
        className={`button__icon button__icon--${position}`}
        style={{ width: computedIconSize, height: computedIconSize }}
      >
        {icon}
      </span>
    );
  };
  
  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={isDisabledFinal || loading}
      style={inlineStyle}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      onTouchCancel={handlePressEnd}
      {...props}
    >
      {loading && (
        <div className="button__loader">
          <div className="button__loader-spinner"></div>
        </div>
      )}
      
      {icon && (iconVariant === 'left' || iconVariant === 'only') && 
        renderIcon('before')}
      
      {iconVariant !== 'only' && (
        <span className="button__text">{children}</span>
      )}
      
      {icon && iconVariant === 'right' && 
        renderIcon('after')}
    </button>
  );
};

Button.propTypes = {
  /** Contenu du bouton */
  children: PropTypes.node,
  /** Variante visuelle du bouton */
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'toned', 'ghost', 'danger']),
  /** Taille du bouton */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Icône du bouton (ReactNode ou SVG string) */
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  /** Position de l'icône ou "only" pour icône uniquement */
  iconVariant: PropTypes.oneOf(['left', 'right', 'only']),
  /** Taille personnalisée de l'icône (en px) */
  iconSize: PropTypes.number,
  /** Bouton désactivé */
  disabled: PropTypes.bool,
  /** Bouton prenant toute la largeur disponible */
  fullWidth: PropTypes.bool,
  /** Bouton carré (hauteur = largeur) */
  square: PropTypes.bool,
  /** Fonction exécutée au clic */
  onClick: PropTypes.func,
  /** Styles CSS inline */
  style: PropTypes.object,
  /** Classes CSS additionnelles */
  className: PropTypes.string,
  /** Type HTML du bouton */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  /** État de chargement */
  loading: PropTypes.bool,
  
  // Props pour rétrocompatibilité
  /** @deprecated Utiliser variant à la place */
  importance: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'toned']),
  /** @deprecated Utiliser un autre nom de prop pour le style visuel */
  styleProp: PropTypes.string,
  /** @deprecated Utiliser disabled à la place */
  isDisabled: PropTypes.bool,
  /** @deprecated Utiliser fullWidth à la place */
  isFullWidth: PropTypes.bool,
};

export default Button; 
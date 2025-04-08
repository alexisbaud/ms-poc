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
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  style,
  className = '',
  type = 'button',
  loading = false,
  isPressed = false,
  ...props
}) => {
  // État pour gérer l'état pressé
  const [isPressedInternal, setIsPressedInternal] = useState(false);

  // Gestionnaires d'événements pour l'état pressé
  const handlePressStart = (e) => {
    if (!disabled && !isDisabled && !loading) {
      setIsPressedInternal(true);
    }
    if (onMouseDown) onMouseDown(e);
  };

  const handlePressEnd = (e) => {
    setIsPressedInternal(false);
    if (onMouseUp) onMouseUp(e);
  };
  
  const handleMouseLeave = (e) => {
    setIsPressedInternal(false);
    if (onMouseLeave) onMouseLeave(e);
  };
  
  // Normaliser iconVariant pour gérer les deux conventions (left/right et before/after)
  let normalizedIconVariant = iconVariant;
  if (iconVariant === 'before') normalizedIconVariant = 'left';
  if (iconVariant === 'after') normalizedIconVariant = 'right';

  // Gérer la rétrocompatibilité
  // Si importance est défini, l'utiliser comme variant
  const finalVariant = importance || variant;
  
  // Si styleProp est une chaîne, c'est l'ancien format (style="color")
  const isLegacyStyle = typeof styleProp === 'string';
  
  // Déterminer le style visuel (color, black, danger)
  const styleValue = isLegacyStyle ? styleProp : 'color'; // default
  
  // Styles CSS inline (seulement si ce n'est pas un legacy style)
  const inlineStyle = isLegacyStyle ? {} : style;
  
  // Flags d'état
  const isDisabledFinal = isDisabled || disabled;
  const isFullWidthFinal = isFullWidth || fullWidth;
  
  // Taille de l'icône en fonction de la taille du bouton, si non spécifiée
  const computedIconSize = iconSize || (
    size === 'xs' ? 16 : 
    size === 'sm' ? 20 : 
    size === 'md' ? 24 : 
    28 // lg
  );
  
  // Combiner l'état pressé interne et externe
  const isPressedFinal = isPressed || isPressedInternal;
  
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
    isPressedFinal ? 'button--pressed' : '',
    icon && normalizedIconVariant === 'only' ? 'button--icon-only' : '',
    icon && normalizedIconVariant !== 'only' ? `button--icon-${normalizedIconVariant}` : '',
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
      onMouseLeave={handleMouseLeave}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      onTouchCancel={handleMouseLeave}
      {...props}
    >
      {loading && (
        <div className="button__loader">
          <div className="button__loader-spinner"></div>
        </div>
      )}
      
      {icon && (normalizedIconVariant === 'left' || normalizedIconVariant === 'only') && 
        renderIcon('before')}
      
      {normalizedIconVariant !== 'only' && (
        <span className="button__text">{children}</span>
      )}
      
      {icon && normalizedIconVariant === 'right' && 
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
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  /** Icône du bouton (ReactNode ou SVG string) */
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  /** Position de l'icône ou "only" pour icône uniquement */
  iconVariant: PropTypes.oneOf(['left', 'right', 'only', 'before', 'after']),
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
  /** Gestionnaire d'événement de souris enfoncée */
  onMouseDown: PropTypes.func,
  /** Gestionnaire d'événement de souris relâchée */
  onMouseUp: PropTypes.func,
  /** Gestionnaire d'événement quand la souris quitte le bouton */
  onMouseLeave: PropTypes.func,
  /** Styles CSS inline */
  style: PropTypes.object,
  /** Classes CSS additionnelles */
  className: PropTypes.string,
  /** Type HTML du bouton */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  /** État de chargement */
  loading: PropTypes.bool,
  /** État pressé contrôlé depuis l'extérieur */
  isPressed: PropTypes.bool,
  
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
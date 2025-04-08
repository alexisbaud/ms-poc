import { useState } from 'react';
import PropTypes from 'prop-types';
import './Button.css';

/**
 * Composant Button réutilisable
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.children - Le contenu du bouton
 * @param {string} props.importance - L'importance du bouton (primary, toned, secondary, tertiary)
 * @param {string} props.style - Le style du bouton (black, color, danger)
 * @param {string} props.size - La taille du bouton (sm, md, lg)
 * @param {string} props.iconVariant - La variante d'icône (none, before, after)
 * @param {boolean} props.isFullWidth - Si le bouton doit prendre toute la largeur
 * @param {boolean} props.isDisabled - Si le bouton est désactivé
 * @param {Function} props.onClick - Fonction appelée au clic
 * @param {React.ElementType} props.icon - L'icône à afficher
 * @param {string} props.iconSize - Taille de l'icône (en pixels)
 * @returns {JSX.Element}
 */
const Button = ({ 
  children, 
  importance = 'primary', 
  style = 'color', 
  size = 'md', 
  iconVariant = 'none', 
  isFullWidth = false,
  isDisabled = false,
  onClick,
  icon: Icon,
  iconSize = '16',
  ...rest
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleClick = (e) => {
    if (!isDisabled && onClick) {
      onClick(e);
    }
  };

  // Validation: Toned n'existe pas pour le style Black
  const finalImportance = style === 'black' && importance === 'toned' ? 'primary' : importance;

  const buttonClasses = [
    'button',
    `button--${style}`,
    `button--${finalImportance}`,
    `button--${size}`,
    `button--icon-${iconVariant}`,
    isFullWidth ? 'button--full-width' : '',
    isDisabled ? 'button--disabled' : '',
    isPressed ? 'button--pressed' : ''
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      disabled={isDisabled}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => setIsPressed(false)}
      {...rest}
    >
      {iconVariant === 'before' && Icon && <Icon size={iconSize} className="button__icon button__icon--before" />}
      <span className="button__text">{children}</span>
      {iconVariant === 'after' && Icon && <Icon size={iconSize} className="button__icon button__icon--after" />}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  importance: PropTypes.oneOf(['primary', 'toned', 'secondary', 'tertiary']),
  style: PropTypes.oneOf(['black', 'color', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  iconVariant: PropTypes.oneOf(['none', 'before', 'after']),
  isFullWidth: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  icon: PropTypes.elementType,
  iconSize: PropTypes.string,
};

export default Button; 
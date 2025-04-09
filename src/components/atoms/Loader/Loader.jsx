import React from 'react';
import PropTypes from 'prop-types';
import './Loader.css';
import { colors } from '../../../styles';

/**
 * Composant de chargement animé
 * @param {Object} props - Les propriétés du composant
 * @returns {JSX.Element}
 */
const Loader = ({
  size = 'md',
  variant = 'color',
  visible = true,
  fullPage = false,
  overlay = false,
  label = 'Chargement en cours...',
  isPressed = false,
  isDisabled = false,
  className = '',
  ...props
}) => {
  // N'affiche rien si non visible
  if (!visible) return null;
  
  // Classes CSS
  const loaderClasses = [
    'loader',
    `loader--${size}`,
    `loader--${variant}`,
    fullPage ? 'loader--full-page' : '',
    overlay ? 'loader--overlay' : '',
    isPressed ? 'loader--pressed' : '',
    isDisabled ? 'loader--disabled' : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div className={loaderClasses} role="status" {...props}>
      <div className="loader__spinner">
        <div className="loader__circle"></div>
        <div className="loader__circle"></div>
        <div className="loader__circle"></div>
      </div>
      {label && <span className="loader__label">{label}</span>}
      <span className="visually-hidden">Chargement</span>
    </div>
  );
};

Loader.propTypes = {
  /** Taille du loader */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  /** Variante visuelle */
  variant: PropTypes.oneOf(['color', 'black', 'white']),
  /** Si le loader est visible */
  visible: PropTypes.bool,
  /** Si le loader prend toute la page */
  fullPage: PropTypes.bool,
  /** Si le loader s'affiche avec un overlay */
  overlay: PropTypes.bool,
  /** Texte affiché sous le loader */
  label: PropTypes.string,
  /** État pressé (généralement non utilisé pour un loader) */
  isPressed: PropTypes.bool,
  /** État désactivé (généralement non utilisé pour un loader) */
  isDisabled: PropTypes.bool,
  /** Classes CSS additionnelles */
  className: PropTypes.string,
};

export default Loader; 
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Toaster.css';
import { colors } from '../../../styles';
import Icon from '../Icon';

// Icônes SVG pour les différents types de toast
const successIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9 16.2L4.8 12L3.4 13.4L9 19L21 7L19.6 5.6L9 16.2Z" fill="currentColor" />
</svg>`;

const errorIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor" />
</svg>`;

const infoIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z" fill="currentColor" />
</svg>`;

const closeIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor" />
</svg>`;

/**
 * Composant de notification temporaire (toast)
 * @param {Object} props - Les propriétés du composant
 * @returns {JSX.Element}
 */
const Toaster = ({
  message = '',
  type = 'info',
  autoClose = true,
  duration = 3000,
  position = 'bottom',
  onClose = null,
  isVisible = false,
  isPressed = false,
  isDisabled = false,
  className = '',
  ...props
}) => {
  // États
  const [isVisibleInternal, setIsVisibleInternal] = useState(isVisible);
  const [isPressedInternal, setIsPressedInternal] = useState(false);
  
  // Fermeture automatique après duration
  useEffect(() => {
    setIsVisibleInternal(isVisible);
    
    let timer;
    if (isVisible && autoClose) {
      timer = setTimeout(() => {
        setIsVisibleInternal(false);
        if (onClose) onClose();
      }, duration);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isVisible, autoClose, duration, onClose]);
  
  // Handlers
  const handleClose = () => {
    setIsVisibleInternal(false);
    if (onClose) onClose();
  };
  
  const handleMouseDown = () => {
    if (!isDisabled) {
      setIsPressedInternal(true);
    }
  };
  
  const handleMouseUp = () => {
    if (!isDisabled) {
      setIsPressedInternal(false);
    }
  };
  
  // Icône en fonction du type
  const getIcon = () => {
    switch (type) {
      case 'success': return successIcon;
      case 'error': return errorIcon;
      case 'info':
      default: return infoIcon;
    }
  };
  
  // Si pas visible, ne rien rendre
  if (!isVisibleInternal) return null;
  
  // Classes CSS
  const toastClasses = [
    'toaster',
    `toaster--${type}`,
    `toaster--${position}`,
    (isPressed || isPressedInternal) ? 'toaster--pressed' : '',
    isDisabled ? 'toaster--disabled' : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div 
      className={toastClasses}
      role="alert"
      {...props}
    >
      <div className="toaster__icon">
        <Icon svgContent={getIcon()} size="md" />
      </div>
      
      <div className="toaster__message">
        {message}
      </div>
      
      <button
        type="button"
        className="toaster__close"
        onClick={handleClose}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        onTouchCancel={handleMouseUp}
        aria-label="Fermer"
      >
        <Icon svgContent={closeIcon} size="sm" />
      </button>
    </div>
  );
};

Toaster.propTypes = {
  /** Message à afficher */
  message: PropTypes.string.isRequired,
  /** Type du toast (affecte la couleur et l'icône) */
  type: PropTypes.oneOf(['info', 'success', 'error']),
  /** Fermeture automatique après duration */
  autoClose: PropTypes.bool,
  /** Durée avant la fermeture automatique (en ms) */
  duration: PropTypes.number,
  /** Position sur l'écran */
  position: PropTypes.oneOf(['top', 'bottom']),
  /** Fonction appelée lors de la fermeture */
  onClose: PropTypes.func,
  /** Contrôle de la visibilité depuis l'extérieur */
  isVisible: PropTypes.bool,
  /** État pressé (contrôlé depuis l'extérieur) */
  isPressed: PropTypes.bool,
  /** État désactivé */
  isDisabled: PropTypes.bool,
  /** Classes CSS additionnelles */
  className: PropTypes.string,
};

export default Toaster; 
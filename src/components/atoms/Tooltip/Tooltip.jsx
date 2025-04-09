import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Tooltip.css';
import { colors } from '../../../styles';

/**
 * Composant infobulle pour afficher des textes d'aide
 * @param {Object} props - Les propriétés du composant
 * @returns {JSX.Element}
 */
const Tooltip = ({
  content = '',
  position = 'top',
  children,
  size = 'md',
  variant = 'dark',
  trigger = 'hover',
  isVisible = false,
  isPressed = false,
  isDisabled = false,
  className = '',
  ...props
}) => {
  // États
  const [isVisibleInternal, setIsVisibleInternal] = useState(isVisible);
  const [isPressedInternal, setIsPressedInternal] = useState(false);
  
  // Référence pour gérer le clic à l'extérieur et le positionnement
  const tooltipRef = useRef(null);
  const triggerRef = useRef(null);
  
  // Utilisation de useEffect pour mettre à jour l'état interne si isVisible change
  useEffect(() => {
    setIsVisibleInternal(isVisible);
  }, [isVisible]);
  
  // Gestionnaire de clic à l'extérieur
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isVisibleInternal &&
        trigger === 'click' &&
        tooltipRef.current &&
        triggerRef.current &&
        !tooltipRef.current.contains(e.target) &&
        !triggerRef.current.contains(e.target)
      ) {
        setIsVisibleInternal(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisibleInternal, trigger]);
  
  // Handlers
  const handleMouseOver = () => {
    if (!isDisabled && trigger === 'hover') {
      setIsVisibleInternal(true);
    }
  };
  
  const handleMouseOut = () => {
    if (!isDisabled && trigger === 'hover') {
      setIsVisibleInternal(false);
    }
  };
  
  const handleClick = () => {
    if (!isDisabled && trigger === 'click') {
      setIsVisibleInternal(!isVisibleInternal);
    }
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
  
  // Classes CSS
  const tooltipClasses = [
    'tooltip',
    `tooltip--${size}`,
    `tooltip--${variant}`,
    `tooltip--${position}`,
    isVisibleInternal ? 'tooltip--visible' : '',
    (isPressed || isPressedInternal) ? 'tooltip--pressed' : '',
    isDisabled ? 'tooltip--disabled' : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div className="tooltip-wrapper">
      <div 
        ref={triggerRef}
        className={`tooltip-trigger ${trigger === 'click' ? 'tooltip-trigger--clickable' : ''}`}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        onTouchCancel={handleMouseUp}
      >
        {children}
      </div>
      
      <div 
        ref={tooltipRef}
        className={tooltipClasses}
        role="tooltip"
        {...props}
      >
        <div className="tooltip__content">{content}</div>
        <div className="tooltip__arrow"></div>
      </div>
    </div>
  );
};

Tooltip.propTypes = {
  /** Contenu de l'infobulle */
  content: PropTypes.node.isRequired,
  /** Élément sur lequel l'infobulle est attachée */
  children: PropTypes.node.isRequired,
  /** Position de l'infobulle par rapport à l'élément */
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  /** Taille de l'infobulle */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Variante visuelle */
  variant: PropTypes.oneOf(['light', 'dark', 'color']),
  /** Mécanisme de déclenchement */
  trigger: PropTypes.oneOf(['hover', 'click']),
  /** Contrôle de la visibilité depuis l'extérieur */
  isVisible: PropTypes.bool,
  /** État pressé (contrôlé depuis l'extérieur) */
  isPressed: PropTypes.bool,
  /** État désactivé */
  isDisabled: PropTypes.bool,
  /** Classes CSS additionnelles */
  className: PropTypes.string,
};

export default Tooltip; 
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './NavBarEntry.css';
import { colors } from '../../../styles';

/**
 * Composant NavBarEntry pour la barre de navigation mobile
 * Affiche une icône avec différents états (sélectionné, non sélectionné, désactivé, pressé)
 */
const NavBarEntry = ({
  icon,
  isSelected,
  isDisabled,
  onClick,
  className,
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);
  
  // Rendu de l'icône
  const renderIcon = () => {
    if (!icon) return null;
    
    // Si c'est une chaîne SVG
    if (typeof icon === 'string') {
      // Modification du SVG pour ajouter pointer-events: none
      const modifiedSvg = icon.replace('<svg', '<svg style="pointer-events: none;"');
      
      return (
        <div 
          className="navbar-entry__icon"
          dangerouslySetInnerHTML={{ __html: modifiedSvg }}
          style={{ 
            color: isSelected 
              ? colors.content['00'] // #161616 pour selected (content.00)
              : colors.content['02'] // #6F6F6F pour unselected
          }}
        />
      );
    }
    
    // Si c'est un composant React
    return (
      <div 
        className="navbar-entry__icon"
        style={{ 
          color: isSelected 
            ? colors.content['00'] // #161616 pour selected (content.00)
            : colors.content['02'] // #6F6F6F pour unselected
        }}
      >
        {icon}
      </div>
    );
  };

  // Gestion des événements tactiles
  const handleTouchStart = () => {
    if (!isDisabled) setIsPressed(true);
  };

  const handleTouchEnd = () => {
    setIsPressed(false);
  };

  const handleClick = (e) => {
    if (!isDisabled && onClick) onClick(e);
  };

  // Classes CSS conditionnelles
  const entryClasses = [
    'navbar-entry',
    isSelected ? 'navbar-entry--selected' : 'navbar-entry--unselected',
    isDisabled ? 'navbar-entry--disabled' : '',
    isPressed ? 'navbar-entry--pressed' : '',
    className || ''
  ].filter(Boolean).join(' ');

  return (
    <div
      className={entryClasses}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
      {...props}
    >
      {renderIcon()}
    </div>
  );
};

NavBarEntry.propTypes = {
  /** Icône à afficher (chaîne SVG ou composant React) */
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  /** Indique si l'entrée est sélectionnée */
  isSelected: PropTypes.bool,
  /** Indique si l'entrée est désactivée */
  isDisabled: PropTypes.bool,
  /** Fonction à exécuter au clic */
  onClick: PropTypes.func,
  /** Classes CSS additionnelles */
  className: PropTypes.string
};

NavBarEntry.defaultProps = {
  isSelected: false,
  isDisabled: false,
  onClick: null,
  className: ''
};

export default NavBarEntry; 
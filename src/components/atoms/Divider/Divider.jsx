import PropTypes from 'prop-types';
import './Divider.css';
import { colors } from '../../../styles';

/**
 * Composant Divider utilisé pour séparer visuellement des sections
 * Trois variantes disponibles : ligne simple, ligne avec label, ou ligne épaisse avec bords arrondis
 */
const Divider = ({ 
  label,
  className,
  variant,
  ...props
}) => {
  // Détermine si on utilise la variante avec label ou non
  const hasLabel = !!label;
  const isThick = variant === 'thick';
  const dividerClass = `divider ${hasLabel ? 'divider--with-label' : ''} ${isThick ? 'divider--thick' : ''} ${className || ''}`;

  return (
    <div className={dividerClass} {...props}>
      {hasLabel ? (
        <>
          <div className="divider__line" style={{ backgroundColor: colors.content['04Through'] }}></div>
          <span className="divider__label" style={{ color: colors.content['03Through'] }}>{label}</span>
          <div className="divider__line" style={{ backgroundColor: colors.content['04Through'] }}></div>
        </>
      ) : isThick ? (
        <div className="divider--thick-line" style={{ backgroundColor: colors.content['05Through'] }}></div>
      ) : (
        <div className="divider--line" style={{ backgroundColor: colors.content['04Through'] }}></div>
      )}
    </div>
  );
};

Divider.propTypes = {
  /** Texte à afficher au centre du divider (optionnel) */
  label: PropTypes.string,
  /** Classes CSS additionnelles (optionnel) */
  className: PropTypes.string,
  /** Variante du divider: 'default' ou 'thick' */
  variant: PropTypes.oneOf(['default', 'thick']),
};

Divider.defaultProps = {
  label: '',
  className: '',
  variant: 'default',
};

export default Divider; 
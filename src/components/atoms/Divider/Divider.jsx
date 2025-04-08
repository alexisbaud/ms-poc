import PropTypes from 'prop-types';
import './Divider.css';
import { colors } from '../../../styles';

/**
 * Composant Divider utilisé pour séparer visuellement des sections
 * Deux variantes disponibles : ligne simple ou ligne avec label
 */
const Divider = ({ 
  label,
  className,
  ...props
}) => {
  // Détermine si on utilise la variante avec label ou non
  const hasLabel = !!label;
  const dividerClass = `divider ${hasLabel ? 'divider--with-label' : ''} ${className || ''}`;

  return (
    <div className={dividerClass} {...props}>
      {hasLabel ? (
        <>
          <div className="divider__line" style={{ backgroundColor: colors.content['04Through'] }}></div>
          <span className="divider__label" style={{ color: colors.content['03Through'] }}>{label}</span>
          <div className="divider__line" style={{ backgroundColor: colors.content['04Through'] }}></div>
        </>
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
};

Divider.defaultProps = {
  label: '',
  className: '',
};

export default Divider; 
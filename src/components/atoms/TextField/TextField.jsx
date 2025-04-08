import { useState, useRef, forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import './TextField.css';
import { colors } from '../../../styles';
import Button from '../Button';
import { smartScrollToElement } from '../../../utils/scrollUtils';

// Compteur global pour générer des IDs uniques
let uniqueIdCounter = 0;

/**
 * Composant TextField réutilisable
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.id - ID personnalisé pour le champ (optionnel)
 * @param {string} props.label - Le label du champ
 * @param {string} props.placeholder - Le placeholder du champ
 * @param {string} props.type - Le type du champ (free, password, formatted)
 * @param {string} props.value - La valeur du champ
 * @param {Function} props.onChange - Fonction appelée lors d'un changement
 * @param {boolean} props.multiline - Si le champ doit être multiline (uniquement pour type 'free')
 * @param {boolean} props.isDisabled - Si le champ est désactivé
 * @param {RegExp} props.format - Expression régulière pour valider le format (uniquement pour type 'formatted')
 * @param {string} props.errorMessage - Message d'erreur personnalisé
 * @param {number} props.rows - Nombre de lignes pour un champ multiline
 * @param {Function} props.onBlur - Fonction appelée quand le champ perd le focus
 * @param {Function} props.onFocus - Fonction appelée quand le champ prend le focus
 * @returns {JSX.Element}
 */
const TextField = forwardRef(({ 
  id,
  label,
  placeholder = '',
  type = 'free',
  value = '',
  onChange,
  multiline = false,
  isDisabled = false,
  format,
  errorMessage = 'Format invalide',
  rows = 3,
  onBlur,
  onFocus,
  ...rest
}, ref) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isToggleButtonPressed, setIsToggleButtonPressed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isFilled, setIsFilled] = useState(!!value);
  const [currentErrorMessage, setCurrentErrorMessage] = useState('');
  
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const actualRef = ref || inputRef;
  
  // Générer un ID unique pour le champ si non fourni
  const fieldId = useRef(id || `textfield-${label?.toLowerCase().replace(/\s+/g, '-') || 'input'}-${uniqueIdCounter++}`);
  
  // Déterminer si le champ a une valeur et mettre à jour l'état
  useEffect(() => {
    setIsFilled(!!value);
    
    // Valider le format si nécessaire
    if (type === 'formatted' && value && format) {
      const isValid = format.test(value);
      setIsError(!isValid);
      setCurrentErrorMessage(!isValid ? errorMessage : '');
    } else {
      setIsError(false);
      setCurrentErrorMessage('');
    }
  }, [value, type, format, errorMessage]);
  
  const handleMouseDown = (e) => {
    if (!isDisabled) {
      setIsPressed(true);
    }
  };
  
  const handleMouseUp = (e) => {
    if (!isDisabled) {
      setIsPressed(false);
    }
  };
  
  const handleMouseLeave = (e) => {
    if (!isDisabled) {
      setIsPressed(false);
    }
  };
  
  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
    
    if (type === 'formatted' && format) {
      const isValid = format.test(e.target.value);
      setIsError(!isValid && e.target.value !== '');
      setCurrentErrorMessage(!isValid && e.target.value !== '' ? errorMessage : '');
    }
  };
  
  const handleFocus = (e) => {
    // Défilement intelligent vers l'élément seulement si nécessaire
    // Utilise la même logique pour tous les champs que pour le textarea
    if (containerRef.current) {
      smartScrollToElement(containerRef.current, {
        onlyIfBelow: true, // Ne défile que si l'élément est sous le centre de l'écran
        behavior: 'smooth',
        block: 'center'
      });
    }
    
    if (onFocus) {
      onFocus(e);
    }
  };
  
  const handleBlur = (e) => {
    setIsPressed(false);
    if (onBlur) {
      onBlur(e);
    }
  };
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  // Focuser l'input lors du clic sur le conteneur
  const handleContainerClick = () => {
    if (!isDisabled && actualRef.current) {
      actualRef.current.focus();
    }
  };
  
  const textfieldClasses = [
    'textfield',
    isFilled && !isDisabled ? 'textfield--filled' : '',
    isPressed ? 'textfield--pressed' : '',
    isDisabled ? 'textfield--disabled' : '',
    isError ? 'textfield--error' : '',
    type === 'password' ? 'textfield--password' : '',
    multiline && type === 'free' ? 'textfield--multiline' : ''
  ].filter(Boolean).join(' ');
  
  // Déterminer le type HTML de l'input
  const getInputType = () => {
    if (type === 'password') {
      return showPassword ? 'text' : 'password';
    }
    return 'text';
  };
  
  const renderInput = () => {
    const inputProps = {
      id: fieldId.current,
      className: 'textfield__input',
      value,
      onChange: handleChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
      disabled: isDisabled,
      placeholder,
      ref: actualRef,
      ...rest
    };
    
    if (multiline && type === 'free') {
      return (
        <textarea 
          {...inputProps}
          rows={rows}
        />
      );
    }
    
    return (
      <input 
        {...inputProps}
        type={getInputType()}
      />
    );
  };
  
  return (
    <div 
      className={textfieldClasses}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onTouchCancel={handleMouseLeave}
      ref={containerRef}
    >
      <div 
        className="textfield__container"
        onClick={handleContainerClick}
      >
        <div className="textfield__text-container">
          <label 
            htmlFor={fieldId.current}
            className="textfield__label"
          >
            {label || 'Label/placeholder'}
          </label>
          {renderInput()}
        </div>
        
        {type === 'password' && (
          <Button 
            variant="tertiary"
            style="black"
            size="md"
            className="textfield__toggle-button"
            onClick={(e) => {
              e.stopPropagation(); // Empêcher le clic de se propager au conteneur
              toggleShowPassword();
            }}
            tabIndex="-1"
            aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
            icon={showPassword ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
            iconVariant="only"
            onMouseDown={(e) => {
              e.stopPropagation(); // Empêcher que l'événement remonte
              setIsToggleButtonPressed(true);
            }}
            onMouseUp={(e) => {
              e.stopPropagation();
              setIsToggleButtonPressed(false);
            }}
            onMouseLeave={() => setIsToggleButtonPressed(false)}
            isPressed={isToggleButtonPressed}
          />
        )}
      </div>
      <div className="textfield__error-message">
        {currentErrorMessage}
      </div>
    </div>
  );
});

TextField.displayName = 'TextField';

TextField.propTypes = {
  /** ID personnalisé pour le champ (optionnel) */
  id: PropTypes.string,
  /** Label du champ */
  label: PropTypes.string,
  /** Texte affiché quand le champ est vide */
  placeholder: PropTypes.string,
  /** Type de champ: free (défaut), password, ou formatted */
  type: PropTypes.oneOf(['free', 'password', 'formatted']),
  /** Valeur actuelle du champ */
  value: PropTypes.string,
  /** Gestionnaire d'événement pour les changements */
  onChange: PropTypes.func,
  /** Si le champ doit être multilignes (uniquement pour type 'free') */
  multiline: PropTypes.bool,
  /** Si le champ est désactivé */
  isDisabled: PropTypes.bool,
  /** Expression régulière pour valider le format (uniquement pour type 'formatted') */
  format: PropTypes.instanceOf(RegExp),
  /** Message d'erreur affiché lorsque le format est invalide */
  errorMessage: PropTypes.string,
  /** Nombre de lignes pour le champ multiline */
  rows: PropTypes.number,
  /** Gestionnaire d'événement quand le champ perd le focus */
  onBlur: PropTypes.func,
  /** Gestionnaire d'événement quand le champ prend le focus */
  onFocus: PropTypes.func
};

export default TextField; 
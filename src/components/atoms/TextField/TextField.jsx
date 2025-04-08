import { useState, useRef, forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import './TextField.css';
import { colors } from '../../../styles';

/**
 * Composant TextField réutilisable
 * @param {Object} props - Les propriétés du composant
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
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isFilled, setIsFilled] = useState(!!value);
  const [currentErrorMessage, setCurrentErrorMessage] = useState('');
  
  const inputRef = useRef(null);
  const actualRef = ref || inputRef;
  
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
  
  const handleMouseDown = () => {
    setIsPressed(true);
  };
  
  const handleMouseUp = () => {
    setIsPressed(false);
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
    isFilled ? 'textfield--filled' : '',
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
      id: `textfield-${label?.toLowerCase().replace(/\s+/g, '-') || 'input'}`,
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
      onMouseDown={!isDisabled ? handleMouseDown : undefined}
      onMouseUp={!isDisabled ? handleMouseUp : undefined}
      onMouseLeave={() => setIsPressed(false)}
    >
      <div 
        className="textfield__container"
        onClick={handleContainerClick}
      >
        <div className="textfield__text-container">
          <label 
            htmlFor={`textfield-${label?.toLowerCase().replace(/\s+/g, '-') || 'input'}`}
            className="textfield__label"
          >
            {label || 'Label/placeholder'}
          </label>
          {renderInput()}
        </div>
        
        {type === 'password' && (
          <button 
            type="button"
            className="textfield__icon"
            onClick={(e) => {
              e.stopPropagation(); // Empêcher le clic de se propager au conteneur
              toggleShowPassword();
            }}
            tabIndex="-1"
            aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
          >
            {showPassword ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
          </button>
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
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(['free', 'password', 'formatted']),
  value: PropTypes.string,
  onChange: PropTypes.func,
  multiline: PropTypes.bool,
  isDisabled: PropTypes.bool,
  format: PropTypes.instanceOf(RegExp),
  errorMessage: PropTypes.string,
  rows: PropTypes.number,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
};

export default TextField; 
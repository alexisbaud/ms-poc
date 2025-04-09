import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import './TextField.css';
import Text from '../../atoms/Text';

/**
 * Composant de champ de texte avec label et validation
 * @param {Object} props - Propriétés du composant
 * @returns {JSX.Element} - Élément JSX
 */
const TextField = forwardRef(({
  id,
  label,
  value,
  onChange,
  placeholder = '',
  error = null,
  helperText = '',
  multiline = false,
  rows = 1,
  disabled = false,
  required = false,
  type = 'text',
  className = '',
  maxLength,
  ...props
}, ref) => {

  // Classes CSS dynamiques
  const fieldClasses = [
    'text-field',
    error ? 'text-field--error' : '',
    disabled ? 'text-field--disabled' : '',
    multiline ? 'text-field--multiline' : '',
    className
  ].filter(Boolean).join(' ');

  // Détermine quel élément HTML utiliser (textarea ou input)
  const InputComponent = multiline ? 'textarea' : 'input';

  return (
    <div className={fieldClasses}>
      {label && (
        <label htmlFor={id} className="text-field__label">
          <Text variant="label">{label}{required && <span className="text-field__required">*</span>}</Text>
        </label>
      )}
      
      <div className="text-field__input-container">
        <InputComponent
          id={id}
          ref={ref}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          rows={multiline ? rows : undefined}
          maxLength={maxLength}
          className="text-field__input"
          {...props}
        />
      </div>
      
      {(error || helperText) && (
        <div className="text-field__helper-text">
          <Text variant="caption" color={error ? 'error' : 'secondary'}>
            {error || helperText}
          </Text>
        </div>
      )}
      
      {maxLength && (
        <div className="text-field__character-count">
          <Text variant="caption" color="secondary">
            {value.length}/{maxLength}
          </Text>
        </div>
      )}
    </div>
  );
});

TextField.displayName = 'TextField';

TextField.propTypes = {
  /** Identifiant unique du champ */
  id: PropTypes.string.isRequired,
  /** Libellé du champ */
  label: PropTypes.string,
  /** Valeur du champ */
  value: PropTypes.string.isRequired,
  /** Fonction appelée lors du changement de valeur */
  onChange: PropTypes.func.isRequired,
  /** Texte affiché lorsque le champ est vide */
  placeholder: PropTypes.string,
  /** Message d'erreur (si le champ est invalide) */
  error: PropTypes.string,
  /** Texte d'aide (affiché sous le champ) */
  helperText: PropTypes.string,
  /** Si vrai, affiche un textarea au lieu d'un input */
  multiline: PropTypes.bool,
  /** Nombre de lignes pour le textarea */
  rows: PropTypes.number,
  /** Si vrai, désactive le champ */
  disabled: PropTypes.bool,
  /** Si vrai, marque le champ comme obligatoire */
  required: PropTypes.bool,
  /** Type de l'input (text, email, password, etc.) */
  type: PropTypes.string,
  /** Classe CSS additionnelle */
  className: PropTypes.string,
  /** Nombre maximum de caractères */
  maxLength: PropTypes.number
};

export default TextField; 
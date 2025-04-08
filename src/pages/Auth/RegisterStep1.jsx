import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '../../components/atoms/TextField/TextField';
import Button from '../../components/atoms/Button/Button';
import Divider from '../../components/atoms/Divider/Divider';
import logo from '../../assets/logo.png';
import { colors } from '../../styles';
import './Auth.css';

const RegisterStep1 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  
  // Validation du format email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Validation du mot de passe
  const isValidPassword = (password) => {
    return password.length >= 8;
  };
  
  // Gestion des changements dans les champs
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    
    // Nettoyer l'erreur lorsque l'utilisateur commence à corriger
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ''
      }));
    }
  };
  
  // Validation du formulaire
  const validateForm = () => {
    const newErrors = {};
    
    // Validation de l'email
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    
    // Validation du mot de passe
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (!isValidPassword(formData.password)) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    }
    
    // Validation de la confirmation du mot de passe
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Veuillez confirmer votre mot de passe';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Stocker les données dans sessionStorage pour la seconde étape
      sessionStorage.setItem('registerStep1', JSON.stringify({
        email: formData.email,
        password: formData.password
      }));
      
      // Naviguer vers l'étape 2
      navigate('/auth/register/step2');
    }
  };
  
  // Redirection vers la page de connexion
  const goToLogin = () => {
    navigate('/auth/login');
  };
  
  return (
    <div className="auth-container">
      <div className="auth-logo-container">
        <img src={logo} alt="Microstory Logo" className="auth-logo" />
        <h1 className="auth-title text-title" style={{ color: colors.content['00'], marginTop: '8px' }}>Microstory</h1>
      </div>
      
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-field-container">
          <TextField
            id="email"
            label="E-mail"
            placeholder="exemple@email.com"
            type="formatted"
            value={formData.email}
            onChange={handleChange}
            format={isValidEmail(formData.email) ? /^.*$/ : /^$/}
            errorMessage={errors.email || "Format d'email invalide"}
          />
        </div>
        
        <div className="auth-field-container">
          <TextField
            id="password"
            label="Mot de passe"
            placeholder="Minimum 8 caractères"
            type="password"
            value={formData.password}
            onChange={handleChange}
            format={isValidPassword(formData.password) ? /^.*$/ : /^$/}
            errorMessage={errors.password || "Minimum 8 caractères"}
          />
        </div>
        
        <div className="auth-field-container">
          <TextField
            id="confirmPassword"
            label="Confirmation de mot de passe"
            placeholder="Minimum 8 caractères"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            format={formData.password === formData.confirmPassword ? /^.*$/ : /^$/}
            errorMessage={errors.confirmPassword || "Les mots de passe ne correspondent pas"}
          />
        </div>
        
        <div className="auth-actions">
          <Button
            type="submit"
            style="color"
            importance="primary"
            size="lg"
            fullWidth
          >
            Suivant
          </Button>
          
          <div style={{ marginTop: '8px' }}>
            <Button
              style="black"
              importance="tertiary"
              size="sm"
              fullWidth
              onClick={goToLogin}
            >
              J'ai déjà un compte
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterStep1; 
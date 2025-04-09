import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TextField from '../../components/atoms/TextField/TextField';
import Button from '../../components/atoms/Button/Button';
import Divider from '../../components/atoms/Divider/Divider';
import logo from '../../assets/logo.png';
import { colors } from '../../styles';
import { checkEmailExists } from '../../services/auth';
import './Auth.css';

const RegisterStep1 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pressedStates, setPressedStates] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    submit: false,
    login: false
  });
  
  // Récupérer l'erreur de l'état de navigation (s'il y en a une)
  useEffect(() => {
    if (location.state && location.state.error) {
      setGlobalError(location.state.error);
      setErrors(prev => ({
        ...prev,
        email: location.state.error
      }));
      
      // Nettoyage de l'état pour éviter que l'erreur persiste après actualisation
      window.history.replaceState({}, document.title);
    }
  }, [location]);
  
  // Validation du format email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Validation du mot de passe avec exigences plus strictes
  const isValidPassword = (password) => {
    // Au moins 8 caractères, 1 lettre, 1 chiffre
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };
  
  // Gestion des changements dans les champs
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    
    // Nettoyer les erreurs lorsque l'utilisateur commence à corriger
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ''
      }));
    }
    if (globalError) {
      setGlobalError('');
    }
  };

  // Vérification si l'email est déjà utilisé
  const checkEmailAlreadyExists = async (email) => {
    try {
      return await checkEmailExists(email);
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'email:', error);
      return false; // En cas d'erreur, on suppose que l'email n'existe pas
    }
  };
  
  // Validation du formulaire
  const validateForm = async () => {
    const newErrors = {};
    let hasError = false;
    
    // Validation de l'email
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
      hasError = true;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
      hasError = true;
    } else {
      try {
        // Vérifier si l'email est déjà utilisé
        const emailExists = await checkEmailAlreadyExists(formData.email);
        if (emailExists) {
          newErrors.email = 'Cet email est déjà associé à un compte';
          hasError = true;
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de l'email:", error);
        newErrors.email = 'Erreur lors de la vérification de l\'email';
        hasError = true;
      }
    }
    
    // Validation du mot de passe
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
      hasError = true;
    } else if (!isValidPassword(formData.password)) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères, une lettre et un chiffre';
      hasError = true;
    }
    
    // Validation de la confirmation du mot de passe
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Veuillez confirmer votre mot de passe';
      hasError = true;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
      hasError = true;
    }
    
    setErrors(newErrors);

    // Si il y a des erreurs, afficher un message global
    if (hasError) {
      setGlobalError('Veuillez corriger les erreurs suivantes avant de continuer :');
    }

    return !hasError;
  };
  
  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsLoading(true);
    setGlobalError('');
    setErrors({});
    
    // Validation complète du formulaire au moment de la soumission
    if (await validateForm()) {
      // Stocker les données dans sessionStorage pour la seconde étape
      sessionStorage.setItem('registerStep1', JSON.stringify({
        email: formData.email,
        password: formData.password
      }));
      
      // Naviguer vers l'étape 2
      navigate('/auth/register/step2');
    }
    
    setIsLoading(false);
  };
  
  // Redirection vers la page de connexion
  const goToLogin = () => {
    navigate('/auth/login');
  };
  
  // Gestion des états pressed
  const handlePressStart = (field) => () => {
    setPressedStates(prev => ({
      ...prev,
      [field]: true
    }));
  };

  const handlePressEnd = (field) => () => {
    setPressedStates(prev => ({
      ...prev,
      [field]: false
    }));
  };
  
  return (
    <div className="auth-container">
      <div className="auth-logo-container">
        <img src={logo} alt="Microstory Logo" className="auth-logo" />
        <h1 className="auth-title text-title" style={{ color: colors.content['00'], marginTop: '8px' }}>Microstory</h1>
      </div>
      
      <form className="auth-form" onSubmit={handleSubmit}>
        {globalError && (
          <div className="auth-error-message">
            {globalError}
            {Object.entries(errors).map(([field, error]) => (
              error && (
                <div key={field} style={{ marginTop: '4px', fontSize: '14px' }}>
                  • {error}
                </div>
              )
            ))}
          </div>
        )}
        
        <div className="auth-field-container">
          <TextField
            id="email"
            label="E-mail"
            placeholder="exemple@email.com"
            value={formData.email}
            onChange={handleChange}
            errorMessage={errors.email}
            onMouseDown={handlePressStart('email')}
            onMouseUp={handlePressEnd('email')}
            onMouseLeave={handlePressEnd('email')}
            onTouchStart={handlePressStart('email')}
            onTouchEnd={handlePressEnd('email')}
            onTouchCancel={handlePressEnd('email')}
            isPressed={pressedStates.email}
          />
        </div>
        
        <div className="auth-field-container">
          <TextField
            id="password"
            label="Mot de passe"
            placeholder="Minimum 8 caractères, 1 lettre, 1 chiffre"
            type="password"
            value={formData.password}
            onChange={handleChange}
            errorMessage={errors.password}
            onMouseDown={handlePressStart('password')}
            onMouseUp={handlePressEnd('password')}
            onMouseLeave={handlePressEnd('password')}
            onTouchStart={handlePressStart('password')}
            onTouchEnd={handlePressEnd('password')}
            onTouchCancel={handlePressEnd('password')}
            isPressed={pressedStates.password}
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
            errorMessage={errors.confirmPassword}
            onMouseDown={handlePressStart('confirmPassword')}
            onMouseUp={handlePressEnd('confirmPassword')}
            onMouseLeave={handlePressEnd('confirmPassword')}
            onTouchStart={handlePressStart('confirmPassword')}
            onTouchEnd={handlePressEnd('confirmPassword')}
            onTouchCancel={handlePressEnd('confirmPassword')}
            isPressed={pressedStates.confirmPassword}
          />
        </div>
        
        <div className="auth-actions">
          <Button
            type="submit"
            style="color"
            importance="primary"
            size="lg"
            fullWidth
            loading={isLoading}
            onMouseDown={handlePressStart('submit')}
            onMouseUp={handlePressEnd('submit')}
            onMouseLeave={handlePressEnd('submit')}
            onTouchStart={handlePressStart('submit')}
            onTouchEnd={handlePressEnd('submit')}
            onTouchCancel={handlePressEnd('submit')}
            isPressed={pressedStates.submit}
          >
            Suivant
          </Button>
          
          <div style={{ marginTop: '-8px' }}>
            <Button
              style="black"
              importance="tertiary"
              size="sm"
              fullWidth
              onClick={goToLogin}
              onMouseDown={handlePressStart('login')}
              onMouseUp={handlePressEnd('login')}
              onMouseLeave={handlePressEnd('login')}
              onTouchStart={handlePressStart('login')}
              onTouchEnd={handlePressEnd('login')}
              onTouchCancel={handlePressEnd('login')}
              isPressed={pressedStates.login}
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
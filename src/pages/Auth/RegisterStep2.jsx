import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../features/auth/authThunks';
import { checkPseudoExists } from '../../services/auth';
import TextField from '../../components/atoms/TextField/TextField';
import Button from '../../components/atoms/Button/Button';
import logo from '../../assets/logo.png';
import { colors } from '../../styles';
import './Auth.css';

// Import de l'icône chevron gauche
import chevronLeftIcon from '../../assets/Icons/chevron-left.svg';

const RegisterStep2 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    pseudo: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  // État pour stocker l'icône SVG comme chaîne
  const [chevronLeftSvg, setChevronLeftSvg] = useState('');
  // État pour gérer les états pressed
  const [pressedStates, setPressedStates] = useState({
    pseudo: false,
    submit: false,
    back: false
  });
  
  // Charger l'icône SVG au montage du composant
  useEffect(() => {
    const loadSvg = async () => {
      try {
        const response = await fetch(chevronLeftIcon);
        const text = await response.text();
        // Ajouter style="pointer-events: none;" à l'élément SVG
        const svgWithStyle = text.replace('<svg', '<svg style="pointer-events: none;"');
        setChevronLeftSvg(svgWithStyle);
      } catch (error) {
        console.error('Erreur lors du chargement de l\'icône SVG:', error);
      }
    };
    
    loadSvg();
  }, []);
  
  // Récupérer les données de l'étape 1
  useEffect(() => {
    const step1Data = sessionStorage.getItem('registerStep1');
    
    if (!step1Data) {
      // Si pas de données de l'étape 1, rediriger vers l'étape 1
      navigate('/auth/register');
      return;
    }
    
    try {
      const { email, password } = JSON.parse(step1Data);
      setFormData(prev => ({
        ...prev,
        email,
        password
      }));
    } catch (err) {
      console.error('Erreur lors de la récupération des données de l\'étape 1:', err);
      navigate('/auth/register');
    }
  }, [navigate]);
  
  // Gestion des changements dans le champ
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    
    // Réinitialiser les erreurs
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
  
  // Validation du formulaire
  const validateForm = async () => {
    const newErrors = {};
    let hasError = false;
    
    if (!formData.pseudo || formData.pseudo.trim() === '') {
      newErrors.pseudo = 'Le pseudo est requis';
      hasError = true;
    } else if (formData.pseudo.length < 3) {
      newErrors.pseudo = 'Le pseudo doit contenir au moins 3 caractères';
      hasError = true;
    } else if (formData.pseudo.length > 20) {
      newErrors.pseudo = 'Le pseudo ne doit pas dépasser 20 caractères';
      hasError = true;
    } else if (!/^[a-zA-Z0-9_-]+$/.test(formData.pseudo)) {
      newErrors.pseudo = 'Le pseudo ne peut contenir que des lettres, chiffres, tirets et underscores';
      hasError = true;
    } else {
      try {
        // Vérifier si le pseudo est déjà utilisé
        const pseudoExists = await checkPseudoExists(formData.pseudo);
        if (pseudoExists) {
          newErrors.pseudo = 'Ce pseudo est déjà utilisé';
          hasError = true;
        }
      } catch (error) {
        console.error('Erreur lors de la vérification du pseudo:', error);
        newErrors.pseudo = 'Erreur lors de la vérification du pseudo';
        hasError = true;
      }
    }
    
    setErrors(newErrors);
    return !hasError;
  };
  
  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm() || isSubmitting) {
      return;
    }
    
    setIsSubmitting(true);
    setGlobalError('');
    setErrors({});
    
    try {
      // Appeler le service d'inscription via le thunk Redux
      const resultAction = await dispatch(registerUser({
        email: formData.email,
        password: formData.password,
        pseudo: formData.pseudo
      }));
      
      // Vérifier si l'action a réussi ou échoué
      if (registerUser.fulfilled.match(resultAction)) {
        // Si on arrive ici, c'est que l'enregistrement a réussi
        // Nettoyer les données de l'étape 1
        sessionStorage.removeItem('registerStep1');
        
        // Rediriger vers la page profil
        navigate('/profile');
      } else if (registerUser.rejected.match(resultAction)) {
        // Récupérer le message d'erreur
        const errorMessage = resultAction.payload || 'Une erreur est survenue lors de l\'inscription';
        
        // Gérer spécifiquement le cas où l'email existe déjà
        if (errorMessage.toLowerCase().includes('email') && 
            (errorMessage.toLowerCase().includes('existe') || 
             errorMessage.toLowerCase().includes('already exists') ||
             errorMessage.toLowerCase().includes('déjà associé'))) {
          
          // Réinitialiser les données de l'étape 1 et rediriger vers l'étape 1
          sessionStorage.removeItem('registerStep1');
          navigate('/auth/register', { 
            state: { 
              error: 'Cet email est déjà associé à un compte. Veuillez en utiliser un autre.' 
            } 
          });
        } else if (errorMessage.toLowerCase().includes('pseudo') && 
                  (errorMessage.toLowerCase().includes('existe') || 
                   errorMessage.toLowerCase().includes('already exists') ||
                   errorMessage.toLowerCase().includes('déjà utilisé'))) {
          // Gérer le cas où le pseudo est déjà utilisé
          setGlobalError('Ce pseudo est déjà utilisé. Veuillez en choisir un autre.');
          setErrors(prev => ({
            ...prev,
            pseudo: 'Ce pseudo est déjà utilisé'
          }));
        } else {
          // Afficher l'erreur normalement
          setGlobalError(errorMessage);
        }
      }
    } catch (error) {
      console.error('Register error:', error);
      setGlobalError(error.message || 'Une erreur est survenue lors de l\'inscription');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fonction pour revenir à l'étape précédente
  const goBack = () => {
    navigate(-1);
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
      <div 
        onClick={goBack}
        style={{ 
          position: 'absolute', 
          top: '16px', 
          left: '16px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40px',
          height: '40px'
        }}
      >
        <Button
          style="black"
          importance="tertiary"
          size="md"
          icon={chevronLeftSvg}
          iconVariant="only"
          onMouseDown={handlePressStart('back')}
          onMouseUp={handlePressEnd('back')}
          onMouseLeave={handlePressEnd('back')}
          onTouchStart={handlePressStart('back')}
          onTouchEnd={handlePressEnd('back')}
          onTouchCancel={handlePressEnd('back')}
          isPressed={pressedStates.back}
        />
      </div>

      <div className="auth-logo-container">
        <img src={logo} alt="Microstory Logo" className="auth-logo" />
        <h1 className="auth-title text-title" style={{ color: colors.content['00'], marginTop: '8px' }}>Microstory</h1>
      </div>
      
      <form className="auth-form" onSubmit={handleSubmit}>
        {globalError && (
          <div className="auth-error-message">{globalError}</div>
        )}
        
        <div className="auth-field-container">
          <TextField
            id="pseudo"
            label="Username"
            placeholder=""
            value={formData.pseudo}
            onChange={handleChange}
            errorMessage={errors.pseudo}
            onMouseDown={handlePressStart('pseudo')}
            onMouseUp={handlePressEnd('pseudo')}
            onMouseLeave={handlePressEnd('pseudo')}
            onTouchStart={handlePressStart('pseudo')}
            onTouchEnd={handlePressEnd('pseudo')}
            onTouchCancel={handlePressEnd('pseudo')}
            isPressed={pressedStates.pseudo}
          />
        </div>
        
        <div className="auth-actions" style={{ marginTop: '32px' }}>
          <Button
            type="submit"
            style="color"
            importance="primary"
            size="lg"
            fullWidth
            loading={isSubmitting}
            onMouseDown={handlePressStart('submit')}
            onMouseUp={handlePressEnd('submit')}
            onMouseLeave={handlePressEnd('submit')}
            onTouchStart={handlePressStart('submit')}
            onTouchEnd={handlePressEnd('submit')}
            onTouchCancel={handlePressEnd('submit')}
            isPressed={pressedStates.submit}
          >
            Créer mon compte
          </Button>
          
          <p className="auth-legal-text" style={{ maxWidth: '294px', marginTop: '12px' }}>
            En cliquant sur créer mon compte, vous acceptez les conditions générales d'utilisation.
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterStep2; 
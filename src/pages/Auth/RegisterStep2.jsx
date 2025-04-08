import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../features/auth/authThunks';
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
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  // État pour stocker l'icône SVG comme chaîne
  const [chevronLeftSvg, setChevronLeftSvg] = useState('');
  
  // Charger l'icône SVG au montage du composant
  useEffect(() => {
    const loadSvg = async () => {
      try {
        const response = await fetch(chevronLeftIcon);
        const text = await response.text();
        setChevronLeftSvg(text);
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
    
    // Réinitialiser l'erreur
    if (error) {
      setError('');
    }
  };
  
  // Validation du formulaire
  const validateForm = () => {
    if (!formData.pseudo || formData.pseudo.trim() === '') {
      setError('Le pseudo est requis');
      return false;
    }
    return true;
  };
  
  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm() || isSubmitting) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Appeler le service d'inscription via le thunk Redux
      await dispatch(registerUser({
        email: formData.email,
        password: formData.password,
        pseudo: formData.pseudo
      })).unwrap();
      
      // Nettoyer les données de l'étape 1
      sessionStorage.removeItem('registerStep1');
      
      // Rediriger vers la page d'accueil
      navigate('/');
    } catch (error) {
      setError(error.message || 'Une erreur est survenue lors de l\'inscription');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fonction pour revenir à l'étape précédente
  const goBack = () => {
    navigate(-1);
  };
  
  return (
    <div className="auth-container">
      <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
        <Button
          style="black"
          importance="tertiary"
          size="md"
          icon={chevronLeftSvg}
          iconVariant="only"
          onClick={goBack}
        />
      </div>

      <div className="auth-logo-container">
        <img src={logo} alt="Microstory Logo" className="auth-logo" />
        <h1 className="auth-title text-title" style={{ color: colors.content['00'], marginTop: '8px' }}>Microstory</h1>
      </div>
      
      <h2 className="auth-heading text-h1" style={{ color: colors.content['01'], marginTop: '64px', marginBottom: '16px' }}>Création du profil</h2>
      
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-field-container">
          <TextField
            id="pseudo"
            label="Username"
            placeholder=""
            value={formData.pseudo}
            onChange={handleChange}
            errorMessage={error}
          />
        </div>
        
        {error && !error.includes('pseudo') && (
          <div className="auth-error-message">{error}</div>
        )}
        
        <div className="auth-actions" style={{ marginTop: '32px' }}>
          <Button
            type="submit"
            style="color"
            importance="primary"
            size="lg"
            fullWidth
            loading={isSubmitting}
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
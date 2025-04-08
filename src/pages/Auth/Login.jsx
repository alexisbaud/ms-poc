import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../features/auth/authThunks';
import TextField from '../../components/atoms/TextField/TextField';
import Button from '../../components/atoms/Button/Button';
import logo from '../../assets/logo.png';
import { colors } from '../../styles';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Gestion des changements dans les champs
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
    if (!formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs');
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
      // Appeler le service de connexion via le thunk Redux
      await dispatch(loginUser({
        email: formData.email,
        password: formData.password
      })).unwrap();
      
      // Rediriger vers la page d'accueil
      navigate('/');
    } catch (error) {
      setError(error.message || 'Identifiants invalides');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Redirection vers la page d'inscription
  const goToRegister = () => {
    navigate('/auth/register');
  };
  
  return (
    <div className="auth-container">
      <div className="auth-logo-container">
        <img src={logo} alt="Microstory Logo" className="auth-logo" />
        <h1 className="auth-title text-title" style={{ color: colors.content['00'], marginTop: '8px' }}>Microstory</h1>
      </div>
      
      <h2 className="auth-heading text-h1" style={{ color: colors.content['01'], marginTop: '64px', marginBottom: '16px' }}>Connexion</h2>
      
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-field-container">
          <TextField
            id="email"
            label="E-mail"
            placeholder="exemple@email.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        
        <div className="auth-field-container">
          <TextField
            id="password"
            label="Mot de passe"
            placeholder=""
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        
        {error && (
          <div className="auth-error-message">{error}</div>
        )}
        
        <div className="auth-forgot-password" style={{ alignSelf: 'flex-start' }}>
          <Button
            style="black"
            importance="tertiary"
            size="xs"
            onClick={() => {}}
            disabled={true}
          >
            Mot de passe oublié ?
          </Button>
        </div>
        
        <div className="auth-actions" style={{ marginTop: '32px' }}>
          <Button
            type="submit"
            style="color"
            importance="primary"
            size="lg"
            fullWidth
            loading={isSubmitting}
          >
            Se connecter
          </Button>
          
          <div style={{ marginTop: '8px' }}>
            <Button
              style="black"
              importance="tertiary"
              size="sm"
              fullWidth
              onClick={goToRegister}
            >
              Je n'ai pas de compte
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login; 
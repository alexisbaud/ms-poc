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
  const [pressedStates, setPressedStates] = useState({
    email: false,
    password: false,
    submit: false,
    register: false,
    forgotPassword: false
  });
  
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
      const resultAction = await dispatch(loginUser({
        email: formData.email,
        password: formData.password
      }));
      
      // Vérifier si l'action a réussi ou échoué
      if (loginUser.fulfilled.match(resultAction)) {
        // Rediriger vers la page profil
        navigate('/profile');
      } else if (loginUser.rejected.match(resultAction)) {
        setError(resultAction.payload || 'Identifiants invalides');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Identifiants invalides');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Redirection vers la page d'inscription
  const goToRegister = () => {
    navigate('/auth/register');
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
        <div className="auth-field-container">
          <TextField
            id="email"
            label="E-mail"
            placeholder="exemple@email.com"
            value={formData.email}
            onChange={handleChange}
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
            placeholder=""
            type="password"
            value={formData.password}
            onChange={handleChange}
            onMouseDown={handlePressStart('password')}
            onMouseUp={handlePressEnd('password')}
            onMouseLeave={handlePressEnd('password')}
            onTouchStart={handlePressStart('password')}
            onTouchEnd={handlePressEnd('password')}
            onTouchCancel={handlePressEnd('password')}
            isPressed={pressedStates.password}
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
            onMouseDown={handlePressStart('forgotPassword')}
            onMouseUp={handlePressEnd('forgotPassword')}
            onMouseLeave={handlePressEnd('forgotPassword')}
            onTouchStart={handlePressStart('forgotPassword')}
            onTouchEnd={handlePressEnd('forgotPassword')}
            onTouchCancel={handlePressEnd('forgotPassword')}
            isPressed={pressedStates.forgotPassword}
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
            onMouseDown={handlePressStart('submit')}
            onMouseUp={handlePressEnd('submit')}
            onMouseLeave={handlePressEnd('submit')}
            onTouchStart={handlePressStart('submit')}
            onTouchEnd={handlePressEnd('submit')}
            onTouchCancel={handlePressEnd('submit')}
            isPressed={pressedStates.submit}
          >
            Se connecter
          </Button>
          
          <div style={{ marginTop: '-8px' }}>
            <Button
              style="black"
              importance="tertiary"
              size="sm"
              fullWidth
              onClick={goToRegister}
              onMouseDown={handlePressStart('register')}
              onMouseUp={handlePressEnd('register')}
              onMouseLeave={handlePressEnd('register')}
              onTouchStart={handlePressStart('register')}
              onTouchEnd={handlePressEnd('register')}
              onTouchCancel={handlePressEnd('register')}
              isPressed={pressedStates.register}
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
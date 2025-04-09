import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/molecules/NavBar/NavBar';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = (pageId) => {
    if (pageId === 'profile') {
      navigate('/profile');
    }
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Accueil</h1>
        <p>Bienvenue sur MicroStory</p>
      </div>

      <div className="home-content">
        <p>Contenu de la page d'accueil</p>
      </div>
      
      {/* NavBar with active page set to home */}
      <NavBar 
        activePage="home" 
        onNavigate={handleNavigation} 
      />
    </div>
  );
};

export default Home; 
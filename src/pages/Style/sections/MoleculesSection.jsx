import { useState } from 'react';
import NavBar from '../../../components/molecules/NavBar';

const MoleculesSection = () => {
  const [activePage, setActivePage] = useState('home');

  // Gérer la navigation
  const handleNavigate = (pageId) => {
    setActivePage(pageId);
    console.log(`Navigation vers: ${pageId}`);
  };

  return (
    <div className="molecules-section">
      <h2>Molecules</h2>
      <p className="component-description">
        Les molécules sont des groupes d'atomes qui forment des composants relativement simples.
      </p>
      
      <div className="component-section">
        <h3 className="component-title">NavBar</h3>
        <p className="component-description">
          Barre de navigation mobile fixée en bas de l'écran, avec différentes sections de l'application.
        </p>

        <div className="component-example">
          <h4>Exemple d'utilisation</h4>
          
          <div className="navbar-phone-container">
            <div className="navbar-phone-inner">
              <NavBar 
                activePage={activePage}
                onNavigate={handleNavigate}
              />
            </div>
          </div>
          
          <div className="component-description">
            <p>Page active actuelle: <strong>{activePage}</strong></p>
            <div className="nav-buttons">
              <button 
                onClick={() => setActivePage('home')} 
                className={`nav-demo-button ${activePage === 'home' ? 'active' : ''}`}
              >
                Home
              </button>
              <button 
                onClick={() => setActivePage('search')} 
                className={`nav-demo-button ${activePage === 'search' ? 'active' : ''}`}
              >
                Search
              </button>
              <button 
                onClick={() => setActivePage('create')} 
                className={`nav-demo-button ${activePage === 'create' ? 'active' : ''}`}
              >
                Create
              </button>
              <button 
                onClick={() => setActivePage('liked')} 
                className={`nav-demo-button ${activePage === 'liked' ? 'active' : ''}`}
              >
                Liked
              </button>
              <button 
                onClick={() => setActivePage('profile')} 
                className={`nav-demo-button ${activePage === 'profile' ? 'active' : ''}`}
              >
                Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoleculesSection; 
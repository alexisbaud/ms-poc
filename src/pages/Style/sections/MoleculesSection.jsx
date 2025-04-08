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
    <div>
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
          
          <div style={{ position: 'relative', width: '375px', height: '150px', border: '1px solid #E4E4E4', borderRadius: '8px', marginBottom: '24px', overflow: 'hidden', backgroundColor: '#F9F9F9' }}>
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}>
              <NavBar 
                activePage={activePage}
                onNavigate={handleNavigate}
              />
            </div>
          </div>
          
          <div className="component-description">
            <p>Page active actuelle: <strong>{activePage}</strong></p>
            <div style={{ marginTop: '8px' }}>
              <button 
                onClick={() => setActivePage('home')} 
                style={{ marginRight: '8px', padding: '4px 8px', backgroundColor: activePage === 'home' ? '#EBEDFF' : '#F4F4F4' }}
              >
                Home
              </button>
              <button 
                onClick={() => setActivePage('search')} 
                style={{ marginRight: '8px', padding: '4px 8px', backgroundColor: activePage === 'search' ? '#EBEDFF' : '#F4F4F4' }}
              >
                Search
              </button>
              <button 
                onClick={() => setActivePage('create')} 
                style={{ marginRight: '8px', padding: '4px 8px', backgroundColor: activePage === 'create' ? '#EBEDFF' : '#F4F4F4' }}
              >
                Create
              </button>
              <button 
                onClick={() => setActivePage('liked')} 
                style={{ marginRight: '8px', padding: '4px 8px', backgroundColor: activePage === 'liked' ? '#EBEDFF' : '#F4F4F4' }}
              >
                Liked
              </button>
              <button 
                onClick={() => setActivePage('profile')} 
                style={{ padding: '4px 8px', backgroundColor: activePage === 'profile' ? '#EBEDFF' : '#F4F4F4' }}
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
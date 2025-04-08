import { useState } from 'react';
import AtomsSection from './sections/AtomsSection';
import MoleculesSection from './sections/MoleculesSection';
import OrganismsSection from './sections/OrganismsSection';
import StyleGuide from './sections/StyleGuide';
import './Style.css';

/**
 * Page de Design System qui présente les composants utilisés dans l'application
 */
const Style = () => {
  const [activeTab, setActiveTab] = useState('style');

  const tabs = [
    { id: 'style', label: 'Style' },
    { id: 'atoms', label: 'Atoms' },
    { id: 'molecules', label: 'Molecules' },
    { id: 'organisms', label: 'Organisms' }
  ];

  // Fonction pour rendre le contenu actif selon l'onglet
  const renderContent = () => {
    switch (activeTab) {
      case 'style':
        return <StyleGuide />;
      case 'atoms':
        return <AtomsSection />;
      case 'molecules':
        return <MoleculesSection />;
      case 'organisms':
        return <OrganismsSection />;
      default:
        return <StyleGuide />;
    }
  };

  return (
    <div className="design-system">
      <header className="design-system-header">
        <h1>Microstory Design System</h1>
        <p>Bibliothèque de composants et guide de style</p>
      </header>

      <nav className="design-system-nav">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="design-system-content">
        {renderContent()}
      </main>
    </div>
  );
};

export default Style; 
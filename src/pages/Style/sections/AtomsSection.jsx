import Button from '../../../components/atoms/Button';
import { BsArrowRight, BsPlus, BsTrash, BsDownload, BsBookmark, BsSearch, BsGear } from 'react-icons/bs';
import { colors } from '../../../styles';

const AtomsSection = () => {
  return (
    <div>
      <h2>Atoms</h2>
      <p className="component-description">Les composants atomiques sont les plus petits éléments de l'interface.</p>

      <div className="component-section">
        <h3 className="component-title">Button</h3>
        <p className="component-description">
          Composant de bouton réutilisable avec différentes variantes, tailles et états.
        </p>

        <div className="component-example">
          <h4>Tailles</h4>
          <div className="component-variants">
            <Button size="sm" style="color" importance="primary">S (40px)</Button>
            <Button size="md" style="color" importance="primary">M (48px)</Button>
            <Button size="lg" style="color" importance="primary">L (56px)</Button>
          </div>

          <h4>Styles de couleur</h4>
          <div className="component-variants">
            <Button style="black" importance="primary">Black</Button>
            <Button style="color" importance="primary">Color ({colors.interaction.color})</Button>
            <Button style="danger" importance="primary">Danger ({colors.interaction.danger})</Button>
          </div>

          <h4>Niveaux d'importance</h4>
          <div className="component-variants" style={{ backgroundColor: '#F4F4F4', padding: '1rem', borderRadius: '8px' }}>
            <Button importance="primary" style="color">Primary</Button>
            <Button importance="toned" style="color">Toned</Button>
            <Button importance="secondary" style="color">Secondary</Button>
            <Button importance="tertiary" style="color">Tertiary</Button>
          </div>

          <h4>Variantes de style Black</h4>
          <div className="component-variants" style={{ backgroundColor: '#F4F4F4', padding: '1rem', borderRadius: '8px' }}>
            <Button style="black" importance="primary">Primary</Button>
            <Button style="black" importance="secondary">Secondary</Button>
            <Button style="black" importance="tertiary">Tertiary</Button>
          </div>

          <h4>Variantes de style Color</h4>
          <div className="component-variants" style={{ backgroundColor: '#F4F4F4', padding: '1rem', borderRadius: '8px' }}>
            <Button style="color" importance="primary">Primary</Button>
            <Button style="color" importance="toned">Toned</Button>
            <Button style="color" importance="secondary">Secondary</Button>
            <Button style="color" importance="tertiary">Tertiary</Button>
          </div>

          <h4>Variantes de style Danger</h4>
          <div className="component-variants" style={{ backgroundColor: '#F4F4F4', padding: '1rem', borderRadius: '8px' }}>
            <Button style="danger" importance="primary">Primary</Button>
            <Button style="danger" importance="toned">Toned</Button>
            <Button style="danger" importance="secondary">Secondary</Button>
            <Button style="danger" importance="tertiary">Tertiary</Button>
          </div>

          <h4>États</h4>
          <div className="component-variants">
            <Button style="color" importance="primary">Normal</Button>
            <Button style="color" importance="primary" isDisabled>Disabled</Button>
            <div style={{ width: '200px' }}>
              <Button style="color" importance="primary" isFullWidth>Full width</Button>
            </div>
          </div>

          <h4>Variantes d'icônes</h4>
          <div className="component-variants">
            <Button style="color" importance="primary" iconVariant="none">Sans icône</Button>
            <Button style="color" importance="primary" iconVariant="before" icon={BsPlus}>Icône avant</Button>
            <Button style="color" importance="primary" iconVariant="after" icon={BsArrowRight}>Icône après</Button>
          </div>
          
          <h4>Icônes avec différents styles</h4>
          <div className="component-variants">
            <Button style="black" importance="primary" iconVariant="before" icon={BsGear}>Settings</Button>
            <Button style="color" importance="toned" iconVariant="before" icon={BsPlus}>Ajouter</Button>
            <Button style="danger" importance="secondary" iconVariant="before" icon={BsTrash}>Supprimer</Button>
          </div>

          <h4>Tailles avec icônes</h4>
          <div className="component-variants">
            <Button style="color" importance="primary" iconVariant="before" icon={BsSearch} size="sm">Petit</Button>
            <Button style="color" importance="primary" iconVariant="before" icon={BsSearch} size="md">Moyen</Button>
            <Button style="color" importance="primary" iconVariant="before" icon={BsSearch} size="lg">Grand</Button>
          </div>

          <h4>Exemples d'utilisation</h4>
          <div className="component-variants">
            <Button 
              style="color"
              importance="primary" 
              size="lg" 
              iconVariant="after"
              icon={BsArrowRight}
              onClick={() => alert('Button clicked!')}
            >
              Continuer
            </Button>
            <Button 
              style="black"
              importance="tertiary" 
              size="md"
              iconVariant="before"
              icon={BsBookmark}
            >
              Sauvegarder
            </Button>
            <Button 
              style="danger"
              importance="toned" 
              size="sm"
              iconVariant="before"
              icon={BsTrash}
            >
              Supprimer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtomsSection; 
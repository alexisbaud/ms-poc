import { useState } from 'react';
import Button from '../../../components/atoms/Button';
import TextField from '../../../components/atoms/TextField';
import Divider from '../../../components/atoms/Divider';
import { BsArrowRight, BsPlus, BsTrash, BsDownload, BsBookmark, BsSearch, BsGear } from 'react-icons/bs';
import { colors } from '../../../styles';

const AtomsSection = () => {
  const [textFieldValues, setTextFieldValues] = useState({
    free: '',
    password: '',
    formatted: '',
    multiline: 'Ceci est un exemple de texte multiligne qui s\'étend sur plusieurs lignes pour démontrer la fonctionnalité multiline du champ.',
    email: '',
    phone: ''
  });

  const handleTextFieldChange = (field) => (e) => {
    setTextFieldValues({
      ...textFieldValues,
      [field]: e.target.value
    });
  };

  // Regex pour validation d'email simple
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Regex pour validation de numéro de téléphone français
  const phoneRegex = /^(0|\+33)[1-9]([-. ]?[0-9]{2}){4}$/;

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
            <Button style="color" importance="primary" iconVariant="only" icon={BsPlus} />
          </div>
          
          <h4>Icônes avec différents styles</h4>
          <div className="component-variants">
            <Button style="black" importance="primary" iconVariant="before" icon={BsGear}>Settings</Button>
            <Button style="color" importance="toned" iconVariant="before" icon={BsPlus}>Ajouter</Button>
            <Button style="danger" importance="secondary" iconVariant="before" icon={BsTrash}>Supprimer</Button>
            <Button style="danger" importance="primary" iconVariant="only" icon={BsTrash} />
          </div>

          <h4>Tailles avec icônes</h4>
          <div className="component-variants">
            <Button style="color" importance="primary" iconVariant="before" icon={BsSearch} size="sm">Petit</Button>
            <Button style="color" importance="primary" iconVariant="before" icon={BsSearch} size="md">Moyen</Button>
            <Button style="color" importance="primary" iconVariant="before" icon={BsSearch} size="lg">Grand</Button>
            <Button style="color" importance="primary" iconVariant="only" icon={BsSearch} size="sm" />
            <Button style="color" importance="primary" iconVariant="only" icon={BsSearch} size="md" />
            <Button style="color" importance="primary" iconVariant="only" icon={BsSearch} size="lg" />
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

      <div className="component-section">
        <h3 className="component-title">TextField</h3>
        <p className="component-description">
          Composant de champ de saisie avec différentes variantes et états.
        </p>

        <div className="component-example">
          <h4>Type de champ : Free</h4>
          <div className="component-field-variants">
            <TextField 
              label="Champ de texte libre"
              placeholder="Entrez du texte..."
              type="free"
              value={textFieldValues.free}
              onChange={handleTextFieldChange('free')}
            />
          </div>

          <h4>Type de champ : Password</h4>
          <div className="component-field-variants">
            <TextField 
              label="Mot de passe"
              placeholder="Entrez votre mot de passe"
              type="password"
              value={textFieldValues.password}
              onChange={handleTextFieldChange('password')}
            />
          </div>

          <h4>Type de champ : Formatted (Email)</h4>
          <div className="component-field-variants">
            <TextField 
              label="Adresse email"
              placeholder="exemple@domaine.com"
              type="formatted"
              format={emailRegex}
              errorMessage="Veuillez entrer une adresse email valide"
              value={textFieldValues.email}
              onChange={handleTextFieldChange('email')}
            />
          </div>

          <h4>Type de champ : Formatted (Téléphone)</h4>
          <div className="component-field-variants">
            <TextField 
              label="Numéro de téléphone"
              placeholder="06 12 34 56 78"
              type="formatted"
              format={phoneRegex}
              errorMessage="Veuillez entrer un numéro de téléphone valide"
              value={textFieldValues.phone}
              onChange={handleTextFieldChange('phone')}
            />
          </div>

          <h4>Variante : Multiline</h4>
          <div className="component-field-variants">
            <TextField 
              label="Description"
              placeholder="Entrez une description..."
              type="free"
              multiline
              rows={4}
              value={textFieldValues.multiline}
              onChange={handleTextFieldChange('multiline')}
            />
          </div>

          <h4>État : Disabled</h4>
          <div className="component-field-variants">
            <TextField 
              label="Champ désactivé"
              placeholder="Ce champ est désactivé"
              type="free"
              isDisabled
              value="Vous ne pouvez pas modifier ce champ"
            />
          </div>

          <h4>Exemples d'utilisation</h4>
          <div className="component-field-variants">
            <div style={{ maxWidth: '400px' }}>
              <TextField 
                label="Nom d'utilisateur"
                placeholder="Entrez votre nom d'utilisateur"
                type="free"
                value={textFieldValues.free}
                onChange={handleTextFieldChange('free')}
              />
              <div style={{ height: '16px' }}></div>
              <TextField 
                label="Email"
                placeholder="exemple@domaine.com"
                type="formatted"
                format={emailRegex}
                errorMessage="Veuillez entrer une adresse email valide"
                value={textFieldValues.email}
                onChange={handleTextFieldChange('email')}
              />
              <div style={{ height: '16px' }}></div>
              <TextField 
                label="Mot de passe"
                placeholder="Entrez votre mot de passe"
                type="password"
                value={textFieldValues.password}
                onChange={handleTextFieldChange('password')}
              />
              <div style={{ height: '16px' }}></div>
              <Button 
                style="color"
                importance="primary" 
                isFullWidth
              >
                S'inscrire
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="component-section">
        <h3 className="component-title">Divider</h3>
        <p className="component-description">
          Séparateur horizontal pour diviser visuellement le contenu en sections.
        </p>

        <div className="component-example">
          <h4>Variante : Ligne simple</h4>
          <div className="component-field-variants" style={{ padding: '1rem', backgroundColor: '#F4F4F4', borderRadius: '8px' }}>
            <Divider />
          </div>

          <h4>Variante : Ligne avec label</h4>
          <div className="component-field-variants" style={{ padding: '1rem', backgroundColor: '#F4F4F4', borderRadius: '8px' }}>
            <Divider label="Avril 2024" />
          </div>
          
          <h4>Exemples d'utilisation</h4>
          <div className="component-field-variants" style={{ padding: '1rem', backgroundColor: '#F4F4F4', borderRadius: '8px', maxWidth: '400px' }}>
            <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
              Contenu de section 1
            </div>
            <Divider />
            <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '8px', marginTop: '1rem', marginBottom: '1rem' }}>
              Contenu de section 2
            </div>
            <Divider label="Autre contenu" />
            <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
              Contenu de section 3
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtomsSection; 
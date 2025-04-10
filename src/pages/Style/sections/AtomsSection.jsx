import { useState, useEffect } from 'react';
import Button from '../../../components/atoms/Button';
import TextField from '../../../components/atoms/TextField';
import Divider from '../../../components/atoms/Divider';
import NavBarEntry from '../../../components/atoms/NavBarEntry';
import Hashtag from '../../../components/atoms/Hashtag';
import Content from '../../../components/atoms/Content';
import EmojiButton from '../../../components/atoms/EmojiButton';
import { colors } from '../../../styles';

// Import direct des icônes en utilisant des URLs standards
import houseIcon from '../../../assets/Icons/house-door.svg';
import houseIconFill from '../../../assets/Icons/house-door-fill.svg';
import plusIcon from '../../../assets/Icons/plus.svg';
import xIcon from '../../../assets/Icons/x.svg';
import searchIcon from '../../../assets/Icons/search.svg';
import arrowRightIcon from '../../../assets/Icons/arrow-right.svg';
import heartIcon from '../../../assets/Icons/heart.svg';

const AtomsSection = () => {
  const [textFieldValues, setTextFieldValues] = useState({
    free: '',
    password: '',
    formatted: '',
    multiline: 'Ceci est un exemple de texte multiligne qui s\'étend sur plusieurs lignes pour démontrer la fonctionnalité multiline du champ.',
    email: '',
    phone: ''
  });

  // État pour stocker les SVGs comme chaînes
  const [homeSvg, setHomeSvg] = useState('');
  const [homeFilledSvg, setHomeFilledSvg] = useState('');
  const [plusSvg, setPlusSvg] = useState('');
  const [trashSvg, setTrashSvg] = useState('');
  const [searchSvg, setSearchSvg] = useState('');
  const [arrowRightSvg, setArrowRightSvg] = useState('');
  const [bookmarkSvg, setBookmarkSvg] = useState('');
  
  // État pour démonstration de l'EmojiButton
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  
  // Charger les fichiers SVG au montage du composant
  useEffect(() => {
    // Fonction utilitaire pour charger un SVG
    const loadSvg = async (url, setter) => {
      try {
        const response = await fetch(url);
        const text = await response.text();
        setter(text);
      } catch (error) {
        console.error(`Error loading SVG:`, error);
      }
    };

    // Charger tous les SVG nécessaires
    loadSvg(houseIcon, setHomeSvg);
    loadSvg(houseIconFill, setHomeFilledSvg);
    loadSvg(plusIcon, setPlusSvg);
    loadSvg(xIcon, setTrashSvg);
    loadSvg(searchIcon, setSearchSvg);
    loadSvg(arrowRightIcon, setArrowRightSvg);
    loadSvg(heartIcon, setBookmarkSvg);
  }, []);

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

  // Gestionnaire de clic pour l'EmojiButton
  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji === selectedEmoji ? null : emoji);
  };

  return (
    <div className="atoms-section">
      <h2>Atoms</h2>
      <p className="component-description">Les composants atomiques sont les plus petits éléments de l'interface.</p>

      <div className="component-section">
        <h3 className="component-title">Hashtag</h3>
        <p className="component-description">
          Composant de présentation des hashtags avec style uniforme.
        </p>

        <div className="component-example">
          <h4>Exemples d'utilisation</h4>
          <div className="component-variants" style={{ backgroundColor: '#F4F4F4', padding: '1rem', borderRadius: '8px' }}>
            <Hashtag tag="vdm" onClick={(tag) => alert(`Hashtag clicked: ${tag}`)} />
            <Hashtag tag="spicy" onClick={(tag) => alert(`Hashtag clicked: ${tag}`)} />
            <Hashtag tag="trahison" onClick={(tag) => alert(`Hashtag clicked: ${tag}`)} />
            <Hashtag tag="drole" onClick={(tag) => alert(`Hashtag clicked: ${tag}`)} />
          </div>
        </div>
      </div>

      <div className="component-section">
        <h3 className="component-title">Content</h3>
        <p className="component-description">
          Composant pour afficher le contenu d'un post avec deux variantes : texte simple ou titre + extrait.
        </p>

        <div className="component-example">
          <h4>Variante A (Texte complet)</h4>
          <div className="component-variants" style={{ backgroundColor: '#F4F4F4', padding: '1rem', borderRadius: '8px' }}>
            <Content 
              variant="A" 
              content="Aujourd'hui, j'ai compris que mon accent anglais était mauvais en utilisant la commande vocale de la Chromecast pour chercher 'Daredevil Born Again' et que Google a cherché 'Daredevil porno gay.'" 
            />
          </div>

          <h4>Variante B (Titre + Extrait)</h4>
          <div className="component-variants" style={{ backgroundColor: '#F4F4F4', padding: '1rem', borderRadius: '8px' }}>
            <Content 
              variant="B" 
              title="J'ai éjecté la meilleure amie de ma pote pour prendre sa place"
              content="Cette histoire est un peu longue, mais je vais essayer d'aller à l'essentiel..." 
            />
          </div>
        </div>
      </div>

      <div className="component-section">
        <h3 className="component-title">EmojiButton</h3>
        <p className="component-description">
          Bouton pour réagir avec des emojis aux posts.
        </p>

        <div className="component-example">
          <h4>Emojis de réaction</h4>
          <div className="component-variants" style={{ backgroundColor: '#F4F4F4', padding: '1rem', borderRadius: '8px' }}>
            <EmojiButton 
              emoji="❤️" 
              isSelected={selectedEmoji === "❤️"}
              onClick={handleEmojiClick} 
            />
            <EmojiButton 
              emoji="😂" 
              isSelected={selectedEmoji === "😂"}
              onClick={handleEmojiClick} 
            />
            <EmojiButton 
              emoji="😮" 
              isSelected={selectedEmoji === "😮"}
              onClick={handleEmojiClick} 
            />
            <EmojiButton 
              emoji="👏" 
              isSelected={selectedEmoji === "👏"}
              onClick={handleEmojiClick} 
            />
          </div>
        </div>
      </div>

      <div className="component-section">
        <h3 className="component-title">Button</h3>
        <p className="component-description">
          Composant de bouton réutilisable avec différentes variantes, tailles et états.
        </p>

        <div className="component-example">
          <h4>Tailles</h4>
          <div className="component-variants">
            <Button size="xs" style="color" importance="primary">XS (36px)</Button>
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
            <div className="fullwidth-button-container">
              <Button style="color" importance="primary" isFullWidth>Full width</Button>
            </div>
          </div>

          <h4>Variantes d'icônes</h4>
          <div className="component-variants">
            <Button style="color" importance="primary" iconVariant="none">Sans icône</Button>
            <Button style="color" importance="primary" iconVariant="before" icon={arrowRightSvg}>Icône avant</Button>
            <Button style="color" importance="primary" iconVariant="after" icon={arrowRightSvg}>Icône après</Button>
            <Button style="color" importance="primary" iconVariant="only" icon={plusSvg} />
          </div>
          
          <h4>Icônes avec différents styles</h4>
          <div className="component-variants">
            <Button style="black" importance="primary" iconVariant="before" icon={homeSvg}>Settings</Button>
            <Button style="color" importance="toned" iconVariant="before" icon={plusSvg}>Ajouter</Button>
            <Button style="danger" importance="secondary" iconVariant="before" icon={trashSvg}>Supprimer</Button>
            <Button style="danger" importance="primary" iconVariant="only" icon={trashSvg} />
          </div>

          <h4>Tailles avec icônes</h4>
          <div className="component-variants">
            <Button style="color" importance="primary" iconVariant="before" icon={searchSvg} size="xs">Très petit</Button>
            <Button style="color" importance="primary" iconVariant="before" icon={searchSvg} size="sm">Petit</Button>
            <Button style="color" importance="primary" iconVariant="before" icon={searchSvg} size="md">Moyen</Button>
            <Button style="color" importance="primary" iconVariant="before" icon={searchSvg} size="lg">Grand</Button>
            <Button style="color" importance="primary" iconVariant="only" icon={searchSvg} size="xs" />
            <Button style="color" importance="primary" iconVariant="only" icon={searchSvg} size="sm" />
            <Button style="color" importance="primary" iconVariant="only" icon={searchSvg} size="md" />
            <Button style="color" importance="primary" iconVariant="only" icon={searchSvg} size="lg" />
          </div>

          <h4>Exemples d'utilisation</h4>
          <div className="component-variants">
            <Button 
              style="color"
              importance="primary" 
              size="lg" 
              iconVariant="after"
              icon={arrowRightSvg}
              onClick={() => alert('Button clicked!')}
            >
              Continuer
            </Button>
            <Button 
              style="black"
              importance="tertiary" 
              size="md"
              iconVariant="before"
              icon={bookmarkSvg}
            >
              Sauvegarder
            </Button>
            <Button 
              style="danger"
              importance="toned" 
              size="sm"
              iconVariant="before"
              icon={trashSvg}
            >
              Supprimer
            </Button>
          </div>

          <h4>Bouton full width avec icône à droite</h4>
          <div className="component-variants">
            <div className="fullwidth-button-container" style={{ width: '100%' }}>
              <Button 
                style="color"
                importance="primary" 
                size="md" 
                iconVariant="after"
                icon={arrowRightSvg}
                isFullWidth
              >
                Continuer
              </Button>
            </div>
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
            <div className="form-example">
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
          <div className="component-field-variants divider-container" style={{ padding: '1rem', backgroundColor: '#F4F4F4', borderRadius: '8px' }}>
            <Divider />
          </div>

          <h4>Variante : Ligne avec label</h4>
          <div className="component-field-variants divider-container" style={{ padding: '1rem', backgroundColor: '#F4F4F4', borderRadius: '8px' }}>
            <Divider label="Avril 2024" />
          </div>
          
          <h4>Variante : Ligne épaisse avec bords arrondis</h4>
          <div className="component-field-variants divider-container" style={{ padding: '1rem', backgroundColor: '#F4F4F4', borderRadius: '8px' }}>
            <Divider variant="thick" />
          </div>
          
          <h4>Exemples d'utilisation</h4>
          <div className="component-field-variants divider-example" style={{ padding: '1rem', backgroundColor: '#F4F4F4', borderRadius: '8px' }}>
            <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
              Contenu de section 1
            </div>
            <Divider />
            <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '8px', marginTop: '1rem', marginBottom: '1rem' }}>
              Contenu de section 2
            </div>
            <Divider label="Autre contenu" />
            <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '8px', marginTop: '1rem', marginBottom: '1rem' }}>
              Contenu de section 3
            </div>
            <Divider variant="thick" />
            <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
              Contenu de section 4
            </div>
          </div>
        </div>
      </div>

      <div className="component-section">
        <h3 className="component-title">NavBarEntry</h3>
        <p className="component-description">
          Élément de navigation pour barre de navigation mobile, affichant une icône avec différents états.
        </p>

        <div className="component-example">
          <h4>États de base</h4>
          <div className="component-variants navbar-states" style={{ display: 'flex', backgroundColor: '#F4F4F4', padding: '1rem', borderRadius: '8px' }}>
            <div className="navbar-state">
              <p className="small-label">Non sélectionné</p>
              <NavBarEntry 
                icon={homeSvg} 
                isSelected={false}
                onClick={() => alert('NavBarEntry clicked: Home')}
              />
            </div>
            
            <div className="navbar-state">
              <p className="small-label">Sélectionné</p>
              <NavBarEntry 
                icon={homeFilledSvg}
                isSelected={true} 
                onClick={() => alert('NavBarEntry clicked: Home (selected)')}
              />
            </div>
            
            <div className="navbar-state">
              <p className="small-label">Désactivé</p>
              <NavBarEntry 
                icon={homeSvg}
                isDisabled={true}
              />
            </div>
          </div>

          <h4>Exemple d'utilisation (barre de navigation)</h4>
          <div className="navbar-example">
            <div className="navbar-container">
              <NavBarEntry 
                icon={homeFilledSvg}
                isSelected={true}
                onClick={() => alert('Home clicked')}
              />
              <NavBarEntry 
                icon={homeSvg}
                isSelected={false}
                onClick={() => alert('Search clicked')}
              />
              <NavBarEntry 
                icon={homeSvg}
                isSelected={false}
                onClick={() => alert('Create clicked')}
              />
              <NavBarEntry 
                icon={homeSvg}
                isSelected={false}
                onClick={() => alert('Profile clicked')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtomsSection; 
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './NavBar.css';
import { colors } from '../../../styles';
import NavBarEntry from '../../atoms/NavBarEntry';
import Button from '../../atoms/Button/Button';

// Import direct des SVG comme URLs
import houseIcon from '../../../assets/Icons/house-door.svg';
import houseIconFill from '../../../assets/Icons/house-door-fill.svg';
import plusLgIcon from '../../../assets/Icons/plus-lg.svg';
import searchIcon from '../../../assets/Icons/search.svg';
import searchIconFill from '../../../assets/Icons/search-fill.svg';
import heartIcon from '../../../assets/Icons/heart.svg';
import heartIconFill from '../../../assets/Icons/heart-fill.svg';
import personIcon from '../../../assets/Icons/person.svg';
import personIconFill from '../../../assets/Icons/person-fill.svg';

/**
 * Barre de navigation mobile fixée en bas de l'écran
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.activePage - L'ID de la page active
 * @param {Function} props.onNavigate - La fonction appelée lors de la navigation
 * @param {boolean} props.hidden - Si la barre de navigation doit être cachée
 * @returns {JSX.Element}
 */
const NavBar = ({ 
  activePage,
  onNavigate,
  hidden = false,
  ...props
}) => {
  const [activeTab, setActiveTab] = useState(activePage || "home");
  
  // États pour stocker les SVGs comme chaînes
  const [homeSvg, setHomeSvg] = useState('');
  const [homeFilledSvg, setHomeFilledSvg] = useState('');
  const [plusLgSvg, setPlusLgSvg] = useState('');
  const [searchSvg, setSearchSvg] = useState('');
  const [searchFilledSvg, setSearchFilledSvg] = useState('');
  const [heartSvg, setHeartSvg] = useState('');
  const [heartFilledSvg, setHeartFilledSvg] = useState('');
  const [personSvg, setPersonSvg] = useState('');
  const [personFilledSvg, setPersonFilledSvg] = useState('');

  // Charger les SVGs au montage du composant
  useEffect(() => {
    // Fonction pour charger les SVGs
    const loadSvg = async (url, setter) => {
      try {
        const response = await fetch(url);
        const text = await response.text();
        setter(text);
      } catch (error) {
        console.error(`Error loading SVG:`, error);
      }
    };

    // Charger tous les SVGs
    loadSvg(houseIcon, setHomeSvg);
    loadSvg(houseIconFill, setHomeFilledSvg);
    loadSvg(plusLgIcon, setPlusLgSvg);
    loadSvg(searchIcon, setSearchSvg);
    loadSvg(searchIconFill, setSearchFilledSvg);
    loadSvg(heartIcon, setHeartSvg);
    loadSvg(heartIconFill, setHeartFilledSvg);
    loadSvg(personIcon, setPersonSvg);
    loadSvg(personIconFill, setPersonFilledSvg);
  }, []);

  // Gestionnaire de navigation
  const handleNavigate = (pageId) => {
    setActiveTab(pageId);
    if (onNavigate) {
      onNavigate(pageId);
    }
  };

  // Si la barre de navigation est cachée, ne rien afficher
  if (hidden) {
    return null;
  }

  // Vérifier si un bouton est désactivé (tous sauf Home et Profile pour le moment)
  const isDisabled = (pageId) => {
    return pageId !== 'home' && pageId !== 'profile';
  };

  return (
    <nav className="navbar" {...props}>
      {/* Accueil */}
      <NavBarEntry 
        icon={activeTab === 'home' ? homeFilledSvg : homeSvg}
        isSelected={activeTab === 'home'}
        onClick={() => handleNavigate('home')}
        aria-label="Accueil"
      />

      {/* Recherche (désactivée) */}
      <NavBarEntry 
        icon={searchSvg}
        isSelected={false}
        isDisabled={true}
        aria-label="Recherche"
      />

      {/* Bouton de création de post (désactivé) */}
      <div className="navbar__create-button">
        <Button 
          iconVariant="only"
          size="s"
          variant="color"
          style="toned"
          icon={plusLgSvg}
          disabled={true}
          aria-label="Créer un post"
        />
      </div>

      {/* Posts likés (désactivés) */}
      <NavBarEntry 
        icon={heartSvg}
        isSelected={false}
        isDisabled={true}
        aria-label="Posts likés"
      />

      {/* Profil */}
      <NavBarEntry 
        icon={activeTab === 'profile' ? personFilledSvg : personSvg}
        isSelected={activeTab === 'profile'}
        onClick={() => handleNavigate('profile')}
        aria-label="Profil"
      />
    </nav>
  );
};

NavBar.propTypes = {
  /** ID de la page actuellement active */
  activePage: PropTypes.oneOf(['home', 'search', 'create', 'liked', 'profile']),
  /** Fonction appelée lors de la navigation avec l'ID de la page en paramètre */
  onNavigate: PropTypes.func,
  /** Si true, la barre de navigation est cachée */
  hidden: PropTypes.bool
};

NavBar.defaultProps = {
  activePage: 'home',
  onNavigate: null,
  hidden: false
};

export default NavBar; 
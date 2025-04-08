import { colors } from '../../../styles';

const StyleGuide = () => {
  return (
    <div>
      <h2>Guide de style</h2>
      <p className="component-description">
        Ce guide définit les principes de design, les couleurs, la typographie et autres éléments visuels utilisés dans l'application.
      </p>

      <div className="component-section">
        <h3>Couleurs</h3>
        <p>Palette de couleurs principale de l'application</p>
        
        <h4>Interaction</h4>
        <div className="color-palette">
          <div className="color-sample" style={{ backgroundColor: colors.interaction.color, color: 'white' }}>
            <span>Interaction</span>
            <span>{colors.interaction.color}</span>
          </div>
          <div className="color-sample" style={{ backgroundColor: colors.interaction.toned }}>
            <span>Toned</span>
            <span>{colors.interaction.toned}</span>
          </div>
          <div className="color-sample" style={{ backgroundColor: colors.interaction.pressLayer, border: '1px solid #e5e7eb' }}>
            <span>Press Layer</span>
            <span>{colors.interaction.pressLayer}</span>
          </div>
          <div className="color-sample" style={{ backgroundColor: colors.interaction.danger, color: 'white' }}>
            <span>Danger</span>
            <span>{colors.interaction.danger}</span>
          </div>
          <div className="color-sample" style={{ backgroundColor: colors.interaction.dangerToned }}>
            <span>Danger Toned</span>
            <span>{colors.interaction.dangerToned}</span>
          </div>
          <div className="color-sample" style={{ backgroundColor: colors.interaction.dangerPressLayer, border: '1px solid #e5e7eb' }}>
            <span>Danger Press Layer</span>
            <span>{colors.interaction.dangerPressLayer}</span>
          </div>
        </div>
        
        <h4>Background</h4>
        <div className="color-palette">
          <div className="color-sample" style={{ backgroundColor: colors.background['00'], border: '1px solid #e5e7eb' }}>
            <span>Background 00</span>
            <span>{colors.background['00']}</span>
          </div>
          <div className="color-sample" style={{ backgroundColor: colors.background['01'], border: '1px solid #e5e7eb' }}>
            <span>Background 01</span>
            <span>{colors.background['01']}</span>
          </div>
          <div className="color-sample" style={{ backgroundColor: colors.background['02'], border: '1px solid #e5e7eb' }}>
            <span>Background 02</span>
            <span>{colors.background['02']}</span>
          </div>
          <div className="color-sample" style={{ backgroundColor: colors.background['03'], border: '1px solid #e5e7eb' }}>
            <span>Background 03</span>
            <span>{colors.background['03']}</span>
          </div>
          <div className="color-sample" style={{ backgroundColor: colors.background['04'], border: '1px solid #e5e7eb' }}>
            <span>Background 04</span>
            <span>{colors.background['04']}</span>
          </div>
        </div>
        
        <div className="color-palette">
          <div className="color-sample" style={{ backgroundColor: colors.background['00Inverted'], color: 'white' }}>
            <span>Background 00 Inverted</span>
            <span>{colors.background['00Inverted']}</span>
          </div>
          <div className="color-sample" style={{ backgroundColor: colors.background['01Inverted'], color: 'white' }}>
            <span>Background 01 Inverted</span>
            <span>{colors.background['01Inverted']}</span>
          </div>
          <div className="color-sample" style={{ backgroundColor: colors.background['02Inverted'], color: 'white' }}>
            <span>Background 02 Inverted</span>
            <span>{colors.background['02Inverted']}</span>
          </div>
          <div className="color-sample" style={{ backgroundColor: colors.background['03Inverted'], color: 'white' }}>
            <span>Background 03 Inverted</span>
            <span>{colors.background['03Inverted']}</span>
          </div>
          <div className="color-sample" style={{ backgroundColor: colors.background['04Inverted'], color: 'white' }}>
            <span>Background 04 Inverted</span>
            <span>{colors.background['04Inverted']}</span>
          </div>
        </div>
        
        <h4>Content</h4>
        <div className="color-palette">
          <div className="color-sample" style={{ backgroundColor: colors.content['00'], color: 'white' }}>
            <span>Content 00</span>
            <span>{colors.content['00']}</span>
          </div>
          <div className="color-sample" style={{ backgroundColor: colors.content['01'], color: 'white' }}>
            <span>Content 01</span>
            <span>{colors.content['01']}</span>
          </div>
          <div className="color-sample" style={{ backgroundColor: colors.content['02'], color: 'white' }}>
            <span>Content 02</span>
            <span>{colors.content['02']}</span>
          </div>
          <div className="color-sample" style={{ backgroundColor: colors.content['03'] }}>
            <span>Content 03</span>
            <span>{colors.content['03']}</span>
          </div>
          <div className="color-sample" style={{ backgroundColor: colors.content['04'], border: '1px solid #e5e7eb' }}>
            <span>Content 04</span>
            <span>{colors.content['04']}</span>
          </div>
        </div>
        
        <div className="color-palette">
          <div className="color-sample" style={{ backgroundColor: colors.content['01Through'], color: 'white' }}>
            <span>Content 01 Through</span>
            <span>{colors.content['01Through']}</span>
          </div>
          <div className="color-sample" style={{ backgroundColor: colors.content['02Through'], color: 'white' }}>
            <span>Content 02 Through</span>
            <span>{colors.content['02Through']}</span>
          </div>
          <div className="color-sample" style={{ backgroundColor: colors.content['03Through'] }}>
            <span>Content 03 Through</span>
            <span>{colors.content['03Through']}</span>
          </div>
          <div className="color-sample" style={{ backgroundColor: colors.content['04Through'], border: '1px solid #e5e7eb' }}>
            <span>Content 04 Through</span>
            <span>{colors.content['04Through']}</span>
          </div>
        </div>
        
        <div className="color-palette">
          <div className="color-sample" style={{ backgroundColor: colors.content['00Inverted'] }}>
            <span>Content 00 Inverted</span>
            <span>{colors.content['00Inverted']}</span>
          </div>
          <div className="color-sample" style={{ backgroundColor: colors.content['01Inverted'] }}>
            <span>Content 01 Inverted</span>
            <span>{colors.content['01Inverted']}</span>
          </div>
          <div className="color-sample" style={{ backgroundColor: colors.content['02Inverted'] }}>
            <span>Content 02 Inverted</span>
            <span>{colors.content['02Inverted']}</span>
          </div>
          <div className="color-sample" style={{ backgroundColor: colors.content['03Inverted'] }}>
            <span>Content 03 Inverted</span>
            <span>{colors.content['03Inverted']}</span>
          </div>
          <div className="color-sample" style={{ backgroundColor: colors.content['04Inverted'], color: 'white' }}>
            <span>Content 04 Inverted</span>
            <span>{colors.content['04Inverted']}</span>
          </div>
        </div>
      </div>

      <div className="component-section">
        <h3>Typographie</h3>
        <p>Styles typographiques utilisés dans l'application</p>
        
        <h1 style={{ marginBottom: '0.5rem' }}>Titre h1</h1>
        <p style={{ marginBottom: '1rem', color: '#6b7280' }}>Utilisé pour les titres principaux</p>
        
        <h2 style={{ marginBottom: '0.5rem' }}>Titre h2</h2>
        <p style={{ marginBottom: '1rem', color: '#6b7280' }}>Utilisé pour les sections principales</p>
        
        <h3 style={{ marginBottom: '0.5rem' }}>Titre h3</h3>
        <p style={{ marginBottom: '1rem', color: '#6b7280' }}>Utilisé pour les sous-sections</p>
        
        <h4 style={{ marginBottom: '0.5rem' }}>Titre h4</h4>
        <p style={{ marginBottom: '1rem', color: '#6b7280' }}>Utilisé pour les groupes de contenu</p>
        
        <p style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Texte standard</p>
        <p style={{ marginBottom: '1rem', color: '#6b7280' }}>Utilisé pour le contenu principal</p>
        
        <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>Petit texte</p>
        <p style={{ marginBottom: '1rem', color: '#6b7280' }}>Utilisé pour les légendes et les notes</p>
      </div>
    </div>
  );
};

export default StyleGuide; 
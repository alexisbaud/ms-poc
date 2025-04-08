import { colors } from '../../../styles';

// Fonction utilitaire pour déterminer si un fond est clair ou sombre
// et retourner une couleur de texte appropriée (noir sur fond clair, blanc sur fond sombre)
const getTextColorForBackground = (backgroundColor) => {
  // Convertir la couleur en valeurs RGB
  let r, g, b;
  let alpha = 1;

  // Gérer les couleurs HEX
  if (backgroundColor.startsWith('#')) {
    const hex = backgroundColor.replace('#', '');
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
    
    // Si format #RRGGBBAA
    if (hex.length === 8) {
      alpha = parseInt(hex.substring(6, 8), 16) / 255;
    }
  } 
  // Gérer les couleurs RGB/RGBA
  else if (backgroundColor.startsWith('rgb')) {
    const values = backgroundColor.match(/[\d.]+/g);
    if (values && values.length >= 3) {
      r = parseInt(values[0]);
      g = parseInt(values[1]);
      b = parseInt(values[2]);
      
      // Si RGBA
      if (values.length >= 4) {
        alpha = parseFloat(values[3]);
      }
    } else {
      // Fallback sur noir si le format est incorrect
      return '#000000';
    }
  } 
  // Fallback pour autres formats de couleur
  else {
    return '#000000';
  }

  // Pour les couleurs semi-transparentes, faire une approximation de la couleur résultante
  // en prenant en compte un fond blanc (#FFFFFF)
  if (alpha < 1) {
    // Formule de mélange: final = (source * alpha) + (background * (1 - alpha))
    const whiteBackground = 255; // Composantes RGB du blanc
    r = Math.round((r * alpha) + (whiteBackground * (1 - alpha)));
    g = Math.round((g * alpha) + (whiteBackground * (1 - alpha)));
    b = Math.round((b * alpha) + (whiteBackground * (1 - alpha)));
  }

  // Calculer la luminosité (formule standard pour perception humaine)
  // Source: https://www.w3.org/TR/WCAG20-TECHS/G18.html
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Si luminance > 0.5, c'est un fond clair, sinon c'est un fond sombre
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};

const StyleGuide = () => {
  return (
    <div className="style-guide-section">
      <h2>Guide de style</h2>
      <p className="component-description">
        Ce guide définit les principes de design, les couleurs, la typographie et autres éléments visuels utilisés dans l'application.
      </p>

      <div className="component-section">
        <h3>Couleurs</h3>
        <p>Palette de couleurs principale de l'application</p>
        
        <h4>Interaction</h4>
        <div className="color-palette">
          <div className="color-sample" style={{ 
            backgroundColor: colors.interaction.color,
            color: getTextColorForBackground(colors.interaction.color)
          }}>
            <span>Interaction</span>
            <span>{colors.interaction.color}</span>
          </div>
          <div className="color-sample" style={{ 
            backgroundColor: colors.interaction.toned,
            color: getTextColorForBackground(colors.interaction.toned)
          }}>
            <span>Toned</span>
            <span>{colors.interaction.toned}</span>
          </div>
          <div className="color-sample" style={{ 
            backgroundColor: colors.interaction.pressLayer,
            color: getTextColorForBackground(colors.interaction.pressLayer),
            border: '1px solid #e5e7eb'
          }}>
            <span>Press Layer</span>
            <span>{colors.interaction.pressLayer}</span>
          </div>
          <div className="color-sample" style={{ 
            backgroundColor: colors.interaction.danger,
            color: getTextColorForBackground(colors.interaction.danger)
          }}>
            <span>Danger</span>
            <span>{colors.interaction.danger}</span>
          </div>
          <div className="color-sample" style={{ 
            backgroundColor: colors.interaction.dangerToned,
            color: getTextColorForBackground(colors.interaction.dangerToned)
          }}>
            <span>Danger Toned</span>
            <span>{colors.interaction.dangerToned}</span>
          </div>
          <div className="color-sample" style={{ 
            backgroundColor: colors.interaction.dangerPressLayer,
            color: getTextColorForBackground(colors.interaction.dangerPressLayer),
            border: '1px solid #e5e7eb'
          }}>
            <span>Danger Press Layer</span>
            <span>{colors.interaction.dangerPressLayer}</span>
          </div>
        </div>
        
        <h4>Background</h4>
        <div className="color-palette">
          <div className="color-sample" style={{ 
            backgroundColor: colors.background['00'],
            color: getTextColorForBackground(colors.background['00']),
            border: '1px solid #e5e7eb'
          }}>
            <span>Background 00</span>
            <span>{colors.background['00']}</span>
          </div>
          <div className="color-sample" style={{ 
            backgroundColor: colors.background['01'],
            color: getTextColorForBackground(colors.background['01']),
            border: '1px solid #e5e7eb'
          }}>
            <span>Background 01</span>
            <span>{colors.background['01']}</span>
          </div>
          <div className="color-sample" style={{ 
            backgroundColor: colors.background['02'],
            color: getTextColorForBackground(colors.background['02']),
            border: '1px solid #e5e7eb'
          }}>
            <span>Background 02</span>
            <span>{colors.background['02']}</span>
          </div>
          <div className="color-sample" style={{ 
            backgroundColor: colors.background['03'],
            color: getTextColorForBackground(colors.background['03']),
            border: '1px solid #e5e7eb'
          }}>
            <span>Background 03</span>
            <span>{colors.background['03']}</span>
          </div>
          <div className="color-sample" style={{ 
            backgroundColor: colors.background['04'],
            color: getTextColorForBackground(colors.background['04']),
            border: '1px solid #e5e7eb'
          }}>
            <span>Background 04</span>
            <span>{colors.background['04']}</span>
          </div>
        </div>
        
        <div className="color-palette">
          <div className="color-sample" style={{ 
            backgroundColor: colors.background['00Inverted'],
            color: getTextColorForBackground(colors.background['00Inverted'])
          }}>
            <span>Background 00 Inverted</span>
            <span>{colors.background['00Inverted']}</span>
          </div>
          <div className="color-sample" style={{ 
            backgroundColor: colors.background['01Inverted'],
            color: getTextColorForBackground(colors.background['01Inverted'])
          }}>
            <span>Background 01 Inverted</span>
            <span>{colors.background['01Inverted']}</span>
          </div>
          <div className="color-sample" style={{ 
            backgroundColor: colors.background['02Inverted'],
            color: getTextColorForBackground(colors.background['02Inverted'])
          }}>
            <span>Background 02 Inverted</span>
            <span>{colors.background['02Inverted']}</span>
          </div>
          <div className="color-sample" style={{ 
            backgroundColor: colors.background['03Inverted'],
            color: getTextColorForBackground(colors.background['03Inverted'])
          }}>
            <span>Background 03 Inverted</span>
            <span>{colors.background['03Inverted']}</span>
          </div>
          <div className="color-sample" style={{ 
            backgroundColor: colors.background['04Inverted'],
            color: getTextColorForBackground(colors.background['04Inverted'])
          }}>
            <span>Background 04 Inverted</span>
            <span>{colors.background['04Inverted']}</span>
          </div>
        </div>
        
        <h4>Content</h4>
        <div className="color-palette">
          <div className="color-sample" style={{ 
            backgroundColor: colors.content['00'],
            color: getTextColorForBackground(colors.content['00'])
          }}>
            <span>Content 00</span>
            <span>{colors.content['00']}</span>
          </div>
          <div className="color-sample" style={{ 
            backgroundColor: colors.content['01'],
            color: getTextColorForBackground(colors.content['01'])
          }}>
            <span>Content 01</span>
            <span>{colors.content['01']}</span>
          </div>
          <div className="color-sample" style={{ 
            backgroundColor: colors.content['02'],
            color: getTextColorForBackground(colors.content['02'])
          }}>
            <span>Content 02</span>
            <span>{colors.content['02']}</span>
          </div>
          <div className="color-sample" style={{ 
            backgroundColor: colors.content['03'],
            color: getTextColorForBackground(colors.content['03'])
          }}>
            <span>Content 03</span>
            <span>{colors.content['03']}</span>
          </div>
          <div className="color-sample" style={{ 
            backgroundColor: colors.content['04'],
            color: getTextColorForBackground(colors.content['04']),
            border: '1px solid #e5e7eb'
          }}>
            <span>Content 04</span>
            <span>{colors.content['04']}</span>
          </div>
        </div>
        
        <div className="color-palette">
          <div className="color-sample" style={{ 
            backgroundColor: colors.content['01Through'],
            color: getTextColorForBackground(colors.content['01Through'])
          }}>
            <span>Content 01 Through</span>
            <span>{colors.content['01Through']}</span>
          </div>
          <div className="color-sample" style={{ 
            backgroundColor: colors.content['02Through'],
            color: getTextColorForBackground(colors.content['02Through'])
          }}>
            <span>Content 02 Through</span>
            <span>{colors.content['02Through']}</span>
          </div>
          <div className="color-sample" style={{ 
            backgroundColor: colors.content['03Through'],
            color: getTextColorForBackground(colors.content['03Through'])
          }}>
            <span>Content 03 Through</span>
            <span>{colors.content['03Through']}</span>
          </div>
          <div className="color-sample" style={{ 
            backgroundColor: colors.content['04Through'],
            color: getTextColorForBackground(colors.content['04Through']),
            border: '1px solid #e5e7eb'
          }}>
            <span>Content 04 Through</span>
            <span>{colors.content['04Through']}</span>
          </div>
        </div>
        
        <div className="color-palette">
          <div className="color-sample" style={{ 
            backgroundColor: colors.content['00Inverted'],
            color: getTextColorForBackground(colors.content['00Inverted'])
          }}>
            <span>Content 00 Inverted</span>
            <span>{colors.content['00Inverted']}</span>
          </div>
          <div className="color-sample" style={{ 
            backgroundColor: colors.content['01Inverted'],
            color: getTextColorForBackground(colors.content['01Inverted'])
          }}>
            <span>Content 01 Inverted</span>
            <span>{colors.content['01Inverted']}</span>
          </div>
          <div className="color-sample" style={{ 
            backgroundColor: colors.content['02Inverted'],
            color: getTextColorForBackground(colors.content['02Inverted'])
          }}>
            <span>Content 02 Inverted</span>
            <span>{colors.content['02Inverted']}</span>
          </div>
          <div className="color-sample" style={{ 
            backgroundColor: colors.content['03Inverted'],
            color: getTextColorForBackground(colors.content['03Inverted'])
          }}>
            <span>Content 03 Inverted</span>
            <span>{colors.content['03Inverted']}</span>
          </div>
          <div className="color-sample" style={{ 
            backgroundColor: colors.content['04Inverted'],
            color: getTextColorForBackground(colors.content['04Inverted'])
          }}>
            <span>Content 04 Inverted</span>
            <span>{colors.content['04Inverted']}</span>
          </div>
        </div>
      </div>

      <div className="component-section">
        <h3>Typographie</h3>
        <p>Styles typographiques utilisés dans l'application</p>
        
        <div className="text-styles-showcase">
          <div className="text-style-example">
            <div className="text text-title">Titre (Title)</div>
            <p className="text-style-description">
              32px • Bold • Line-height 120% • Letter-spacing 0%
            </p>
          </div>

          <div className="text-style-example">
            <div className="text text-h1">Titre H1</div>
            <p className="text-style-description">
              24px • Semibold • Line-height 120% • Letter-spacing 0%
            </p>
          </div>

          <div className="text-style-example">
            <div className="text text-h2">Titre H2</div>
            <p className="text-style-description">
              20px • Semibold • Line-height 120% • Letter-spacing 0%
            </p>
          </div>

          <div className="text-style-example">
            <div className="text text-h3">Titre H3</div>
            <p className="text-style-description">
              18px • Semibold • Line-height 120% • Letter-spacing 0%
            </p>
          </div>

          <div className="text-style-example">
            <div className="text text-h4">Titre H4</div>
            <p className="text-style-description">
              16px • Semibold • Line-height 120% • Letter-spacing 0%
            </p>
          </div>

          <div className="text-style-example">
            <div className="text text-button">Texte de bouton (Button Text)</div>
            <p className="text-style-description">
              Taille variable • Medium • Line-height 100% • Letter-spacing 0%
            </p>
          </div>

          <div className="text-style-example">
            <div className="text text-body-l">Corps de texte L (Body L) - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquam, nisl eget ultricies aliquet.</div>
            <p className="text-style-description">
              16px • Regular • Line-height 140% • Letter-spacing 0%
            </p>
          </div>

          <div className="text-style-example">
            <div className="text text-body-m">Corps de texte M (Body M) - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquam, nisl eget ultricies aliquet.</div>
            <p className="text-style-description">
              14px • Regular • Line-height 140% • Letter-spacing 0%
            </p>
          </div>

          <div className="text-style-example">
            <div className="text text-caption">Légende (Caption) - Information secondaire ou légende d'image</div>
            <p className="text-style-description">
              14px • Light • Line-height 120% • Letter-spacing 2%
            </p>
          </div>
        </div>

        <div className="color-variations">
          <h4>Variations de couleur</h4>
          <div className="color-variation">
            <div className="text text-body-l text-content-00">Texte en content.00 (défaut)</div>
            <p className="text-style-description">{colors.content['00']}</p>
          </div>
          <div className="color-variation">
            <div className="text text-body-l text-content-01">Texte en content.01</div>
            <p className="text-style-description">{colors.content['01']}</p>
          </div>
          <div className="color-variation">
            <div className="text text-body-l text-content-02">Texte en content.02</div>
            <p className="text-style-description">{colors.content['02']}</p>
          </div>
          <div className="color-variation" style={{ backgroundColor: "#161616", padding: "16px", borderRadius: "8px" }}>
            <div className="text text-body-l text-content-00-inverted">Texte en content.00Inverted (sur fond sombre)</div>
            <p className="text-style-description text-content-00-inverted">{colors.content['00Inverted']}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StyleGuide; 
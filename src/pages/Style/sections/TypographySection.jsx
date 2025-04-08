import { colors, typography } from '../../../styles';

const TypographySection = () => {
  return (
    <div className="typography-section">
      <h2>Typographie</h2>
      <p className="component-description">
        Styles typographiques utilisés dans l'application.
      </p>

      <div className="component-section">
        <h3>Styles de texte</h3>
        <p>Tous les styles utilisent la police Jost et la couleur content.00 par défaut</p>

        <div className="text-styles-showcase">
          <div className="text-style-example">
            <div className="text text-title">Texte Title</div>
            <p className="text-style-description">
              32px • Bold • Line-height 120% • Letter-spacing 0%
            </p>
          </div>

          <div className="text-style-example">
            <div className="text text-h1">Texte Heading 1</div>
            <p className="text-style-description">
              24px • Semibold • Line-height 120% • Letter-spacing 0%
            </p>
          </div>

          <div className="text-style-example">
            <div className="text text-h2">Texte Heading 2</div>
            <p className="text-style-description">
              20px • Semibold • Line-height 120% • Letter-spacing 0%
            </p>
          </div>

          <div className="text-style-example">
            <div className="text text-h3">Texte Heading 3</div>
            <p className="text-style-description">
              18px • Semibold • Line-height 120% • Letter-spacing 0%
            </p>
          </div>

          <div className="text-style-example">
            <div className="text text-h4">Texte Heading 4</div>
            <p className="text-style-description">
              16px • Semibold • Line-height 120% • Letter-spacing 0%
            </p>
          </div>

          <div className="text-style-example">
            <div className="text text-button">Texte Button</div>
            <p className="text-style-description">
              Taille variable • Medium • Line-height 100% • Letter-spacing 0%
            </p>
          </div>

          <div className="text-style-example">
            <div className="text text-body-l">Texte Body L - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquam, nisl eget ultricies aliquet.</div>
            <p className="text-style-description">
              16px • Regular • Line-height 140% • Letter-spacing 0%
            </p>
          </div>

          <div className="text-style-example">
            <div className="text text-body-m">Texte Body M - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquam, nisl eget ultricies aliquet.</div>
            <p className="text-style-description">
              14px • Regular • Line-height 140% • Letter-spacing 0%
            </p>
          </div>

          <div className="text-style-example">
            <div className="text text-caption">Texte Caption - Information secondaire ou légende</div>
            <p className="text-style-description">
              14px • Light • Line-height 120% • Letter-spacing 2%
            </p>
          </div>
        </div>
      </div>

      <div className="component-section">
        <h3>Variation de couleurs</h3>
        <p>Les textes peuvent utiliser différentes variations de couleurs</p>

        <div className="color-variations">
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
          <div className="color-variation">
            <div className="text text-body-l text-content-03">Texte en content.03</div>
            <p className="text-style-description">{colors.content['03']}</p>
          </div>
          <div className="color-variation">
            <div className="text text-body-l text-content-04">Texte en content.04</div>
            <p className="text-style-description">{colors.content['04']}</p>
          </div>

          <div className="color-variation" style={{ backgroundColor: "#161616", padding: "16px", borderRadius: "8px" }}>
            <div className="text text-body-l text-content-00-inverted">Texte en content.00Inverted</div>
            <p className="text-style-description text-content-00-inverted">{colors.content['00Inverted']}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypographySection; 
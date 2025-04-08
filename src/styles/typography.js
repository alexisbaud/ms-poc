/**
 * Configuration de la typographie pour l'application
 * Utilise la police Jost comme police principale
 */

const typography = {
  fontFamily: {
    primary: 'var(--font-primary)',
  },
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
  },
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    md: '1.125rem',    // 18px
    lg: '1.25rem',     // 20px
    xl: '1.5rem',      // 24px
    '2xl': '2rem',     // 32px
    '3xl': '2.5rem',   // 40px
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
  // Styles de texte prédéfinis
  textStyles: {
    title: {
      fontSize: '2rem',        // 32px
      fontWeight: 700,         // bold
      lineHeight: '120%',
      letterSpacing: '0%',
      fontFamily: 'var(--font-primary)',
    },
    h1: {
      fontSize: '1.5rem',      // 24px
      fontWeight: 600,         // semibold
      lineHeight: '120%',
      letterSpacing: '0%',
      fontFamily: 'var(--font-primary)',
    },
    h2: {
      fontSize: '1.25rem',     // 20px
      fontWeight: 600,         // semibold
      lineHeight: '120%',
      letterSpacing: '0%',
      fontFamily: 'var(--font-primary)',
    },
    h3: {
      fontSize: '1.125rem',    // 18px
      fontWeight: 600,         // semibold
      lineHeight: '120%',
      letterSpacing: '0%',
      fontFamily: 'var(--font-primary)',
    },
    h4: {
      fontSize: '1rem',        // 16px
      fontWeight: 600,         // semibold
      lineHeight: '120%',
      letterSpacing: '0%',
      fontFamily: 'var(--font-primary)',
    },
    buttonText: {
      // taille définie dans le CSS du bouton
      fontWeight: 500,         // medium
      lineHeight: '100%',
      letterSpacing: '0%',
      fontFamily: 'var(--font-primary)',
    },
    bodyL: {
      fontSize: '1rem',        // 16px
      fontWeight: 400,         // regular
      lineHeight: '140%',
      letterSpacing: '0%',
      fontFamily: 'var(--font-primary)',
    },
    bodyM: {
      fontSize: '0.875rem',    // 14px
      fontWeight: 400,         // regular
      lineHeight: '140%',
      letterSpacing: '0%',
      fontFamily: 'var(--font-primary)',
    },
    caption: {
      fontSize: '0.875rem',    // 14px
      fontWeight: 300,         // light
      lineHeight: '120%',
      letterSpacing: '2%',
      fontFamily: 'var(--font-primary)',
    }
  }
};

export default typography; 
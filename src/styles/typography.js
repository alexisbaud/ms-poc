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
  }
};

export default typography; 
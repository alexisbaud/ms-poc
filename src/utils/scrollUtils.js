/**
 * Défile intelligemment vers un élément DOM pour le centrer à l'écran,
 * mais uniquement s'il est situé plus bas que la position souhaitée.
 * 
 * @param {HTMLElement} element - L'élément à centrer
 * @param {Object} options - Options de défilement
 * @param {boolean} options.onlyIfBelow - Si true, ne centre que si l'élément est sous le centre de l'écran
 * @param {string} options.behavior - Comportement du défilement ('smooth', 'auto')
 */
export const smartScrollToElement = (element, options = {}) => {
  if (!element) return;
  
  const { 
    onlyIfBelow = true, 
    behavior = 'smooth',
    block = 'center'
  } = options;

  // Obtenir la position de l'élément par rapport à la fenêtre
  const rect = element.getBoundingClientRect();
  
  // Centre de l'écran
  const windowCenter = window.innerHeight / 2;
  
  // Si l'option onlyIfBelow est activée, vérifier si l'élément est sous le centre
  if (onlyIfBelow && rect.top < windowCenter) {
    // L'élément est déjà au-dessus du centre, ne rien faire
    return;
  }
  
  // Sinon, faire défiler pour centrer l'élément
  element.scrollIntoView({
    behavior,
    block,
    inline: 'nearest'
  });
};

/**
 * Vérifie si l'élément est visible dans le viewport
 * 
 * @param {HTMLElement} element - L'élément à vérifier
 * @returns {boolean} True si l'élément est entièrement visible
 */
export const isElementInViewport = (element) => {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= window.innerHeight &&
    rect.right <= window.innerWidth
  );
};

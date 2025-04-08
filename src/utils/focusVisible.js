/**
 * Utilitaire pour détecter la navigation au clavier
 * Inspiré de la pseudo-classe :focus-visible et de la bibliothèque focus-visible
 * 
 * Il permet de n'afficher le focus que lors de la navigation au clavier,
 * et non lorsqu'un élément reçoit le focus suite à un clic.
 */

// Dernière interaction utilisateur
let hadKeyboardEvent = false;
let hadFocusVisibleRecently = false;
let hadFocusVisibleRecentlyTimeout = null;

// Liste des touches qui indiquent une navigation au clavier
const keyboardKeys = [
  'Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'Space',
  'Escape', 'Home', 'End', 'PageUp', 'PageDown'
];

/**
 * Détermine si nous devrions montrer le style de focus
 */
function shouldShowFocus(e) {
  return hadKeyboardEvent;
}

/**
 * Gestionnaire pour les événements de touche
 */
function handleKeyDown(e) {
  if (keyboardKeys.includes(e.key)) {
    hadKeyboardEvent = true;
    
    if (document.body && !document.body.classList.contains('js-focus-visible')) {
      document.body.classList.add('js-focus-visible');
    }
  }
}

/**
 * Gestionnaire pour les événements de souris
 */
function handlePointerDown() {
  hadKeyboardEvent = false;
  
  if (document.body && document.body.classList.contains('js-focus-visible')) {
    // Ajouter un léger délai pour éviter que le style de focus
    // ne disparaisse trop rapidement en cas de navigation mixte
    clearTimeout(hadFocusVisibleRecentlyTimeout);
    hadFocusVisibleRecently = true;
    
    hadFocusVisibleRecentlyTimeout = setTimeout(() => {
      document.body.classList.remove('js-focus-visible');
      hadFocusVisibleRecently = false;
    }, 100);
  }
}

/**
 * Initialiser la détection de focus visible
 */
export function initFocusVisible() {
  // Ajouter les écouteurs d'événements
  document.addEventListener('keydown', handleKeyDown, true);
  document.addEventListener('mousedown', handlePointerDown, true);
  document.addEventListener('pointerdown', handlePointerDown, true);
  document.addEventListener('touchstart', handlePointerDown, true);
  
  // Ajouter l'attribut tabindex aux éléments qui devraient pouvoir recevoir le focus
  document.querySelectorAll('button, a, input, select, textarea, [role="button"]')
    .forEach(el => {
      if (!el.hasAttribute('tabindex')) {
        el.setAttribute('tabindex', '0');
      }
    });
  
  // État initial
  document.body.classList.remove('js-focus-visible');
  
  console.log('🔍 Focus Visible initialized');
}

export default initFocusVisible; 
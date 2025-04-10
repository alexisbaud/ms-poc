import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './EmojiReactions.css';
import EmojiButton from '../../atoms/EmojiButton';

/**
 * Component for emoji reactions bar containing 4 emoji buttons
 */
const EmojiReactions = ({
  emojis = ['❤️', '😂', '😮', '👏'],
  selectedEmoji = null,
  onReact = () => {},
  className = '',
  ...props
}) => {
  // État local pour suivre l'emoji sélectionné si aucun n'est fourni par les props
  const [localSelectedEmoji, setLocalSelectedEmoji] = useState(selectedEmoji);
  
  // Utiliser soit l'emoji sélectionné par props, soit l'état local
  const currentSelectedEmoji = selectedEmoji !== null ? selectedEmoji : localSelectedEmoji;
  
  // Gestionnaire de clic qui met à jour l'état local et appelle le callback
  const handleReaction = (emoji) => {
    // Si l'emoji est déjà sélectionné, le désélectionner
    const newSelectedEmoji = emoji === currentSelectedEmoji ? null : emoji;
    
    // Mettre à jour l'état local si aucun selectedEmoji n'est fourni par les props
    if (selectedEmoji === null) {
      setLocalSelectedEmoji(newSelectedEmoji);
    }
    
    // Appeler le handler fourni par les props
    onReact(newSelectedEmoji);
  };
  
  const reactionsClasses = [
    'emoji-reactions',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={reactionsClasses} {...props}>
      {emojis.map((emoji) => (
        <EmojiButton
          key={emoji}
          emoji={emoji}
          isSelected={emoji === currentSelectedEmoji}
          onClick={handleReaction}
        />
      ))}
    </div>
  );
};

EmojiReactions.propTypes = {
  /** Array of emoji characters to display */
  emojis: PropTypes.arrayOf(PropTypes.string),
  /** Currently selected emoji */
  selectedEmoji: PropTypes.string,
  /** Handler for reaction clicks */
  onReact: PropTypes.func,
  /** Additional CSS classes */
  className: PropTypes.string
};

export default EmojiReactions; 
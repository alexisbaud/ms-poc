import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './PostPreviewText.css';

/**
 * Composant affichant un extrait de texte avec possibilité d'afficher plus
 * @param {Object} props - Les propriétés du composant
 * @returns {JSX.Element}
 */
const PostPreviewText = ({ 
  text, 
  maxChars = 120, 
  postId,
  onReadMore,
  disabled = false
}) => {
  const [isPressed, setIsPressed] = useState(false);
  
  // Calcule si le texte est trop long et doit être tronqué
  const needsTruncation = text.length > maxChars;
  const truncatedText = needsTruncation 
    ? `${text.substring(0, maxChars).trim()}...` 
    : text;
    
  const handleReadMore = () => {
    if (disabled) return;
    
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
    
    if (onReadMore) {
      onReadMore(postId);
    }
  };
  
  let readMoreClass = 'post-preview-text__read-more';
  if (isPressed) readMoreClass += ' post-preview-text__read-more--pressed';
  if (disabled) readMoreClass += ' post-preview-text__read-more--disabled';
  
  return (
    <div className="post-preview-text">
      <p className="post-preview-text__content">{truncatedText}</p>
      
      {needsTruncation && (
        <button 
          className={readMoreClass}
          onClick={handleReadMore}
          disabled={disabled}
        >
          Lire la suite
        </button>
      )}
    </div>
  );
};

PostPreviewText.propTypes = {
  text: PropTypes.string.isRequired,
  maxChars: PropTypes.number,
  postId: PropTypes.string.isRequired,
  onReadMore: PropTypes.func,
  disabled: PropTypes.bool
};

export default PostPreviewText; 
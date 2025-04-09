import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './PostTTSButton.css';

/**
 * Bouton d'écoute audio avec gestion du chargement
 * @param {Object} props - Les propriétés du composant
 * @returns {JSX.Element}
 */
const PostTTSButton = ({ 
  postId, 
  onPlay, 
  isLoading = false, 
  isPlaying = false, 
  disabled = false 
}) => {
  const [isPressed, setIsPressed] = useState(false);
  
  const handleClick = () => {
    if (disabled || isLoading) return;
    
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
    
    if (onPlay) {
      onPlay(postId);
    }
  };
  
  let buttonClass = 'post-tts-button';
  if (isPressed) buttonClass += ' post-tts-button--pressed';
  if (disabled) buttonClass += ' post-tts-button--disabled';
  if (isPlaying) buttonClass += ' post-tts-button--playing';
  if (isLoading) buttonClass += ' post-tts-button--loading';
  
  return (
    <button 
      className={buttonClass}
      onClick={handleClick}
      disabled={disabled}
      aria-label={isPlaying ? "Pause audio" : "Écouter l'article"}
      title={isPlaying ? "Pause audio" : "Écouter l'article"}
    >
      {isLoading ? (
        <div className="post-tts-loading">
          <div className="post-tts-loading__spinner"></div>
        </div>
      ) : isPlaying ? (
        <span className="post-tts-icon post-tts-icon--pause"></span>
      ) : (
        <span className="post-tts-icon post-tts-icon--play"></span>
      )}
      <span className="post-tts-label">
        {isLoading ? 'Chargement...' : isPlaying ? 'Pause' : 'Écouter'}
      </span>
    </button>
  );
};

PostTTSButton.propTypes = {
  postId: PropTypes.string.isRequired,
  onPlay: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  isPlaying: PropTypes.bool,
  disabled: PropTypes.bool
};

export default PostTTSButton; 
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './AudioPlayerMini.css';
import { colors } from '../../../styles';
import Icon from '../Icon';

// Icônes SVG pour les boutons (inline pour simplifier)
const playIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
</svg>`;

const pauseIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 4H10V20H6V4ZM14 4H18V20H14V4Z" fill="currentColor" />
</svg>`;

const loadingIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor" />
  <path d="M12 11V7" stroke="currentColor" stroke-width="2" stroke-linecap="round">
    <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite" />
  </path>
</svg>`;

/**
 * Mini lecteur audio pour les posts avec TTS
 * @param {Object} props - Les propriétés du composant
 * @returns {JSX.Element}
 */
const AudioPlayerMini = ({
  src = null,
  isLoading = false,
  autoPlay = false,
  size = 'md',
  isPressed = false,
  isDisabled = false,
  onPlayPause = null,
  duration = 0,
  currentTime = 0,
  className = '',
  ...props
}) => {
  // États
  const [isPlayingState, setIsPlayingState] = useState(false);
  const [isPressedInternal, setIsPressedInternal] = useState(false);
  const [progressState, setProgressState] = useState(currentTime / Math.max(duration, 1));
  const [durationState, setDurationState] = useState(duration);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);
  const [error, setError] = useState(null);
  
  // Références
  const audioRef = useRef(null);
  const progressIntervalRef = useRef(null);
  
  // Effet pour gérer l'auto-play
  useEffect(() => {
    if (autoPlay && audioRef.current && isAudioLoaded && !isDisabled) {
      audioRef.current.play().catch(err => {
        console.error('Autoplay failed:', err);
      });
    }
  }, [autoPlay, isAudioLoaded, isDisabled]);
  
  // Effet pour nettoyer l'intervalle à la destruction du composant
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  // Effect to update progress based on props
  useEffect(() => {
    if (duration > 0) {
      setProgressState(currentTime / duration);
    }
  }, [currentTime, duration]);
  
  // Gestionnaire de chargement de l'audio
  const handleAudioLoaded = () => {
    setIsAudioLoaded(true);
    if (audioRef.current) {
      setDurationState(audioRef.current.duration);
    }
    setError(null);
  };
  
  // Gestionnaire d'erreur
  const handleError = (e) => {
    setError('Erreur de chargement audio');
    setIsPlayingState(false);
    setIsAudioLoaded(false);
    console.error('Audio player error:', e);
  };
  
  // Gestionnaire de fin de lecture
  const handleEnded = () => {
    setIsPlayingState(false);
    setProgressState(0);
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    if (onPlayPause) {
      onPlayPause(false);
    }
  };
  
  // Gestionnaire de clic pour jouer/pauser
  const togglePlay = () => {
    if (isDisabled || isLoading) return;
    
    // Don't try to play if no src is provided
    if (!src && !isPlayingState) return;
    
    if (isPlayingState) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    } else {
      if (audioRef.current) {
        audioRef.current.play().catch(err => {
          console.error('Play failed:', err);
        });
        // Mettre à jour la progression toutes les 50ms
        progressIntervalRef.current = setInterval(() => {
          if (audioRef.current) {
            setProgressState(audioRef.current.currentTime / Math.max(audioRef.current.duration, 1));
          }
        }, 50);
      }
    }
    
    const newPlayingState = !isPlayingState;
    setIsPlayingState(newPlayingState);
    if (onPlayPause) {
      onPlayPause(newPlayingState);
    }
  };
  
  // Handlers pour l'état pressed
  const handleMouseDown = (e) => {
    if (!isDisabled) {
      setIsPressedInternal(true);
    }
  };

  const handleMouseUp = (e) => {
    if (!isDisabled) {
      setIsPressedInternal(false);
    }
  };
  
  // Classes CSS
  const playerClasses = [
    'audio-player-mini',
    `audio-player-mini--${size}`,
    isPlayingState ? 'audio-player-mini--playing' : '',
    isLoading ? 'audio-player-mini--loading' : '',
    (isPressed || isPressedInternal) ? 'audio-player-mini--pressed' : '',
    isDisabled ? 'audio-player-mini--disabled' : '',
    error ? 'audio-player-mini--error' : '',
    className
  ].filter(Boolean).join(' ');
  
  // Détermine l'icône à afficher
  const getIcon = () => {
    if (isLoading) return loadingIcon;
    if (isPlayingState) return pauseIcon;
    return playIcon;
  };
  
  // Remove props that shouldn't be passed to DOM
  const {
    // eslint-disable-next-line no-unused-vars
    isPlaying: _isPlaying,
    // eslint-disable-next-line no-unused-vars
    onPlayStateChange: _onPlayStateChange,
    // eslint-disable-next-line no-unused-vars
    currentTime: _currentTime,
    // eslint-disable-next-line no-unused-vars
    duration: _duration,
    ...domProps
  } = props;
  
  return (
    <div className={playerClasses} {...domProps}>
      {src && (
        <audio
          ref={audioRef}
          src={src}
          onLoadedData={handleAudioLoaded}
          onError={handleError}
          onEnded={handleEnded}
          preload="auto"
        />
      )}
      
      <button
        className="audio-player-mini__button"
        onClick={togglePlay}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        onTouchCancel={handleMouseUp}
        disabled={isDisabled || (isLoading && !isPlayingState)}
        aria-label={isPlayingState ? "Pause" : "Play"}
        type="button"
      >
        <Icon svgContent={getIcon()} size={size} />
      </button>
      
      <div className="audio-player-mini__progress-container">
        <div 
          className="audio-player-mini__progress-bar"
          style={{ transform: `scaleX(${progressState})` }}
        />
      </div>
    </div>
  );
};

AudioPlayerMini.propTypes = {
  /** URL de la source audio */
  src: PropTypes.string,
  /** État de chargement */
  isLoading: PropTypes.bool,
  /** Lecture automatique */
  autoPlay: PropTypes.bool,
  /** Taille du lecteur */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** État pressé (contrôlé depuis l'extérieur) */
  isPressed: PropTypes.bool,
  /** État désactivé */
  isDisabled: PropTypes.bool,
  /** Callback lors du changement d'état de lecture */
  onPlayPause: PropTypes.func,
  /** Durée totale en secondes */
  duration: PropTypes.number,
  /** Temps actuel en secondes */
  currentTime: PropTypes.number,
  /** Classes CSS additionnelles */
  className: PropTypes.string,
};

export default AudioPlayerMini; 
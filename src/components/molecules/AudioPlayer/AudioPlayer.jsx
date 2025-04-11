import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './AudioPlayer.css';
import Icon from '../../atoms/Icon';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';

// Remplacer les SVG intégrés par les chemins vers les icônes externes
const PLAY_ICON = "/icons/play-fill.svg";
const PAUSE_ICON = "/icons/pause-fill.svg";

// SVG icon for loading (on garde celui-ci car il a une animation)
const loadingIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor" />
  <path d="M12 11V7" stroke="currentColor" stroke-width="2" stroke-linecap="round">
    <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite" />
  </path>
</svg>`;

/**
 * Format seconds to MM:SS format
 */
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

/**
 * AudioPlayer component with play/pause control and time display
 */
const AudioPlayer = ({
  audioSrc,
  onPlay,
  className = '',
  ...props
}) => {
  // States
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  // Refs
  const audioRef = useRef(null);
  const intervalRef = useRef(null);
  
  // Effect to clear interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  // Handle metadata loaded
  const handleMetadataLoaded = () => {
    setIsLoading(false);
    setDuration(audioRef.current.duration);
  };
  
  // Handle audio loading error
  const handleError = (e) => {
    console.error('Audio player error:', e);
    setIsLoading(false);
  };
  
  // Handle play/pause toggle
  const togglePlay = () => {
    if (isLoading) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    } else {
      audioRef.current.play();
      // Update time every 100ms
      intervalRef.current = setInterval(() => {
        setCurrentTime(audioRef.current.currentTime);
      }, 100);
      
      // Trigger onPlay callback
      if (onPlay) {
        onPlay();
      }
    }
    
    setIsPlaying(!isPlaying);
  };
  
  // Handle audio ended
  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  
  // Determine player state and icon to display
  const getPlayerState = () => {
    if (isLoading) return 'loading';
    if (isPlaying) return 'playing';
    return 'paused';
  };
  
  // Format time display
  const timeDisplay = `${formatTime(currentTime)}/${formatTime(duration)}`;
  
  // CSS classes
  const playerClasses = [
    'audio-player',
    `audio-player--${getPlayerState()}`,
    className
  ].filter(Boolean).join(' ');
  
  // Préparer l'icône pour le Button
  const getButtonIcon = () => {
    if (isLoading) {
      return <Icon svgContent={loadingIcon} size="md" />;
    } else {
      return <Icon src={isPlaying ? PAUSE_ICON : PLAY_ICON} size="md" />;
    }
  };
  
  return (
    <div className={playerClasses} {...props}>
      <audio
        ref={audioRef}
        src={audioSrc}
        onLoadedMetadata={handleMetadataLoaded}
        onError={handleError}
        onEnded={handleEnded}
        preload="auto"
      />
      
      <Button
        className="audio-player__button"
        onClick={togglePlay}
        disabled={isLoading && !isPlaying}
        aria-label={isPlaying ? "Pause" : "Lire l'histoire"}
        style="color"
        importance="tertiary"
        size="md"
        iconVariant="only"
        icon={getButtonIcon()}
        square
      />
      
      <div className="audio-player__progress-container">
        <div 
          className="audio-player__progress-bar"
          style={{ transform: `scaleX(${duration ? currentTime / duration : 0})` }}
        />
      </div>
      
      <div className="audio-player__time">
        <Text variant="caption" color="content-02">{timeDisplay}</Text>
      </div>
    </div>
  );
};

AudioPlayer.propTypes = {
  /** URL of the audio file */
  audioSrc: PropTypes.string.isRequired,
  /** Callback triggered when play is initiated */
  onPlay: PropTypes.func,
  /** Additional CSS classes */
  className: PropTypes.string
};

export default AudioPlayer; 
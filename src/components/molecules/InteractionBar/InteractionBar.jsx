import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './InteractionBar.css';
import { colors } from '../../../styles';
import Icon from '../../atoms/Icon';
import EmojiButton from '../../atoms/EmojiButton';
import Text from '../../atoms/Text';

// Icônes SVG pour les interactions
const commentIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z" fill="currentColor" />
</svg>`;

const shareIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.35C15.11 18.56 15.08 18.78 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z" fill="currentColor" />
</svg>`;

/**
 * Barre d'interaction pour les posts avec réactions, commentaires et partage
 * @param {Object} props - Les propriétés du composant
 * @returns {JSX.Element}
 */
const InteractionBar = ({
  postId = '',
  reactions = [],
  commentCount = 0,
  likeCount = 0,
  shareCount = 0,
  isLiked = false,
  userReaction = null,
  size = 'md',
  onReact = null,
  onLike = null,
  onComment = null,
  onShare = null,
  isPressed = false,
  isDisabled = false,
  className = '',
  ...props
}) => {
  // États
  const [isPressedInternal, setIsPressedInternal] = useState({
    comment: false,
    share: false
  });
  
  // Liste des emojis disponibles pour réagir (avec statistiques)
  const emojiList = [
    { emoji: '❤️', count: likeCount || 0, id: 'heart' },
    { emoji: '👍', count: 0, id: 'thumbsup' },
    { emoji: '👏', count: 0, id: 'clap' },
    { emoji: '😮', count: 0, id: 'wow' },
    { emoji: '🤔', count: 0, id: 'thinking' },
  ];
  
  // Calculer les compteurs de réactions
  const reactionCounts = {};
  reactions.forEach(reaction => {
    reactionCounts[reaction.emoji] = (reactionCounts[reaction.emoji] || 0) + 1;
  });
  
  // Mettre à jour les compteurs dans emojiList
  const emojisWithCounts = emojiList.map(item => ({
    ...item,
    count: item.id === 'heart' ? likeCount : (reactionCounts[item.emoji] || 0),
    isSelected: (isLiked && item.id === 'heart') || userReaction === item.id
  }));
  
  // Total des réactions
  const totalReactions = reactions.length;
  
  // Handlers pour l'état pressed
  const handlePressStart = (key) => () => {
    if (!isDisabled) {
      setIsPressedInternal(prev => ({
        ...prev,
        [key]: true
      }));
    }
  };

  const handlePressEnd = (key) => () => {
    if (!isDisabled) {
      setIsPressedInternal(prev => ({
        ...prev,
        [key]: false
      }));
    }
  };
  
  // Handlers pour les interactions
  const handleReact = (e, emojiId) => {
    if (emojiId === 'heart' && onLike && !isDisabled) {
      onLike(postId);
    } else if (onReact && !isDisabled) {
      onReact(emojiId, postId);
    }
  };
  
  const handleComment = () => {
    if (onComment && !isDisabled) {
      onComment(postId);
    }
  };
  
  const handleShare = () => {
    if (onShare && !isDisabled) {
      onShare(postId);
    }
  };
  
  // Classes CSS
  const barClasses = [
    'interaction-bar',
    `interaction-bar--${size}`,
    isPressed ? 'interaction-bar--pressed' : '',
    isDisabled ? 'interaction-bar--disabled' : '',
    className
  ].filter(Boolean).join(' ');
  
  // Remove props that shouldn't be passed to DOM
  const {
    // eslint-disable-next-line no-unused-vars
    postId: _postId,
    // eslint-disable-next-line no-unused-vars
    likeCount: _likeCount,
    // eslint-disable-next-line no-unused-vars
    shareCount: _shareCount,
    // eslint-disable-next-line no-unused-vars
    isLiked: _isLiked,
    // eslint-disable-next-line no-unused-vars
    onLike: _onLike,
    ...domProps
  } = props;
  
  return (
    <div className={barClasses} {...domProps}>
      <div className="interaction-bar__reactions">
        {emojisWithCounts.map(emoji => (
          <EmojiButton
            key={emoji.id}
            emoji={emoji.emoji}
            count={emoji.count}
            size={size}
            isSelected={emoji.isSelected}
            onClick={(e) => handleReact(e, emoji.id)}
            showCount={true}
            isDisabled={isDisabled}
          />
        ))}
      </div>
      
      <div className="interaction-bar__actions">
        <button 
          className={`interaction-bar__action ${isPressedInternal.comment ? 'interaction-bar__action--pressed' : ''}`}
          onClick={handleComment}
          onMouseDown={handlePressStart('comment')}
          onMouseUp={handlePressEnd('comment')}
          onMouseLeave={handlePressEnd('comment')}
          onTouchStart={handlePressStart('comment')}
          onTouchEnd={handlePressEnd('comment')}
          onTouchCancel={handlePressEnd('comment')}
          disabled={isDisabled}
          aria-label="Commenter"
        >
          <Icon svgContent={commentIcon} size={size} />
          <Text variant="body-m" color="content-01">{commentCount}</Text>
        </button>
        
        <button 
          className={`interaction-bar__action ${isPressedInternal.share ? 'interaction-bar__action--pressed' : ''}`}
          onClick={handleShare}
          onMouseDown={handlePressStart('share')}
          onMouseUp={handlePressEnd('share')}
          onMouseLeave={handlePressEnd('share')}
          onTouchStart={handlePressStart('share')}
          onTouchEnd={handlePressEnd('share')}
          onTouchCancel={handlePressEnd('share')}
          disabled={isDisabled}
          aria-label="Partager"
        >
          <Icon svgContent={shareIcon} size={size} />
          <Text variant="body-m" color="content-01">{shareCount > 0 ? shareCount : 'Partager'}</Text>
        </button>
      </div>
    </div>
  );
};

InteractionBar.propTypes = {
  /** ID du post */
  postId: PropTypes.string,
  /** Liste des réactions (format: {emoji, userId, timestamp}) */
  reactions: PropTypes.arrayOf(PropTypes.shape({
    emoji: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  })),
  /** Nombre de commentaires */
  commentCount: PropTypes.number,
  /** Nombre de likes */
  likeCount: PropTypes.number,
  /** Nombre de partages */
  shareCount: PropTypes.number,
  /** Si l'utilisateur a liké le post */
  isLiked: PropTypes.bool,
  /** ID de la réaction de l'utilisateur courant (null si aucune) */
  userReaction: PropTypes.string,
  /** Taille de la barre d'interaction */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Fonction appelée lors d'une réaction (avec l'ID emoji) */
  onReact: PropTypes.func,
  /** Fonction appelée lors d'un like */
  onLike: PropTypes.func,
  /** Fonction appelée lors du clic sur commentaire */
  onComment: PropTypes.func,
  /** Fonction appelée lors du clic sur partage */
  onShare: PropTypes.func,
  /** État pressé (contrôlé depuis l'extérieur) */
  isPressed: PropTypes.bool,
  /** État désactivé */
  isDisabled: PropTypes.bool,
  /** Classes CSS additionnelles */
  className: PropTypes.string,
};

export default InteractionBar; 
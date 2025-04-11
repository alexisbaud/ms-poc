import React from 'react';
import PropTypes from 'prop-types';
import './PostInteractions.css';
import Icon from '../../atoms/Icon';
import Button from '../../atoms/Button';

/**
 * Component for post interaction buttons (comment and share)
 * Now without like button, and with disabled buttons as requested
 */
const PostInteractions = ({
  onComment = () => {},
  onShare = () => {},
  className = '',
  commentCount = 0,
  shareCount = 0,
  // Ces props ne sont plus utilisées mais gardées pour la compatibilité
  likeCount = 0,
  isLiked = false,
  onLike = () => {},
  disabled = true, // Par défaut, les boutons sont désactivés
  postId,
  ...rest
}) => {
  const interactionsClasses = [
    'post-interactions',
    className
  ].filter(Boolean).join(' ');

  // Chemins des icônes
  const commentIcon = "/icons/chat.svg";
  const shareIcon = "/icons/send.svg";

  return (
    <div className={interactionsClasses} {...rest}>
      {/* Le bouton like a été supprimé selon les instructions */}
      <div className="post-interactions__button-container">
        <Button
          variant="tertiary"
          size="sm"
          onClick={onComment}
          aria-label="Comment on this post"
          icon={<Icon src={commentIcon} size="md" alt="Comment" />}
          className="post-interactions__button"
          disabled={disabled}
        >
          {commentCount > 0 && <span className="post-interactions__count">{commentCount}</span>}
        </Button>
      </div>
      <div className="post-interactions__button-container">
        <Button
          variant="tertiary"
          size="sm"
          onClick={onShare}
          aria-label="Share this post"
          icon={<Icon src={shareIcon} size="md" alt="Share" />}
          className="post-interactions__button"
          disabled={disabled}
        >
          {shareCount > 0 && <span className="post-interactions__count">{shareCount}</span>}
        </Button>
      </div>
    </div>
  );
};

PostInteractions.propTypes = {
  /** Handler for comment button click */
  onComment: PropTypes.func,
  /** Handler for share button click */
  onShare: PropTypes.func,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Number of comments */
  commentCount: PropTypes.number,
  /** Number of shares */
  shareCount: PropTypes.number,
  /** Number of likes (kept for compatibility) */
  likeCount: PropTypes.number,
  /** Whether the current user has liked the post (kept for compatibility) */
  isLiked: PropTypes.bool,
  /** Handler for like button click (kept for compatibility) */
  onLike: PropTypes.func,
  /** Whether interactions are disabled */
  disabled: PropTypes.bool,
  /** Post ID */
  postId: PropTypes.string
};

export default PostInteractions; 
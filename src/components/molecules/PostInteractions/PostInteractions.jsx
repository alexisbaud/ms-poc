import React from 'react';
import PropTypes from 'prop-types';
import './PostInteractions.css';
import Icon from '../../atoms/Icon';
import Button from '../../atoms/Button';

/**
 * Component for post interaction buttons (comment and share)
 */
const PostInteractions = ({
  onComment = () => {},
  onShare = () => {},
  className = '',
  ...props
}) => {
  const interactionsClasses = [
    'post-interactions',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={interactionsClasses} {...props}>
      <Button
        variant="tertiary"
        size="sm"
        onClick={onComment}
        aria-label="Comment on this post"
        icon="/icons/chat.svg"
        className="post-interactions__button"
      />
      <Button
        variant="tertiary"
        size="sm"
        onClick={onShare}
        aria-label="Share this post"
        icon="/icons/send.svg"
        className="post-interactions__button"
      />
    </div>
  );
};

PostInteractions.propTypes = {
  /** Handler for comment button click */
  onComment: PropTypes.func,
  /** Handler for share button click */
  onShare: PropTypes.func,
  /** Additional CSS classes */
  className: PropTypes.string
};

export default PostInteractions; 
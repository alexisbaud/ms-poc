import React from 'react';
import PropTypes from 'prop-types';
import { format, isValid, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import Avatar from '../../atoms/Avatar/Avatar';
import './PostHeader.css';

/**
 * PostHeader component displays the author information and publication date
 */
const PostHeader = ({ 
  username,
  avatarSrc,
  publishedAt,
  author = null,
  timestamp = null,
  onUserClick = null,
  additionalText = '',
  compact = false,
  avatarSize = 'md',
  className = '' 
}) => {
  // Use author object if provided
  const displayUsername = author?.username || username;
  const displayAvatarSrc = author?.avatar || avatarSrc;
  const isVerified = author?.verified || false;
  
  // Use timestamp if publishedAt is not provided
  const dateToFormat = publishedAt || timestamp;
  
  // Handle user click
  const handleUserClick = () => {
    if (onUserClick && author) {
      onUserClick(author.id);
    }
  };
  
  // Handle date formatting safely
  const getFormattedDate = () => {
    try {
      if (!dateToFormat) {
        return '';
      }
      
      // Handle different date formats
      let dateObj;
      
      if (dateToFormat instanceof Date) {
        dateObj = dateToFormat;
      } else if (typeof dateToFormat === 'string') {
        dateObj = parseISO(dateToFormat);
      } else {
        return 'Date invalide';
      }

      // Verify that the date is valid
      if (!isValid(dateObj)) {
        return 'Date invalide';
      }

      return format(dateObj, 'dd MMMM yyyy', { locale: fr });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Date invalide';
    }
  };

  const formattedDate = getFormattedDate();
  
  const headerClasses = [
    'post-header',
    compact ? 'post-header--compact' : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div className={headerClasses}>
      <div className="post-header__avatar" onClick={handleUserClick}>
        <Avatar 
          src={displayAvatarSrc} 
          alt={`Avatar de ${displayUsername}`} 
          size={avatarSize}
          isVerified={isVerified} 
        />
      </div>
      <div className="post-header__info">
        <div className="post-header__user-info">
          <span className="post-header__username" onClick={handleUserClick}>{displayUsername}</span>
          {additionalText && (
            <span className="post-header__additional-text">{additionalText}</span>
          )}
        </div>
        {formattedDate && (
          <span className="post-header__date">{formattedDate}</span>
        )}
      </div>
    </div>
  );
};

PostHeader.propTypes = {
  // Props for direct usage
  username: PropTypes.string,
  avatarSrc: PropTypes.string,
  publishedAt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date)
  ]),
  
  // Props for use with author object
  author: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string,
    avatar: PropTypes.string,
    verified: PropTypes.bool
  }),
  timestamp: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date)
  ]),
  onUserClick: PropTypes.func,
  
  // Additional props
  additionalText: PropTypes.string,
  compact: PropTypes.bool,
  avatarSize: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string
};

export default PostHeader; 
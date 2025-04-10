import React from 'react';
import PropTypes from 'prop-types';
import './PostHeader.css';
import Text from '../../atoms/Text';
import Hashtag from '../../atoms/Hashtag';

/**
 * PostHeader component displays username, date, and post hashtags
 */
const PostHeader = ({ 
  username,
  date,
  hashtags = [],
  onHashtagClick = null,
  className = ''
}) => {
  const headerClasses = [
    'post-header',
    className
  ].filter(Boolean).join(' ');

  // Traitement des hashtags pour gérer à la fois les chaînes et les tableaux
  let hashtagsArray = [];
  if (hashtags) {
    if (Array.isArray(hashtags)) {
      hashtagsArray = hashtags;
    } else if (typeof hashtags === 'string') {
      hashtagsArray = [hashtags];
    }
  }

  return (
    <div className={headerClasses}>
      <div className="post-header__info">
        <Text variant="body-m" weight="semibold" color="content-01" className="post-header__username">
          {username}
        </Text>
        <Text variant="body-m" weight="regular" color="content-03" className="post-header__date">
          {date}
        </Text>
      </div>
      
      {hashtagsArray.length > 0 && (
        <div className="post-header__hashtags">
          {hashtagsArray.map((tag) => (
            <Hashtag 
              key={tag} 
              tag={tag} 
              onClick={onHashtagClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

PostHeader.propTypes = {
  /** Username of the post author */
  username: PropTypes.string.isRequired,
  /** Formatted date string */
  date: PropTypes.string.isRequired,
  /** Array of hashtag strings */
  hashtags: PropTypes.arrayOf(PropTypes.string),
  /** Handler for hashtag clicks */
  onHashtagClick: PropTypes.func,
  /** Additional CSS classes */
  className: PropTypes.string
};

export default PostHeader; 
import React from 'react';
import PropTypes from 'prop-types';
import { format, isValid, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import './PostMeta.css';

/**
 * PostMeta component displays metadata for a post including username, date, and hashtags
 */
const PostMeta = ({ 
  username = '', 
  publishedAt, 
  hashtags = [], 
  onHashtagClick = null,
  size = 'md',
  className = '' 
}) => {
  // Format date safely
  const getFormattedDate = () => {
    try {
      if (!publishedAt) {
        return null;
      }
      
      // Handle different date formats
      let dateObj;
      
      if (publishedAt instanceof Date) {
        dateObj = publishedAt;
      } else if (typeof publishedAt === 'string') {
        dateObj = parseISO(publishedAt);
      } else {
        return null;
      }

      // Verify the date is valid
      if (!isValid(dateObj)) {
        return null;
      }

      return format(dateObj, 'dd MMMM yyyy', { locale: fr });
    } catch (error) {
      console.error('Error formatting date:', error);
      return null;
    }
  };

  const formattedDate = getFormattedDate();
  
  // Handle hashtag clicks
  const handleHashtagClick = (tag) => {
    if (onHashtagClick) {
      onHashtagClick(tag);
    }
  };
  
  const metaClasses = [
    'post-meta',
    `post-meta--${size}`,
    className || ''
  ].filter(Boolean).join(' ');
  
  return (
    <div className={metaClasses}>
      {(username || formattedDate) && (
        <div className="post-meta__user-date">
          {username && <span className="post-meta__username">{username}</span>}
          {username && formattedDate && <span className="post-meta__separator">•</span>}
          {formattedDate && <span className="post-meta__date">{formattedDate}</span>}
        </div>
      )}
      
      {hashtags && hashtags.length > 0 && (
        <div className="post-meta__hashtags">
          {hashtags.map((tag, index) => (
            <span 
              key={index} 
              className="post-meta__hashtag"
              onClick={() => handleHashtagClick(tag)}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

PostMeta.propTypes = {
  /** Username of the post author */
  username: PropTypes.string,
  /** Date when the post was published */
  publishedAt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date)
  ]),
  /** List of hashtags associated with the post */
  hashtags: PropTypes.arrayOf(PropTypes.string),
  /** Callback when a hashtag is clicked */
  onHashtagClick: PropTypes.func,
  /** Size of the component */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Additional CSS classes */
  className: PropTypes.string
};

export default PostMeta; 
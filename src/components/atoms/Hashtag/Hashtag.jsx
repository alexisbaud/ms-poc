import React from 'react';
import PropTypes from 'prop-types';
import './Hashtag.css';

/**
 * Composant pour afficher un hashtag cliquable
 * @param {Object} props - Les propriétés du composant
 * @returns {JSX.Element}
 */
const Hashtag = ({ tag, size = 'md', onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(tag);
    }
  };

  return (
    <span 
      className={`hashtag hashtag--${size}`} 
      onClick={handleClick}
    >
      #{tag}
    </span>
  );
};

Hashtag.propTypes = {
  tag: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  onClick: PropTypes.func
};

export default Hashtag; 
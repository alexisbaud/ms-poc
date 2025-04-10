import React from 'react';
import PropTypes from 'prop-types';
import './Hashtag.css';

/**
 * Composant pour afficher un hashtag cliquable
 * @param {Object} props - Les propriétés du composant
 * @returns {JSX.Element}
 */
const Hashtag = ({ tag, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(tag);
    }
  };

  return (
    <span 
      className="hashtag" 
      onClick={handleClick}
    >
      #{tag}
    </span>
  );
};

Hashtag.propTypes = {
  tag: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default Hashtag; 
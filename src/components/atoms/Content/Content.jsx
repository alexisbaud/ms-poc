import React from 'react';
import PropTypes from 'prop-types';
import './Content.css';
import Text from '../Text';

/**
 * Content component for displaying post content with two variants:
 * A - Full text content only
 * B - Title with excerpt
 */
const Content = ({
  variant = 'A',
  title = '',
  content,
  className = '',
  ...props
}) => {
  const contentClasses = [
    'content',
    `content--${variant.toLowerCase()}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={contentClasses} {...props}>
      {variant === 'A' && (
        <Text variant="body-l" weight="medium" className="content__text">
          {content}
        </Text>
      )}
      
      {variant === 'B' && (
        <>
          <Text variant="h3" weight="medium" className="content__title">
            {title}
          </Text>
          <Text variant="body-m" weight="light" className="content__excerpt">
            {content}
          </Text>
        </>
      )}
    </div>
  );
};

Content.propTypes = {
  /** Variant of the content display (A or B) */
  variant: PropTypes.oneOf(['A', 'B']),
  /** Title for variant B */
  title: PropTypes.string,
  /** Main content text */
  content: PropTypes.string.isRequired,
  /** Additional CSS class names */
  className: PropTypes.string
};

export default Content; 
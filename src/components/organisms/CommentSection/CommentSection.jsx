import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './CommentSection.css';

// Import required components
import Avatar from '../../atoms/Avatar';
import Text from '../../atoms/Text';
import Loader from '../../atoms/Loader';
import QuickCommentInput from '../../molecules/QuickCommentInput';

/**
 * Section de commentaires pour les posts
 * @param {Object} props - Les propriétés du composant
 * @returns {JSX.Element}
 */
const CommentSection = ({ 
  postId, 
  comments = [],
  onAddComment,
  onUserClick,
  isLoading = false,
  disabled = false 
}) => {
  const [commentText, setCommentText] = useState('');
  
  const handleCommentSubmit = (text) => {
    if (onAddComment && text.trim()) {
      onAddComment(postId, text);
      setCommentText('');
    }
  };
  
  const handleUserClick = (userId) => {
    if (onUserClick) {
      onUserClick(userId);
    }
  };
  
  return (
    <div className="comment-section">
      <h3 className="comment-section__title">
        Commentaires {comments.length > 0 && `(${comments.length})`}
      </h3>
      
      <QuickCommentInput 
        onSubmit={handleCommentSubmit}
        value={commentText}
        onChange={setCommentText}
        placeholder="Ajouter un commentaire..."
        disabled={disabled}
      />
      
      {isLoading ? (
        <div className="comment-section__loading">
          <Loader size="md" />
        </div>
      ) : (
        <div className="comment-section__comments">
          {comments.length === 0 ? (
            <div className="comment-section__empty">
              <Text variant="body" className="comment-section__empty-text">
                Soyez le premier à commenter cette publication !
              </Text>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="comment-section__comment">
                <div className="comment-section__comment-avatar">
                  <Avatar 
                    src={comment.author.avatar} 
                    alt={comment.author.username}
                    size="sm"
                    onClick={() => handleUserClick(comment.author.id)}
                  />
                </div>
                <div className="comment-section__comment-content">
                  <div className="comment-section__comment-header">
                    <Text 
                      variant="username" 
                      className="comment-section__comment-username"
                      onClick={() => handleUserClick(comment.author.id)}
                    >
                      {comment.author.username}
                    </Text>
                    <Text variant="caption" className="comment-section__comment-time">
                      {new Date(comment.createdAt).toLocaleString()}
                    </Text>
                  </div>
                  <Text variant="body" className="comment-section__comment-text">
                    {comment.content}
                  </Text>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

CommentSection.propTypes = {
  postId: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      author: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        avatar: PropTypes.string
      }).isRequired
    })
  ),
  onAddComment: PropTypes.func,
  onUserClick: PropTypes.func,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool
};

export default CommentSection; 
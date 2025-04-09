import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Avatar from '../../atoms/Avatar/Avatar';
import TextField from '../../atoms/TextField/TextField';
import Button from '../../atoms/Button/Button';
import { addComment } from '../../../features/comments/commentsSlice';
import './QuickCommentInput.css';

/**
 * Composant pour saisir rapidement un commentaire sous un post
 * @param {Object} props - Les propriétés du composant
 * @returns {JSX.Element}
 */
const QuickCommentInput = ({ postId, placeholder = "Add a comment...", onCommentAdded, autoFocus = false }) => {
  const [comment, setComment] = useState('');
  const [isPressed, setIsPressed] = useState(false);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const isSubmitDisabled = !comment.trim();

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isSubmitDisabled) return;
    
    const commentData = {
      postId,
      content: comment.trim(),
      userId: user.id,
      createdAt: new Date().toISOString()
    };
    
    dispatch(addComment(commentData))
      .unwrap()
      .then(result => {
        setComment('');
        if (onCommentAdded) {
          onCommentAdded(result);
        }
      })
      .catch(error => {
        console.error('Failed to add comment:', error);
      });
  };

  const handlePressStart = () => {
    setIsPressed(true);
  };

  const handlePressEnd = () => {
    setIsPressed(false);
  };

  return (
    <form className="quick-comment-input" onSubmit={handleSubmit}>
      <div className="quick-comment-input__avatar">
        <Avatar 
          src={user?.profilePicture} 
          alt={user?.username || 'User'} 
          size="small" 
        />
      </div>
      
      <div className="quick-comment-input__field-container">
        <TextField
          ref={inputRef}
          className="quick-comment-input__field"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={placeholder}
          aria-label="Comment text"
          onMouseDown={handlePressStart}
          onMouseUp={handlePressEnd}
          onMouseLeave={handlePressEnd}
          onTouchStart={handlePressStart}
          onTouchEnd={handlePressEnd}
          onTouchCancel={handlePressEnd}
        />
      </div>
      
      <Button
        className={`quick-comment-input__submit ${isSubmitDisabled ? 'quick-comment-input__submit--disabled' : ''}`}
        type="submit"
        disabled={isSubmitDisabled}
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
        onTouchCancel={handlePressEnd}
      >
        Post
      </Button>
    </form>
  );
};

QuickCommentInput.propTypes = {
  postId: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onCommentAdded: PropTypes.func,
  autoFocus: PropTypes.bool
};

export default QuickCommentInput; 
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreatePost.css';

// Components
import Button from '../../components/atoms/Button/Button';
import Icon from '../../components/atoms/Icon/Icon';
import Text from '../../components/atoms/Text/Text';
import TextField from '../../components/molecules/TextField/TextField';
import Loader from '../../components/atoms/Loader/Loader';

// Context
import { useCreatePost } from './CreatePostContext';

/**
 * Page de rédaction de l'histoire (Page A)
 * @returns {JSX.Element}
 */
const WritePostPage = () => {
  const navigate = useNavigate();
  const {
    content,
    setContent,
    determinePostType,
    setPostType
  } = useCreatePost();
  
  const [error, setError] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isContentEmpty, setIsContentEmpty] = useState(false);

  // Calculer le nombre de mots à chaque changement de contenu
  useEffect(() => {
    const words = content.split(/\s+/).filter(Boolean).length;
    setWordCount(words);
  }, [content]);

  // Gérer le changement de contenu
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  // Passer à l'étape suivante
  const handleNext = () => {
    if (!content.trim()) {
      setError('Le contenu ne peut pas être vide');
      return;
    }

    // Déterminer le type de post
    const type = determinePostType(content);
    setPostType(type);

    // Naviguer vers la page de personnalisation
    navigate('/create/customize');
  };

  // Retourner à la page d'accueil
  const handleBack = () => {
    navigate('/');
  };

  const handleSubmit = () => {
    if (!content.trim()) {
      setError('Le contenu ne peut pas être vide');
      setIsContentEmpty(true);
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setIsContentEmpty(false);

    // Déterminer le type de post
    const type = determinePostType(content);
    setPostType(type);

    // Naviguer vers la page de personnalisation
    navigate('/create/customize');
  };

  return (
    <div className="create-post-page">
      <header className="create-post-page__header">
        <Button 
          style="black"
          importance="tertiary" 
          size="M"
          onClick={handleBack}
          aria-label="Retour"
          icon={<Icon src="/src/assets/Icons/chevron-left.svg" size="md" />}
          iconVariant="only"
          square
        />
        <h1 className="create-post-page__title">Nouvelle histoire</h1>
      </header>

      <main className="create-post-page__content">
        <div className="create-post-page__step create-post-page__step-1">
          <div className="create-post-page__content-input create-post-page__content-input--fullsize">
            <TextField 
              id="post-content"
              label="Votre histoire"
              multiline
              rows={12}
              value={content}
              onChange={handleContentChange}
              placeholder="Racontez quelque chose..."
              className="create-post-page__fullwidth-field"
            />
            <div className="create-post-page__word-counter">
              {wordCount} {wordCount <= 1 ? 'mot' : 'mots'}
              {wordCount < 60 ? ' (Post court)' : ' (Post long avec TTS)'}
            </div>
          </div>

          <div className="create-post-page__actions">
            {error && <p className="create-post-page__error">{error}</p>}
            <div className="create-post-page__buttons">
              <Button 
                style="color"
                importance="primary" 
                size="L"
                onClick={handleSubmit}
                disabled={isSubmitting || isContentEmpty}
              >
                {isSubmitting ? <Loader size="sm" /> : "Suivant"}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WritePostPage; 
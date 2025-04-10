import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreatePost.css';

// Components
import Button from '../../components/atoms/Button/Button';
import Icon from '../../components/atoms/Icon/Icon';
import Text from '../../components/atoms/Text/Text';
import TextField from '../../components/molecules/TextField/TextField';
import Hashtag from '../../components/atoms/Hashtag/Hashtag';
import Loader from '../../components/atoms/Loader/Loader';

// Context and Services
import { useCreatePost } from './CreatePostContext';
import PostsService from '../../services/posts';

/**
 * Page de personnalisation du post (Page B)
 * @returns {JSX.Element}
 */
const CustomizePostPage = () => {
  const navigate = useNavigate();
  const {
    content,
    postType,
    title,
    setTitle,
    ttsInstructions,
    setTtsInstructions,
    hashtags,
    setHashtags
  } = useCreatePost();

  // États locaux
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [suggestedHashtags, setSuggestedHashtags] = useState([]);
  const [suggestedTitle, setSuggestedTitle] = useState('');
  const [suggestedTtsInstructions, setSuggestedTtsInstructions] = useState('');
  const [newHashtag, setNewHashtag] = useState('');

  // Rediriger vers la première page si le contenu est vide
  useEffect(() => {
    if (!content.trim()) {
      navigate('/create');
    }
  }, [content, navigate]);

  // Charger les suggestions lors du chargement de la page
  useEffect(() => {
    const loadSuggestions = async () => {
      if (!content.trim()) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Récupérer les suggestions de hashtags
        const suggestedTags = await PostsService.getHashtagSuggestions(content);
        setSuggestedHashtags(suggestedTags);
        
        if (hashtags.length === 0) {
          setHashtags(suggestedTags);
        }
        
        // Si c'est un Post B, récupérer les suggestions de titre et d'instructions TTS
        if (postType === 'Post B') {
          // Générer un titre basé sur la première phrase
          const firstSentence = content.split(/[.!?]+/)[0].trim();
          const generatedTitle = firstSentence.length > 50 
            ? `${firstSentence.substring(0, 47)}...` 
            : firstSentence;
          
          setSuggestedTitle(generatedTitle);
          
          if (!title) {
            setTitle(generatedTitle);
          }
          
          // Récupérer les suggestions d'instructions TTS
          const suggestedInstructions = await PostsService.getTtsSuggestions(content);
          setSuggestedTtsInstructions(suggestedInstructions);
          
          if (!ttsInstructions) {
            setTtsInstructions(suggestedInstructions);
          }
        }
      } catch (err) {
        console.error('Erreur lors du chargement des suggestions:', err);
        setError('Impossible de charger les suggestions. Vous pouvez continuer manuellement.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSuggestions();
  // Ne pas inclure title et ttsInstructions dans les dépendances pour éviter une boucle infinie
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, postType, setHashtags, setTitle, setTtsInstructions, hashtags.length]);

  // Ajouter un hashtag
  const handleAddHashtag = (tag) => {
    if (hashtags.includes(tag)) return;
    setHashtags([...hashtags, tag]);
  };

  // Supprimer un hashtag
  const handleRemoveHashtag = (tag) => {
    setHashtags(hashtags.filter(t => t !== tag));
  };

  // Gérer la soumission du nouveau hashtag
  const handleSubmitNewHashtag = (e) => {
    e.preventDefault();
    if (!newHashtag.trim()) return;
    
    // Nettoyer le hashtag (enlever les # au début et les espaces)
    const cleanedTag = newHashtag.trim().replace(/^#+/, '');
    
    if (cleanedTag && !hashtags.includes(cleanedTag)) {
      handleAddHashtag(cleanedTag);
      setNewHashtag('');
    }
  };

  // Publier le post
  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    // Vérification standard du token
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('⚠️ Aucun token trouvé dans localStorage!');
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const postData = {
        type: postType,
        content,
        title: postType === 'Post B' ? title : null,
        hashtags,
        visibility: 'public',
        ttsInstructions: postType === 'Post B' ? ttsInstructions : null
      };
      
      await PostsService.createPost(postData);
      
      // Rediriger vers la page d'accueil
      navigate('/');
    } catch (err) {
      // Vérifier si c'est une erreur d'authentification
      if (err.message && err.message.includes('Authentication required')) {
        // Stocker l'état actuel pour pouvoir revenir après la connexion
        localStorage.setItem('pendingPost', JSON.stringify({
          type: postType,
          content,
          title: postType === 'Post B' ? title : null,
          hashtags,
          ttsInstructions: postType === 'Post B' ? ttsInstructions : null
        }));
        
        // Stocker l'URL actuelle pour rediriger après la connexion
        localStorage.setItem('redirectAfterLogin', '/create/customize');
        
        // Rediriger vers la page de connexion
        setError('Vous devez être connecté pour publier. Redirection vers la page de connexion...');
        setTimeout(() => {
          navigate('/auth', { state: { message: 'Veuillez vous connecter pour publier votre histoire.' } });
        }, 2000);
      } else {
        setError(err.message || 'Une erreur est survenue lors de la publication. Veuillez réessayer.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Retourner à la page précédente
  const handleBack = () => {
    navigate('/create');
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
          icon={<Icon src="/icons/chevron-left.svg" size="md" />}
          iconVariant="only"
          square
        />
        <h1 className="create-post-page__title">Personnalisation</h1>
      </header>

      <main className="create-post-page__content">
        {isLoading ? (
          <div className="create-post-page__loading">
            <Loader size="lg" />
            <Text variant="body">Génération des suggestions...</Text>
          </div>
        ) : (
          <div className="create-post-page__step create-post-page__step-2">
            {postType === 'Post B' && (
              <>
                <div className="create-post-page__title-input">
                  <TextField 
                    id="post-title"
                    label="Titre de l'histoire"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Donnez un titre à votre histoire..."
                    className="create-post-page__fullwidth-field"
                  />
                  {suggestedTitle && (
                    <div className="create-post-page__suggestion create-post-page__suggestion--horizontal">
                      <Text variant="caption">Suggestion: {suggestedTitle}</Text>
                      <Button 
                        variant="text" 
                        size="sm" 
                        onClick={() => setTitle(suggestedTitle)}
                        className="create-post-page__suggestion-button"
                      >
                        Utiliser
                      </Button>
                    </div>
                  )}
                </div>

                <div className="create-post-page__tts-input">
                  <TextField 
                    id="post-tts-instructions"
                    label="Instructions pour la narration audio"
                    multiline
                    rows={3}
                    value={ttsInstructions}
                    onChange={(e) => setTtsInstructions(e.target.value)}
                    placeholder="Ex: Voix calme et posée, avec un ton légèrement enjoué..."
                    className="create-post-page__fullwidth-field"
                  />
                  {suggestedTtsInstructions && (
                    <div className="create-post-page__suggestion create-post-page__suggestion--horizontal">
                      <Text variant="caption">Suggestion: {suggestedTtsInstructions}</Text>
                      <Button 
                        variant="text" 
                        size="sm" 
                        onClick={() => setTtsInstructions(suggestedTtsInstructions)}
                        className="create-post-page__suggestion-button"
                      >
                        Utiliser
                      </Button>
                    </div>
                  )}
                </div>
              </>
            )}

            <div className="create-post-page__hashtags">
              <Text variant="subtitle">Hashtags</Text>
              
              {/* Champ pour ajouter un nouveau hashtag */}
              <form onSubmit={handleSubmitNewHashtag} className="create-post-page__hashtag-form create-post-page__hashtag-form--horizontal">
                <TextField 
                  id="new-hashtag"
                  placeholder="Ajouter un hashtag..."
                  value={newHashtag}
                  onChange={(e) => setNewHashtag(e.target.value)}
                  className="create-post-page__hashtag-input create-post-page__fullwidth-field"
                />
                <Button 
                  type="submit" 
                  variant="primary"
                  size="md"
                  disabled={!newHashtag.trim()}
                  className="create-post-page__hashtag-button"
                >
                  Ajouter
                </Button>
              </form>
              
              <div className="create-post-page__hashtags-list create-post-page__hashtags-list--reduced-margin">
                {hashtags.map((tag, index) => (
                  <div key={index} className="create-post-page__hashtag-item">
                    <Hashtag tag={tag} />
                    <button 
                      className="create-post-page__remove-hashtag"
                      onClick={() => handleRemoveHashtag(tag)}
                      aria-label={`Supprimer le hashtag ${tag}`}
                    >
                      <Icon src="/icons/x.svg" size="sm" />
                    </button>
                  </div>
                ))}
              </div>
              
              {suggestedHashtags.length > 0 && (
                <div className="create-post-page__suggested-hashtags">
                  <Text variant="caption">Suggestions:</Text>
                  <div className="create-post-page__suggested-hashtags-list">
                    {suggestedHashtags.map((tag, index) => (
                      <Button 
                        key={index} 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleAddHashtag(tag)}
                        disabled={hashtags.includes(tag)}
                      >
                        #{tag}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="create-post-page__actions">
              {error && <p className="create-post-page__error">{error}</p>}
              <div className="create-post-page__buttons">
                <Button
                  style="color"
                  importance="primary"
                  size="L"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Loader size="sm" /> : "Publier"}
                </Button>
                <Button
                  style="black"
                  importance="tertiary"
                  size="M"
                  onClick={handleBack}
                >
                  Retour
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CustomizePostPage; 
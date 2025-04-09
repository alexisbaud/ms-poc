import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreatePostPage.css';

// Importer les composants nécessaires
import Button from '../../components/atoms/Button';
import Icon from '../../components/atoms/Icon';
import Text from '../../components/atoms/Text';
import TextField from '../../components/molecules/TextField';
import Hashtag from '../../components/atoms/Hashtag';
import Loader from '../../components/atoms/Loader';

// Importer les services
import PostsService from '../../services/posts';

/**
 * Page de création de post - étape 1: contenu principal
 * @returns {JSX.Element}
 */
const CreatePostPage = () => {
  const navigate = useNavigate();
  
  // États pour le formulaire
  const [step, setStep] = useState(1); // Étape 1 ou 2
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [ttsInstructions, setTtsInstructions] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [hashtags, setHashtags] = useState([]);
  const [postType, setPostType] = useState(null); // 'Post A' ou 'Post B'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [suggestedHashtags, setSuggestedHashtags] = useState([]);
  const [suggestedTitle, setSuggestedTitle] = useState('');
  const [suggestedTtsInstructions, setSuggestedTtsInstructions] = useState('');
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false);
  
  // Gestionnaire de changement de contenu
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };
  
  // Gestionnaire de changement de visibilité
  const handleVisibilityChange = (newVisibility) => {
    setVisibility(newVisibility);
  };
  
  // Fonction pour déterminer automatiquement le type de post
  const determinePostType = () => {
    const wordCount = content.split(/\s+/).filter(Boolean).length;
    return wordCount >= 60 ? 'Post B' : 'Post A';
  };
  
  // Passer à l'étape 2
  const handleNextStep = async () => {
    if (!content.trim()) {
      setError('Le contenu ne peut pas être vide');
      return;
    }
    
    // Déterminer le type de post
    const type = determinePostType();
    setPostType(type);
    
    // Générer des suggestions pour l'étape 2
    setIsGeneratingSuggestions(true);
    setError(null);
    
    try {
      // Simulation d'un appel API pour générer des suggestions
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Dans une vraie implémentation, appeler l'API pour les suggestions
      // const suggestions = await TextAnalysisService.getSuggestions(content);
      
      // Simuler des suggestions en attendant l'API
      const generateSuggestedHashtags = () => {
        const words = content.split(/\s+/).filter(word => 
          word.length > 5 && !['comme', 'quand', 'alors', 'toujours'].includes(word.toLowerCase())
        );
        const uniqueWords = [...new Set(words)];
        return uniqueWords.slice(0, 5).map(word => word.replace(/[,.;:!?]/g, '').toLowerCase());
      };
      
      const generateSuggestedTitle = () => {
        const sentences = content.split(/[.!?]+/).filter(Boolean);
        if (sentences.length > 0) {
          return sentences[0].trim().substring(0, 50) + (sentences[0].length > 50 ? '...' : '');
        }
        return 'Mon histoire';
      };
      
      const generateSuggestedTtsInstructions = () => {
        const instructions = [
          'Lire avec une voix calme et posée',
          'Lire avec émotion et enthousiasme',
          'Narrer comme un conte avec suspense',
          'Voix dramatique et puissante',
          'Ton neutre et informatif'
        ];
        return instructions[Math.floor(Math.random() * instructions.length)];
      };
      
      setSuggestedHashtags(generateSuggestedHashtags());
      
      if (type === 'Post B') {
        setSuggestedTitle(generateSuggestedTitle());
        setSuggestedTtsInstructions(generateSuggestedTtsInstructions());
        setTitle(generateSuggestedTitle());
        setTtsInstructions(generateSuggestedTtsInstructions());
      }
      
      setHashtags(generateSuggestedHashtags());
      setStep(2);
    } catch (err) {
      console.error('Erreur lors de la génération des suggestions:', err);
      setError('Impossible de générer des suggestions. Veuillez réessayer.');
    } finally {
      setIsGeneratingSuggestions(false);
    }
  };
  
  // Soumettre le post
  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const postData = {
        type: postType,
        content,
        title: postType === 'Post B' ? title : null,
        hashtags,
        visibility,
        ttsInstructions: postType === 'Post B' ? ttsInstructions : null
      };
      
      await PostsService.createPost(postData);
      
      // Rediriger vers le fil d'actualité après la création
      navigate('/');
    } catch (err) {
      console.error('Erreur lors de la création du post:', err);
      setError('Une erreur est survenue lors de la création du post. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Ajouter un hashtag
  const handleAddHashtag = (tag) => {
    if (!hashtags.includes(tag)) {
      setHashtags([...hashtags, tag]);
    }
  };
  
  // Supprimer un hashtag
  const handleRemoveHashtag = (tag) => {
    setHashtags(hashtags.filter(t => t !== tag));
  };
  
  // Revenir à l'étape 1
  const handleBack = () => {
    setStep(1);
  };
  
  return (
    <div className="create-post-page">
      <header className="create-post-page__header">
        <button className="create-post-page__back-button" onClick={() => step === 1 ? navigate('/') : handleBack()}>
          <Icon name="arrow-left" size="md" />
        </button>
        <h1 className="create-post-page__title">
          {step === 1 ? "Nouvelle histoire" : "Personnalisation"}
        </h1>
      </header>
      
      <main className="create-post-page__content">
        {step === 1 ? (
          // Étape 1: Contenu principal
          <div className="create-post-page__step create-post-page__step-1">
            <div className="create-post-page__visibility">
              <Text variant="subtitle">Visibilité</Text>
              <div className="create-post-page__visibility-options">
                <Button 
                  variant={visibility === 'public' ? 'primary' : 'secondary'}
                  onClick={() => handleVisibilityChange('public')}
                >
                  Public
                </Button>
                <Button 
                  variant={visibility === 'private' ? 'primary' : 'secondary'}
                  onClick={() => handleVisibilityChange('private')}
                >
                  Privé
                </Button>
              </div>
            </div>
            
            <div className="create-post-page__content-input">
              <TextField 
                id="post-content"
                label="Votre histoire"
                multiline
                rows={8}
                value={content}
                onChange={handleContentChange}
                placeholder="Racontez quelque chose..."
              />
            </div>
            
            <div className="create-post-page__actions">
              {error && <p className="create-post-page__error">{error}</p>}
              <Button 
                variant="primary" 
                className="create-post-page__next-button"
                onClick={handleNextStep}
                disabled={isGeneratingSuggestions || !content.trim()}
              >
                {isGeneratingSuggestions ? <Loader size="sm" /> : "Suivant"}
              </Button>
            </div>
          </div>
        ) : (
          // Étape 2: Personnalisation
          <div className="create-post-page__step create-post-page__step-2">
            {postType === 'Post B' && (
              <div className="create-post-page__title-input">
                <TextField 
                  id="post-title"
                  label="Titre de l'histoire"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {suggestedTitle && (
                  <div className="create-post-page__suggestion">
                    <Text variant="caption">Suggestion: {suggestedTitle}</Text>
                    <Button 
                      variant="text" 
                      size="sm" 
                      onClick={() => setTitle(suggestedTitle)}
                    >
                      Utiliser
                    </Button>
                  </div>
                )}
              </div>
            )}
            
            {postType === 'Post B' && (
              <div className="create-post-page__tts-input">
                <TextField 
                  id="post-tts-instructions"
                  label="Instructions pour la narration audio"
                  multiline
                  rows={3}
                  value={ttsInstructions}
                  onChange={(e) => setTtsInstructions(e.target.value)}
                  placeholder="Ex: Voix calme et posée, avec un ton légèrement enjoué..."
                />
                {suggestedTtsInstructions && (
                  <div className="create-post-page__suggestion">
                    <Text variant="caption">Suggestion: {suggestedTtsInstructions}</Text>
                    <Button 
                      variant="text" 
                      size="sm" 
                      onClick={() => setTtsInstructions(suggestedTtsInstructions)}
                    >
                      Utiliser
                    </Button>
                  </div>
                )}
              </div>
            )}
            
            <div className="create-post-page__hashtags">
              <Text variant="subtitle">Hashtags</Text>
              <div className="create-post-page__hashtags-list">
                {hashtags.map((tag, index) => (
                  <div key={index} className="create-post-page__hashtag-item">
                    <Hashtag tag={tag} />
                    <button 
                      className="create-post-page__remove-hashtag"
                      onClick={() => handleRemoveHashtag(tag)}
                    >
                      <Icon name="x" size="sm" />
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
                  variant="secondary" 
                  onClick={handleBack}
                  disabled={isSubmitting}
                >
                  Retour
                </Button>
                <Button 
                  variant="primary" 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Loader size="sm" /> : "Publier"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CreatePostPage; 
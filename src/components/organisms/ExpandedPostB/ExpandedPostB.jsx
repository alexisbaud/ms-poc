import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ExpandedPostB.css';

// Import required components
import Text from '../../atoms/Text';
import Hashtag from '../../atoms/Hashtag';
import Icon from '../../atoms/Icon';
import Button from '../../atoms/Button';
import AudioPlayer from '../../molecules/AudioPlayer';
import InteractionBar from '../../molecules/InteractionBar';
import PostHeader from '../../molecules/PostHeader';

/**
 * Vue détaillée du Post B avec texte intégral + lecteur audio + commentaires
 * @param {Object} props - Les propriétés du composant
 * @returns {JSX.Element}
 */
const ExpandedPostB = ({ 
  post, 
  comments = [],
  onHashtagClick,
  onUserClick,
  onLike,
  onComment,
  onShare,
  onBack,
  onAddComment,
  audioUrl,
  isPlaying = false,
  onPlayAudio,
  onPauseAudio,
  onGenerateAudio,
  isLoadingAudio = false,
  isLoadingComments = false,
  disabled = false 
}) => {
  const [audioProgress, setAudioProgress] = useState(0);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  
  const handleBackClick = () => {
    if (onBack) {
      onBack();
    }
  };
  
  const handleAudioProgressChange = (progress) => {
    setAudioProgress(progress);
  };
  
  const handleGenerateAudio = async () => {
    if (disabled || isGeneratingAudio) return;
    
    setIsGeneratingAudio(true);
    
    if (onGenerateAudio) {
      try {
        // Appel à la fonction de génération audio
        await onGenerateAudio(post.id);
        
        // En cas de succès, on peut laisser la page parent gérer l'état
        // Si nécessaire, attendre un peu pour laisser le temps au parent de mettre à jour le post
        setTimeout(() => {
          setIsGeneratingAudio(false);
        }, 500);
      } catch (error) {
        console.error('Erreur lors de la génération audio:', error);
        setIsGeneratingAudio(false);
      }
    }
  };
  
  // Détermine si on doit afficher l'état de chargement (priorité à l'état global)
  const isAudioLoading = isLoadingAudio || isGeneratingAudio;
  
  // Log de debug pour l'URL audio
  useEffect(() => {
    if (post.audioUrl || audioUrl) {
      console.log(`ExpandedPostB (${post.id}) - URL audio détectée:`, audioUrl || post.audioUrl);
    }
  }, [post.audioUrl, audioUrl, post.id]);
  
  return (
    <article className="expanded-post-b">
      <header className="expanded-post-b__header">
        <Button 
          style="black"
          importance="tertiary" 
          size="M"
          onClick={handleBackClick}
          aria-label="Retour"
          icon={<Icon src="/icons/chevron-left.svg" size="md" />}
          iconVariant="only"
          square
        />
        <h1 className="expanded-post-b__title">Publication</h1>
      </header>
      
      <div className="expanded-post-b__content">
        <PostHeader 
          avatar={post.author.avatar}
          username={post.author.username}
          timestamp={post.createdAt}
          onClick={onUserClick}
          userId={post.author.id}
          verified={post.author.verified}
          size="lg"
        />
        
        <div className="expanded-post-b__post-header">
          <h2 className="expanded-post-b__post-title">{post.title}</h2>
        </div>
        
        <div className="expanded-post-b__audio-section">
          {(post.audioUrl || audioUrl) ? (
            <div className="expanded-post-b__audio-player expanded-post-b__audio-player--full-width">
              <AudioPlayer 
                audioSrc={audioUrl || post.audioUrl}
                onPlay={onPlayAudio}
                className="expanded-post-b__player"
              />
            </div>
          ) : onGenerateAudio && (
            <div className="expanded-post-b__audio-generate">
              <Button
                className="expanded-post-b__generate-audio-btn"
                onClick={handleGenerateAudio}
                style="color"
                importance="secondary"
                size="md"
                disabled={disabled || isAudioLoading}
                loading={isAudioLoading}
              >
                {isAudioLoading ? 'Génération en cours...' : 'Générer l\'audio'}
              </Button>
              <p className="expanded-post-b__audio-info">
                Transformez ce texte en narration audio pour une expérience immersive
              </p>
            </div>
          )}
        </div>
        
        <div className="expanded-post-b__post-content">
          <Text variant="body-lg" className="expanded-post-b__text">
            {post.content}
          </Text>
        </div>
        
        {post.hashtags && Array.isArray(post.hashtags) && post.hashtags.length > 0 && (
          <div className="expanded-post-b__hashtags">
            {post.hashtags.map((tag, index) => (
              <Hashtag 
                key={`${post.id}-tag-${index}`}
                tag={tag}
                size="md"
                onClick={onHashtagClick}
              />
            ))}
          </div>
        )}
        
        <div className="expanded-post-b__post-meta">
          <Text variant="caption" className="expanded-post-b__timestamp">
            {new Date(post.createdAt).toLocaleString()}
          </Text>
        </div>
        
        <InteractionBar 
          postId={post.id}
          likeCount={post.likeCount}
          commentCount={post.commentCount}
          shareCount={post.shareCount}
          isLiked={post.isLiked}
          onLike={onLike}
          onComment={onComment}
          onShare={onShare}
          size="lg"
          disabled={disabled}
        />
      </div>
    </article>
  );
};

ExpandedPostB.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    author: PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      verified: PropTypes.bool
    }).isRequired,
    hashtags: PropTypes.arrayOf(PropTypes.string),
    likeCount: PropTypes.number,
    commentCount: PropTypes.number,
    shareCount: PropTypes.number,
    isLiked: PropTypes.bool,
    audioUrl: PropTypes.string
  }).isRequired,
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
  onHashtagClick: PropTypes.func,
  onUserClick: PropTypes.func,
  onLike: PropTypes.func,
  onComment: PropTypes.func,
  onShare: PropTypes.func,
  onBack: PropTypes.func,
  onAddComment: PropTypes.func,
  onGenerateAudio: PropTypes.func,
  audioUrl: PropTypes.string,
  isPlaying: PropTypes.bool,
  onPlayAudio: PropTypes.func,
  onPauseAudio: PropTypes.func,
  isLoadingAudio: PropTypes.bool,
  isLoadingComments: PropTypes.bool,
  disabled: PropTypes.bool
};

export default ExpandedPostB; 
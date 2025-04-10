import { useState } from 'react';
import NavBar from '../../../components/molecules/NavBar';
import PostHeader from '../../../components/molecules/PostHeader';
import EmojiReactions from '../../../components/molecules/EmojiReactions';
import PostInteractions from '../../../components/molecules/PostInteractions';
import InteractionBar from '../../../components/molecules/InteractionBar';
import AudioPlayer from '../../../components/molecules/AudioPlayer';

const MoleculesSection = () => {
  const [activePage, setActivePage] = useState('home');
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Gérer la navigation
  const handleNavigate = (pageId) => {
    setActivePage(pageId);
    console.log(`Navigation vers: ${pageId}`);
  };

  // Gérer les réactions avec emoji
  const handleEmojiReaction = (emoji) => {
    setSelectedEmoji(emoji === selectedEmoji ? null : emoji);
    console.log(`Réaction emoji: ${emoji}`);
  };

  // Gérer les interactions
  const handleComment = () => console.log('Commentaire');
  const handleShare = () => console.log('Partage');

  // Gérer la lecture audio
  const handlePlay = () => {
    setIsPlaying(true);
    console.log('Lecture audio démarrée');
  };

  return (
    <div className="molecules-section">
      <h2>Molecules</h2>
      <p className="component-description">
        Les molécules sont des groupes d'atomes qui forment des composants relativement simples.
      </p>
      
      <div className="component-section">
        <h3 className="component-title">PostHeader</h3>
        <p className="component-description">
          En-tête de post avec nom d'utilisateur, date et hashtags.
        </p>

        <div className="component-example">
          <h4>Exemple avec hashtags</h4>
          <div style={{ backgroundColor: '#F4F4F4', padding: '1rem', borderRadius: '8px' }}>
            <PostHeader 
              username="username"
              date="10/03/2025"
              hashtags={['vdm', 'spicy', 'trahison']}
              onHashtagClick={(tag) => console.log(`Hashtag cliqué: ${tag}`)}
            />
          </div>
          
          <h4>Exemple sans hashtags</h4>
          <div style={{ backgroundColor: '#F4F4F4', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
            <PostHeader 
              username="username"
              date="10/03/2025"
            />
          </div>
        </div>
      </div>

      <div className="component-section">
        <h3 className="component-title">EmojiReactions</h3>
        <p className="component-description">
          Barre de réactions emoji pour interagir avec les posts.
        </p>

        <div className="component-example">
          <div style={{ backgroundColor: '#F4F4F4', padding: '1rem', borderRadius: '8px' }}>
            <EmojiReactions 
              emojis={['❤️', '😂', '😮', '👏']}
              selectedEmoji={selectedEmoji}
              onReact={handleEmojiReaction}
            />
          </div>
          
          <div style={{ marginTop: '0.5rem' }}>
            {selectedEmoji ? (
              <p>Emoji sélectionné: {selectedEmoji}</p>
            ) : (
              <p>Aucun emoji sélectionné</p>
            )}
          </div>
        </div>
      </div>

      <div className="component-section">
        <h3 className="component-title">PostInteractions</h3>
        <p className="component-description">
          Boutons d'interaction pour commenter et partager un post.
        </p>

        <div className="component-example">
          <div style={{ backgroundColor: '#F4F4F4', padding: '1rem', borderRadius: '8px' }}>
            <PostInteractions 
              onComment={handleComment}
              onShare={handleShare}
            />
          </div>
        </div>
      </div>

      <div className="component-section">
        <h3 className="component-title">InteractionBar</h3>
        <p className="component-description">
          Barre complète d'interactions combinant réactions emoji et boutons d'action.
        </p>

        <div className="component-example">
          <div style={{ backgroundColor: '#F4F4F4', padding: '1rem', borderRadius: '8px' }}>
            <InteractionBar 
              emojis={['❤️', '😂', '😮', '👏']}
              selectedEmoji={selectedEmoji}
              onReact={handleEmojiReaction}
              onComment={handleComment}
              onShare={handleShare}
            />
          </div>
        </div>
      </div>

      <div className="component-section">
        <h3 className="component-title">AudioPlayer</h3>
        <p className="component-description">
          Lecteur audio pour les histoires et contenus audio.
        </p>

        <div className="component-example">
          <h4>Lecteur audio</h4>
          <div style={{ backgroundColor: '#F4F4F4', padding: '1rem', borderRadius: '8px' }}>
            <AudioPlayer 
              audioSrc="https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg"
              onPlay={handlePlay}
            />
          </div>
          
          <div style={{ marginTop: '0.5rem' }}>
            <p>État: {isPlaying ? 'En lecture' : 'En pause'}</p>
          </div>
        </div>
      </div>

      <div className="component-section">
        <h3 className="component-title">NavBar</h3>
        <p className="component-description">
          Barre de navigation mobile fixée en bas de l'écran, avec différentes sections de l'application.
        </p>

        <div className="component-example">
          <h4>Exemple d'utilisation</h4>
          
          <div className="navbar-phone-container">
            <div className="navbar-phone-inner">
              <NavBar 
                activePage={activePage}
                onNavigate={handleNavigate}
              />
            </div>
          </div>
          
          <div className="component-description">
            <p>Page active actuelle: <strong>{activePage}</strong></p>
            <div className="nav-buttons">
              <button 
                onClick={() => setActivePage('home')} 
                className={`nav-demo-button ${activePage === 'home' ? 'active' : ''}`}
              >
                Home
              </button>
              <button 
                onClick={() => setActivePage('search')} 
                className={`nav-demo-button ${activePage === 'search' ? 'active' : ''}`}
              >
                Search
              </button>
              <button 
                onClick={() => setActivePage('create')} 
                className={`nav-demo-button ${activePage === 'create' ? 'active' : ''}`}
              >
                Create
              </button>
              <button 
                onClick={() => setActivePage('liked')} 
                className={`nav-demo-button ${activePage === 'liked' ? 'active' : ''}`}
              >
                Liked
              </button>
              <button 
                onClick={() => setActivePage('profile')} 
                className={`nav-demo-button ${activePage === 'profile' ? 'active' : ''}`}
              >
                Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoleculesSection; 
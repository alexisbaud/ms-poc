import { useState } from 'react';
import PostCard from '../../../components/organisms/PostCard';

const OrganismsSection = () => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  // Gérer les réactions avec emoji
  const handleEmojiReaction = (emoji) => {
    setSelectedEmoji(emoji === selectedEmoji ? null : emoji);
    console.log(`Réaction emoji: ${emoji}`);
  };

  // Gérer les interactions
  const handleComment = () => console.log('Commentaire');
  const handleShare = () => console.log('Partage');

  return (
    <div className="organisms-section">
      <h2>Organisms</h2>
      <p className="component-description">
        Les organismes sont des composants plus complexes qui combinent des molécules et des atomes pour former des sections distinctes de l'interface.
      </p>
      
      <div className="component-section">
        <h3 className="component-title">PostCard</h3>
        <p className="component-description">
          Carte de post complète avec en-tête, contenu, interactions et éventuellement un lecteur audio.
        </p>

        <div className="component-example">
          <h4>Variante A - Post texte</h4>
          <div style={{ maxWidth: '500px', margin: '0 auto', marginBottom: '2rem' }}>
            <PostCard
              variant="A"
              username="username"
              date="10/03/2025"
              hashtags={['vdm', 'spicy', 'trahison']}
              content="Aujourd'hui, j'ai compris que mon accent anglais était mauvais en utilisant la commande vocale de la Chromecast pour chercher 'Daredevil Born Again' et que Google a cherché 'Daredevil porno gay.'"
              selectedEmoji={selectedEmoji}
              onReact={handleEmojiReaction}
              onComment={handleComment}
              onShare={handleShare}
            />
          </div>

          <h4>Variante B - Post avec titre et audio</h4>
          <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <PostCard
              variant="B"
              username="username"
              date="10/03/2025"
              hashtags={['drole', 'plottwist', 'trahison']}
              title="J'ai éjecté la meilleure amie de ma pote pour prendre sa place"
              content="Cette histoire est un peu longue, mais je vais essayer d'aller à l'essentiel..."
              audioSrc="https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg"
              selectedEmoji={selectedEmoji}
              onReact={handleEmojiReaction}
              onComment={handleComment}
              onShare={handleShare}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganismsSection; 
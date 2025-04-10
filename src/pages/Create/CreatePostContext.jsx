import React, { createContext, useState, useContext } from 'react';

/**
 * Contexte pour le partage de données entre les pages de création de post
 */
const CreatePostContext = createContext();

/**
 * Provider pour le contexte de création de post
 * @param {Object} props - Propriétés du composant
 * @returns {JSX.Element} Provider du contexte
 */
export const CreatePostProvider = ({ children }) => {
  // États partagés entre les pages
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState(null); // 'Post A' ou 'Post B'
  const [title, setTitle] = useState('');
  const [ttsInstructions, setTtsInstructions] = useState('');
  const [hashtags, setHashtags] = useState([]);

  // Fonctions utilitaires
  const determinePostType = (text) => {
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    return wordCount >= 60 ? 'Post B' : 'Post A';
  };

  // Réinitialiser tous les champs
  const resetForm = () => {
    setContent('');
    setPostType(null);
    setTitle('');
    setTtsInstructions('');
    setHashtags([]);
  };

  // Valeur du contexte
  const value = {
    content,
    setContent,
    postType,
    setPostType,
    title,
    setTitle,
    ttsInstructions,
    setTtsInstructions,
    hashtags,
    setHashtags,
    determinePostType,
    resetForm
  };

  return (
    <CreatePostContext.Provider value={value}>
      {children}
    </CreatePostContext.Provider>
  );
};

/**
 * Hook pour utiliser le contexte de création de post
 * @returns {Object} Valeur du contexte
 */
export const useCreatePost = () => {
  const context = useContext(CreatePostContext);
  if (!context) {
    throw new Error('useCreatePost must be used within a CreatePostProvider');
  }
  return context;
};

export default CreatePostContext; 
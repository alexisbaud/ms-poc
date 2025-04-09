// Données factices pour le développement
export const mockPosts = [
  {
    id: 'post1',
    type: 'short',
    content: 'Les petites habitudes quotidiennes construisent les grandes réussites. Commencez petit, visez grand ! #motivation #habitudes #succès',
    createdAt: '2023-05-15T14:30:00Z',
    author: {
      id: 'user1',
      username: 'sophie_martin',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      verified: true
    },
    hashtags: ['motivation', 'habitudes', 'succès'],
    likeCount: 254,
    commentCount: 42,
    shareCount: 18,
    isLiked: false
  },
  {
    id: 'post2',
    type: 'long',
    title: 'La révolution de l\'intelligence artificielle',
    content: 'L\'IA transforme notre quotidien à une vitesse vertigineuse. Des assistants virtuels aux voitures autonomes, ces technologies s\'immiscent dans chaque aspect de nos vies. Mais sommes-nous prêts à embrasser ce changement ? À quel moment devons-nous tracer la ligne entre progrès et préservation de notre humanité ? La question n\'est plus de savoir si l\'IA va changer notre monde, mais comment nous allons nous adapter à cette nouvelle réalité.',
    createdAt: '2023-05-14T09:15:00Z',
    author: {
      id: 'user2',
      username: 'techfuturist',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      verified: true
    },
    hashtags: ['IA', 'technologie', 'futur', 'innovation'],
    likeCount: 762,
    commentCount: 89,
    shareCount: 124,
    isLiked: true,
    audioUrl: 'https://example.com/audio/post2.mp3'
  },
  {
    id: 'post3',
    type: 'short',
    content: 'Le café du matin a ce pouvoir magique de transformer les zombies en humains fonctionnels. ☕️ #café #matinée #humour',
    createdAt: '2023-05-13T07:45:00Z',
    author: {
      id: 'user3',
      username: 'cafeinaddict',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      verified: false
    },
    hashtags: ['café', 'matinée', 'humour'],
    likeCount: 385,
    commentCount: 27,
    shareCount: 5,
    isLiked: false
  },
  {
    id: 'post4',
    type: 'long',
    title: 'Les bienfaits insoupçonnés de la marche quotidienne',
    content: '30 minutes de marche par jour peuvent transformer votre santé physique et mentale. La marche régulière améliore la circulation sanguine, renforce le système immunitaire et libère des endorphines qui combattent efficacement le stress et l\'anxiété. C\'est aussi un moment privilégié pour faire une pause dans notre journée hyperconnectée, observer notre environnement et laisser notre esprit vagabonder. Pas besoin d\'équipement coûteux ou d\'abonnement à la salle de sport - juste une paire de chaussures confortables et la volonté de faire ce premier pas vers une meilleure santé.',
    createdAt: '2023-05-12T16:20:00Z',
    author: {
      id: 'user4',
      username: 'coach_santé',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      verified: true
    },
    hashtags: ['santé', 'marche', 'bienêtre', 'routine'],
    likeCount: 521,
    commentCount: 63,
    shareCount: 87,
    isLiked: false,
    audioUrl: 'https://example.com/audio/post4.mp3'
  },
  {
    id: 'post5',
    type: 'short',
    content: 'Aujourd\'hui, j\'ai terminé la lecture de "L\'Art de la Guerre" de Sun Tzu. Fascinant comment ces principes millénaires s\'appliquent encore dans nos stratégies modernes. #lecture #stratégie #développementpersonnel',
    createdAt: '2023-05-11T19:50:00Z',
    author: {
      id: 'user5',
      username: 'bouquineur',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      verified: false
    },
    hashtags: ['lecture', 'stratégie', 'développementpersonnel'],
    likeCount: 178,
    commentCount: 32,
    shareCount: 14,
    isLiked: true
  },
  {
    id: 'post6',
    type: 'long',
    title: 'Minimalisme : Vivre avec moins pour être plus',
    content: 'Le minimalisme n\'est pas seulement une tendance esthétique, c\'est une philosophie de vie qui nous invite à nous libérer du superflu pour nous concentrer sur l\'essentiel. En réduisant nos possessions matérielles, nous libérons non seulement notre espace physique, mais aussi notre espace mental. Moins de choix signifie moins de décisions à prendre, moins de temps passé à ranger et nettoyer, et plus de clarté sur ce qui compte vraiment. Le défi commence par une simple question : cet objet m\'apporte-t-il de la joie ou une réelle utilité ? Si la réponse est non, il est peut-être temps de s\'en séparer pour faire place à ce qui enrichit véritablement notre vie.',
    createdAt: '2023-05-10T11:05:00Z',
    author: {
      id: 'user6',
      username: 'esprit_simple',
      avatar: 'https://randomuser.me/api/portraits/women/90.jpg',
      verified: true
    },
    hashtags: ['minimalisme', 'simplifier', 'désencombrement', 'lifestyle'],
    likeCount: 431,
    commentCount: 58,
    shareCount: 76,
    isLiked: false,
    audioUrl: 'https://example.com/audio/post6.mp3'
  },
  {
    id: 'post7',
    type: 'short',
    content: 'La nature est le meilleur antidépresseur. Une heure dans la forêt et tous mes soucis semblent s\'évaporer. #nature #bienêtre #randonnée',
    createdAt: '2023-05-09T15:40:00Z',
    author: {
      id: 'user7',
      username: 'aventurier',
      avatar: 'https://randomuser.me/api/portraits/men/36.jpg',
      verified: false
    },
    hashtags: ['nature', 'bienêtre', 'randonnée'],
    likeCount: 297,
    commentCount: 21,
    shareCount: 8,
    isLiked: false
  },
  {
    id: 'post8',
    type: 'long',
    title: 'Pourquoi nous devrions tous apprendre à coder',
    content: 'La programmation n\'est plus seulement l\'affaire des ingénieurs informatiques. Dans notre monde numérique, comprendre les bases du code devient aussi fondamental que savoir lire et écrire. Apprendre à coder développe la pensée logique, la résolution de problèmes et la créativité. Même si vous ne devenez jamais développeur professionnel, ces compétences vous permettront de mieux comprendre les technologies qui façonnent notre quotidien, d\'automatiser des tâches répétitives, et peut-être même de créer vos propres solutions. Les ressources gratuites en ligne n\'ont jamais été aussi accessibles - quelques heures par semaine suffisent pour acquérir les fondamentaux et ouvrir un nouveau monde de possibilités.',
    createdAt: '2023-05-08T13:25:00Z',
    author: {
      id: 'user8',
      username: 'codemaster',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
      verified: true
    },
    hashtags: ['programmation', 'apprentissage', 'compétences', 'futur'],
    likeCount: 604,
    commentCount: 77,
    shareCount: 112,
    isLiked: true,
    audioUrl: 'https://example.com/audio/post8.mp3'
  },
  {
    id: 'post9',
    type: 'short',
    content: 'La cuisine est une forme de méditation active. Couper, mélanger, assaisonner... chaque geste demande de la présence et nous connecte à l\'instant présent. #cuisine #mindfulness #créativité',
    createdAt: '2023-05-07T18:10:00Z',
    author: {
      id: 'user9',
      username: 'chef_amateur',
      avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
      verified: false
    },
    hashtags: ['cuisine', 'mindfulness', 'créativité'],
    likeCount: 212,
    commentCount: 39,
    shareCount: 11,
    isLiked: false
  },
  {
    id: 'post10',
    type: 'long',
    title: 'L\'économie circulaire : repenser notre façon de consommer',
    content: 'L\'économie linéaire traditionnelle (extraire, fabriquer, jeter) montre ses limites face à l\'épuisement des ressources et la crise environnementale. L\'économie circulaire propose un modèle alternatif où les déchets d\'une industrie deviennent les ressources d\'une autre. En concevant des produits durables, réparables et recyclables, nous pouvons réduire drastiquement notre impact sur la planète tout en créant de la valeur économique. Des initiatives comme les ressourceries, le compostage communautaire ou les ateliers de réparation fleurissent dans nos villes. Chaque fois que nous privilégions la réparation à l\'achat neuf, le prêt à la possession, ou les matériaux recyclés aux ressources vierges, nous contribuons à cette transition nécessaire vers un modèle plus soutenable.',
    createdAt: '2023-05-06T10:55:00Z',
    author: {
      id: 'user10',
      username: 'écocitoyen',
      avatar: 'https://randomuser.me/api/portraits/women/52.jpg',
      verified: true
    },
    hashtags: ['environnement', 'durabilité', 'recyclage', 'innovation'],
    likeCount: 483,
    commentCount: 65,
    shareCount: 103,
    isLiked: false,
    audioUrl: 'https://example.com/audio/post10.mp3'
  }
]; 
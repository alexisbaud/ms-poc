// À insérer après une connexion réussie, avant la redirection

// Vérification du succès de la connexion
if (localStorage.getItem('token')) {
  const token = localStorage.getItem('token');
}

// On force un petit délai pour s'assurer que les mises à jour de l'état sont terminées
setTimeout(() => {
  // Vérification différée de l'authentification
}, 100); 
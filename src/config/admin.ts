// Configuration de l'administration
export const ADMIN_CONFIG = {
  // Changez ce mot de passe pour sécuriser l'accès admin
  password: 'garage2025!',
  
  // Durée de la session en heures
  sessionDuration: 24,
  
  // Email du garage pour les notifications
  garageEmail: 'contact@garage-routhier.ch',
  
  // Nom du garage
  garageName: 'Garage Routhier'
} as const;

// Instructions pour changer le mot de passe :
// 1. Modifiez la valeur 'password' ci-dessus
// 2. Sauvegardez le fichier
// 3. Le nouveau mot de passe sera actif immédiatement
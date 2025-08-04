// Fichier : page-reset-password.js
// Logique pour la page Réinitialisation du mot de passe utilisant membri-api.js

import { apiRequest } from './membri-api.js';

window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('reset-password-form');
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  if (!token) {
    alert('Lien de réinitialisation invalide.');
    window.location.href = '/forgot-password.html';
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newPassword = form.querySelector('input[name="newPassword"]').value;
    const confirmPassword = form.querySelector('input[name="confirmPassword"]').value;

    if (newPassword !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      await apiRequest('Member/ResetPassword', {
        method: 'POST',
        body: { token, newPassword }
      });
      alert('Mot de passe réinitialisé avec succès. Vous pouvez vous connecter.');
      window.location.href = '/index.html';
    } catch (err) {
      console.error('Erreur réinitialisation mot de passe :', err);
      alert('Impossible de réinitialiser le mot de passe. Le lien peut avoir expiré.');
    }
  });
});

// Fichier : page-forgot-password.js
// Logique pour la page Mot de passe oublié utilisant le module membri-api.js

import { apiRequest } from './membri-api.js';

window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('forgot-password-form');
  const messageEl = document.getElementById('confirmation-message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = form.querySelector('input[name="email"]').value;
    try {
      await apiRequest('Member/ForgotPassword', {
        method: 'POST',
        body: { email }
      });
      messageEl.textContent = 'Un email de réinitialisation a été envoyé si ce courriel est enregistré.';
      messageEl.classList.remove('hidden');
    } catch (err) {
      console.error('Erreur lors de la demande de réinitialisation :', err);
      messageEl.textContent = 'Une erreur est survenue. Veuillez réessayer.';
      messageEl.classList.remove('hidden');
    }
  });
});

// Fichier : page-login.js
// Logique dédiée pour la page de connexion utilisant le module membri-api.js

import { loginMember } from './membri-api.js';

window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = form.querySelector('input[name="email"]').value;
    const password = form.querySelector('input[name="password"]').value;

    try {
      const user = await loginMember(email, password);
      if (user && user.ID) {
        // Stocker l'ID du membre en session et rediriger
        sessionStorage.setItem('memberId', user.ID);
        window.location.href = '/dashboard.html';
      } else {
        alert('Adresse courriel ou mot de passe invalide.');
      }
    } catch (err) {
      console.error('Erreur API Membri lors de la connexion :', err);
      alert('Erreur de connexion, veuillez réessayer.');
    }
  });
});
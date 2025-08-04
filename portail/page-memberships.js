// Fichier : page-memberships.js
// Mise à jour pour utiliser le module membri-api.js

import { getMembershipsByMember } from './membri-api.js';

window.addEventListener('DOMContentLoaded', async () => {
  const memberId = sessionStorage.getItem('memberId');
  if (!memberId) {
    window.location.href = '/index.html';
    return;
  }

  try {
    // Récupérer les adhésions via le module API
    const memberships = await getMembershipsByMember(memberId);

    const list = document.getElementById('memberships-list');
    if (memberships.length === 0) {
      list.innerHTML = '<p class="text-secondary">Vous n’avez aucune adhésion pour le moment.</p>';
      return;
    }

    // Générer une carte par adhésion
    memberships.forEach(m => {
      const card = document.createElement('div');
      card.className = 'bg-white rounded-lg shadow-sm p-8 flex justify-between items-center hover:shadow-md transition-shadow';
      card.innerHTML = `
        <div>
          <h3 class="text-lg font-semibold text-primary mb-1">Adhésion #${m.ID}</h3>
          <p class="text-secondary mb-1">Statut : ${m.Status}</p>
          <p class="text-secondary">Du ${new Date(m.StartDate).toLocaleDateString('fr-FR')} au ${new Date(m.EndDate).toLocaleDateString('fr-FR')}</p>
        </div>
        <a href="membership-detail.html?membershipId=${m.ID}" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 font-medium">Détails</a>
      `;
      list.appendChild(card);
    });
  } catch (err) {
    console.error('Erreur chargement adhésions :', err);
    alert('Impossible de charger vos adhésions.');
  }
});

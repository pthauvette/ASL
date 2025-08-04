// Fichier : page-dashboard.js
// Mise à jour pour utiliser le module membri-api.js

import { getMemberById, getMembershipsByMember } from './membri-api.js';

window.addEventListener('DOMContentLoaded', async () => {
  // Vérifier la session
  const memberId = sessionStorage.getItem('memberId');
  if (!memberId) {
    window.location.href = '/index.html';
    return;
  }

  try {
    // Récupérer les données du membre
    const member = await getMemberById(memberId);
    const fullName = `${member.MainContact.FirstName} ${member.MainContact.LastName}`;
    document.getElementById('member-name').textContent = fullName;

    // Récupérer les adhésions du membre
    const memberships = await getMembershipsByMember(memberId);

    // Calcul du nombre d’adhésions actives
    const now = new Date();
    const activeCount = memberships.filter(m => new Date(m.EndDate) > now).length;
    document.getElementById('active-memberships-count').textContent = activeCount;

    // Prochain paiement
    const upcoming = memberships
      .map(m => m.NextPaymentDate)
      .filter(d => d)
      .map(d => new Date(d))
      .sort((a, b) => a - b);
    document.getElementById('next-payment-date').textContent = upcoming.length ? upcoming[0].toLocaleDateString('fr-FR') : '-';

    // Statut du compte
    const status = memberships.length ? memberships[0].Status : '-';
    document.getElementById('account-status').textContent = status;
  } catch (error) {
    console.error('Erreur chargement dashboard :', error);
    alert('Impossible de charger votre tableau de bord.');
  }
});

// Fichier : page-membership-detail.js
// Logique pour la page Détail d’adhésion utilisant le module membri-api.js

import { getMembershipDetail } from './membri-api.js';

window.addEventListener('DOMContentLoaded', async () => {
  // Récupération de l'ID d'adhésion depuis l'URL
  const params = new URLSearchParams(window.location.search);
  const membershipId = params.get('membershipId');
  if (!membershipId) {
    window.location.href = '/memberships.html';
    return;
  }

  try {
    // Appel API pour obtenir le détail de l’adhésion
    const m = await getMembershipDetail(membershipId);

    // Peupler les champs
    document.getElementById('membership-title').textContent = `Adhésion #${m.ID}`;
    document.getElementById('membership-type').textContent    = m.MembershipType?.Name || '-';
    document.getElementById('membership-package').textContent = m.MembershipPackage?.Name || '-';
    document.getElementById('membership-start').textContent   = new Date(m.StartDate).toLocaleDateString('fr-FR');
    document.getElementById('membership-end').textContent     = new Date(m.EndDate).toLocaleDateString('fr-FR');
    document.getElementById('membership-status').textContent  = m.Status || '-';
    document.getElementById('membership-payment-method').textContent = m.DepositDetail?.Method || '-';
    document.getElementById('membership-next-payment').textContent   = m.NextPaymentDate
      ? new Date(m.NextPaymentDate).toLocaleDateString('fr-FR')
      : '-';
  } catch (err) {
    console.error('Erreur chargement détail adhésion :', err);
    alert('Impossible de charger les détails de l’adhésion.');
    window.location.href = '/memberships.html';
    return;
  }

  // Boutons d’action
  document.getElementById('renew-button').addEventListener('click', () => {
    window.location.href = `/payment.html?membershipId=${membershipId}`;
  });

  document.getElementById('cancel-button').addEventListener('click', () => {
    if (confirm('Voulez-vous vraiment annuler cette adhésion ?')) {
      // TODO: appeler un endpoint d’annulation via apiRequest
      alert('Fonction d’annulation non implémentée.');
    }
  });
});

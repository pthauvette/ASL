// Fichier : page-payment.js
// Mise à jour pour utiliser le module membri-api.js

import { getMembershipDetail, getMembershipPayments } from './membri-api.js';

window.addEventListener('DOMContentLoaded', async () => {
  const memberId = sessionStorage.getItem('memberId');
  if (!memberId) {
    window.location.href = '/index.html';
    return;
  }

  // Récupérer l’ID d’adhésion si fourni
  const params = new URLSearchParams(window.location.search);
  const membershipId = params.get('membershipId');

  try {
    // Prochain paiement
    if (membershipId) {
      const membership = await getMembershipDetail(membershipId);
      const nextDate = membership.NextPaymentDate ? new Date(membership.NextPaymentDate) : null;
      const nextAmount = membership.NextPaymentAmount || null;
      document.getElementById('next-payment-date').textContent = nextDate
        ? nextDate.toLocaleDateString('fr-FR')
        : '-';
      document.getElementById('next-payment-amount').textContent = nextAmount
        ? nextAmount.toFixed(2) + ' €'
        : '-';
    }

    // Historique des paiements
    const tbody = document.getElementById('payment-list');
    if (membershipId) {
      const payments = await getMembershipPayments(membershipId);
      if (payments.length === 0) {
        tbody.innerHTML =
          '<tr><td colspan="4" class="px-6 py-4 text-center text-secondary">Aucun paiement enregistré.</td></tr>';
      } else {
        payments.forEach(p => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-secondary">${new Date(p.Date).toLocaleDateString('fr-FR')}</td>
            <td class="px-6 py-4 whitespace-nowrap text-primary">${p.Amount.toFixed(2)} €</td>
            <td class="px-6 py-4 whitespace-nowrap text-secondary">${p.Status}</td>
            <td class="px-6 py-4 text-right">
              ${p.ReceiptUrl ? `<a href="${p.ReceiptUrl}" target="_blank" class="text-primary hover:underline">Reçu</a>` : ''}
            </td>
          `;
          tbody.appendChild(tr);
        });
      }
    } else {
      tbody.innerHTML =
        '<tr><td colspan="4" class="px-6 py-4 text-center text-secondary">ID d\'adhésion manquant.</td></tr>';
    }
  } catch (error) {
    console.error('Erreur chargement paiements :', error);
    alert('Impossible de charger les informations de paiement.');
  }
});

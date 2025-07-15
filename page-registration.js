// Fichier : page-registration.js
// Logique pour la page Détails organisation utilisant le module membri-api.js

import { apiRequest } from './membri-api.js';

window.addEventListener('DOMContentLoaded', async () => {
  // Charger les listes dynamiques
  try {
    // Villes
    const cities = await apiRequest('City');
    const citySelect = document.querySelector('select[name="CityID"]');
    cities.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.ID;
      opt.textContent = c.Name;
      citySelect.appendChild(opt);
    });

    // Secteurs
    const sectors = await apiRequest('SectorCategory');
    const sectorSelect = document.querySelector('select[name="SectorCategoryID"]');
    sectors.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.ID;
      opt.textContent = s.Name;
      sectorSelect.appendChild(opt);
    });
  } catch (err) {
    console.error('Erreur chargement listes dynamiques :', err);
    alert('Impossible de charger les données de la page d’inscription.');
  }

  // Soumission du formulaire
  const form = document.getElementById('organization-details-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const payload = {
      AccountName: fd.get('AccountName'),
      Email: fd.get('Email'),
      Password: fd.get('Password'),
      CityID: fd.get('CityID'),
      SectorCategoryID: fd.get('SectorCategoryID')
    };

    try {
      // Création du membre (organisation)
      const member = await apiRequest('Member', {
        method: 'POST',
        body: payload
      });
      if (member && member.ID) {
        // Stocker l’ID pour la suite de l’inscription
        sessionStorage.setItem('newMemberId', member.ID);
        // Aller à la page de choix d’adhésion
        window.location.href = '/registration-membership.html';
      } else {
        throw new Error('Réponse inattendue de l’API');
      }
    } catch (err) {
      console.error('Erreur lors de la création du membre :', err);
      alert('Impossible de créer votre compte. Vérifiez vos informations et réessayez.');
    }
  });
});

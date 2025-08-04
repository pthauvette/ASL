// Fichier : page-registration.js
// Connexion du formulaire d'inscription à l'API Membri

import { apiRequest } from './membri-api.js';

const CHECKBOX_FIELDS = [
  'IsNew',
  'IsExporteur',
  'IsEco',
  'IsAutonome',
  'IsManu',
  'IsFemale'
];

window.addEventListener('DOMContentLoaded', async () => {
  const errorMsg = document.getElementById('form-error');
  // Charger dynamiquement la liste des villes
  try {
    const cities = await apiRequest('City');
    const citySelect = document.querySelector('select[name="CityID"]');
    if (citySelect) {
      cities.forEach((c) => {
        const opt = document.createElement('option');
        opt.value = c.ID;
        opt.textContent = c.Name;
        if (c.Name === 'Québec') {
          opt.selected = true;
        }
        citySelect.appendChild(opt);
      });
    }
  } catch (err) {
    console.error('Erreur chargement villes :', err);
  }

  // Soumission du formulaire d'inscription
  const form = document.getElementById('wizard-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      if (errorMsg) {
        errorMsg.textContent = 'Veuillez remplir tous les champs obligatoires.';
        errorMsg.classList.remove('hidden');
      }
      return;
    }
    const fd = new FormData(form);
    const payload = {};

    for (const [key, value] of fd.entries()) {
      if (CHECKBOX_FIELDS.includes(key)) {
        payload[key] = true;
      } else {
        payload[key] = value;
      }
    }

    try {
      await apiRequest('Member', { method: 'POST', body: payload });
      window.location.href = 'registration-success.html';
    } catch (err) {
      console.error('Erreur lors de la création du membre :', err);
      if (errorMsg) {
        errorMsg.textContent = "Impossible de créer votre compte. Vérifiez vos informations et réessayez.";
        errorMsg.classList.remove('hidden');
      }
    }
  });
});


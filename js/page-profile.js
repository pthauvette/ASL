// Fichier : page-profile.js
// Mise à jour pour utiliser le module membri-api.js

import { getMemberById, updateMember, apiRequest } from './membri-api.js';

window.addEventListener('DOMContentLoaded', async () => {
  const memberId = sessionStorage.getItem('memberId');
  if (!memberId) {
    window.location.href = '/index.html';
    return;
  }

  try {
    // Récupérer le membre
    const member = await getMemberById(memberId);

    // Remplir le formulaire
    document.getElementById('salutation').value   = member.MainContact.Salutation;
    document.getElementById('firstName').value    = member.MainContact.FirstName;
    document.getElementById('lastName').value     = member.MainContact.LastName;
    document.getElementById('email').value        = member.Email;
    document.getElementById('phone').value        = member.Phone || '';
    document.getElementById('accountName').value  = member.AccountName || '';
    document.getElementById('address').value      = member.Address || '';
    document.getElementById('province').value     = member.Province || '';
    document.getElementById('postalCode').value   = member.PostalCode || '';

    // Charger la liste des villes
    const cities = await apiRequest('City');
    const citySelect = document.getElementById('cityId');
    cities.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.ID;
      opt.textContent = c.Name;
      citySelect.appendChild(opt);
    });
    if (member.City && member.City.ID) {
      citySelect.value = member.City.ID;
    }

  } catch (error) {
    console.error('Erreur chargement profil :', error);
    alert('Impossible de récupérer vos informations.');
  }

  // Soumission du formulaire
  const form = document.getElementById('profile-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const payload = {
      Salutation: +formData.get('Salutation'),
      FirstName: formData.get('FirstName'),
      LastName: formData.get('LastName'),
      Email: formData.get('Email'),
      Phone: formData.get('Phone'),
      AccountName: formData.get('AccountName'),
      Address: formData.get('Address'),
      CityID: formData.get('CityID'),
      Province: formData.get('Province'),
      PostalCode: formData.get('PostalCode')
    };

    try {
      await updateMember(memberId, payload);
      alert('Profil mis à jour avec succès.');
    } catch (err) {
      console.error('Erreur mise à jour profil :', err);
      alert('Impossible de mettre à jour votre profil.');
    }
  });
});

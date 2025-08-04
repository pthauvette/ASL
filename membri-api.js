// Fichier : membri-api.js
// Module centralisé pour les appels à l'API Membri

const apiBase  = 'https://api.membri365.com/v1_01/';
const apiSCode = 'rkTl0wgwFkJVxOURkz3tpwWcYols1flS4NdUZAcFzoBAckCxvl6tDr2XE5VGPgfG';
const orgId    = 'ec4fb530-d07a-4e5c-81d2-b238d3ff2adb';

export async function apiRequest(path, { method = 'GET', query = '', body } = {}) {
  const url = `${apiBase}${path}?orgId=${orgId}${query}`;
  const headers = { 'Accept': 'application/json', 'SCode': apiSCode };
  if (body) headers['Content-Type'] = 'application/json';

  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API erreur ${method} ${path}: ${response.status} - ${text}`);
  }
  return response.json();
}

/** Authentification */
export async function loginMember(email, password) {
  return apiRequest('Member/Login', {
    method: 'POST',
    body: { email, password }
  });
}

/** Récupère un membre par ID */
export async function getMemberById(memberId) {
  return apiRequest(`Member/${memberId}`, { method: 'GET' });
}

/** Met à jour un membre */
export async function updateMember(memberId, payload) {
  return apiRequest(`Member/${memberId}`, {
    method: 'PUT',
    body: payload
  });
}

/** Récupère les adhésions d’un membre */
export async function getMembershipsByMember(memberId) {
  return apiRequest('Membership', {
    method: 'GET',
    query: `&MemberID=${memberId}`
  });
}

/** Détail d’une adhésion */
export async function getMembershipDetail(membershipId) {
  return apiRequest(`Membership/${membershipId}`, { method: 'GET' });
}

/** Historique des paiements pour une adhésion */
export async function getMembershipPayments(membershipId) {
  return apiRequest('MembershipPayment', {
    method: 'GET',
    query: `&MembershipID=${membershipId}`
  });
}

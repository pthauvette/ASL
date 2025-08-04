/**
 * ============================================
 * SERVICE WORKER - ARMATEURS SAINT-LAURENT
 * ============================================
 * 
 * Cache management pour optimiser les performances
 * et permettre un fonctionnement hors ligne
 */

const CACHE_NAME = 'asl-v1.0.0';
const CACHE_VERSION = '1.0.0';

// Ressources à mettre en cache
const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
  '/css/asl-custom.css',
  '/js/asl-main.js',
  '/manifest.json',
  
  // CDN Resources (mise en cache optionnelle)
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js',
  
  // Images importantes
  '/images/favicon.ico',
  '/images/logo-192.png',
  '/images/logo-512.png'
];

// URLs dynamiques à gérer
const DYNAMIC_CACHE_PATTERNS = [
  /^https:\/\/api\.membri365\.com\//,
  /^https:\/\/images\.unsplash\.com\//,
  /^https:\/\/fonts\.googleapis\.com\//,
  /^https:\/\/fonts\.gstatic\.com\//
];

// Stratégies de cache
const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
  NETWORK_ONLY: 'network-only',
  CACHE_ONLY: 'cache-only'
};

// Configuration des ressources
const RESOURCE_CONFIG = {
  '/css/': CACHE_STRATEGIES.CACHE_FIRST,
  '/js/': CACHE_STRATEGIES.CACHE_FIRST,
  '/images/': CACHE_STRATEGIES.CACHE_FIRST,
  'api.membri365.com': CACHE_STRATEGIES.NETWORK_FIRST,
  'images.unsplash.com': CACHE_STRATEGIES.STALE_WHILE_REVALIDATE,
  'fonts.googleapis.com': CACHE_STRATEGIES.CACHE_FIRST,
  'fonts.gstatic.com': CACHE_STRATEGIES.CACHE_FIRST,
  'cdnjs.cloudflare.com': CACHE_STRATEGIES.CACHE_FIRST
};

// ============================================
// INSTALLATION DU SERVICE WORKER
// ============================================

self.addEventListener('install', (event) => {
  console.log('[SW] Installation en cours...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Cache ouvert');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        console.log('[SW] Ressources mises en cache');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Erreur lors de l\'installation:', error);
      })
  );
});

// ============================================
// ACTIVATION DU SERVICE WORKER
// ============================================

self.addEventListener('activate', (event) => {
  console.log('[SW] Activation en cours...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('[SW] Suppression ancien cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Service Worker activé');
        return self.clients.claim();
      })
      .catch((error) => {
        console.error('[SW] Erreur lors de l\'activation:', error);
      })
  );
});

// ============================================
// INTERCEPTION DES REQUÊTES
// ============================================

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Ignorer les requêtes non-GET
  if (request.method !== 'GET') {
    return;
  }
  
  // Ignorer les requêtes chrome-extension et autres protocoles
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  event.respondWith(handleRequest(request));
});

// ============================================
// GESTION DES REQUÊTES
// ============================================

async function handleRequest(request) {
  const url = new URL(request.url);
  const strategy = getStrategyForUrl(url);
  
  try {
    switch (strategy) {
      case CACHE_STRATEGIES.CACHE_FIRST:
        return await cacheFirst(request);
      
      case CACHE_STRATEGIES.NETWORK_FIRST:
        return await networkFirst(request);
      
      case CACHE_STRATEGIES.STALE_WHILE_REVALIDATE:
        return await staleWhileRevalidate(request);
      
      case CACHE_STRATEGIES.NETWORK_ONLY:
        return await fetch(request);
      
      case CACHE_STRATEGIES.CACHE_ONLY:
        return await cacheOnly(request);
      
      default:
        return await networkFirst(request);
    }
  } catch (error) {
    console.error('[SW] Erreur lors de la gestion de la requête:', error);
    return await handleOfflineFallback(request);
  }
}

// ============================================
// STRATÉGIES DE CACHE
// ============================================

/**
 * Cache First: Cherche d'abord dans le cache
 */
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    return await handleOfflineFallback(request);
  }
}

/**
 * Network First: Essaie le réseau d'abord
 */
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    return await handleOfflineFallback(request);
  }
}

/**
 * Stale While Revalidate: Retourne le cache et met à jour en arrière-plan
 */
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  const networkPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => {
    // Ignore network errors in background
  });
  
  return cachedResponse || await networkPromise || await handleOfflineFallback(request);
}

/**
 * Cache Only: Seulement depuis le cache
 */
async function cacheOnly(request) {
  const cachedResponse = await caches.match(request);
  return cachedResponse || await handleOfflineFallback(request);
}

// ============================================
// UTILITAIRES
// ============================================

/**
 * Détermine la stratégie de cache pour une URL
 */
function getStrategyForUrl(url) {
  const pathname = url.pathname;
  const hostname = url.hostname;
  
  // Vérifier les patterns de configuration
  for (const [pattern, strategy] of Object.entries(RESOURCE_CONFIG)) {
    if (pathname.includes(pattern) || hostname.includes(pattern)) {
      return strategy;
    }
  }
  
  // Stratégie par défaut
  return CACHE_STRATEGIES.NETWORK_FIRST;
}

/**
 * Gestion des cas hors ligne
 */
async function handleOfflineFallback(request) {
  const url = new URL(request.url);
  
  // Page HTML: retourner la page d'accueil
  if (request.destination === 'document') {
    const cachedIndex = await caches.match('/index.html');
    if (cachedIndex) {
      return cachedIndex;
    }
  }
  
  // Images: retourner image placeholder
  if (request.destination === 'image') {
    return new Response(
      '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 200 150"><rect width="200" height="150" fill="#f0f0f0"/><text x="100" y="75" text-anchor="middle" fill="#666" font-family="Arial, sans-serif" font-size="14">Image non disponible</text></svg>',
      {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'no-cache'
        }
      }
    );
  }
  
  // API: retourner une réponse JSON d'erreur
  if (url.hostname.includes('api.')) {
    return new Response(
      JSON.stringify({
        error: true,
        message: 'Service temporairement indisponible',
        offline: true
      }),
      {
        status: 503,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        }
      }
    );
  }
  
  // Autres ressources: retourner une réponse d'erreur générique
  return new Response(
    'Ressource non disponible hors ligne',
    {
      status: 503,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-cache'
      }
    }
  );
}

// ============================================
// NETTOYAGE DU CACHE
// ============================================

/**
 * Nettoyage périodique du cache
 */
async function cleanupCache() {
  const cache = await caches.open(CACHE_NAME);
  const requests = await cache.keys();
  const now = Date.now();
  const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 jours
  
  const deletionPromises = requests.map(async (request) => {
    const response = await cache.match(request);
    if (response) {
      const dateHeader = response.headers.get('date');
      if (dateHeader) {
        const responseDate = new Date(dateHeader).getTime();
        if (now - responseDate > maxAge) {
          console.log('[SW] Suppression cache expiré:', request.url);
          return cache.delete(request);
        }
      }
    }
  });
  
  await Promise.all(deletionPromises);
}

// Nettoyage automatique toutes les 6 heures
setInterval(cleanupCache, 6 * 60 * 60 * 1000);

// ============================================
// GESTION DES MESSAGES
// ============================================

self.addEventListener('message', (event) => {
  const { type, payload } = event.data;
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'CACHE_URLS':
      event.waitUntil(cacheUrls(payload.urls));
      break;
      
    case 'CLEAR_CACHE':
      event.waitUntil(clearCache());
      break;
      
    case 'GET_CACHE_SIZE':
      event.waitUntil(getCacheSize().then(size => {
        event.ports[0].postMessage({ size });
      }));
      break;
  }
});

/**
 * Mise en cache d'URLs spécifiques
 */
async function cacheUrls(urls) {
  const cache = await caches.open(CACHE_NAME);
  try {
    await cache.addAll(urls);
    console.log('[SW] URLs ajoutées au cache:', urls);
  } catch (error) {
    console.error('[SW] Erreur lors de la mise en cache:', error);
  }
}

/**
 * Nettoyage complet du cache
 */
async function clearCache() {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames.map(cacheName => caches.delete(cacheName))
  );
  console.log('[SW] Cache complètement nettoyé');
}

/**
 * Calcul de la taille du cache
 */
async function getCacheSize() {
  const cache = await caches.open(CACHE_NAME);
  const keys = await cache.keys();
  let totalSize = 0;
  
  for (const key of keys) {
    const response = await cache.match(key);
    if (response) {
      const blob = await response.blob();
      totalSize += blob.size;
    }
  }
  
  return totalSize;
}

// ============================================
// SYNCHRONISATION EN ARRIÈRE-PLAN
// ============================================

self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);
  
  switch (event.tag) {
    case 'background-sync':
      event.waitUntil(doBackgroundSync());
      break;
      
    case 'newsletter-sync':
      event.waitUntil(syncNewsletter());
      break;
  }
});

/**
 * Synchronisation en arrière-plan
 */
async function doBackgroundSync() {
  try {
    // Synchroniser les données en attente
    const pendingData = await getStoredData('pending-requests');
    
    if (pendingData && pendingData.length > 0) {
      for (const request of pendingData) {
        try {
          await fetch(request.url, request.options);
          console.log('[SW] Requête synchronisée:', request.url);
        } catch (error) {
          console.error('[SW] Erreur sync:', error);
        }
      }
      
      // Nettoyer les données synchronisées
      await clearStoredData('pending-requests');
    }
  } catch (error) {
    console.error('[SW] Erreur synchronisation:', error);
  }
}

/**
 * Synchronisation newsletter
 */
async function syncNewsletter() {
  const pendingEmails = await getStoredData('pending-newsletter');
  
  if (pendingEmails && pendingEmails.length > 0) {
    for (const email of pendingEmails) {
      try {
        // Envoyer l'email en attente
        await fetch('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        
        console.log('[SW] Email newsletter synchronisé:', email);
      } catch (error) {
        console.error('[SW] Erreur sync newsletter:', error);
      }
    }
    
    await clearStoredData('pending-newsletter');
  }
}

// ============================================
// STOCKAGE LOCAL
// ============================================

/**
 * Récupérer données stockées
 */
async function getStoredData(key) {
  return new Promise((resolve) => {
    // Utiliser IndexedDB ou localStorage selon disponibilité
    if ('indexedDB' in self) {
      // Implémentation IndexedDB simplifiée
      resolve([]);
    } else {
      resolve([]);
    }
  });
}

/**
 * Nettoyer données stockées
 */
async function clearStoredData(key) {
  return new Promise((resolve) => {
    // Implémentation du nettoyage
    resolve();
  });
}

// ============================================
// NOTIFICATIONS PUSH (optionnel)
// ============================================

self.addEventListener('push', (event) => {
  console.log('[SW] Push reçu:', event);
  
  const options = {
    body: 'Nouvelles actualités maritimes disponibles',
    icon: '/images/logo-192.png',
    badge: '/images/badge-72.png',
    tag: 'asl-notification',
    requireInteraction: false,
    actions: [
      {
        action: 'view',
        title: 'Voir',
        icon: '/images/icon-view.png'
      },
      {
        action: 'close',
        title: 'Fermer',
        icon: '/images/icon-close.png'  
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Armateurs Saint-Laurent', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification cliquée:', event);
  
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

console.log('[SW] Service Worker ASL initialisé');
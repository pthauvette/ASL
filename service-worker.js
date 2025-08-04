/**
 * ============================================
 * SERVICE WORKER - ARMATEURS SAINT-LAURENT
 * Version 3.0.0 - Optimisé pour la performance
 * ============================================
 * 
 * Fonctionnalités :
 * - Mise en cache des ressources statiques
 * - Cache-first pour les assets
 * - Network-first pour les API calls
 * - Gestion des mises à jour
 * - Mode offline avec fallbacks
 * 
 * @version 3.0.0
 */

const CACHE_NAME = 'asl-v3.0.0';
const API_CACHE_NAME = 'asl-api-v3.0.0';
const RUNTIME_CACHE_NAME = 'asl-runtime-v3.0.0';

// Ressources critiques à mettre en cache immédiatement
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/asl_custom.css',
  '/asl_main.js',
  '/favicon.ico',
  '/apple-touch-icon.png',
  // Polices critiques
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700&display=swap',
  // CDN critiques
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js'
];

// URLs à exclure du cache
const EXCLUDED_URLS = [
  '/admin',
  '/api/auth',
  'chrome-extension'
];

// Configuration des stratégies de cache
const CACHE_STRATEGIES = {
  static: 'cache-first',      // CSS, JS, images
  api: 'network-first',       // Appels API
  pages: 'stale-while-revalidate', // Pages HTML
  images: 'cache-first'       // Images
};

// ============================================
// INSTALLATION DU SERVICE WORKER
// ============================================

self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker: Installation en cours...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Service Worker: Mise en cache des ressources statiques');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('✅ Service Worker: Installation terminée');
        // Forcer l'activation immédiate
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ Service Worker: Erreur lors de l\'installation', error);
      })
  );
});

// ============================================
// ACTIVATION DU SERVICE WORKER
// ============================================

self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker: Activation en cours...');
  
  event.waitUntil(
    Promise.all([
      // Nettoyer les anciens caches
      cleanupOldCaches(),
      // Prendre le contrôle immédiatement
      self.clients.claim()
    ]).then(() => {
      console.log('✅ Service Worker: Activé et prêt');
    })
  );
});

/**
 * Nettoyer les anciens caches
 */
async function cleanupOldCaches() {
  const cacheNames = await caches.keys();
  const validCaches = [CACHE_NAME, API_CACHE_NAME, RUNTIME_CACHE_NAME];
  
  const deletePromises = cacheNames
    .filter(cacheName => !validCaches.includes(cacheName))
    .map(cacheName => {
      console.log('🗑️ Service Worker: Suppression du cache obsolète', cacheName);
      return caches.delete(cacheName);
    });
  
  return Promise.all(deletePromises);
}

// ============================================
// INTERCEPTION DES REQUÊTES
// ============================================

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignorer les requêtes non-HTTP et les URLs exclues
  if (!request.url.startsWith('http') || shouldExcludeUrl(url.pathname)) {
    return;
  }
  
  // Router selon le type de requête
  if (isAPIRequest(url)) {
    event.respondWith(handleAPIRequest(request));
  } else if (isImageRequest(request)) {
    event.respondWith(handleImageRequest(request));
  } else if (isStaticAsset(url)) {
    event.respondWith(handleStaticAsset(request));
  } else if (isPageRequest(request)) {
    event.respondWith(handlePageRequest(request));
  }
});

/**
 * Vérifier si une URL doit être exclue du cache
 */
function shouldExcludeUrl(pathname) {
  return EXCLUDED_URLS.some(excluded => pathname.startsWith(excluded));
}

/**
 * Vérifier si c'est une requête API
 */
function isAPIRequest(url) {
  return url.pathname.startsWith('/api/') || 
         url.hostname.includes('membri365.com') ||
         url.pathname.includes('api');
}

/**
 * Vérifier si c'est une requête d'image
 */
function isImageRequest(request) {
  return request.destination === 'image' ||
         /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(new URL(request.url).pathname);
}

/**
 * Vérifier si c'est un asset statique
 */
function isStaticAsset(url) {
  return /\.(css|js|woff|woff2|ttf|eot)$/i.test(url.pathname) ||
         url.hostname.includes('cdnjs.cloudflare.com') ||
         url.hostname.includes('fonts.googleapis.com');
}

/**
 * Vérifier si c'est une requête de page
 */
function isPageRequest(request) {
  return request.mode === 'navigate' ||
         (request.method === 'GET' && request.headers.get('accept').includes('text/html'));
}

// ============================================
// GESTIONNAIRES DE STRATÉGIES DE CACHE
// ============================================

/**
 * Gérer les requêtes API avec stratégie network-first
 */
async function handleAPIRequest(request) {
  const cache = await caches.open(API_CACHE_NAME);
  
  try {
    // Essayer le réseau en premier
    const networkResponse = await fetch(request);
    
    // Mettre en cache les réponses valides (sauf erreurs)
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.warn('🌐 Service Worker: Réseau indisponible, tentative de cache pour', request.url);
    
    // Fallback vers le cache
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Fallback ultime pour les APIs critiques
    return createFallbackAPIResponse(request);
  }
}

/**
 * Gérer les images avec stratégie cache-first
 */
async function handleImageRequest(request) {
  const cache = await caches.open(RUNTIME_CACHE_NAME);
  
  // Vérifier le cache en premier
  const cachedResponse = await cache.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    // Récupérer du réseau
    const networkResponse = await fetch(request);
    
    // Mettre en cache les images valides
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.warn('🖼️ Service Worker: Image non disponible', request.url);
    
    // Retourner une image placeholder
    return createPlaceholderImage();
  }
}

/**
 * Gérer les assets statiques avec stratégie cache-first
 */
async function handleStaticAsset(request) {
  const cache = await caches.open(CACHE_NAME);
  
  // Vérifier le cache en premier
  const cachedResponse = await cache.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    // Récupérer du réseau et mettre en cache
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('📦 Service Worker: Asset statique non disponible', request.url);
    throw error;
  }
}

/**
 * Gérer les pages avec stratégie stale-while-revalidate
 */
async function handlePageRequest(request) {
  const cache = await caches.open(RUNTIME_CACHE_NAME);
  
  // Récupérer du cache immédiatement
  const cachedResponse = await cache.match(request);
  
  // Récupérer du réseau en arrière-plan
  const networkResponsePromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    })
    .catch(() => null);
  
  // Retourner le cache ou attendre le réseau
  if (cachedResponse) {
    // Mise à jour en arrière-plan
    networkResponsePromise;
    return cachedResponse;
  }
  
  // Pas de cache, attendre le réseau
  const networkResponse = await networkResponsePromise;
  if (networkResponse) {
    return networkResponse;
  }
  
  // Fallback vers la page d'accueil en cache
  const fallbackResponse = await cache.match('/');
  if (fallbackResponse) {
    return fallbackResponse;
  }
  
  // Page offline ultime
  return createOfflinePage();
}

// ============================================
// RÉPONSES DE FALLBACK
// ============================================

/**
 * Créer une réponse API de fallback
 */
function createFallbackAPIResponse(request) {
  const url = new URL(request.url);
  
  // Données de fallback selon l'endpoint
  let fallbackData = { success: false, error: 'Service hors ligne' };
  
  if (url.pathname.includes('/members')) {
    fallbackData = {
      success: true,
      data: [
        {
          id: 1,
          name: 'Membre de démonstration',
          position: 'Données hors ligne',
          company: 'Mode déconnecté',
          avatar: '/images/default-avatar.jpg'
        }
      ]
    };
  }
  
  return new Response(JSON.stringify(fallbackData), {
    status: 200,
    statusText: 'OK (Cache)',
    headers: {
      'Content-Type': 'application/json',
      'X-Cache': 'ServiceWorker-Fallback'
    }
  });
}

/**
 * Créer une image placeholder
 */
function createPlaceholderImage() {
  // SVG placeholder simple
  const svg = `
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="#f3f4f6"/>
      <text x="100" y="100" font-family="Arial" font-size="14" fill="#6b7280" text-anchor="middle" dy=".3em">
        Image non disponible
      </text>
    </svg>
  `;
  
  return new Response(svg, {
    status: 200,
    statusText: 'OK (Placeholder)',
    headers: {
      'Content-Type': 'image/svg+xml',
      'X-Cache': 'ServiceWorker-Placeholder'
    }
  });
}

/**
 * Créer une page offline
 */
function createOfflinePage() {
  const offlineHTML = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Mode hors ligne - Armateurs Saint-Laurent</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          margin: 0;
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          color: white;
          text-align: center;
        }
        .container {
          max-width: 500px;
          padding: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          backdrop-filter: blur(10px);
        }
        .icon {
          font-size: 64px;
          margin-bottom: 20px;
        }
        h1 {
          margin: 0 0 10px 0;
          font-size: 24px;
          font-weight: 600;
        }
        p {
          margin: 0 0 30px 0;
          opacity: 0.9;
          line-height: 1.6;
        }
        button {
          background: white;
          color: #2563eb;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s;
        }
        button:hover {
          transform: translateY(-2px);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="icon">🌊</div>
        <h1>Mode hors ligne</h1>
        <p>Vous êtes actuellement hors ligne. Certaines fonctionnalités peuvent être limitées.</p>
        <button onclick="window.location.reload()">Réessayer</button>
      </div>
    </body>
    </html>
  `;
  
  return new Response(offlineHTML, {
    status: 200,
    statusText: 'OK (Offline)',
    headers: {
      'Content-Type': 'text/html',
      'X-Cache': 'ServiceWorker-Offline'
    }
  });
}

// ============================================
// GESTION DES MESSAGES
// ============================================

self.addEventListener('message', (event) => {
  const { data } = event;
  
  switch (data.type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'GET_VERSION':
      event.ports[0].postMessage({
        version: CACHE_NAME
      });
      break;
      
    case 'CLEAR_CACHE':
      clearAllCaches().then(() => {
        event.ports[0].postMessage({
          success: true,
          message: 'Cache vidé avec succès'
        });
      });
      break;
      
    case 'CACHE_URLS':
      if (data.urls && Array.isArray(data.urls)) {
        cacheUrls(data.urls).then(() => {
          event.ports[0].postMessage({
            success: true,
            message: `${data.urls.length} URLs mises en cache`
          });
        });
      }
      break;
  }
});

/**
 * Vider tous les caches
 */
async function clearAllCaches() {
  const cacheNames = await caches.keys();
  return Promise.all(
    cacheNames.map(cacheName => caches.delete(cacheName))
  );
}

/**
 * Mettre en cache des URLs spécifiques
 */
async function cacheUrls(urls) {
  const cache = await caches.open(RUNTIME_CACHE_NAME);
  return cache.addAll(urls);
}

// ============================================
// GESTION DES ERREURS
// ============================================

self.addEventListener('error', (event) => {
  console.error('❌ Service Worker: Erreur globale', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('❌ Service Worker: Promise rejetée', event.reason);
});

// ============================================
// SYNCHRONISATION EN ARRIÈRE-PLAN
// ============================================

self.addEventListener('sync', (event) => {
  console.log('🔄 Service Worker: Synchronisation', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

/**
 * Synchronisation en arrière-plan
 */
async function doBackgroundSync() {
  try {
    // Synchroniser les données en attente
    const cache = await caches.open(API_CACHE_NAME);
    // Logique de synchronisation ici
    console.log('✅ Service Worker: Synchronisation terminée');
  } catch (error) {
    console.error('❌ Service Worker: Erreur de synchronisation', error);
  }
}

// ============================================
// NOTIFICATIONS PUSH (optionnel)
// ============================================

self.addEventListener('push', (event) => {
  if (!event.data) return;
  
  const data = event.data.json();
  const options = {
    body: data.body || 'Nouvelle notification',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    tag: data.tag || 'asl-notification',
    data: data.url || '/',
    actions: [
      {
        action: 'open',
        title: 'Ouvrir',
        icon: '/icons/open.png'
      },
      {
        action: 'close',
        title: 'Fermer',
        icon: '/icons/close.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title || 'ASL', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'open' || !event.action) {
    const url = event.notification.data || '/';
    event.waitUntil(
      clients.openWindow(url)
    );
  }
});

console.log('🚀 Service Worker ASL v3.0.0 chargé et prêt');

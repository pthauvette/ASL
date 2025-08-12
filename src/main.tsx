import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../App.tsx';
import '../styles/globals.css';

// Assurer que l'élément root existe
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

// Créer et monter l'application React
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Log pour débugger en développement
if (import.meta.env.DEV) {
  console.log('🚀 Application Armateurs du Saint-Laurent démarrée');
  console.log('Environment:', import.meta.env.MODE);
}

// Performance monitoring
if ('performance' in window && 'getEntriesByType' in performance) {
  window.addEventListener('load', () => {
    // Mesurer les Core Web Vitals
    const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paintEntries = performance.getEntriesByType('paint');
    
    if (import.meta.env.DEV) {
      console.log('📊 Métriques de performance:', {
        domContentLoaded: Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart),
        loadComplete: Math.round(perfData.loadEventEnd - perfData.fetchStart),
        firstPaint: paintEntries.find(entry => entry.name === 'first-paint')?.startTime || 'N/A',
        firstContentfulPaint: paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime || 'N/A'
      });
    }
  });
}

// Service Worker registration pour PWA
if ('serviceWorker' in navigator && !import.meta.env.DEV) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
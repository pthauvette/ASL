/**
 * ============================================
 * JAVASCRIPT PRINCIPAL - ARMATEURS SAINT-LAURENT
 * ============================================
 * 
 * Structure modulaire pour une maintenance optimale
 * Intégration API Membri 365
 * Animations et interactions UI
 * Gestion des erreurs et performance
 * 
 * @version 2.0.0
 * @author Développeur Senior ASL
 */

'use strict';

// ============================================
// CONFIGURATION GLOBALE
// ============================================

const ASL_CONFIG = {
    // Configuration API Membri 365
    api: {
        baseURL: 'https://api.membri365.com',
        // Utilise la valeur fournie dans l'environnement navigateur ou serveur
        orgId:
            (typeof window !== 'undefined' && window.MEMBRI_ORG_ID) ||
            (typeof process !== 'undefined' && process.env && process.env.MEMBRI_ORG_ID) ||
            'YOUR_ORG_ID', // À remplacer par l'ID réel
        version: 'v1',
        timeout: 10000,
        retryAttempts: 3,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    },
    
    // Configuration des animations
    animations: {
        duration: 800,
        easing: 'power2.out',
        stagger: 0.1,
        scrollTriggerOffset: '80%'
    },
    
    // Configuration de la pagination
    pagination: {
        defaultPageSize: 8,
        maxPageSize: 50,
        loadMoreIncrement: 4
    },
    
    // Configuration de l'UI
    ui: {
        mobileBreakpoint: 1024,
        tabletBreakpoint: 768,
        headerScrollThreshold: 100,
        backToTopThreshold: 300,
        loadingDelay: 800
    },
    
    // Messages utilisateur
    messages: {
        loading: 'Chargement en cours...',
        error: 'Une erreur est survenue. Veuillez réessayer.',
        noResults: 'Aucun résultat trouvé.',
        networkError: 'Problème de connexion. Vérifiez votre connexion internet.',
        success: 'Opération réussie!',
        membershipSuccess: 'Votre demande d\'adhésion a été soumise avec succès.',
        invalidForm: 'Veuillez vérifier les informations saisies.',
        sessionExpired: 'Votre session a expiré. Veuillez vous reconnecter.'
    }
};

// ============================================
// GESTIONNAIRE D'API
// ============================================

const APIManager = {
    // Token d'authentification
    authToken: null,
    
    /**
     * Initialiser l'API avec le token d'authentification
     */
    init(token) {
        this.authToken = token;
        if (token) {
            ASL_CONFIG.api.headers['Authorization'] = `Bearer ${token}`;
        }
    },
    
    /**
     * Faire un appel API avec retry automatique
     */
    async makeRequest(endpoint, options = {}) {
        const url = `${ASL_CONFIG.api.baseURL}/${ASL_CONFIG.api.version}/${endpoint}`;
        const defaultOptions = {
            method: 'GET',
            headers: { ...ASL_CONFIG.api.headers },
            timeout: ASL_CONFIG.api.timeout
        };
        
        const requestOptions = { ...defaultOptions, ...options };
        
        // Merge headers
        if (options.headers) {
            requestOptions.headers = { ...defaultOptions.headers, ...options.headers };
        }
        
        let lastError;
        
        for (let attempt = 1; attempt <= ASL_CONFIG.api.retryAttempts; attempt++) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), requestOptions.timeout);
                
                const response = await fetch(url, {
                    ...requestOptions,
                    signal: controller.signal
                });
                
                clearTimeout(timeoutId);
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                
                const data = await response.json();
                return { success: true, data, status: response.status };
                
            } catch (error) {
                lastError = error;
                console.warn(`API attempt ${attempt} failed:`, error);
                
                // Ne pas retry sur les erreurs d'authentification
                if (error.message.includes('401') || error.message.includes('403')) {
                    break;
                }
                
                // Attendre avant le prochain retry
                if (attempt < ASL_CONFIG.api.retryAttempts) {
                    await this.delay(1000 * attempt);
                }
            }
        }
        
        return { success: false, error: lastError.message, status: 0 };
    },
    
    /**
     * Récupérer les membres
     */
    async getMembers(page = 1, limit = ASL_CONFIG.pagination.defaultPageSize) {
        return await this.makeRequest(`organizations/${ASL_CONFIG.api.orgId}/members?page=${page}&limit=${limit}`);
    },
    
    /**
     * Récupérer les événements
     */
    async getEvents(page = 1, limit = ASL_CONFIG.pagination.defaultPageSize) {
        return await this.makeRequest(`organizations/${ASL_CONFIG.api.orgId}/events?page=${page}&limit=${limit}`);
    },
    
    /**
     * Soumettre une demande d'adhésion
     */
    async submitMembership(membershipData) {
        return await this.makeRequest(`organizations/${ASL_CONFIG.api.orgId}/memberships`, {
            method: 'POST',
            body: JSON.stringify(membershipData)
        });
    },
    
    /**
     * Utilitaire de délai
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};

// ============================================
// GESTIONNAIRE D'ANIMATIONS
// ============================================

const AnimationManager = {
    /**
     * Initialiser les animations
     */
    init() {
        this.initScrollAnimations();
        this.initHoverAnimations();
        this.initCounterAnimations();
    },
    
    /**
     * Animations au scroll
     */
    initScrollAnimations() {
        // Observer pour les animations d'entrée
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observer tous les éléments avec la classe animate-on-scroll
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    },
    
    /**
     * Animations de survol
     */
    initHoverAnimations() {
        document.querySelectorAll('.hover-animate').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.transition = 'transform 0.3s ease';
            });
            
            element.addEventListener('mouseleave', (e) => {
                e.currentTarget.style.transform = 'translateY(0)';
            });
        });
    },
    
    /**
     * Animation des compteurs
     */
    initCounterAnimations() {
        const counters = document.querySelectorAll('.counter');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        });
        
        counters.forEach(counter => counterObserver.observe(counter));
    },
    
    /**
     * Animer un compteur
     */
    animateCounter(element, duration = 2000) {
        const target = parseInt(element.dataset.target || element.textContent);
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }
};

// ============================================
// COMPOSANTS UI
// ============================================

const UIComponents = {
    /**
     * Initialiser les composants UI
     */
    init() {
        this.initHeader();
        this.initSmoothScroll();
        this.initModals();
        this.initBackToTop();
        this.initMobileMenu();
        this.initForms();
    },
    
    /**
     * Initialiser le header avec effet de scroll
     */
    initHeader() {
        const header = document.getElementById('header');
        if (!header) return;
        
        let lastScrollY = window.pageYOffset;
        const threshold = ASL_CONFIG.ui.headerScrollThreshold;
        
        const handleScroll = Utils.throttle(() => {
            const currentScrollY = window.pageYOffset;
            
            // Effet de transparence
            if (currentScrollY > threshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Auto-hide sur mobile
            if (window.innerWidth < ASL_CONFIG.ui.mobileBreakpoint) {
                if (currentScrollY > lastScrollY && currentScrollY > threshold) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
            }
            
            lastScrollY = currentScrollY;
        }, 10);
        
        window.addEventListener('scroll', handleScroll);
    },
    
    /**
     * Scroll fluide pour les ancres
     */
    initSmoothScroll() {
        document.addEventListener('click', (e) => {
            const anchor = e.target.closest('a[href^="#"]');
            if (!anchor) return;
            
            const href = anchor.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (!target) return;
            
            e.preventDefault();
            
            const headerHeight = document.getElementById('header')?.offsetHeight || 0;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    },
    
    /**
     * Gestionnaire de modales
     */
    initModals() {
        // Fermeture avec Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeActiveModal();
            }
        });
        
        // Fermeture en cliquant sur le backdrop
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-backdrop')) {
                this.closeActiveModal();
            }
        });
    },
    
    /**
     * Bouton retour en haut
     */
    initBackToTop() {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.innerHTML = '↑';
        backToTopBtn.className = 'back-to-top-btn fixed bottom-6 right-6 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 opacity-0 pointer-events-none z-50';
        backToTopBtn.setAttribute('aria-label', 'Retour en haut de page');
        
        document.body.appendChild(backToTopBtn);
        
        const toggleVisibility = Utils.throttle(() => {
            if (window.pageYOffset > ASL_CONFIG.ui.backToTopThreshold) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.pointerEvents = 'auto';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.pointerEvents = 'none';
            }
        }, 100);
        
        window.addEventListener('scroll', toggleVisibility);
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    },
    
    /**
     * Menu mobile
     */
    initMobileMenu() {
        const menuToggle = document.getElementById('mobile-menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (!menuToggle || !mobileMenu) return;
        
        menuToggle.addEventListener('click', () => {
            const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isOpen);
            mobileMenu.classList.toggle('hidden');
            
            // Animation du hamburger
            menuToggle.classList.toggle('open');
        });
    },
    
    /**
     * Initialiser les formulaires
     */
    initForms() {
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', this.handleFormSubmit.bind(this));
        });
    },
    
    /**
     * Gérer la soumission de formulaire
     */
    async handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        
        // Validation côté client
        if (!this.validateForm(form)) {
            this.showNotification(ASL_CONFIG.messages.invalidForm, 'error');
            return;
        }
        
        // État de chargement
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = ASL_CONFIG.messages.loading;
        
        try {
            // Simuler un appel API (à remplacer par l'appel réel)
            await Utils.delay(1000);
            
            this.showNotification(ASL_CONFIG.messages.success, 'success');
            form.reset();
            
        } catch (error) {
            console.error('Erreur lors de la soumission:', error);
            this.showNotification(ASL_CONFIG.messages.error, 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    },
    
    /**
     * Valider un formulaire
     */
    validateForm(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('error');
                isValid = false;
            } else {
                field.classList.remove('error');
            }
        });
        
        return isValid;
    },
    
    /**
     * Afficher une notification
     */
    showNotification(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification fixed top-4 right-4 max-w-sm p-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300 ${this.getNotificationStyles(type)}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animation d'entrée
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto-suppression
        setTimeout(() => {
            notification.style.transform = 'translateX(full)';
            setTimeout(() => notification.remove(), 300);
        }, duration);
        
        // Fermeture au clic
        notification.addEventListener('click', () => {
            notification.style.transform = 'translateX(full)';
            setTimeout(() => notification.remove(), 300);
        });
    },
    
    /**
     * Styles pour les notifications
     */
    getNotificationStyles(type) {
        const styles = {
            success: 'bg-green-500 text-white',
            error: 'bg-red-500 text-white',
            warning: 'bg-yellow-500 text-black',
            info: 'bg-blue-500 text-white'
        };
        return styles[type] || styles.info;
    },
    
    /**
     * Fermer la modale active
     */
    closeActiveModal() {
        const activeModal = document.querySelector('.modal-backdrop');
        if (activeModal) {
            activeModal.remove();
        }
    },
    
    /**
     * Créer une modale
     */
    createModal(content, className = '') {
        const modal = document.createElement('div');
        modal.className = `modal-backdrop fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 ${className}`;
        modal.innerHTML = `
            <div class="modal-content bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
                <div class="p-6">
                    <button class="modal-close absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold">&times;</button>
                    ${content}
                </div>
            </div>
        `;
        
        // Fermeture
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });
        
        document.body.appendChild(modal);
        return modal;
    }
};

// ============================================
// UTILITAIRES
// ============================================

const Utils = {
    /**
     * Throttle function
     */
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    /**
     * Debounce function
     */
    debounce(func, delay) {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    },
    
    /**
     * Délai promisifié
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    
    /**
     * Vérifier si un objet a une propriété nested
     */
    hasNestedProperty(obj, path) {
        return path.split('.').reduce((current, key) => current && current[key], obj) !== undefined;
    },
    
    /**
     * Obtenir une propriété nested en sécurité
     */
    getNestedProperty(obj, path, defaultValue = null) {
        const result = path.split('.').reduce((current, key) => current && current[key], obj);
        return result !== undefined ? result : defaultValue;
    },
    
    /**
     * Sanitisation des chaînes de caractères
     */
    sanitizeHTML(str) {
        const temp = document.createElement('div');
        temp.textContent = str || '';
        return temp.innerHTML;
    },
    
    /**
     * Formatage des numéros de téléphone canadiens
     */
    formatPhone(phone) {
        if (!phone) return '';
        const cleaned = phone.replace(/\D/g, '');
        
        if (cleaned.length === 10) {
            return `(${cleaned.slice(0,3)}) ${cleaned.slice(3,6)}-${cleaned.slice(6)}`;
        }
        if (cleaned.length === 11 && cleaned[0] === '1') {
            return `+1 (${cleaned.slice(1,4)}) ${cleaned.slice(4,7)}-${cleaned.slice(7)}`;
        }
        return phone;
    },
    
    /**
     * Génération d'ID unique
     */
    generateUniqueId(prefix = 'asl') {
        return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    },
    
    /**
     * Gestion des cookies sécurisée
     */
    setCookie(name, value, days = 30) {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Strict; Secure`;
    },
    
    getCookie(name) {
        return document.cookie.split('; ').reduce((r, v) => {
            const parts = v.split('=');
            return parts[0] === name ? decodeURIComponent(parts[1]) : r;
        }, '');
    },
    
    deleteCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    },
    
    /**
     * Détection du type d'appareil
     */
    getDeviceType() {
        const width = window.innerWidth;
        if (width < ASL_CONFIG.ui.tabletBreakpoint) return 'mobile';
        if (width < ASL_CONFIG.ui.mobileBreakpoint) return 'tablet';
        return 'desktop';
    },
    
    /**
     * Formatage des dates
     */
    formatDate(date, locale = 'fr-CA') {
        return new Intl.DateTimeFormat(locale).format(new Date(date));
    }
};

// ============================================
// GESTIONNAIRE PRINCIPAL DE L'APPLICATION
// ============================================

const ASLApp = {
    // État de l'application
    state: {
        isInitialized: false,
        currentPage: null,
        user: null,
        errors: []
    },
    
    /**
     * Initialiser l'application
     */
    async init() {
        try {
            console.log('🚀 Initialisation ASL App...');
            
            // Attendre que le DOM soit prêt
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.start());
            } else {
                await this.start();
            }
            
        } catch (error) {
            console.error('❌ Erreur lors de l\'initialisation:', error);
            this.handleAppError(error);
        }
    },
    
    /**
     * Démarrer l'application
     */
    async start() {
        try {
            // Masquer le spinner de chargement
            setTimeout(() => {
                const spinner = document.getElementById('loading-spinner');
                if (spinner) {
                    spinner.style.opacity = '0';
                    setTimeout(() => spinner.remove(), 300);
                }
            }, ASL_CONFIG.ui.loadingDelay);
            
            // Initialiser les composants
            this.initializeComponents();
            
            // Configurer les événements globaux
            this.setupGlobalEvents();
            
            // Charger les données initiales
            await this.loadInitialData();
            
            // Démarrer les animations
            this.startAnimations();
            
            // Initialiser le Service Worker
            this.initServiceWorker();
            
            this.state.isInitialized = true;
            console.log('✅ ASL App initialisé avec succès');
            
        } catch (error) {
            console.error('❌ Erreur lors du démarrage:', error);
            this.handleAppError(error);
        }
    },
    
    /**
     * Initialiser les composants
     */
    initializeComponents() {
        UIComponents.init();
        AnimationManager.init();
        
        // Initialiser l'API si un token est disponible
        const token = Utils.getCookie('auth_token');
        if (token) {
            APIManager.init(token);
        }
    },
    
    /**
     * Charger les données initiales
     */
    async loadInitialData() {
        const loadingPromises = [];
        
        // Charger les membres si on est sur la page d'accueil
        if (document.getElementById('members-grid')) {
            loadingPromises.push(this.loadMembersData());
        }
        
        // Charger les événements si nécessaire
        if (document.getElementById('events-container')) {
            loadingPromises.push(this.loadEventsData());
        }
        
        // Attendre que toutes les données soient chargées
        await Promise.allSettled(loadingPromises);
    },
    
    /**
     * Charger les données des membres
     */
    async loadMembersData() {
        try {
            const result = await APIManager.getMembers();
            if (result.success) {
                this.renderMembers(result.data);
            } else {
                console.error('Erreur lors du chargement des membres:', result.error);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des membres:', error);
        }
    },
    
    /**
     * Charger les données des événements
     */
    async loadEventsData() {
        try {
            const result = await APIManager.getEvents();
            if (result.success) {
                this.renderEvents(result.data);
            } else {
                console.error('Erreur lors du chargement des événements:', result.error);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des événements:', error);
        }
    },
    
    /**
     * Configurer les événements globaux
     */
    setupGlobalEvents() {
        // Gestion des erreurs JavaScript non capturées
        window.addEventListener('error', (e) => {
            console.error('Erreur JavaScript:', e.error);
            this.trackError(e.error);
        });
        
        // Gestion des promesses rejetées
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Promise rejetée:', e.reason);
            this.trackError(e.reason);
        });
        
        // Monitoring des performances
        window.addEventListener('load', () => {
            this.trackPerformance();
        });
        
        // Sauvegarde du scroll pour la navigation
        window.addEventListener('beforeunload', () => {
            Utils.setCookie('scrollPosition', window.pageYOffset, 1);
        });
        
        // Restauration du scroll
        const savedScroll = Utils.getCookie('scrollPosition');
        if (savedScroll && savedScroll !== '0') {
            setTimeout(() => {
                window.scrollTo(0, parseInt(savedScroll));
                Utils.deleteCookie('scrollPosition');
            }, 100);
        }
        
        // Gestion de l'état en ligne/hors ligne
        window.addEventListener('online', () => {
            UIComponents.showNotification('Connexion rétablie', 'success');
        });
        
        window.addEventListener('offline', () => {
            UIComponents.showNotification('Mode hors ligne activé', 'warning');
        });
        
        // Gestion du redimensionnement
        window.addEventListener('resize', Utils.debounce(() => {
            this.handleResize();
        }, 250));
    },
    
    /**
     * Démarrer les animations
     */
    startAnimations() {
        // Animation du logo de chargement
        const logo = document.querySelector('.logo-animate');
        if (logo) {
            logo.classList.add('animate-fade-in');
        }
        
        // Animation des éléments principaux
        setTimeout(() => {
            document.querySelectorAll('.hero-animate').forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('animate-slide-up');
                }, index * 100);
            });
        }, 200);
    },
    
    /**
     * Initialiser le Service Worker
     */
    initServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then((registration) => {
                        console.log('SW registered: ', registration);
                        
                        // Vérifier les mises à jour
                        registration.addEventListener('updatefound', () => {
                            const newWorker = registration.installing;
                            newWorker.addEventListener('statechange', () => {
                                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                    UIComponents.showNotification(
                                        'Une nouvelle version est disponible. Rechargez la page pour la voir.', 
                                        'info'
                                    );
                                }
                            });
                        });
                    })
                    .catch(registrationError => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    },
    
    /**
     * Rendu des membres
     */
    renderMembers(members) {
        const container = document.getElementById('members-grid');
        if (!container || !members) return;
        
        container.innerHTML = members.map(member => `
            <div class="member-card animate-on-scroll hover-animate bg-white rounded-lg shadow-md p-6 transition-all duration-300">
                <img src="${member.avatar || '/images/default-avatar.jpg'}" alt="${Utils.sanitizeHTML(member.name)}" class="w-16 h-16 rounded-full mx-auto mb-4">
                <h3 class="text-lg font-semibold text-center mb-2">${Utils.sanitizeHTML(member.name)}</h3>
                <p class="text-gray-600 text-center text-sm">${Utils.sanitizeHTML(member.position || '')}</p>
                <p class="text-blue-600 text-center text-sm">${Utils.sanitizeHTML(member.company || '')}</p>
            </div>
        `).join('');
    },
    
    /**
     * Rendu des événements
     */
    renderEvents(events) {
        const container = document.getElementById('events-container');
        if (!container || !events) return;
        
        container.innerHTML = events.map(event => `
            <div class="event-card animate-on-scroll bg-white rounded-lg shadow-md overflow-hidden">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-4">
                        <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                            ${Utils.formatDate(event.date)}
                        </span>
                        <span class="text-gray-500 text-sm">${event.participants || 0} participants</span>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">${Utils.sanitizeHTML(event.title)}</h3>
                    <p class="text-gray-600 mb-4">${Utils.sanitizeHTML(event.description || '')}</p>
                    <div class="flex items-center justify-between">
                        <span class="text-gray-500 text-sm">📍 ${Utils.sanitizeHTML(event.location || '')}</span>
                        <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                            S'inscrire
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    },
    
    /**
     * Gérer le redimensionnement
     */
    handleResize() {
        const deviceType = Utils.getDeviceType();
        document.body.classList.remove('mobile', 'tablet', 'desktop');
        document.body.classList.add(deviceType);
    },
    
    /**
     * Gérer les erreurs de l'application
     */
    handleAppError(error) {
        this.state.errors.push({
            error: error.message,
            timestamp: new Date().toISOString(),
            url: window.location.href
        });
        
        // Afficher une notification à l'utilisateur
        UIComponents.showNotification(ASL_CONFIG.messages.error, 'error');
        
        // Log pour le debugging
        console.error('ASL App Error:', error);
    },
    
    /**
     * Tracker les erreurs
     */
    trackError(error) {
        // Ici vous pouvez intégrer votre service d'analytics
        console.error('Error tracked:', error);
    },
    
    /**
     * Tracker les performances
     */
    trackPerformance() {
        if (!('performance' in window)) return;
        
        const perfData = performance.timing;
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;
        const domReadyTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
        const firstPaintTime = performance.getEntriesByType('paint').find(entry => entry.name === 'first-paint')?.startTime;
        
        console.log(`⚡ Performance:
- Temps de chargement total: ${loadTime}ms
- DOM ready: ${domReadyTime}ms
- First paint: ${firstPaintTime ? Math.round(firstPaintTime) + 'ms' : 'N/A'}`);
        
        // Tracking analytics (si disponible)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'timing_complete', {
                name: 'load',
                value: Math.round(loadTime)
            });
        }
        
        // Alerte si performance dégradée
        if (loadTime > 5000) {
            console.warn('⚠️ Performance dégradée détectée');
        }
    }
};

// ============================================
// INITIALISATION DE L'APPLICATION
// ============================================

// Initialiser l'application quand le script se charge
ASLApp.init().catch(error => {
    console.error('Erreur fatale lors de l\'initialisation:', error);
});

// Exposer l'API globale pour les autres scripts
window.ASL = {
    app: ASLApp,
    api: APIManager,
    ui: UIComponents,
    utils: Utils,
    config: ASL_CONFIG
};
/**
 * ============================================
 * JAVASCRIPT PRINCIPAL - ARMATEURS SAINT-LAURENT
 * Version optimisée selon le nouveau design - 2025
 * ============================================
 * 
 * Structure modulaire pour une maintenance optimale
 * Intégration API Membri 365
 * Animations et interactions UI optimisées
 * Performance et accessibilité améliorées
 * 
 * @version 3.0.0
 * @author Équipe Développement ASL
 */

'use strict';

// ============================================
// CONFIGURATION GLOBALE OPTIMISÉE
// ============================================

const ASL_CONFIG = {
    // Configuration API Membri 365
    api: {
        baseURL: 'https://api.membri365.com',
        orgId: (typeof window !== 'undefined' && window.MEMBRI_ORG_ID) ||
               (typeof process !== 'undefined' && process.env && process.env.MEMBRI_ORG_ID) ||
               'asl-org-2024',
        version: 'v1',
        timeout: 12000,
        retryAttempts: 3,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Client-Version': '3.0.0'
        }
    },
    
    // Configuration des animations optimisées
    animations: {
        duration: 800,
        easing: 'power2.out',
        stagger: 0.15,
        scrollTriggerOffset: '80%',
        heroDelay: 300,
        cardStagger: 0.1
    },
    
    // Configuration de la pagination
    pagination: {
        defaultPageSize: 8,
        maxPageSize: 50,
        loadMoreIncrement: 4,
        membersPerPage: 4
    },
    
    // Configuration de l'UI améliorée
    ui: {
        mobileBreakpoint: 1024,
        tabletBreakpoint: 768,
        headerScrollThreshold: 100,
        backToTopThreshold: 400,
        loadingDelay: 600,
        carouselAutoplayDelay: 5000,
        notificationDuration: 5000
    },
    
    // Messages utilisateur améliorés
    messages: {
        loading: 'Chargement en cours...',
        error: 'Une erreur est survenue. Veuillez réessayer.',
        noResults: 'Aucun résultat trouvé.',
        networkError: 'Problème de connexion. Vérifiez votre connexion internet.',
        success: 'Opération réussie!',
        membershipSuccess: 'Votre demande d\'adhésion a été soumise avec succès. Nous vous contacterons bientôt.',
        newsletterSuccess: 'Inscription réussie ! Merci de vous être inscrit à notre newsletter.',
        invalidForm: 'Veuillez vérifier les informations saisies.',
        sessionExpired: 'Votre session a expiré. Veuillez vous reconnecter.',
        membershipSubmitted: 'Demande VIP soumise avec succès!'
    },
    
    // Configuration du debug
    debug: {
        enabled: false, // À activer en développement
        logLevel: 'info' // 'debug', 'info', 'warn', 'error'
    }
};

// ============================================
// GESTIONNAIRE D'API OPTIMISÉ
// ============================================

const APIManager = {
    authToken: null,
    requestQueue: new Map(),
    
    /**
     * Initialiser l'API avec le token d'authentification
     */
    init(token) {
        this.authToken = token;
        if (token) {
            ASL_CONFIG.api.headers['Authorization'] = `Bearer ${token}`;
        }
        this.log('API initialisée', 'info');
    },
    
    /**
     * Logger avec niveaux
     */
    log(message, level = 'info', data = null) {
        if (!ASL_CONFIG.debug.enabled) return;
        
        const levels = { debug: 0, info: 1, warn: 2, error: 3 };
        const configLevel = levels[ASL_CONFIG.debug.logLevel] || 1;
        const messageLevel = levels[level] || 1;
        
        if (messageLevel >= configLevel) {
            const timestamp = new Date().toISOString();
            const logData = data ? { message, data, timestamp } : { message, timestamp };
            console[level](`[ASL API ${level.toUpperCase()}]`, logData);
        }
    },
    
    /**
     * Cache simple pour les requêtes
     */
    getCacheKey(endpoint, params = {}) {
        return `${endpoint}_${JSON.stringify(params)}`;
    },
    
    /**
     * Faire un appel API avec retry automatique et cache
     */
    async makeRequest(endpoint, options = {}, useCache = true) {
        const cacheKey = this.getCacheKey(endpoint, options);
        
        // Vérifier le cache pour les requêtes GET
        if (useCache && (!options.method || options.method === 'GET')) {
            const cached = this.getFromCache(cacheKey);
            if (cached) {
                this.log(`Cache hit pour ${endpoint}`, 'debug', cached);
                return cached;
            }
        }
        
        const url = `${ASL_CONFIG.api.baseURL}/${ASL_CONFIG.api.version}/${endpoint}`;
        const defaultOptions = {
            method: 'GET',
            headers: { ...ASL_CONFIG.api.headers },
            timeout: ASL_CONFIG.api.timeout
        };
        
        const requestOptions = { ...defaultOptions, ...options };
        
        if (options.headers) {
            requestOptions.headers = { ...defaultOptions.headers, ...options.headers };
        }
        
        let lastError;
        
        for (let attempt = 1; attempt <= ASL_CONFIG.api.retryAttempts; attempt++) {
            try {
                this.log(`Tentative ${attempt} pour ${endpoint}`, 'debug');
                
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
                const result = { success: true, data, status: response.status };
                
                // Mettre en cache pour les requêtes GET réussies
                if (useCache && (!options.method || options.method === 'GET')) {
                    this.setCache(cacheKey, result);
                }
                
                this.log(`Succès pour ${endpoint}`, 'info', result);
                return result;
                
            } catch (error) {
                lastError = error;
                this.log(`Échec tentative ${attempt} pour ${endpoint}`, 'warn', error);
                
                // Ne pas retry sur les erreurs d'authentification
                if (error.message.includes('401') || error.message.includes('403')) {
                    break;
                }
                
                // Attendre avant le prochain retry avec backoff exponentiel
                if (attempt < ASL_CONFIG.api.retryAttempts) {
                    await this.delay(Math.pow(2, attempt) * 1000);
                }
            }
        }
        
        const errorResult = { success: false, error: lastError.message, status: 0 };
        this.log(`Échec final pour ${endpoint}`, 'error', errorResult);
        return errorResult;
    },
    
    /**
     * Gestion du cache simple (localStorage avec expiration)
     */
    setCache(key, data, expirationMinutes = 5) {
        try {
            const cacheData = {
                data,
                timestamp: Date.now(),
                expiration: Date.now() + (expirationMinutes * 60 * 1000)
            };
            localStorage.setItem(`asl_cache_${key}`, JSON.stringify(cacheData));
        } catch (error) {
            this.log('Erreur lors de la mise en cache', 'warn', error);
        }
    },
    
    getFromCache(key) {
        try {
            const cached = localStorage.getItem(`asl_cache_${key}`);
            if (!cached) return null;
            
            const cacheData = JSON.parse(cached);
            if (Date.now() > cacheData.expiration) {
                localStorage.removeItem(`asl_cache_${key}`);
                return null;
            }
            
            return cacheData.data;
        } catch (error) {
            this.log('Erreur lors de la lecture du cache', 'warn', error);
            return null;
        }
    },
    
    /**
     * Vider le cache
     */
    clearCache() {
        try {
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith('asl_cache_')) {
                    localStorage.removeItem(key);
                }
            });
            this.log('Cache vidé', 'info');
        } catch (error) {
            this.log('Erreur lors du vidage du cache', 'warn', error);
        }
    },
    
    /**
     * API endpoints spécifiques
     */
    async getMembers(page = 1, limit = ASL_CONFIG.pagination.defaultPageSize) {
        return await this.makeRequest(`organizations/${ASL_CONFIG.api.orgId}/members?page=${page}&limit=${limit}`);
    },
    
    async getMemberById(memberId) {
        return await this.makeRequest(`organizations/${ASL_CONFIG.api.orgId}/members/${memberId}`);
    },
    
    async getEvents(page = 1, limit = ASL_CONFIG.pagination.defaultPageSize) {
        return await this.makeRequest(`organizations/${ASL_CONFIG.api.orgId}/events?page=${page}&limit=${limit}`);
    },
    
    async getNews(page = 1, limit = 3) {
        return await this.makeRequest(`organizations/${ASL_CONFIG.api.orgId}/news?page=${page}&limit=${limit}`);
    },
    
    async submitMembership(membershipData) {
        return await this.makeRequest(`organizations/${ASL_CONFIG.api.orgId}/memberships`, {
            method: 'POST',
            body: JSON.stringify(membershipData)
        }, false);
    },
    
    async subscribeNewsletter(email) {
        return await this.makeRequest(`organizations/${ASL_CONFIG.api.orgId}/newsletter`, {
            method: 'POST',
            body: JSON.stringify({ email })
        }, false);
    },
    
    async submitVIPRequest(requestData) {
        return await this.makeRequest(`organizations/${ASL_CONFIG.api.orgId}/vip-requests`, {
            method: 'POST',
            body: JSON.stringify(requestData)
        }, false);
    },
    
    /**
     * Utilitaire de délai
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};

// ============================================
// GESTIONNAIRE D'ANIMATIONS OPTIMISÉ
// ============================================

const AnimationManager = {
    observers: new Map(),
    
    /**
     * Initialiser les animations
     */
    init() {
        this.initScrollAnimations();
        this.initHoverAnimations();
        this.initCounterAnimations();
        this.initParallaxElements();
        this.initLoadingAnimations();
    },
    
    /**
     * Animations au scroll avec Intersection Observer optimisé
     */
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                        // Effet de stagger pour les éléments groupés
                        if (entry.target.dataset.stagger) {
                            this.animateStaggeredChildren(entry.target);
                        }
                    }, index * ASL_CONFIG.animations.cardStagger * 1000);
                    
                    scrollObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observer tous les éléments avec la classe animate-on-scroll
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            scrollObserver.observe(el);
        });
        
        this.observers.set('scroll', scrollObserver);
    },
    
    /**
     * Animation staggerée pour les enfants
     */
    animateStaggeredChildren(container) {
        const children = container.querySelectorAll('.member-card, .news-card, .partner-card');
        children.forEach((child, index) => {
            setTimeout(() => {
                child.classList.add('animate-in');
            }, index * 100);
        });
    },
    
    /**
     * Animations de survol améliorées
     */
    initHoverAnimations() {
        // Hover pour les cartes avec effet de brillance
        document.querySelectorAll('.card-shine').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.addShineEffect(e.currentTarget);
            });
        });
        
        // Hover lift pour les éléments interactifs
        document.querySelectorAll('.hover-lift').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
            
            element.addEventListener('mouseleave', (e) => {
                e.currentTarget.style.transform = 'translateY(0)';
            });
        });
        
        // Effet de glow pour les boutons
        document.querySelectorAll('.btn-maritime').forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                this.addGlowEffect(e.currentTarget);
            });
        });
    },
    
    /**
     * Ajouter effet de brillance
     */
    addShineEffect(element) {
        const shine = element.querySelector('::before');
        if (shine) {
            shine.style.left = '100%';
        }
    },
    
    /**
     * Ajouter effet de glow
     */
    addGlowEffect(element) {
        element.style.boxShadow = '0 0 30px rgba(37, 99, 235, 0.3)';
        setTimeout(() => {
            element.style.boxShadow = '';
        }, 300);
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
        this.observers.set('counter', counterObserver);
    },
    
    /**
     * Animer un compteur avec easing
     */
    animateCounter(element, duration = 2000) {
        const target = parseInt(element.dataset.target || element.textContent);
        const start = 0;
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * easeOut);
            
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        };
        
        requestAnimationFrame(updateCounter);
    },
    
    /**
     * Éléments parallax légers
     */
    initParallaxElements() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length > 0) {
            const handleScroll = Utils.throttle(() => {
                const scrolled = window.pageYOffset;
                
                parallaxElements.forEach(element => {
                    const rate = element.dataset.parallax || 0.5;
                    const yPos = -(scrolled * rate);
                    element.style.transform = `translateY(${yPos}px)`;
                });
            }, 16); // 60fps
            
            window.addEventListener('scroll', handleScroll);
        }
    },
    
    /**
     * Animations de chargement
     */
    initLoadingAnimations() {
        // Animation des skeleton loaders
        document.querySelectorAll('.skeleton').forEach(skeleton => {
            skeleton.style.background = `
                linear-gradient(90deg, 
                    #f0f0f0 25%, 
                    #e0e0e0 50%, 
                    #f0f0f0 75%
                )
            `;
            skeleton.style.backgroundSize = '200% 100%';
            skeleton.style.animation = 'loading 1.5s infinite';
        });
    },
    
    /**
     * Animer l'entrée d'un élément
     */
    animateIn(element, delay = 0) {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, delay);
    },
    
    /**
     * Nettoyer les observers
     */
    cleanup() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
    }
};

// ============================================
// COMPOSANTS UI OPTIMISÉS
// ============================================

const UIComponents = {
    // État des composants
    state: {
        mobileMenuOpen: false,
        currentMemberPage: 0,
        notifications: new Map()
    },
    
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
        this.initCarousels();
        this.initTooltips();
        this.initKeyboardNavigation();
    },
    
    /**
     * Initialiser le header avec effet de scroll optimisé
     */
    initHeader() {
        const header = document.getElementById('header');
        if (!header) return;
        
        let lastScrollY = window.pageYOffset;
        const threshold = ASL_CONFIG.ui.headerScrollThreshold;
        let ticking = false;
        
        const updateHeader = () => {
            const currentScrollY = window.pageYOffset;
            
            // Effet de transparence
            if (currentScrollY > threshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Auto-hide sur mobile lors du scroll vers le bas
            if (window.innerWidth < ASL_CONFIG.ui.mobileBreakpoint) {
                if (currentScrollY > lastScrollY && currentScrollY > threshold) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
            }
            
            lastScrollY = currentScrollY;
            ticking = false;
        };
        
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
    },
    
    /**
     * Scroll fluide pour les ancres avec offset pour header fixe
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
            
            // Fermer le menu mobile si ouvert
            if (this.state.mobileMenuOpen) {
                this.closeMobileMenu();
            }
        });
    },
    
    /**
     * Gestionnaire de modales amélioré
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
        
        // Piégeage du focus dans les modales
        document.addEventListener('keydown', (e) => {
            const modal = document.querySelector('.modal:not(.hidden)');
            if (modal && e.key === 'Tab') {
                this.trapFocus(e, modal);
            }
        });
    },
    
    /**
     * Piégeage du focus pour l'accessibilité
     */
    trapFocus(e, modal) {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    },
    
    /**
     * Bouton retour en haut amélioré
     */
    initBackToTop() {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        backToTopBtn.className = 'back-to-top-btn fixed bottom-6 right-6 w-12 h-12 bg-maritime-blue text-white rounded-full shadow-lg hover:bg-maritime-blue-dark transition-all duration-300 opacity-0 pointer-events-none z-50';
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
        
        window.addEventListener('scroll', toggleVisibility, { passive: true });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    },
    
    /**
     * Menu mobile optimisé
     */
    initMobileMenu() {
        const menuToggle = document.getElementById('mobile-menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (!menuToggle || !mobileMenu) return;
        
        menuToggle.addEventListener('click', () => {
            this.toggleMobileMenu();
        });
        
        // Fermer le menu en cliquant sur un lien
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
    },
    
    toggleMobileMenu() {
        const menuToggle = document.getElementById('mobile-menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        
        this.state.mobileMenuOpen = !this.state.mobileMenuOpen;
        
        menuToggle.setAttribute('aria-expanded', this.state.mobileMenuOpen);
        mobileMenu.classList.toggle('hidden');
        
        // Animation du hamburger
        menuToggle.classList.toggle('open');
        
        // Bloquer/débloquer le scroll du body
        document.body.style.overflow = this.state.mobileMenuOpen ? 'hidden' : '';
    },
    
    closeMobileMenu() {
        const menuToggle = document.getElementById('mobile-menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        
        this.state.mobileMenuOpen = false;
        menuToggle.setAttribute('aria-expanded', false);
        mobileMenu.classList.add('hidden');
        menuToggle.classList.remove('open');
        document.body.style.overflow = '';
    },
    
    /**
     * Initialiser les formulaires avec validation
     */
    initForms() {
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', this.handleFormSubmit.bind(this));
            
            // Validation en temps réel
            form.querySelectorAll('input, textarea').forEach(field => {
                field.addEventListener('blur', () => this.validateField(field));
                field.addEventListener('input', () => this.clearFieldError(field));
            });
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
        submitBtn.classList.add('btn-loading');
        
        try {
            let result;
            
            // Router selon le type de formulaire
            if (form.id === 'newsletter-form') {
                result = await APIManager.subscribeNewsletter(formData.get('email'));
            } else if (form.id === 'membership-form') {
                result = await APIManager.submitMembership(Object.fromEntries(formData));
            } else if (form.id === 'vip-form') {
                result = await APIManager.submitVIPRequest(Object.fromEntries(formData));
            } else {
                // Formulaire générique
                await Utils.delay(1000);
                result = { success: true };
            }
            
            if (result.success) {
                const message = form.id === 'newsletter-form' ? 
                    ASL_CONFIG.messages.newsletterSuccess : 
                    ASL_CONFIG.messages.success;
                
                this.showNotification(message, 'success');
                form.reset();
            } else {
                throw new Error(result.error || 'Erreur inconnue');
            }
            
        } catch (error) {
            console.error('Erreur lors de la soumission:', error);
            this.showNotification(
                error.message || ASL_CONFIG.messages.error, 
                'error'
            );
        } finally {
            submitBtn.disabled = false;
            submitBtn.classList.remove('btn-loading');
            submitBtn.textContent = originalText;
        }
    },
    
    /**
     * Valider un champ
     */
    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        let isValid = true;
        let errorMessage = '';
        
        // Validation required
        if (field.required && !value) {
            isValid = false;
            errorMessage = 'Ce champ est requis.';
        }
        
        // Validation email
        if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Adresse email invalide.';
            }
        }
        
        // Validation téléphone
        if (type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                isValid = false;
                errorMessage = 'Numéro de téléphone invalide.';
            }
        }
        
        this.setFieldError(field, isValid ? null : errorMessage);
        return isValid;
    },
    
    /**
     * Définir une erreur sur un champ
     */
    setFieldError(field, errorMessage) {
        field.classList.toggle('error', !!errorMessage);
        
        let errorElement = field.parentNode.querySelector('.form-error');
        
        if (errorMessage) {
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'form-error text-red-500 text-sm mt-1';
                field.parentNode.appendChild(errorElement);
            }
            errorElement.textContent = errorMessage;
        } else if (errorElement) {
            errorElement.remove();
        }
    },
    
    /**
     * Effacer l'erreur d'un champ
     */
    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.form-error');
        if (errorElement) {
            errorElement.remove();
        }
    },
    
    /**
     * Valider un formulaire complet
     */
    validateForm(form) {
        const fields = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    },
    
    /**
     * Initialiser les carrousels
     */
    initCarousels() {
        // Carrousel des membres
        this.initMemberCarousel();
        
        // Auto-play pour les carrousels
        this.startCarouselAutoplay();
    },
    
    /**
     * Carrousel des membres
     */
    initMemberCarousel() {
        const prevBtn = document.getElementById('members-prev');
        const nextBtn = document.getElementById('members-next');
        const memberCards = document.querySelectorAll('.member-card');
        
        if (!prevBtn || !nextBtn || memberCards.length === 0) return;
        
        const updateCarousel = () => {
            const membersPerView = this.getMembersPerView();
            const maxPage = Math.ceil(memberCards.length / membersPerView) - 1;
            
            // Mettre à jour la visibilité des boutons
            prevBtn.disabled = this.state.currentMemberPage === 0;
            nextBtn.disabled = this.state.currentMemberPage >= maxPage;
            
            // Mettre à jour l'affichage des cartes
            memberCards.forEach((card, index) => {
                const startIndex = this.state.currentMemberPage * membersPerView;
                const endIndex = startIndex + membersPerView;
                card.style.display = (index >= startIndex && index < endIndex) ? 'block' : 'none';
            });
        };
        
        prevBtn.addEventListener('click', () => {
            if (this.state.currentMemberPage > 0) {
                this.state.currentMemberPage--;
                updateCarousel();
            }
        });
        
        nextBtn.addEventListener('click', () => {
            const membersPerView = this.getMembersPerView();
            const maxPage = Math.ceil(memberCards.length / membersPerView) - 1;
            
            if (this.state.currentMemberPage < maxPage) {
                this.state.currentMemberPage++;
                updateCarousel();
            }
        });
        
        // Initialiser l'affichage
        updateCarousel();
        
        // Réinitialiser lors du redimensionnement
        window.addEventListener('resize', Utils.debounce(updateCarousel, 250));
    },
    
    /**
     * Obtenir le nombre de membres par vue selon la taille d'écran
     */
    getMembersPerView() {
        const width = window.innerWidth;
        if (width >= 1024) return 4;
        if (width >= 768) return 2;
        return 1;
    },
    
    /**
     * Démarrer l'autoplay du carrousel
     */
    startCarouselAutoplay() {
        setInterval(() => {
            const nextBtn = document.getElementById('members-next');
            if (nextBtn && !nextBtn.disabled) {
                nextBtn.click();
            } else {
                this.state.currentMemberPage = 0;
                const memberCards = document.querySelectorAll('.member-card');
                if (memberCards.length > 0) {
                    this.initMemberCarousel();
                }
            }
        }, ASL_CONFIG.ui.carouselAutoplayDelay);
    },
    
    /**
     * Initialiser les tooltips
     */
    initTooltips() {
        document.querySelectorAll('[data-tooltip]').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.showTooltip(e.target, e.target.dataset.tooltip);
            });
            
            element.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        });
    },
    
    /**
     * Afficher un tooltip
     */
    showTooltip(element, text) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip fixed bg-gray-900 text-white px-2 py-1 rounded text-sm z-50 pointer-events-none';
        tooltip.textContent = text;
        tooltip.id = 'active-tooltip';
        
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
    },
    
    /**
     * Masquer le tooltip
     */
    hideTooltip() {
        const tooltip = document.getElementById('active-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    },
    
    /**
     * Navigation au clavier
     */
    initKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Navigation dans les carrousels avec les flèches
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                const focusedElement = document.activeElement;
                if (focusedElement.closest('.member-carousel')) {
                    e.preventDefault();
                    const button = e.key === 'ArrowLeft' ? 
                        document.getElementById('members-prev') : 
                        document.getElementById('members-next');
                    if (button && !button.disabled) {
                        button.click();
                    }
                }
            }
        });
    },
    
    /**
     * Afficher une notification optimisée
     */
    showNotification(message, type = 'info', duration = ASL_CONFIG.ui.notificationDuration) {
        const id = Utils.generateUniqueId('notification');
        
        const notification = document.createElement('div');
        notification.id = id;
        notification.className = `notification fixed top-4 right-4 max-w-sm p-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300 ${this.getNotificationStyles(type)}`;
        
        notification.innerHTML = `
            <div class="flex items-center gap-3">
                <i class="fas ${this.getNotificationIcon(type)} flex-shrink-0"></i>
                <p class="flex-1">${message}</p>
                <button class="close-btn ml-2 opacity-70 hover:opacity-100" aria-label="Fermer">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        this.state.notifications.set(id, notification);
        
        // Animation d'entrée
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });
        
        // Gestionnaire de fermeture
        const closeBtn = notification.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            this.hideNotification(id);
        });
        
        // Auto-suppression
        setTimeout(() => {
            this.hideNotification(id);
        }, duration);
        
        // Fermeture au clic sur la notification
        notification.addEventListener('click', () => {
            this.hideNotification(id);
        });
        
        return id;
    },
    
    /**
     * Masquer une notification
     */
    hideNotification(id) {
        const notification = this.state.notifications.get(id);
        if (notification) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
                this.state.notifications.delete(id);
            }, 300);
        }
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
     * Icônes pour les notifications
     */
    getNotificationIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        return icons[type] || icons.info;
    },
    
    /**
     * Fermer la modale active
     */
    closeActiveModal() {
        const activeModal = document.querySelector('.modal:not(.hidden)');
        if (activeModal) {
            activeModal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    },
    
    /**
     * Créer une modale
     */
    createModal(content, options = {}) {
        const {
            className = '',
            size = 'md',
            closable = true,
            backdrop = true
        } = options;
        
        const modal = document.createElement('div');
        modal.className = `modal fixed inset-0 z-50 flex items-center justify-center p-4 ${className}`;
        
        if (backdrop) {
            modal.innerHTML = `
                <div class="modal-backdrop absolute inset-0 bg-black bg-opacity-50"></div>
            `;
        }
        
        const modalContent = document.createElement('div');
        modalContent.className = `modal-content relative bg-white rounded-lg max-w-${size} w-full max-h-screen overflow-y-auto shadow-2xl`;
        modalContent.innerHTML = `
            <div class="p-6">
                ${closable ? '<button class="modal-close absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold" aria-label="Fermer">&times;</button>' : ''}
                ${content}
            </div>
        `;
        
        modal.appendChild(modalContent);
        
        // Gestionnaires de fermeture
        if (closable) {
            const closeBtn = modal.querySelector('.modal-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    this.closeModal(modal);
                });
            }
            
            if (backdrop) {
                modal.querySelector('.modal-backdrop').addEventListener('click', () => {
                    this.closeModal(modal);
                });
            }
        }
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Focus sur le premier élément focusable
        const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) {
            firstFocusable.focus();
        }
        
        return modal;
    },
    
    /**
     * Fermer une modale
     */
    closeModal(modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
};

// ============================================
// UTILITAIRES ÉTENDUS
// ============================================

const Utils = {
    /**
     * Throttle function optimisée
     */
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    /**
     * Debounce function optimisée
     */
    debounce(func, delay, immediate = false) {
        let timeoutId;
        return function(...args) {
            const context = this;
            const callNow = immediate && !timeoutId;
            
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                timeoutId = null;
                if (!immediate) func.apply(context, args);
            }, delay);
            
            if (callNow) func.apply(context, args);
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
     * Sanitisation avancée des chaînes de caractères
     */
    sanitizeHTML(str) {
        if (!str) return '';
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML.replace(/[<>]/g, '');
    },
    
    /**
     * Formatage des numéros de téléphone canadiens/français
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
     * Génération d'ID unique optimisée
     */
    generateUniqueId(prefix = 'asl') {
        return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    },
    
    /**
     * Gestion des cookies sécurisée et conforme RGPD
     */
    setCookie(name, value, days = 30, secure = true) {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        const secureFlag = secure ? '; Secure' : '';
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Strict${secureFlag}`;
    },
    
    getCookie(name) {
        return document.cookie.split('; ').reduce((r, v) => {
            const parts = v.split('=');
            return parts[0] === name ? decodeURIComponent(parts[1]) : r;
        }, '');
    },
    
    deleteCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict`;
    },
    
    /**
     * Détection avancée du type d'appareil
     */
    getDeviceType() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const ratio = width / height;
        
        if (width < ASL_CONFIG.ui.tabletBreakpoint) {
            return ratio > 1 ? 'mobile-landscape' : 'mobile';
        }
        if (width < ASL_CONFIG.ui.mobileBreakpoint) {
            return 'tablet';
        }
        return 'desktop';
    },
    
    /**
     * Détection des capacités du navigateur
     */
    getBrowserCapabilities() {
        return {
            webp: this.supportsWebP(),
            intersectionObserver: 'IntersectionObserver' in window,
            serviceWorker: 'serviceWorker' in navigator,
            localStorage: this.supportsLocalStorage(),
            touchEvents: 'ontouchstart' in window,
            reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        };
    },
    
    /**
     * Support WebP
     */
    supportsWebP() {
        const canvas = document.createElement('canvas');
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    },
    
    /**
     * Support localStorage
     */
    supportsLocalStorage() {
        try {
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            return true;
        } catch (e) {
            return false;
        }
    },
    
    /**
     * Formatage des dates avec internationalisation
     */
    formatDate(date, locale = 'fr-CA', options = {}) {
        const defaultOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            ...options
        };
        return new Intl.DateTimeFormat(locale, defaultOptions).format(new Date(date));
    },
    
    /**
     * Formatage des nombres
     */
    formatNumber(number, locale = 'fr-CA') {
        return new Intl.NumberFormat(locale).format(number);
    },
    
    /**
     * Lazy loading des images
     */
    lazyLoadImages() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    },
    
    /**
     * Préchargement des ressources critiques
     */
    preloadCriticalResources() {
        const criticalImages = [
            '/images/hero-bg.jpg',
            '/images/logo.png'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    },
    
    /**
     * Mesure des performances
     */
    measurePerformance() {
        if ('performance' in window) {
            const perfData = performance.timing;
            const measurements = {
                loadTime: perfData.loadEventEnd - perfData.navigationStart,
                domReady: perfData.domContentLoadedEventEnd - perfData.navigationStart,
                firstPaint: this.getFirstPaint(),
                firstContentfulPaint: this.getFirstContentfulPaint()
            };
            
            APIManager.log('Métriques de performance', 'info', measurements);
            return measurements;
        }
        return null;
    },
    
    getFirstPaint() {
        const paintEntries = performance.getEntriesByType('paint');
        const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
        return firstPaint ? Math.round(firstPaint.startTime) : null;
    },
    
    getFirstContentfulPaint() {
        const paintEntries = performance.getEntriesByType('paint');
        const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
        return fcp ? Math.round(fcp.startTime) : null;
    }
};

// ============================================
// GESTIONNAIRE PRINCIPAL DE L'APPLICATION OPTIMISÉ
// ============================================

const ASLApp = {
    // État de l'application
    state: {
        isInitialized: false,
        isLoading: true,
        currentPage: null,
        user: null,
        errors: [],
        performance: null,
        browserCapabilities: null
    },
    
    /**
     * Initialiser l'application
     */
    async init() {
        try {
            console.log('🚀 Initialisation ASL App v3.0.0...');
            
            // Détection des capacités du navigateur
            this.state.browserCapabilities = Utils.getBrowserCapabilities();
            APIManager.log('Capacités du navigateur détectées', 'info', this.state.browserCapabilities);
            
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
            // Précharger les ressources critiques
            Utils.preloadCriticalResources();
            
            // Initialiser les composants
            this.initializeComponents();
            
            // Configurer les événements globaux
            this.setupGlobalEvents();
            
            // Charger les données initiales
            await this.loadInitialData();
            
            // Démarrer les animations
            this.startAnimations();
            
            // Initialiser les fonctionnalités avancées
            this.initAdvancedFeatures();
            
            // Masquer le spinner de chargement
            setTimeout(() => {
                this.hideLoadingSpinner();
                this.state.isLoading = false;
            }, ASL_CONFIG.ui.loadingDelay);
            
            // Mesurer les performances
            window.addEventListener('load', () => {
                this.state.performance = Utils.measurePerformance();
            });
            
            this.state.isInitialized = true;
            console.log('✅ ASL App v3.0.0 initialisé avec succès');
            
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
        } else {
            // Mode demo avec données simulées
            APIManager.log('Mode démo activé', 'info');
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
        
        // Charger les actualités
        if (document.querySelector('.news-card')) {
            loadingPromises.push(this.loadNewsData());
        }
        
        // Attendre que toutes les données soient chargées
        const results = await Promise.allSettled(loadingPromises);
        
        // Logger les résultats
        results.forEach((result, index) => {
            if (result.status === 'rejected') {
                APIManager.log(`Échec du chargement des données ${index}`, 'warn', result.reason);
            }
        });
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
                // Utiliser des données de fallback
                this.renderMembers(this.getFallbackMembers());
                APIManager.log('Utilisation des données de fallback pour les membres', 'info');
            }
        } catch (error) {
            APIManager.log('Erreur lors du chargement des membres', 'error', error);
            this.renderMembers(this.getFallbackMembers());
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
                APIManager.log('Erreur lors du chargement des événements', 'warn', result.error);
            }
        } catch (error) {
            APIManager.log('Erreur lors du chargement des événements', 'error', error);
        }
    },
    
    /**
     * Charger les actualités
     */
    async loadNewsData() {
        try {
            const result = await APIManager.getNews();
            if (result.success) {
                this.renderNews(result.data);
            }
        } catch (error) {
            APIManager.log('Erreur lors du chargement des actualités', 'error', error);
        }
    },
    
    /**
     * Données de fallback pour les membres
     */
    getFallbackMembers() {
        return [
            {
                id: 1,
                name: 'Georges CSL',
                position: 'Capitaine maritime et opérateur de navires domestiques',
                company: 'Plus de 20 ans avec la Cie',
                avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg'
            },
            {
                id: 2,
                name: 'Algoma Central',
                position: 'Opérateur de navires de vrac solide sur les Grands Lacs',
                company: 'Expertise en navigation',
                avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg'
            },
            {
                id: 3,
                name: 'Lower Lakes Towing',
                position: 'Remorquage et services auxiliaires maritimes',
                company: 'Services spécialisés',
                avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg'
            },
            {
                id: 4,
                name: 'McKeil Marine',
                position: 'Transport maritime des Grands Lacs et remorquage côtier',
                company: 'Innovation et durabilité',
                avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg'
            }
        ];
    },
    
    /**
     * Configurer les événements globaux
     */
    setupGlobalEvents() {
        // Gestion des erreurs JavaScript non capturées
        window.addEventListener('error', (e) => {
            this.trackError({
                message: e.error?.message || e.message,
                stack: e.error?.stack,
                filename: e.filename,
                lineno: e.lineno,
                colno: e.colno
            });
        });
        
        // Gestion des promesses rejetées
        window.addEventListener('unhandledrejection', (e) => {
            this.trackError({
                message: 'Promise rejetée',
                reason: e.reason
            });
        });
        
        // Gestion de l'état en ligne/hors ligne
        window.addEventListener('online', () => {
            UIComponents.showNotification('Connexion rétablie', 'success');
            APIManager.clearCache(); // Vider le cache pour recharger les données
        });
        
        window.addEventListener('offline', () => {
            UIComponents.showNotification('Mode hors ligne activé', 'warning');
        });
        
        // Gestion du redimensionnement
        window.addEventListener('resize', Utils.debounce(() => {
            this.handleResize();
        }, 250));
        
        // Gestion de la visibilité de la page
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                APIManager.log('Page masquée', 'debug');
            } else {
                APIManager.log('Page visible', 'debug');
            }
        });
        
        // Sauvegarde du scroll pour la navigation
        window.addEventListener('beforeunload', () => {
            if (Utils.supportsLocalStorage()) {
                Utils.setCookie('scrollPosition', window.pageYOffset.toString(), 1);
            }
        });
        
        // Restauration du scroll
        const savedScroll = Utils.getCookie('scrollPosition');
        if (savedScroll && savedScroll !== '0') {
            setTimeout(() => {
                window.scrollTo(0, parseInt(savedScroll));
                Utils.deleteCookie('scrollPosition');
            }, 100);
        }
    },
    
    /**
     * Démarrer les animations
     */
    startAnimations() {
        // Animation du logo de chargement
        const logo = document.querySelector('#logo');
        if (logo) {
            setTimeout(() => {
                logo.style.opacity = '1';
                logo.style.transform = 'translateY(0)';
            }, 100);
        }
        
        // Animation staggerée des éléments hero
        setTimeout(() => {
            document.querySelectorAll('.hero-animate').forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 150);
            });
        }, ASL_CONFIG.animations.heroDelay);
    },
    
    /**
     * Initialiser les fonctionnalités avancées
     */
    initAdvancedFeatures() {
        // Lazy loading des images
        if (this.state.browserCapabilities.intersectionObserver) {
            Utils.lazyLoadImages();
        }
        
        // Service Worker
        this.initServiceWorker();
        
        // Analytics et tracking
        this.initAnalytics();
        
        // Gestion des cookies RGPD
        this.initCookieConsent();
    },
    
    /**
     * Initialiser le Service Worker
     */
    initServiceWorker() {
        if (!this.state.browserCapabilities.serviceWorker) return;
        
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then((registration) => {
                    APIManager.log('Service Worker enregistré', 'info', registration);
                    
                    // Vérifier les mises à jour
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                UIComponents.showNotification(
                                    'Une nouvelle version est disponible. Rechargez la page pour la voir.',
                                    'info',
                                    10000
                                );
                            }
                        });
                    });
                })
                .catch(error => {
                    APIManager.log('Échec de l\'enregistrement du Service Worker', 'warn', error);
                });
        });
    },
    
    /**
     * Initialiser les analytics
     */
    initAnalytics() {
        // Tracking des performances
        if (typeof gtag !== 'undefined') {
            window.addEventListener('load', () => {
                const perfData = Utils.measurePerformance();
                if (perfData) {
                    gtag('event', 'timing_complete', {
                        name: 'load',
                        value: Math.round(perfData.loadTime)
                    });
                }
            });
        }
        
        // Tracking des interactions
        document.addEventListener('click', (e) => {
            const button = e.target.closest('button, .btn-maritime');
            if (button && typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    event_category: 'button',
                    event_label: button.textContent.trim()
                });
            }
        });
    },
    
    /**
     * Gestion du consentement des cookies
     */
    initCookieConsent() {
        const hasConsent = Utils.getCookie('cookie_consent');
        if (!hasConsent) {
            setTimeout(() => {
                this.showCookieConsent();
            }, 2000);
        }
    },
    
    /**
     * Afficher le bandeau de consentement
     */
    showCookieConsent() {
        const banner = document.createElement('div');
        banner.className = 'cookie-banner fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50 transform translateY-full transition-transform duration-300';
        banner.innerHTML = `
            <div class="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <p class="text-sm">
                    Nous utilisons des cookies pour améliorer votre expérience. En continuant, vous acceptez notre 
                    <a href="/confidentialite" class="underline hover:no-underline">politique de confidentialité</a>.
                </p>
                <div class="flex gap-3">
                    <button class="cookie-accept px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors">
                        Accepter
                    </button>
                    <button class="cookie-decline px-4 py-2 border border-white hover:bg-white hover:text-gray-900 rounded transition-colors">
                        Refuser
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(banner);
        
        // Animation d'entrée
        setTimeout(() => {
            banner.style.transform = 'translateY(0)';
        }, 100);
        
        // Gestionnaires d'événements
        banner.querySelector('.cookie-accept').addEventListener('click', () => {
            Utils.setCookie('cookie_consent', 'accepted', 365);
            this.hideCookieBanner(banner);
        });
        
        banner.querySelector('.cookie-decline').addEventListener('click', () => {
            Utils.setCookie('cookie_consent', 'declined', 365);
            this.hideCookieBanner(banner);
        });
    },
    
    /**
     * Masquer le bandeau de cookies
     */
    hideCookieBanner(banner) {
        banner.style.transform = 'translateY(100%)';
        setTimeout(() => banner.remove(), 300);
    },
    
    /**
     * Masquer le spinner de chargement
     */
    hideLoadingSpinner() {
        const spinner = document.getElementById('loading-spinner');
        if (spinner) {
            spinner.style.opacity = '0';
            setTimeout(() => spinner.remove(), 300);
        }
        
        // Retirer la classe de chargement du body
        document.body.classList.remove('js-loading');
    },
    
    /**
     * Rendu des membres optimisé
     */
    renderMembers(members) {
        const container = document.getElementById('members-grid');
        if (!container || !members) return;
        
        const membersHTML = members.map(member => `
            <div class="member-card bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift card-shine border border-gray-100" data-member-id="${member.id}">
                <div class="text-center">
                    <img src="${member.avatar || '/images/default-avatar.jpg'}" 
                         alt="${Utils.sanitizeHTML(member.name)}" 
                         class="w-16 h-16 rounded-full mx-auto mb-4 object-cover border-4 border-gray-100"
                         loading="lazy">
                    <h3 class="font-bold text-gray-900 mb-2">${Utils.sanitizeHTML(member.name)}</h3>
                    <p class="text-sm text-gray-600 mb-2">${Utils.sanitizeHTML(member.position || '')}</p>
                    <p class="text-xs text-maritime-blue font-medium">${Utils.sanitizeHTML(member.company || '')}</p>
                </div>
            </div>
        `).join('');
        
        container.innerHTML = membersHTML;
        
        // Réinitialiser le carrousel
        UIComponents.state.currentMemberPage = 0;
        UIComponents.initMemberCarousel();
    },
    
    /**
     * Rendu des événements
     */
    renderEvents(events) {
        const container = document.getElementById('events-container');
        if (!container || !events) return;
        
        container.innerHTML = events.map(event => `
            <div class="event-card animate-on-scroll bg-white rounded-xl shadow-md overflow-hidden hover-lift">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-4">
                        <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                            ${Utils.formatDate(event.date)}
                        </span>
                        <span class="text-gray-500 text-sm">${Utils.formatNumber(event.participants || 0)} participants</span>
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
     * Rendu des actualités
     */
    renderNews(news) {
        const newsCards = document.querySelectorAll('.news-card');
        if (!newsCards.length || !news) return;
        
        news.forEach((article, index) => {
            if (newsCards[index]) {
                const card = newsCards[index];
                const title = card.querySelector('h3');
                const content = card.querySelector('p');
                const date = card.querySelector('time');
                
                if (title) title.textContent = article.title;
                if (content) content.textContent = article.excerpt;
                if (date) {
                    date.textContent = Utils.formatDate(article.date);
                    date.setAttribute('datetime', article.date);
                }
            }
        });
    },
    
    /**
     * Gérer le redimensionnement
     */
    handleResize() {
        const deviceType = Utils.getDeviceType();
        document.body.classList.remove('mobile', 'mobile-landscape', 'tablet', 'desktop');
        document.body.classList.add(deviceType);
        
        // Réinitialiser le carrousel des membres
        UIComponents.initMemberCarousel();
    },
    
    /**
     * Gérer les erreurs de l'application
     */
    handleAppError(error) {
        const errorInfo = {
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent,
            state: this.state
        };
        
        this.state.errors.push(errorInfo);
        
        // Log pour le debugging
        APIManager.log('Erreur de l\'application', 'error', errorInfo);
        
        // Afficher une notification à l'utilisateur
        UIComponents.showNotification(ASL_CONFIG.messages.error, 'error');
        
        // Envoyer à un service de monitoring en production
        if (typeof window.Sentry !== 'undefined') {
            window.Sentry.captureException(error);
        }
    },
    
    /**
     * Tracker les erreurs
     */
    trackError(errorInfo) {
        this.state.errors.push({
            ...errorInfo,
            timestamp: new Date().toISOString(),
            url: window.location.href
        });
        
        APIManager.log('Erreur trackée', 'error', errorInfo);
        
        // Envoyer à Google Analytics si disponible
        if (typeof gtag !== 'undefined') {
            gtag('event', 'exception', {
                description: errorInfo.message,
                fatal: false
            });
        }
    }
};

// ============================================
// INITIALISATION DE L'APPLICATION
// ============================================

// Initialiser l'application quand le script se charge
ASLApp.init().catch(error => {
    console.error('❌ Erreur fatale lors de l\'initialisation:', error);
    
    // Fallback d'urgence - afficher au moins le contenu de base
    document.body.classList.remove('js-loading');
    const spinner = document.getElementById('loading-spinner');
    if (spinner) spinner.remove();
});

// Exposer l'API globale pour les autres scripts et le debugging
window.ASL = {
    app: ASLApp,
    api: APIManager,
    ui: UIComponents,
    utils: Utils,
    animations: AnimationManager,
    config: ASL_CONFIG,
    version: '3.0.0'
};

// Log de la version en mode debug
if (ASL_CONFIG.debug.enabled) {
    console.log(`%c ASL App v${window.ASL.version} `, 'background: #2563eb; color: white; padding: 2px 8px; border-radius: 4px;');
}
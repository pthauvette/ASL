// Main JavaScript for Armateurs du Saint-Laurent website
// Enhanced version with advanced animations and interactions

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initializeHeader();
    initializeMobileMenu();
    initializeScrollAnimations();
    initializeParallax();
    initializeCounters();
    initializeImageLazyLoading();
    initializeFormEnhancements();
    initializeTooltips();
    initializeCalendar();
    initializeSearch();
    initializeAccessibility();
    initializePerformanceMonitoring();
    
    console.log('🚀 Site Armateurs du Saint-Laurent initialisé avec animations avancées');
});

// Header Management with Enhanced Scrolling Effects
function initializeHeader() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScrollTop = 0;
    let scrollTimeout;
    
    function updateHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
        
        // Add scrolled class for styling
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header based on scroll direction (only on mobile)
        if (window.innerWidth <= 768) {
            if (scrollDirection === 'down' && scrollTop > 200) {
                header.style.transform = 'translateY(-100%)';
            } else if (scrollDirection === 'up') {
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // Update header background opacity
        const opacity = Math.min(0.95 + (scrollTop / 1000) * 0.05, 1);
        header.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
        
        // Clear timeout and set new one for scroll end detection
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            header.classList.add('scroll-ended');
            setTimeout(() => header.classList.remove('scroll-ended'), 150);
        }, 150);
    }
    
    // Throttled scroll listener
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateHeader();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    updateHeader(); // Initial call
}

// Enhanced Mobile Menu with Animation
function initializeMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navigation = document.querySelector('.navigation');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!mobileMenuToggle || !navigation) return;
    
    // Toggle menu
    mobileMenuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navigation.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navigation.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
            closeMobileMenu();
        }
    });
    
    // Close menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            closeMobileMenu();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
    
    function toggleMobileMenu() {
        const isActive = navigation.classList.contains('active');
        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
    
    function openMobileMenu() {
        navigation.classList.add('active');
        mobileMenuToggle.classList.add('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        
        // Animate nav links with stagger
        navLinks.forEach((link, index) => {
            link.style.opacity = '0';
            link.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                link.style.transition = 'all 0.3s ease';
                link.style.opacity = '1';
                link.style.transform = 'translateX(0)';
            }, index * 50 + 100);
        });
    }
    
    function closeMobileMenu() {
        navigation.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        
        // Reset nav links
        navLinks.forEach(link => {
            link.style.transition = '';
            link.style.opacity = '';
            link.style.transform = '';
        });
    }
}

// Advanced Scroll Animations with Intersection Observer
function initializeScrollAnimations() {
    // Create multiple observers for different animation types
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Main animation observer
    const mainObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.dataset.animation || 'fadeInUp';
                
                element.classList.add('animate-in');
                element.style.animationName = animationType;
                
                // Add stagger effect for grouped elements
                if (element.parentElement.classList.contains('services-grid') ||
                    element.parentElement.classList.contains('news-grid') ||
                    element.parentElement.classList.contains('events-grid')) {
                    const siblings = Array.from(element.parentElement.children);
                    const index = siblings.indexOf(element);
                    element.style.animationDelay = `${index * 0.1}s`;
                }
                
                mainObserver.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll([
        '.service-card',
        '.news-card',
        '.board-member',
        '.value-card',
        '.timeline-item',
        '.stat-item',
        '.member-stat',
        '.featured-member',
        '.category-card',
        '.event-card',
        '.type-card',
        '.benefit-card',
        '.testimonial-card',
        '.stat-card',
        '.season-card'
    ].join(', '));
    
    animateElements.forEach(el => {
        mainObserver.observe(el);
    });
    
    // Text animation observer
    const textObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateText(entry.target);
                textObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe headers for text animation
    const headers = document.querySelectorAll('h1, h2, h3');
    headers.forEach(header => {
        if (!header.closest('.hero') && !header.closest('.page-hero')) {
            textObserver.observe(header);
        }
    });
}

// Text Animation Function
function animateText(element) {
    const text = element.textContent;
    element.innerHTML = '';
    
    // Split text into spans
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        span.style.display = 'inline-block';
        span.style.transition = `all 0.6s ease ${index * 0.02}s`;
        element.appendChild(span);
        
        // Trigger animation
        setTimeout(() => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
        }, 50);
    });
}

// Enhanced Parallax Effects
function initializeParallax() {
    const parallaxElements = document.querySelectorAll('.hero-image, .page-hero-image');
    
    if (parallaxElements.length === 0) return;
    
    function updateParallax() {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const speed = 0.5; // Parallax speed factor
            
            if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
                const yPos = -(scrollTop * speed);
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            }
        });
    }
    
    // Throttled scroll listener
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Enhanced Counter Animations
function initializeCounters() {
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out cubic)
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * easeProgress);
            
            // Format number based on content
            let displayValue = current.toLocaleString();
            if (element.textContent.includes('+')) {
                displayValue += '+';
            } else if (element.textContent.includes('%')) {
                displayValue += '%';
            } else if (element.textContent.includes('M')) {
                displayValue = (current / 1000000).toFixed(1) + 'M';
            } else if (element.textContent.includes('G')) {
                displayValue = (current / 1000000000).toFixed(1) + 'G';
            } else if (element.textContent.includes('$')) {
                displayValue = '$' + displayValue;
            }
            
            element.textContent = displayValue;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // Animate counters when visible
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    const number = parseInt(text.replace(/[^\d]/g, ''));
                    if (number && number > 0) {
                        animateCounter(stat, number, 2500);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    // Observe stats sections
    const statsSections = document.querySelectorAll('.stats, .members-stats, .events-stats, .stlawrence-stats');
    statsSections.forEach(section => {
        statsObserver.observe(section);
    });
}

// Enhanced Lazy Loading
function initializeImageLazyLoading() {
    // Native lazy loading for modern browsers
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    });
    
    // Intersection Observer for progressive enhancement
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Add fade-in effect
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.6s ease';
                
                // Load image
                const tempImg = new Image();
                tempImg.onload = () => {
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    img.style.opacity = '1';
                };
                tempImg.src = img.dataset.src || img.src;
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    // Observe images with data-src
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Enhanced Form Interactions
function initializeFormEnhancements() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        // Enhanced input interactions
        inputs.forEach(input => {
            // Floating label effect
            const label = form.querySelector(`label[for="${input.id}"]`);
            
            // Focus/blur animations
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
                if (label) label.classList.add('active');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
                if (label && !this.value) {
                    label.classList.remove('active');
                }
            });
            
            // Input validation feedback
            input.addEventListener('input', function() {
                validateField(this);
            });
            
            // Character counter for textareas
            if (input.tagName === 'TEXTAREA' && input.hasAttribute('maxlength')) {
                addCharacterCounter(input);
            }
        });
        
        // Form submission with loading state
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Add loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <span class="loading-spinner"></span>
                Envoi en cours...
            `;
            
            // Validate form
            const isValid = validateForm(form);
            
            // Simulate form submission
            setTimeout(() => {
                if (isValid) {
                    showNotification('Message envoyé avec succès !', 'success');
                    form.reset();
                } else {
                    showNotification('Veuillez corriger les erreurs dans le formulaire.', 'error');
                }
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 1500);
        });
    });
}

// Field Validation
function validateField(field) {
    const value = field.value.trim();
    const fieldGroup = field.closest('.form-group');
    
    // Remove existing validation classes
    field.classList.remove('error', 'success');
    fieldGroup.classList.remove('error', 'success');
    
    // Remove existing feedback
    const existingFeedback = fieldGroup.querySelector('.field-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    let isValid = true;
    let message = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        message = 'Ce champ est obligatoire';
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            message = 'Adresse email invalide';
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            isValid = false;
            message = 'Numéro de téléphone invalide';
        }
    }
    
    // Add validation feedback
    if (!isValid) {
        field.classList.add('error');
        fieldGroup.classList.add('error');
        addFieldFeedback(fieldGroup, message, 'error');
    } else if (value) {
        field.classList.add('success');
        fieldGroup.classList.add('success');
    }
    
    return isValid;
}

// Add Field Feedback
function addFieldFeedback(fieldGroup, message, type) {
    const feedback = document.createElement('div');
    feedback.className = `field-feedback ${type}`;
    feedback.textContent = message;
    feedback.style.cssText = `
        font-size: 0.875rem;
        margin-top: 0.25rem;
        color: ${type === 'error' ? '#d4183d' : '#16a34a'};
        opacity: 0;
        transform: translateY(-10px);
        transition: all 0.3s ease;
    `;
    
    fieldGroup.appendChild(feedback);
    
    // Animate in
    setTimeout(() => {
        feedback.style.opacity = '1';
        feedback.style.transform = 'translateY(0)';
    }, 50);
}

// Form Validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Character Counter
function addCharacterCounter(textarea) {
    const maxLength = textarea.getAttribute('maxlength');
    const counter = document.createElement('div');
    counter.className = 'character-counter';
    counter.style.cssText = `
        font-size: 0.875rem;
        color: var(--muted-foreground);
        text-align: right;
        margin-top: 0.25rem;
    `;
    
    function updateCounter() {
        const remaining = maxLength - textarea.value.length;
        counter.textContent = `${remaining} caractères restants`;
        
        if (remaining < 50) {
            counter.style.color = '#d4183d';
        } else {
            counter.style.color = 'var(--muted-foreground)';
        }
    }
    
    textarea.addEventListener('input', updateCounter);
    textarea.parentElement.appendChild(counter);
    updateCounter();
}

// Enhanced Tooltips
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[title], [data-tooltip]');
    
    tooltipElements.forEach(element => {
        const tooltipText = element.getAttribute('data-tooltip') || element.getAttribute('title');
        if (!tooltipText) return;
        
        // Remove default title to prevent browser tooltip
        element.removeAttribute('title');
        
        element.addEventListener('mouseenter', function(e) {
            showTooltip(e.target, tooltipText);
        });
        
        element.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });
}

// Tooltip Functions
function showTooltip(element, text) {
    hideTooltip(); // Remove existing tooltip
    
    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background: #030213;
        color: white;
        padding: 0.5rem 0.75rem;
        border-radius: 0.375rem;
        font-size: 0.875rem;
        z-index: 1000;
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.2s ease;
        pointer-events: none;
        max-width: 200px;
        text-align: center;
    `;
    
    document.body.appendChild(tooltip);
    
    // Position tooltip
    const rect = element.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    
    let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
    let top = rect.top - tooltipRect.height - 10;
    
    // Adjust if tooltip goes off screen
    if (left < 10) left = 10;
    if (left + tooltipRect.width > window.innerWidth - 10) {
        left = window.innerWidth - tooltipRect.width - 10;
    }
    if (top < 10) {
        top = rect.bottom + 10;
    }
    
    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
    
    // Show tooltip
    setTimeout(() => {
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateY(0)';
    }, 50);
}

function hideTooltip() {
    const tooltip = document.querySelector('.custom-tooltip');
    if (tooltip) {
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translateY(10px)';
        setTimeout(() => tooltip.remove(), 200);
    }
}

// Enhanced Calendar
function initializeCalendar() {
    const calendarContainer = document.querySelector('.calendar-container');
    if (!calendarContainer) return;
    
    const currentMonthElement = document.getElementById('currentMonth');
    const prevButton = document.getElementById('prevMonth');
    const nextButton = document.getElementById('nextMonth');
    const calendarGrid = document.querySelector('.calendar-grid');
    
    let currentDate = new Date();
    
    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        // Update month display
        const monthNames = [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ];
        
        if (currentMonthElement) {
            currentMonthElement.textContent = `${monthNames[month]} ${year}`;
        }
        
        // Clear existing days
        const existingDays = calendarGrid.querySelectorAll('.calendar-day');
        existingDays.forEach(day => day.remove());
        
        // Get first day and number of days in month
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();
        
        // Add previous month's trailing days
        for (let i = firstDay - 1; i >= 0; i--) {
            const day = createCalendarDay(daysInPrevMonth - i, true);
            calendarGrid.appendChild(day);
        }
        
        // Add current month's days
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = createCalendarDay(day, false);
            
            // Add events (sample data)
            if ([15, 28].includes(day)) {
                dayElement.classList.add('has-event');
                dayElement.setAttribute('title', 'Événement programmé');
            }
            
            calendarGrid.appendChild(dayElement);
        }
        
        // Add next month's leading days
        const totalCells = calendarGrid.children.length - 7; // Subtract header row
        const remainingCells = 42 - totalCells; // 6 rows * 7 days
        
        for (let day = 1; day <= remainingCells; day++) {
            const dayElement = createCalendarDay(day, true);
            calendarGrid.appendChild(dayElement);
        }
    }
    
    function createCalendarDay(dayNumber, otherMonth) {
        const day = document.createElement('div');
        day.className = `calendar-day${otherMonth ? ' other-month' : ''}`;
        day.textContent = dayNumber;
        
        // Add click interaction
        if (!otherMonth) {
            day.addEventListener('click', function() {
                // Remove previous selection
                calendarGrid.querySelectorAll('.selected').forEach(d => d.classList.remove('selected'));
                // Add selection
                this.classList.add('selected');
            });
        }
        
        return day;
    }
    
    // Navigation event listeners
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });
    }
    
    // Initial render
    renderCalendar();
}

// Enhanced Search Functionality
function initializeSearch() {
    const searchInputs = document.querySelectorAll('input[type="search"], .search-input');
    
    searchInputs.forEach(input => {
        let searchTimeout;
        const searchContainer = input.closest('.search-container') || input.parentElement;
        
        // Create search suggestions container
        const suggestionsContainer = document.createElement('div');
        suggestionsContainer.className = 'search-suggestions';
        suggestionsContainer.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid var(--border-color);
            border-radius: var(--radius);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            max-height: 300px;
            overflow-y: auto;
            z-index: 1000;
            display: none;
        `;
        
        searchContainer.style.position = 'relative';
        searchContainer.appendChild(suggestionsContainer);
        
        input.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();
            
            if (query.length >= 2) {
                searchTimeout = setTimeout(() => {
                    performSearch(query, suggestionsContainer);
                }, 300);
            } else {
                hideSuggestions(suggestionsContainer);
            }
        });
        
        input.addEventListener('blur', function() {
            // Delay hiding to allow clicking on suggestions
            setTimeout(() => hideSuggestions(suggestionsContainer), 200);
        });
        
        input.addEventListener('focus', function() {
            if (this.value.length >= 2) {
                suggestionsContainer.style.display = 'block';
            }
        });
    });
}

function performSearch(query, suggestionsContainer) {
    // Mock search results
    const mockResults = [
        'Assemblée générale annuelle',
        'Formation réglementation maritime',
        'Conférence innovation maritime',
        'Événements de networking',
        'Documentation environnementale',
        'Nos membres armateurs',
        'Voie maritime du Saint-Laurent'
    ].filter(item => item.toLowerCase().includes(query.toLowerCase()));
    
    displaySearchSuggestions(mockResults, suggestionsContainer, query);
}

function displaySearchSuggestions(results, container, query) {
    container.innerHTML = '';
    
    if (results.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'search-no-results';
        noResults.textContent = 'Aucun résultat trouvé';
        noResults.style.cssText = `
            padding: 1rem;
            text-align: center;
            color: var(--muted-foreground);
        `;
        container.appendChild(noResults);
    } else {
        results.forEach(result => {
            const suggestion = document.createElement('div');
            suggestion.className = 'search-suggestion';
            suggestion.style.cssText = `
                padding: 0.75rem 1rem;
                cursor: pointer;
                border-bottom: 1px solid var(--border-color);
                transition: background-color 0.2s ease;
            `;
            
            // Highlight matching text
            const regex = new RegExp(`(${query})`, 'gi');
            const highlightedText = result.replace(regex, '<mark>$1</mark>');
            suggestion.innerHTML = highlightedText;
            
            suggestion.addEventListener('mouseenter', function() {
                this.style.backgroundColor = 'var(--secondary-color)';
            });
            
            suggestion.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '';
            });
            
            suggestion.addEventListener('click', function() {
                // Handle suggestion click
                console.log('Recherche sélectionnée:', result);
                container.style.display = 'none';
            });
            
            container.appendChild(suggestion);
        });
    }
    
    container.style.display = 'block';
}

function hideSuggestions(container) {
    container.style.display = 'none';
}

// Enhanced Accessibility
function initializeAccessibility() {
    // Skip link
    if (!document.querySelector('.skip-link')) {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Aller au contenu principal';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #030213;
            color: white;
            padding: 8px 16px;
            text-decoration: none;
            z-index: 1002;
            border-radius: 4px;
            transition: top 0.3s ease;
            font-weight: 600;
        `;
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
    
    // Main content ID
    const mainContent = document.querySelector('main, .hero, section');
    if (mainContent && !mainContent.id) {
        mainContent.id = 'main-content';
    }
    
    // Focus management
    document.addEventListener('keydown', function(e) {
        // Tab key navigation enhancement
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Aria labels for interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
    interactiveElements.forEach(element => {
        if (!element.getAttribute('aria-label') && !element.textContent.trim()) {
            const placeholder = element.getAttribute('placeholder');
            if (placeholder) {
                element.setAttribute('aria-label', placeholder);
            }
        }
    });
}

// Performance Monitoring
function initializePerformanceMonitoring() {
    // Measure loading performance
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`📊 Page chargée en ${Math.round(loadTime)}ms`);
        
        // Report Core Web Vitals
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    console.log(`📈 ${entry.name}: ${Math.round(entry.value)}ms`);
                }
            });
            
            observer.observe({ entryTypes: ['measure', 'navigation'] });
        }
    });
    
    // Monitor scroll performance
    let scrollCount = 0;
    window.addEventListener('scroll', function() {
        scrollCount++;
        if (scrollCount % 100 === 0) {
            console.log(`📜 ${scrollCount} événements de scroll traités`);
        }
    });
}

// Enhanced Notification System
function showNotification(message, type = 'info', duration = 5000) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Icon based on type
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };
    
    notification.innerHTML = `
        <div class="notification-icon">${icons[type] || icons.info}</div>
        <span class="notification-message">${message}</span>
        <button class="notification-close" aria-label="Fermer">&times;</button>
    `;
    
    // Styles
    const colors = {
        success: '#16a34a',
        error: '#d4183d',
        warning: '#eab308',
        info: '#030213'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 1001;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        max-width: 400px;
        min-width: 300px;
        animation: slideInRight 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    `;
    
    // Add styles for child elements
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        .notification-icon {
            font-weight: bold;
            font-size: 1.2rem;
        }
        .notification-message {
            flex: 1;
            line-height: 1.4;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
            opacity: 0.8;
            transition: opacity 0.2s ease;
        }
        .notification-close:hover {
            opacity: 1;
        }
    `;
    
    if (!document.querySelector('#notification-styles')) {
        style.id = 'notification-styles';
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        closeNotification(notification);
    });
    
    // Auto remove
    setTimeout(() => {
        if (notification.parentNode) {
            closeNotification(notification);
        }
    }, duration);
    
    // Click to close
    notification.addEventListener('click', (e) => {
        if (e.target !== closeButton) {
            closeNotification(notification);
        }
    });
}

function closeNotification(notification) {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 300);
}

// Back to Top Button with Enhanced Features
function initializeBackToTop() {
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="18,15 12,9 6,15"></polyline>
        </svg>
    `;
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Retour en haut');
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(3, 2, 19, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(backToTopButton);
    
    // Show/hide based on scroll position
    let scrollProgress = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgress = scrollTop / docHeight;
        
        if (scrollTop > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
            backToTopButton.style.transform = 'scale(1)';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
            backToTopButton.style.transform = 'scale(0.8)';
        }
        
        // Update progress indicator
        const progressRing = backToTopButton.querySelector('.progress-ring');
        if (progressRing) {
            const circumference = 2 * Math.PI * 20;
            const offset = circumference - (scrollProgress * circumference);
            progressRing.style.strokeDashoffset = offset;
        }
    });
    
    // Smooth scroll to top
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effects
    backToTopButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 6px 25px rgba(3, 2, 19, 0.4)';
    });
    
    backToTopButton.addEventListener('mouseleave', function() {
        this.style.transform = scrollProgress > 0.1 ? 'scale(1)' : 'scale(0.8)';
        this.style.boxShadow = '0 4px 20px rgba(3, 2, 19, 0.3)';
    });
}

// Initialize back to top button
initializeBackToTop();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            
            // Calculate offset for fixed header
            const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Print functionality
document.querySelectorAll('[data-print]').forEach(button => {
    button.addEventListener('click', function() {
        // Add print-specific styles
        const printStyles = document.createElement('style');
        printStyles.media = 'print';
        printStyles.textContent = `
            @media print {
                .header, .footer, .back-to-top, .notification { display: none !important; }
                body { font-size: 12pt; line-height: 1.4; }
                .container { max-width: none; margin: 0; padding: 0; }
            }
        `;
        document.head.appendChild(printStyles);
        
        setTimeout(() => {
            window.print();
            document.head.removeChild(printStyles);
        }, 100);
    });
});

// Dynamic import for advanced features (if needed)
if ('IntersectionObserver' in window && 'ResizeObserver' in window) {
    // Browser supports modern APIs
    console.log('✅ Navigateur moderne détecté - Toutes les fonctionnalités activées');
} else {
    // Fallback for older browsers
    console.log('⚠️ Navigateur ancien détecté - Fonctionnalités limitées');
}
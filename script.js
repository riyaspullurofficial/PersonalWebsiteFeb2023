/**
 * Personal Portfolio - Interactive Features
 * Handles navigation, scroll animations, carousel, and button effects
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    initSkillsCarousel();
    initButtonRipple();
    initStickyCTA();
    initSmoothScroll();
});

/**
 * Navigation Menu Toggle
 */
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const nav = document.getElementById('nav');
    
    // Toggle mobile menu
    navToggle?.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Add scrolled class to nav
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav?.classList.add('scrolled');
        } else {
            nav?.classList.remove('scrolled');
        }
        
        // Update active nav link based on section
        updateActiveNavLink();
        
        lastScrollY = window.scrollY;
    }, { passive: true });
}

/**
 * Update active navigation link based on scroll position
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

/**
 * Scroll-triggered reveal animations using Intersection Observer
 */
function initScrollAnimations() {
    const revealElements = document.querySelectorAll(
        '.about-point, .skill-card, .timeline-item, .project-card, .cert-card'
    );
    
    // Add reveal class to all elements
    revealElements.forEach(el => el.classList.add('reveal'));
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing after revealed
                // revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    revealElements.forEach(el => revealObserver.observe(el));
    
    // Section title animations
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.classList.add('reveal');
        revealObserver.observe(title);
    });
}

/**
 * Skills Carousel for Mobile
 */
function initSkillsCarousel() {
    const track = document.querySelector('.skills-track');
    const cards = document.querySelectorAll('.skill-card');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!track || cards.length === 0) return;
    
    let currentIndex = 0;
    
    // Update indicators based on scroll position
    track.addEventListener('scroll', () => {
        const scrollLeft = track.scrollLeft;
        const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(track).gap);
        const newIndex = Math.round(scrollLeft / cardWidth);
        
        if (newIndex !== currentIndex && newIndex >= 0 && newIndex < cards.length) {
            currentIndex = newIndex;
            updateIndicators();
        }
    }, { passive: true });
    
    // Click on indicators to navigate
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(track).gap);
            track.scrollTo({
                left: index * cardWidth,
                behavior: 'smooth'
            });
            currentIndex = index;
            updateIndicators();
        });
    });
    
    function updateIndicators() {
        indicators.forEach((ind, i) => {
            ind.classList.toggle('active', i === currentIndex);
        });
    }
    
    // Touch swipe support
    let startX = 0;
    let isDragging = false;
    
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0 && currentIndex < cards.length - 1) {
                // Swipe left - next card
                currentIndex++;
            } else if (diff < 0 && currentIndex > 0) {
                // Swipe right - previous card
                currentIndex--;
            }
            
            const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(track).gap);
            track.scrollTo({
                left: currentIndex * cardWidth,
                behavior: 'smooth'
            });
            updateIndicators();
        }
        
        isDragging = false;
    }, { passive: true });
}

/**
 * Button Ripple Effect
 */
function initButtonRipple() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Remove existing ripples
            const existingRipple = this.querySelector('.ripple');
            if (existingRipple) {
                existingRipple.remove();
            }
            
            // Create new ripple
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

/**
 * Sticky CTA on Mobile
 */
function initStickyCTA() {
    const stickyCTA = document.getElementById('stickyCta');
    const heroSection = document.getElementById('hero');
    const contactSection = document.getElementById('contact');
    
    if (!stickyCTA || !heroSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.target === heroSection) {
                // Hide sticky CTA when hero is visible
                if (entry.isIntersecting) {
                    stickyCTA.classList.remove('visible');
                } else {
                    // Show sticky CTA when scrolled past hero
                    stickyCTA.classList.add('visible');
                }
            }
            
            if (entry.target === contactSection) {
                // Hide sticky CTA when contact section is visible
                if (entry.isIntersecting) {
                    stickyCTA.classList.remove('visible');
                }
            }
        });
    }, {
        root: null,
        threshold: 0.1
    });
    
    observer.observe(heroSection);
    if (contactSection) {
        observer.observe(contactSection);
    }
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            e.preventDefault();
            
            const navHeight = document.getElementById('nav')?.offsetHeight || 0;
            const targetPosition = targetElement.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/**
 * Prefers Reduced Motion Check
 */
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/* ============================================
   HAVE MIND MEDIA - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initFlipCards();
    initScrollAnimations();
    initSmoothScroll();
});

/* ============================================
   NAVIGATION
   ============================================ */
function initNavigation() {
    const nav = document.querySelector('.nav');
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    
    // Mobile toggle
    if (toggle && links) {
        toggle.addEventListener('click', () => {
            links.classList.toggle('active');
            toggle.classList.toggle('active');
        });
    }
    
    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (nav) {
            if (currentScroll > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
        
        lastScroll = currentScroll;
    });
}

/* ============================================
   FLIP CARDS
   ============================================ */
function initFlipCards() {
    const cards = document.querySelectorAll('.flip-card');
    
    cards.forEach(card => {
        // Click to flip
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
        
        // Touch swipe to flip
        let startX = 0;
        let startY = 0;
        
        card.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });
        
        card.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = endX - startX;
            const diffY = endY - startY;
            
            // Horizontal swipe
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                card.classList.toggle('flipped');
            }
        }, { passive: true });
    });
}

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
    
    // Observe sections for staggered animations
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                // Close mobile nav if open
                const links = document.querySelector('.nav-links');
                if (links) links.classList.remove('active');
                
                // Scroll to target
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ============================================
   COIN ANIMATION (Parallax)
   ============================================ */
window.addEventListener('scroll', () => {
    const coin = document.querySelector('.coin-visual');
    if (coin) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.1;
        coin.style.transform = `translateY(${Math.sin(rate * 0.05) * 15}px) rotateY(${rate}deg)`;
    }
});

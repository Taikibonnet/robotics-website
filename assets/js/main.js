// Animation d'apparition des éléments au défilement
document.addEventListener('DOMContentLoaded', () => {
    // Fonction pour vérifier si un élément est visible dans la fenêtre
    const isElementInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    // Fonction pour faire apparaître les éléments au défilement
    const handleScroll = () => {
        const elements = document.querySelectorAll('.animated:not(.visible)');
        
        elements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('visible');
            }
        });
    };

    // Ajouter l'événement de défilement
    window.addEventListener('scroll', handleScroll);
    
    // Déclencher une première fois pour les éléments déjà visibles
    handleScroll();

    // Navigation mobile
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    
    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Animation de comptage pour les statistiques
    const counterElements = document.querySelectorAll('.counter');
    
    if (counterElements.length > 0) {
        const animateCounter = (el) => {
            const target = parseInt(el.getAttribute('data-target'));
            const duration = 2000; // durée en ms
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                
                if (current >= target) {
                    el.textContent = target;
                    clearInterval(timer);
                } else {
                    el.textContent = Math.floor(current);
                }
            }, 16);
        };
        
        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        };
        
        const observer = new IntersectionObserver(observerCallback, {
            threshold: 0.5
        });
        
        counterElements.forEach(el => {
            observer.observe(el);
        });
    }
});
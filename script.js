// Funció per al menú hamburguesa
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    const navItems = document.querySelectorAll('.nav-item');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Tancar menú en fer clic en un enllaç
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Tancar menú en fer clic fora
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.nav-menu') && !e.target.closest('.mobile-menu-toggle')) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Tancar menú en fer scroll
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (navMenu.classList.contains('active')) {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    mobileMenuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }, 100);
            }
        });
    }
}

// Optimització de vídeos per a mòbils
function optimizeVideos() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        // Aturar vídeos quan no són visibles per estalviar bateria
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play().catch(e => console.log('Auto-play prevented:', e));
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.5 });
        
        videoObserver.observe(video);
        
        // Afegir controls en mòbils
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
            video.setAttribute('controls', '');
        }
    });
}

// Millores de rendiment per a scroll en mòbils
function improveScrollPerformance() {
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// Inicialització millorada
document.addEventListener('DOMContentLoaded', function() {
    // Inicialitzar funcions existents
    const sobreMiSection = document.getElementById('sobre-mi');
    if (sobreMiSection) {
        sobreMiSection.style.minHeight = '40vh';
    }
    
    const skillsSection = document.getElementById('habilitats');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
    
    // Actualizar año de copyright
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = `&copy; ${currentYear} Mariona Guisado. All rights reserved.`;
    }
    
    // Inicialitzar noves funcions per a mòbils
    improveMobileExperience();
    initMobileMenu();
    optimizeVideos();
    improveScrollPerformance();
    
    // Mostrar el botó de menú mòbil quan el contingut principal es mostri
    setTimeout(() => {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        if (mobileMenuToggle) {
            mobileMenuToggle.style.opacity = '1';
        }
    }, 1500);
});

// Detectar canvis d'orientació de pantalla
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
});

// Gestió de la memòria en mòbils
window.addEventListener('beforeunload', function() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.pause();
        video.src = '';
        video.load();
    });
});

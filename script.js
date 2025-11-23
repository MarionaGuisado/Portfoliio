// Global variables
let lastScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
let scrollTimeout;
const nameElement = document.getElementById('name');
const enterButton = document.getElementById('enterButton');
const backToTopButton = document.getElementById('backToTop');
const header = document.getElementById('header');

// Millores específiques per a mòbils
function improveMobileExperience() {
    // Detectar si és un dispositiu mòbil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Afegir classe mobile al body per estils específics
        document.body.classList.add('mobile-device');
        
        // Millorar el comportament del scroll
        document.addEventListener('touchmove', function(e) {
            // Prevenir scroll horitzontal accidental
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        }, { passive: false });
        
        // Optimitzar el rendiment en mòbils
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', '');
        });
    }
}

// Funció millorada per als testimonis en mòbil
function initializeTestimonials() {
    document.querySelectorAll('.tutor-bubble').forEach(bubble => {
        const trigger = bubble.querySelector('.tutor-bubble-trigger');
        const content = bubble.querySelector('.tutor-bubble-content');
        
        // Crear overlay si no existeix
        let overlay = document.querySelector('.bubble-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'bubble-overlay';
            document.body.appendChild(overlay);
        }

        // Inicialment amagat
        content.style.opacity = '0';
        content.style.visibility = 'hidden';
        
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isMobile = window.innerWidth <= 768;
            const isVisible = content.style.opacity === '1';
            
            if (isVisible) {
                // Amagar
                content.style.opacity = '0';
                content.style.visibility = 'hidden';
                overlay.classList.remove('active');
                
                if (isMobile) {
                    content.style.position = 'absolute';
                }
            } else {
                // Mostrar
                if (isMobile) {
                    content.style.position = 'fixed';
                    content.style.top = '50%';
                    content.style.left = '50%';
                    content.style.transform = 'translate(-50%, -50%)';
                    content.style.zIndex = '10000';
                    overlay.classList.add('active');
                } else {
                    content.style.position = 'absolute';
                    content.style.bottom = 'calc(100% + 8px)';
                    content.style.left = '50%';
                    content.style.transform = 'translateX(-50%)';
                }
                
                content.style.opacity = '1';
                content.style.visibility = 'visible';
            }
        });
    });
    
    // Tancar quan es fa clic a l'overlay o fora
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.tutor-bubble') && !e.target.closest('.tutor-bubble-content')) {
            document.querySelectorAll('.tutor-bubble-content').forEach(content => {
                content.style.opacity = '0';
                content.style.visibility = 'hidden';
            });
            document.querySelector('.bubble-overlay')?.classList.remove('active');
        }
    });
}

// Funció per ajustar el menú de navegació sobre el video
function adjustNavigationMenu() {
    const navMenu = document.getElementById('navMenu');
    const newBackground = document.querySelector('.new-background');
    
    if (window.innerWidth <= 768 && navMenu && newBackground) {
        const videoRect = newBackground.getBoundingClientRect();
        navMenu.style.top = `${videoRect.top + (videoRect.height / 2)}px`;
    }
}

// Scroll handler function
function handleScroll() {
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    const sobreMiSection = document.getElementById('sobre-mi');
    const sobreMiOffset = sobreMiSection.offsetTop;

    if (currentScrollPosition > sobreMiOffset - 200) {
        nameElement.style.display = 'none';
    } else {
        nameElement.style.display = 'block';
    }
             
    
    lastScrollPosition = currentScrollPosition;
    
    // Show/hide back to top button
    if (currentScrollPosition > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }

    // Header scroll effect
    if (currentScrollPosition > 400) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Initialize scroll event listener
window.addEventListener('scroll', handleScroll);

// Back to top functionality
backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Reinicialitzar quan canvia la mida de la pantalla
window.addEventListener('resize', function() {
    adjustNavigationMenu();
    initializeTestimonials();
});

document.getElementById('enterButton').addEventListener('click', function(e) {
    e.preventDefault();
    
    const transition = document.getElementById('transition');
    const name = document.getElementById('name');
    const background = document.getElementById('background');
    const mainContent = document.getElementById('mainContent');
    const newBackground = document.getElementById('newBackground');
    const navMenu = document.getElementById('navMenu');
    
    // 1. White screen rises
    transition.style.bottom = '100%';
    
    // 2. Hide enter button
    enterButton.classList.add('hidden');
    
    // 3. Change name color to black, move it up and reduce size
    setTimeout(() => {
        name.style.color = 'black';
        name.style.textShadow = 'none';
        name.style.top = '10%';
        name.style.fontSize = '3rem';
        name.style.opacity = '1';
    }, 500);
    
    // 4. Show main content when transition ends
    setTimeout(() => {
        mainContent.style.display = 'block';
        header.style.display = 'block';
        
        // 5. Show new video (now larger) and menu
        setTimeout(() => {
            newBackground.style.opacity = '1';
            navMenu.style.opacity = '1';
            
            // Ajustar posició del menú
            adjustNavigationMenu();
            
            // Typing effect for the new About Me text
            const aboutText = "Demonstrated ability to lead and collaborate effectively through roles as Class Representative and organizer of technology events, fostering communication between diverse groups and driving community engagement. Combines technical knowledge in data analysis, a strong academic foundation and a passion for transforming data into actionable insights, with exceptional interpersonal skills, adaptability, and a solutions-oriented mindset. Eager to contribute by leveraging a unique blend of analytical thinking, leadership experience, and a commitment to delivering value in dynamic, team-based environments.";
            
            const typedElement = document.getElementById('typed-text');
            
            // Type the new text
            typeWriter(aboutText, typedElement, 10);
        }, 100);
        
        // Hide initial background
        name.style.opacity = '0';
        background.style.opacity = '0';
        darkModeToggle.style.opacity = '1';
        document.querySelectorAll(".name").forEach(el => {
            el.style.display = "none";
        });
    }, 1000);
});

// Smooth navigation to sections
document.querySelectorAll('.nav-item, .footer-link, .header-nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Typing effect for About section (with callback)
function typeWriter(text, element, speed, callback) {
    let i = 0;
    element.innerHTML = '';
    
    const interval = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                if (callback) callback();
            }, 500);
        }
    }, speed);
}

// Animate skill bars when section is visible
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
}

// Observe when skills section is visible
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(animateSkillBars, 300);
        }
    });
}, { threshold: 0.3 });

// Function to handle contact form
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;
    
    console.log('Form submitted:', { name, email, message });
    
    // Show success message
    alert('Message sent successfully! Thank you for contacting me.');
    
    // Clear form
    this.reset();
});

// Dark mode toggle functionality
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Filter functionality for projects and skills
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
        const container = this.closest('.section').querySelector('.projects-container, .skills-container');
        
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        this.classList.add('active');
        
        // Filter items
        if (container) {
            const items = container.querySelectorAll('.project-card, .skill-category');
            items.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }
    });
});

// Smooth transitions for section changes
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for smooth appearance
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Inicialitzar quan el document està carregat
document.addEventListener('DOMContentLoaded', function() {
    // Assegurar que la sección sobre-mi tenga altura suficiente al cargar
    const sobreMiSection = document.getElementById('sobre-mi');
    if (sobreMiSection) {
        sobreMiSection.style.minHeight = '40vh';
    }
    
    // También observar la sección skills cuando esté lista
    const skillsSection = document.getElementById('habilitats');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
    
    // Actualizar año de copyright automáticamente
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = `&copy; ${currentYear} Mariona Guisado. All rights reserved.`;
    }
    
    // Millores per a mòbils
    improveMobileExperience();
    
    // Inicialitzar testimonis
    initializeTestimonials();
    
    // Ajustar menú de navegació
    setTimeout(adjustNavigationMenu, 1000);
});

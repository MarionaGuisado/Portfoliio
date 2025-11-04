<script>
    // Inicialització ràpida - mostrar contingut directament
    document.addEventListener('DOMContentLoaded', function() {
        initializePortfolio();
    });

    function initializePortfolio() {
        const transition = document.getElementById('transition');
        const name = document.getElementById('name');
        const background = document.getElementById('background');
        const mainContent = document.getElementById('mainContent');
        const newBackground = document.getElementById('newBackground');
        const navMenu = document.getElementById('navMenu');
        const header = document.getElementById('header');
        const enterButton = document.getElementById('enterButton');

        // Configuració inicial
        enterButton.classList.add('hidden');
        transition.style.bottom = '100%';
        
        // Actualitzar estils del nom
        name.style.color = 'black';
        name.style.textShadow = 'none';
        name.style.top = '10%';
        name.style.fontSize = '3rem';
        name.classList.remove('hidden');
        
        // Mostrar contingut principal
        mainContent.style.display = 'block';
        header.style.display = 'block';
        background.style.opacity = '0';
        
        // Mostrar elements amb retard
        setTimeout(() => {
            if (newBackground) newBackground.style.opacity = '1';
            if (navMenu) navMenu.style.opacity = '1';
            
            // Text typing
            const aboutText = "A highly motivated Data Engineering student with a strong academic foundation and a passion for transforming data into actionable insights. Demonstrated ability to lead and collaborate effectively through roles as Class Representative and organizer of technology events, fostering communication between diverse groups and driving community engagement. Combines technical knowledge in data analysis with exceptional interpersonal skills, adaptability, and a solutions-oriented mindset. Eager to contribute by leveraging a unique blend of analytical thinking, leadership experience, and a commitment to delivering value in dynamic, team-based environments.";
            const typedElement = document.getElementById('typed-text');
            if (typedElement) {
                typeWriter(aboutText, typedElement, 20);
            }
        }, 500);

        // Configurar esdeveniments
        setupEventListeners();
        setupSkillAnimations();
    }

    function setupEventListeners() {
        // Back to top
        const backToTopButton = document.getElementById('backToTop');
        if (backToTopButton) {
            backToTopButton.addEventListener('click', function() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // Navegació suau
        document.querySelectorAll('.nav-item, .footer-link, .header-nav a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Formulari de contacte
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Message sent successfully! Thank you for contacting me.');
                this.reset();
            });
        }

        // Dark mode
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', function() {
                document.body.classList.toggle('dark-mode');
                this.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
            });
        }
    }

    function setupSkillAnimations() {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        const skillBars = document.querySelectorAll('.skill-progress');
                        skillBars.forEach(bar => {
                            const width = bar.getAttribute('data-width');
                            bar.style.width = width + '%';
                        });
                    }, 300);
                }
            });
        }, { threshold: 0.3 });

        const skillsSection = document.getElementById('habilitats');
        if (skillsSection) {
            skillsObserver.observe(skillsSection);
        }
    }

    function typeWriter(text, element, speed) {
        let i = 0;
        element.innerHTML = '';
        element.style.borderRight = '2px solid var(--primary-color)';
        
        const interval = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 500);
            }
        }, speed);
    }

    // Scroll handling
    let lastScrollPosition = 0;
    let scrollTimeout;

    window.addEventListener('scroll', function() {
        const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        // Back to top button
        const backToTopButton = document.getElementById('backToTop');
        if (backToTopButton) {
            if (currentScrollPosition > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        }

        // Header effect
        const header = document.getElementById('header');
        if (header) {
            if (currentScrollPosition > 400) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        lastScrollPosition = currentScrollPosition;
    });

    // Actualitzar any copyright
    document.addEventListener('DOMContentLoaded', function() {
        const yearElement = document.querySelector('.footer-bottom p');
        if (yearElement) {
            const currentYear = new Date().getFullYear();
            yearElement.innerHTML = `&copy; ${currentYear} Mariona Guisado. All rights reserved.`;
        }
    });
</script>

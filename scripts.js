<script>
    // Global variables
    let lastScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    let scrollTimeout;
    const nameElement = document.getElementById('name');
    const enterButton = document.getElementById('enterButton');
    const backToTopButton = document.getElementById('backToTop');
    const header = document.getElementById('header');
    
    // Improved scroll handler function
    function handleScroll() {
        const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        // Only trigger if significant scroll (> 5px)
        if (Math.abs(currentScrollPosition - lastScrollPosition) > 5) {
            if (currentScrollPosition > lastScrollPosition) {
                // Scrolling down - hide name
                nameElement.classList.add('hidden');
            } else {
                // Scrolling up - show name
                nameElement.classList.remove('hidden');
            }
        }
        
        lastScrollPosition = currentScrollPosition;
        
        // Reset after stopping scrolling
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            nameElement.classList.remove('hidden');
        }, 1000);

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

    // ENTER BUTTON FUNCTIONALITY - CORREGIDA
    document.getElementById('enterButton').addEventListener('click', function(e) {
        e.preventDefault();
        
        const transition = document.getElementById('transition');
        const name = document.getElementById('name');
        const background = document.getElementById('background');
        const mainContent = document.getElementById('mainContent');
        const newBackground = document.getElementById('newBackground');
        const navMenu = document.getElementById('navMenu');
        
        console.log("Enter button clicked"); // Debug
        
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
            console.log("Name style changed"); // Debug
        }, 500);
        
        // 4. Show main content when transition ends
        setTimeout(() => {
            mainContent.style.display = 'block';
            header.style.display = 'block';
            
            console.log("Main content shown"); // Debug
            
            // 5. Show new image and menu
            setTimeout(() => {
                newBackground.style.opacity = '1';
                navMenu.style.opacity = '1';
                
                console.log("New background and menu shown"); // Debug
                
                // Typing effect for the new About Me text
                const aboutText = "A highly motivated Data Engineering student with a strong academic foundation and a passion for transforming data into actionable insights. Demonstrated ability to lead and collaborate effectively through roles as Class Representative and organizer of technology events, fostering communication between diverse groups and driving community engagement. Combines technical knowledge in data analysis with exceptional interpersonal skills, adaptability, and a solutions-oriented mindset. Eager to contribute by leveraging a unique blend of analytical thinking, leadership experience, and a commitment to delivering value in dynamic, team-based environments.";
                
                const typedElement = document.getElementById('typed-text');
                
                // Type the new text
                typeWriter(aboutText, typedElement, 20);
            }, 100);
            
            // Hide initial background
            background.style.opacity = '0';
        }, 1000);
    });

    // Smooth navigation to sections
    document.querySelectorAll('.nav-item, .footer-link, .header-nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && document.querySelector(targetId)) {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Typing effect for About section
    function typeWriter(text, element, speed, callback) {
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

    // Start observing when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        console.log("DOM loaded"); // Debug
        
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
    });

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
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        });
    }

    // Filter functionality for projects and skills - CORREGIDA
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
</script>

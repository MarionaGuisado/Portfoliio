// Initialize particles.js
document.addEventListener('DOMContentLoaded', function() {
    if (window.particlesJS) {
        particlesJS('newBackground', particlesConfig);
    }
    
    // Make the config available globally
    window.particlesConfig = {
        // Your existing particles configuration here
    };
});

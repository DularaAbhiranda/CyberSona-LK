// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize matrix background effect
    initMatrixBackground();
    
    // Initialize particle effect
    initParticles();
    
    // Toggle mobile navigation
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
    
    // Fade-in animation on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInOnScroll = function() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    };
    
    window.addEventListener('scroll', fadeInOnScroll);
    fadeInOnScroll(); // Check on initial load
    
    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Add active class to current navigation item
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentLocation || 
            (currentLocation === '/' && linkPath === '/index.html')) {
            link.classList.add('active');
        }
    });
});

// Matrix Background Effect
function initMatrixBackground() {
    const matrixBg = document.createElement('div');
    matrixBg.className = 'matrix-bg';
    document.body.appendChild(matrixBg);
    
    const width = window.innerWidth;
    const numberOfColumns = Math.floor(width / 20);
    
    for (let i = 0; i < numberOfColumns; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = (i * 20) + 'px';
        
        // Random characters
        const characters = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789";
        const columnHeight = Math.floor(Math.random() * 20) + 15;
        
        let content = '';
        for (let j = 0; j < columnHeight; j++) {
            content += characters.charAt(Math.floor(Math.random() * characters.length)) + '<br>';
        }
        
        column.innerHTML = content;
        column.style.animationDuration = (Math.random() * 10 + 5) + 's';
        column.style.animationDelay = Math.random() * 5 + 's';
        column.style.opacity = Math.random() * 0.5 + 0.3;
        
        // Apply animation
        column.style.animation = 'matrix-rain ' + (Math.random() * 10 + 5) + 's linear infinite';
        
        matrixBg.appendChild(column);
    }
}

// Particle Effect
function initParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);
    
    const numberOfParticles = 50;
    
    for (let i = 0; i < numberOfParticles; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    
    // Randomize particle styles
    const size = Math.random() * 3 + 1;
    const colors = [
        'rgba(0, 216, 255, 0.7)',
        'rgba(57, 255, 20, 0.7)',
        'rgba(189, 0, 255, 0.7)'
    ];
    
    particle.style.position = 'absolute';
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.borderRadius = '50%';
    particle.style.top = Math.random() * 100 + 'vh';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.boxShadow = '0 0 ' + (size * 2) + 'px ' + (size) + 'px ' + colors[Math.floor(Math.random() * colors.length)];
    
    // Animation properties
    const duration = Math.random() * 60 + 30;
    const direction = Math.random() > 0.5 ? 1 : -1;
    
    particle.style.animation = `float ${duration}s ease-in-out infinite`;
    
    // Move particles around randomly
    setInterval(() => {
        const newTop = parseFloat(particle.style.top) + (Math.random() * 2 - 1) * 0.5;
        const newLeft = parseFloat(particle.style.left) + (Math.random() * 2 - 1) * 0.5 * direction;
        
        // Keep particles within viewport
        if (newTop > 0 && newTop < 100) {
            particle.style.top = newTop + 'vh';
        }
        
        if (newLeft > 0 && newLeft < 100) {
            particle.style.left = newLeft + 'vw';
        }
    }, 100);
    
    container.appendChild(particle);
}

// Form validation for contact form
function validateContactForm() {
    const form = document.getElementById('contact-form');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        let valid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        const errorMessages = document.querySelectorAll('.error-message');
        
        // Clear previous error messages
        errorMessages.forEach(msg => msg.remove());
        
        // Validate name
        if (!name.value.trim()) {
            displayError(name, 'Name is required');
            valid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !emailRegex.test(email.value)) {
            displayError(email, 'Valid email is required');
            valid = false;
        }
        
        // Validate message
        if (!message.value.trim()) {
            displayError(message, 'Message is required');
            valid = false;
        }
        
        if (!valid) {
            e.preventDefault();
        }
    });
}

function displayError(input, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.color = 'var(--danger-color)';
    errorElement.style.fontSize = '0.8rem';
    errorElement.style.marginTop = '5px';
    errorElement.textContent = message;
    
    input.parentNode.appendChild(errorElement);
    input.style.borderColor = 'var(--danger-color)';
    
    input.addEventListener('input', function() {
        errorElement.remove();
        input.style.borderColor = '';
    });
}

// Initialize Cyberpunk Terminal Effect
function initTerminalEffect() {
    const terminalElement = document.querySelector('.terminal-effect');
    
    if (!terminalElement) return;
    
    const text = terminalElement.getAttribute('data-text') || 'System initialized...';
    const speed = parseInt(terminalElement.getAttribute('data-speed')) || 70;
    
    terminalElement.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            terminalElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            terminalElement.classList.add('terminal-cursor');
        }
    }
    
    typeWriter();
}

// YouTube API for enhanced video experiences if needed
function loadYouTubeAPI() {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// Call on page load if you have YouTube videos
// window.onYouTubeIframeAPIReady = function() {
//     // Initialize YouTube players here
// };

// Call form validation on load
document.addEventListener('DOMContentLoaded', function() {
    validateContactForm();
    initTerminalEffect();
});
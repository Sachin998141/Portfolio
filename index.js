// ========================================
// Professional Portfolio JavaScript
// Author: Sachin Kushwaha
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // 1. HAMBURGER MENU FUNCTIONALITY
    // ========================================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const header = document.getElementById('navbar');

    // Toggle hamburger menu on click
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        const icon = hamburger.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Close menu when a navigation link is clicked (for mobile)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            if (navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });

    // ========================================
    // 2. ACTIVE NAVIGATION LINK HIGHLIGHT
    // ========================================
    const sections = document.querySelectorAll('.section-content');
    const navLinksArray = document.querySelectorAll('.nav-links a:not(.resume-btn)');

    // Function to highlight active section in navigation
    const highlightNavigation = () => {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinksArray.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    };

    // Call on scroll
    window.addEventListener('scroll', highlightNavigation);

    // ========================================
    // 3. SMOOTH SCROLL FOR NAVIGATION LINKS
    // ========================================
    navLinksArray.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // 4. TESTIMONIAL CAROUSEL FUNCTIONALITY
    // ========================================
    const carousel = document.querySelector('.testimonial-carousel');
    
    if (carousel) {
        const testimonials = carousel.querySelectorAll('.testimonial-item');
        const prevBtn = carousel.querySelector('.prev-btn');
        const nextBtn = carousel.querySelector('.next-btn');
        const dotsContainer = carousel.querySelector('.dots-container');
        let currentIndex = 0;
        let autoSlideInterval;

        // Create navigation dots
        testimonials.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.dot');

        // Update carousel display
        function updateCarousel() {
            testimonials.forEach((item, index) => {
                item.classList.remove('active');
                dots[index].classList.remove('active');
                
                if (index === currentIndex) {
                    item.classList.add('active');
                    dots[index].classList.add('active');
                }
            });
        }

        // Navigate to specific slide
        function goToSlide(index) {
            currentIndex = (index + testimonials.length) % testimonials.length;
            updateCarousel();
            resetAutoSlide();
        }

        // Previous slide
        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
        });

        // Next slide
        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
        });

        // Auto-slide functionality
        function startAutoSlide() {
            autoSlideInterval = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, 5000); // Change slide every 5 seconds
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        function resetAutoSlide() {
            stopAutoSlide();
            startAutoSlide();
        }

        // Start auto-sliding
        startAutoSlide();

        // Pause auto-slide on hover
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
    }

    // ========================================
    // 5. SCROLL REVEAL ANIMATION
    // ========================================
    const revealElements = document.querySelectorAll('.section-content');

    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for reveal animation
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Call once on load

    // ========================================
    // 6. HEADER SCROLL EFFECT
    // ========================================
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add shadow to header on scroll
        if (scrollTop > 50) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        }

        lastScrollTop = scrollTop;
    });

    // ========================================
    // 7. FORM VALIDATION (Optional Enhancement)
    // ========================================
    const contactForm = document.querySelector('.contact-container form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            const nameInput = contactForm.querySelector('input[name="name"]');
            const emailInput = contactForm.querySelector('input[name="email"]');
            const messageInput = contactForm.querySelector('textarea[name="message"]');

            // Basic validation
            if (!nameInput.value.trim()) {
                e.preventDefault();
                alert('Please enter your name');
                nameInput.focus();
                return;
            }

            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                e.preventDefault();
                alert('Please enter a valid email address');
                emailInput.focus();
                return;
            }

            if (!messageInput.value.trim()) {
                e.preventDefault();
                alert('Please enter your message');
                messageInput.focus();
                return;
            }

            // If validation passes, form will submit normally
        });
    }

    // Email validation helper function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // ========================================
    // 8. KEYBOARD NAVIGATION FOR CAROUSEL
    // ========================================
    document.addEventListener('keydown', (e) => {
        if (carousel) {
            if (e.key === 'ArrowLeft') {
                const prevBtn = carousel.querySelector('.prev-btn');
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                const nextBtn = carousel.querySelector('.next-btn');
                nextBtn.click();
            }
        }
    });

    // ========================================
    // 9. CONSOLE MESSAGE (Easter Egg)
    // ========================================
    console.log('%c👋 Hello, Developer!', 'color: #4a90e2; font-size: 20px; font-weight: bold;');
    console.log('%cLooking for something? Feel free to reach out!', 'color: #f5a623; font-size: 14px;');
    console.log('%c📧 sachin.kushwaha@qspiders.in', 'color: #a0a0a0; font-size: 12px;');

    // ========================================
    // 10. LOADING ANIMATION (Optional)
    // ========================================
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
});

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
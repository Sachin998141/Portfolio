document.addEventListener('DOMContentLoaded', () => {
    // 1. Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const header = document.getElementById('navbar');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        hamburger.querySelector('i').classList.toggle('fa-bars');
        hamburger.querySelector('i').classList.toggle('fa-times');
    });

    // Close menu when a link is clicked (for mobile)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                hamburger.querySelector('i').classList.remove('fa-times');
                hamburger.querySelector('i').classList.add('fa-bars');
            }
        });
    });

    // 2. Section Scroll Animation (Intersection Observer)
    const sections = document.querySelectorAll('.section-content');

    const observerOptions = {
        root: null,
        threshold: 0.2, // Trigger when 20% of the section is visible
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once it's visible
                // observer.unobserve(entry.target);
            } else {
                // Optional: Remove 'visible' class when out of view
                // entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // 3. Testimonial Carousel Logic
    const carousel = document.querySelector('.testimonial-carousel');
    const testimonials = carousel.querySelectorAll('.testimonial-item');
    const prevBtn = carousel.querySelector('.prev-btn');
    const nextBtn = carousel.querySelector('.next-btn');
    const dotsContainer = carousel.querySelector('.dots-container');
    let currentIndex = 0;

    // Create dots
    testimonials.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.dot');

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

    function goToSlide(index) {
        currentIndex = (index + testimonials.length) % testimonials.length;
        updateCarousel();
    }

    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

    // Optional: Auto-slide the carousel
    // setInterval(() => goToSlide(currentIndex + 1), 7000);
});
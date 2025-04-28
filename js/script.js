document.addEventListener('DOMContentLoaded', () => {

    // --- Typed.js Effect for Hero Section ---
    const typedNameElement = document.getElementById('typed-name');
    if (typedNameElement) {
        const typed = new Typed('#typed-name', {
            strings: ['Yamashita', 'a Penetration Tester', 'Programmer', 'a Problem Solver'], // Customize these strings
            typeSpeed: 70,
            backSpeed: 40,
            loop: true,
            backDelay: 1500,
            smartBackspace: true,
        });
    }

    // --- Mobile Navigation Burger Menu ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');

            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = ''; // Reset animation
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            // Burger Animation
            burger.classList.toggle('toggle');
        });
    }

    // --- Close Mobile Menu When Link Is Clicked ---
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                // Reset link animations immediately for responsiveness
                navLinks.forEach(link => link.style.animation = '');
            }
        });
    });


    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if(targetElement) {
                 // Calculate offset considering fixed header height
                 const headerOffset = document.querySelector('header')?.offsetHeight || 80; // Adjust 80 if header height changes
                 const elementPosition = targetElement.getBoundingClientRect().top;
                 const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Simple Fade-In Animation on Scroll ---
    const fadeElems = document.querySelectorAll('.content-section, .project-card, .skill-item');

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Optional: Unobserve after animation
                // observer.unobserve(entry.target);
            } else {
                // Optional: Reset animation if element scrolls out of view
                // entry.target.style.opacity = '0';
                // entry.target.style.transform = 'translateY(20px)';
            }
        });
    };

    const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

    fadeElems.forEach(elem => {
        // Initial state for animation
        elem.style.opacity = '0';
        elem.style.transform = 'translateY(20px)';
        elem.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        scrollObserver.observe(elem);
    });


    // --- Optional: Basic Contact Form Handling (Example) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission

            // Basic validation check (more robust validation recommended)
            const name = contactForm.querySelector('input[name="name"]').value;
            const email = contactForm.querySelector('input[name="email"]').value;
            const message = contactForm.querySelector('textarea[name="message"]').value;

            if (name && email && message) {
                console.log('Form Submitted:');
                console.log('Name:', name);
                console.log('Email:', email);
                console.log('Message:', message);

                // Here you would typically send the data to a backend server
                // or use a service like Formspree, Netlify Forms, etc.

                alert('Thank you for your message! (Form data logged to console)'); // Placeholder feedback
                contactForm.reset(); // Clear the form
            } else {
                alert('Please fill out all fields.');
            }
        });
    }

}); // End DOMContentLoaded
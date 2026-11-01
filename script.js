/* ===================================================
   Website Functionality & Interactivity (JavaScript)
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* -------------------------------------------
       1. Mobile Navigation Menu Toggle
       ------------------------------------------- */
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');

    // Open mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
        });
    }

    // Close mobile menu
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }

    // Auto-close menu when clicking any nav link
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    });


    /* -------------------------------------------
       2. Dark / Light Theme Toggle
       ------------------------------------------- */
    const themeButton = document.getElementById('theme-button');
    const themeIcon = document.getElementById('theme-icon');
    const lightThemeClass = 'light-theme';

    // Retrieve saved user theme preference from LocalStorage
    const savedTheme = localStorage.getItem('selected-theme');
    if (savedTheme === 'light') {
        document.body.classList.add(lightThemeClass);
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }

    themeButton.addEventListener('click', () => {
        // Toggle theme class
        document.body.classList.toggle(lightThemeClass);

        // Update icon and save state
        if (document.body.classList.contains(lightThemeClass)) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('selected-theme', 'light');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('selected-theme', 'dark');
        }
    });


    /* -------------------------------------------
       3. Dynamic Typing Effect (Hero Section)
       ------------------------------------------- */
    const typingElement = document.getElementById('typing-text');
    const words = ['Web Developer', 'PLC Programmer', 'Robotics Enthusiast', 'Tech Learner'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 150;

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 80;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 150;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            // Pause when word typing is complete
            isDeleting = true;
            typingDelay = 1500;
        } else if (isDeleting && charIndex === 0) {
            // Switch to next word once deleted
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingDelay = 400;
        }

        setTimeout(typeEffect, typingDelay);
    }

    if (typingElement) {
        setTimeout(typeEffect, 500);
    }


    /* -------------------------------------------
       4. Active Navigation Link Highlighting on Scroll
       ------------------------------------------- */
    const sections = document.querySelectorAll('section[id]');

    function scrollActive() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const targetLink = document.querySelector(`.nav__menu a[href*='${sectionId}']`);

            if (targetLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    targetLink.classList.add('active-link');
                } else {
                    targetLink.classList.remove('active-link');
                }
            }
        });
    }

    window.addEventListener('scroll', scrollActive);


    /* -------------------------------------------
       5. Scroll to Top Floating Button
       ------------------------------------------- */
    const scrollUp = document.getElementById('scroll-up');

    function checkScrollTop() {
        if (window.scrollY >= 350) {
            scrollUp.classList.add('show-scroll');
        } else {
            scrollUp.classList.remove('show-scroll');
        }
    }

    window.addEventListener('scroll', checkScrollTop);


    /* -------------------------------------------
       6. Contact Form Validation & Feedback
       ------------------------------------------- */
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent standard page reload

            const nameInput = document.getElementById('name').value.trim();
            const emailInput = document.getElementById('email').value.trim();
            const messageInput = document.getElementById('message').value.trim();

            if (!nameInput || !emailInput || !messageInput) {
                formFeedback.className = 'form__message error';
                formFeedback.textContent = 'Please fill out all required fields.';
                return;
            }

            // Show success message
            formFeedback.className = 'form__message success';
            formFeedback.innerHTML = `🎉 Thank you <strong>${nameInput}</strong>! Your message has been sent successfully. I will get back to you soon.`;

            // Reset form fields
            contactForm.reset();

            // Auto-hide feedback after 6 seconds
            setTimeout(() => {
                formFeedback.style.display = 'none';
                formFeedback.className = 'form__message';
            }, 6000);
        });
    }

});

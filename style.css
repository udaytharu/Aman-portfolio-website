// Theme Toggle (Day/Night Mode)
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const themeIcon = themeToggleBtn.querySelector('i');

// Check local storage for saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

// Initialize EmailJS
(function() {
    // Make sure your User ID is correct
    emailjs.init("pMTBWtAGhjd0az49O"); 
})();

// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    preloader.classList.add('fade-out');
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Sticky Header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 0);
});

// Back to Top Button
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
});

backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Advanced Scroll Animations (Intersection Observer)
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            // Unobserve after animating once for performance
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .about-img, .about-text, .contact-info, .contact-form').forEach(el => {
    el.style.opacity = '0'; // Hide initially
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    observer.observe(el);
});

// Helper class for observer
document.head.insertAdjacentHTML('beforeend', `<style>
    .animate { opacity: 1 !important; transform: translateY(0) !important; }
</style>`);

// Form Submission with EmailJS
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const submitBtn = contactForm.querySelector('.submit-btn');
    let isFormSubmitting = false;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (isFormSubmitting) return; 
        isFormSubmitting = true;

        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (typeof emailjs === 'undefined' || typeof emailjs.send !== 'function') {
            alert('Error: Email service is unavailable. Please check your configuration.');
            resetFormState();
            return;
        }

        const templateParams = {
            from_name: name,
            from_email: email,
            message: message,
            to_name: 'Aman Tharu',
            to_email: 'er.amantharu@gmail.com'
        };

        emailjs.send('service_ufihhgp', 'template_o41n40u', templateParams)
            .then(function(response) {
                alert('Success! Thank you for reaching out.');
                contactForm.reset();
            }, function(error) {
                alert('Error sending message. Please try again later.');
            })
            .finally(function() {
                resetFormState();
            });
            
        function resetFormState() {
            isFormSubmitting = false;
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
        }
    });
}